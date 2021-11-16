import fastapi
import maia_lib
import chess
import io
import requests

from typing import List, Optional
from pydantic import BaseModel, Field
from bson import ObjectId
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import Body, HTTPException, status
from .utils import PyObjectId
from .models import GameNumModel
from . import db_client
import maia_lib

analysis_router = fastapi.APIRouter(prefix="/api/analysis", tags=['analysis'])


class RawGameModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    lichess_id: str = Field(...)
    data: dict = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
            }
        }


class ProcessedGameModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    lichess_id: str = Field(...)
    analysis: dict = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
            }
        }


class AnalysisTestModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    analysis_name: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "analysis_name": "analysis test",
            }
        }


@analysis_router.get("/num_games/{username}",
                     response_description="Get the number of games analyzed",
                     response_model=GameNumModel)
async def get_analyzed_games_num(username: str):
    pass


@analysis_router.get("/filters/{games_filter}/{username}",
                     response_description="Filter user's games per 'most interesting', 'most difficult' or 'mistakes'",
                     response_model=List[ProcessedGameModel])
async def filter_games(games_filter: str, username: str):
    pass


@analysis_router.post("/games/{username}",
                      response_description="Retrieve raw games from Lichess and store them in Maia DB",
                      response_model=List[RawGameModel])
async def post_user_raw_games():
    pass


@analysis_router.get("/test_local_maia_lib",
                     response_description="Test Local Maia Lib")
async def test_local_maia_lib():
    p, v = maia_lib.models.maia_kdd_1100.eval_board(chess.Board())
    return [p, v]


@analysis_router.get("/test_pgn_parsing",
                     response_description="Test PGN Parsing Maia Lib")
async def test_pgn_parsing():
    r = requests.get("https://lichess.org/api/games/user/maia1?max=10")
    games = maia_lib.GamesFile(io.StringIO(r.text))
    mongo_dicts = games.iter_mongo_dicts()
    return mongo_dicts


@analysis_router.post("/anaylze/{username}",response_description="Analyze games from this user that has been added to the Maia Database")
async def analyze_user(username: str, num_games : Optional[int] = 100):
    # get the dashboard database
    dash = db_client.get_dashboard_db()

    # get all games for that user
    cursor = dash['games'].find({'user': username})

    # get required number of games
    if num_games is None:
        found_games = await cursor.to_list(length=100000)  # picked some arbitrary value here I guess
    else:
        found_games = await cursor.to_list(length=num_games)

    game_analysis = maia_lib.full_game_analysis(found_games[0]['pgn'])
    print(game_analysis)

    # for JSON serializability
    for i in range(len(found_games)):
        found_games[i]['full_date'] = str(found_games[i]['full_date'])

    response = {}
    response['status'] = 'success'
    response['games'] = found_games

    return JSONResponse(status_code=status.HTTP_200_OK, content=response)

