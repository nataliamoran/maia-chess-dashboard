import fastapi

from typing import List, Optional
from pydantic import BaseModel, Field
from bson import ObjectId, json_util
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import Body, HTTPException, status
from .utils import PyObjectId
from . import db_client
from .models import EventModel, UserModel
import json
import lichess.api
import lichess.format

import maia_lib
import chess
import io
import requests
import asyncio
from datetime import datetime as dt

dashboard_router = fastapi.APIRouter(prefix="/api/dashboard", tags=['dashboard'])


class DBUserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user: str = Field(...)
    num_games: int = 0

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
            }
        }


@dashboard_router.post("/events", response_description="Log frontend event")
async def log_fe_event(event: EventModel = Body(...)):
    event_json = jsonable_encoder(event)
    client = db_client.get_dashboard_db()
    new_event = await client["events"].insert_one(event_json)
    created_event = await client["events"].find_one({"_id": new_event.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_event)


@dashboard_router.get("/lichess_users/{username}", response_description="Get user profile from Lichess",
                      response_model=UserModel)
async def get_user_profile_from_lichess(username: str):
    try:
        lichess_info = lichess.api.user(username)
    except lichess.api.ApiError as err:
        return JSONResponse(status_code=status.HTTP_200_OK, content=None)

    ret = {"lichess_id": username, "lichess_info": lichess_info}
    return JSONResponse(status_code=status.HTTP_200_OK, content=ret)


@dashboard_router.get("/users/{username}", response_description="Check if username is in Maia DB",
                      response_model=DBUserModel)
async def find_username_in_maia_db(username: str):
    client = db_client.get_dashboard_db()
    table = client["user_data"]
    exists = await table.find_one({"user": username})
    if exists is not None:
        return JSONResponse(status_code=status.HTTP_200_OK, content=json.loads(json_util.dumps(exists)))
    else:
        return JSONResponse(status_code=status.HTTP_200_OK, content=None)


@dashboard_router.post("/users/{username}", response_description="Add username to Maia DB", response_model=DBUserModel)
async def add_username_to_maia_db(username: str):
    new_user_data = {
        "user": username,
        "num_games": 0
    }
    client = db_client.get_dashboard_db()
    table = client["user_data"]

    exists = await table.find_one({"user": username})
    if exists is not None:
        return JSONResponse(status_code=status.HTTP_306_RESERVED, content={"reserved": username + " already exists"})

    new_user = await table.insert_one(new_user_data)
    created_user = await table.find_one({"_id": new_user.inserted_id})

    ret = json.loads(json_util.dumps(created_user))

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=ret)


@dashboard_router.post("/login/{username}/{oauthtoken}", response_description="Login with Lichess")
async def login(username: str, oauthtoken: str):
    try:
        games = lichess.api.user_games(username=username, max=10, auth=oauthtoken, format=lichess.format.PGN)
        pgns = list(games)
    except lichess.api.ApiHttpError as err:
        return JSONResponse(status_code=status.HTTP_206_PARTIAL_CONTENT, content={"status": "Authentication failed"})

    return JSONResponse(status_code=status.HTTP_200_OK,
                        content={"status": "Authentication succeeded. Pulled 10 sample games", "games": pgns})


@dashboard_router.get("/logout/{username}", response_description="Logout")
async def logout(username: str):
    ret = {
        "status": "stubbed logout for " + username + " no action to take here as of yet"
    }

    return JSONResponse(status_code=status.HTTP_200_OK, content=ret)


@dashboard_router.post("/raw/{username}", response_description="Get given user's raw games and post them to the database")
async def download_raw(username: str, maxgames: Optional[int] = 100):
    # get the dashboard database
    dash = db_client.get_dashboard_db()

    # pull the games using lichess API, and maia_lib into a dictionary
    r = requests.get("https://lichess.org/api/games/user/" + username + "?max=" + str(maxgames))
    games = maia_lib.GamesFile(io.StringIO(r.text))
    mongo_dicts = games.iter_mongo_dicts()
    inserted_ids = []  # track game id's that are inserted

    # insert each game with update_one upsert to ensure games can be updated if needed, and track which ids are added
    for game in mongo_dicts:
        await dash['games'].update_one({'_id': game['_id']}, {'$set': game}, upsert=True)
        inserted_ids += [{'_id': game['_id']}]

    # get all games that are inserted
    cursor = dash['games'].find({'$or': inserted_ids})
    inserted_games = await cursor.to_list(length=maxgames)

    # response JSON setup
    response = {}
    response['status'] = 'success'
    response['num_games'] = len(inserted_games)
    response['start_date'] = dt.strptime('9999.12.31', '%Y.%m.%d')  # dummy large date
    response['end_date'] = dt.strptime('0001.01.01', '%Y.%m.%d')  # dummy small date
    response['game_ids'] = []

    # build the response
    for game in inserted_games:
        response['game_ids'] += [game['_id']]  # store game id

        # check if this is min/max date. useful for checking the "current=ness" of some users data for future db queries
        d = dt.strptime(game['date'], '%Y.%m.%d')
        if d < response['start_date']:
            response['start_date'] = d
        if d > response['end_date']:
            response['end_date'] = d

    # convert back to str to be JSON serializable
    response['start_date'] = str(response['start_date'])
    response['end_date'] = str(response['end_date'])

    return JSONResponse(status_code=status.HTTP_200_OK, content=response)

