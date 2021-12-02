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
from fastapi import Body, HTTPException, status, Request
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


@analysis_router.post("/analyze/", response_description="Analyze games from this user that has been added to the Maia Database")
async def analyze_user(username: str, num_games : Optional[int] = 1):
    # get the dashboard database
    dash = db_client.get_dashboard_db()
    anal = db_client.get_analysis_db()

    # get all games for that user
    cursor = dash['games'].find({'user': username})

    # get required number of games
    if num_games is None:
        found_games = await cursor.to_list(length=1)  # picked some arbitrary value here I guess
    else:
        found_games = await cursor.to_list(length=num_games)

    if found_games == []:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"status": "error", "message": "attempting to analyze a player with no games stored"})

    # find games that are already analyzed
    game_ids = []
    for game in found_games:
        game_ids += [{'_id': game['_id']}]

    cursor = anal['analyzed'].find({'$or': game_ids})
    analyzed_game_ids = await cursor.to_list(length=100000)  # again an arbitrary value
    for i in range(len(analyzed_game_ids)):
        analyzed_game_ids[i] = analyzed_game_ids[i]['_id']

    new_games = []

    # write the remaining games into the database, collect average metrics, and add it into the analyzed section after
    for game in found_games:
        # skip if game is already analyzed
        if game['_id'] in analyzed_game_ids:
            continue
        else:
            new_games += [game['_id']]

        # mark the game as analyzed in the collection
        await anal['analyzed'].update_one({'_id': game['_id']}, {'$set': {'_id': game['_id'], 'white_player': game['white_player'], 'black_player': game['black_player']}}, upsert=True)

        # analyze the game
        game_analysis = maia_lib.full_game_analysis(game['pgn'])

        aggregates = {}  # store PTE for each model except Stockfish
        aggregates['_id'] = game['_id']

        for model, states in game_analysis.items():
            # fill the aggregates for this model with dummy values to be modified
            agg = {
                'avg_performance': 0,
                'avg_entropy': 0,
                'avg_trickiness': 0,
                'max_performance': float('-inf'),
                'min_performance': float('inf'),
                'max_entropy': float('-inf'),
                'min_entropy': float('inf'),
                'max_trickiness': float('-inf'),
                'min_trickiness': float('inf'),
            }

            # ---------------------------- analyze states -----------------------------------
            for state in states:
                # add the id and model name for this state
                state['_id'] = str(model) + '-' + str(state['game_id']) + '-' + str(state['move_ply'])
                state['model'] = str(model)

                # insert the state
                await anal['game_states'].update_one({'_id': state['_id']}, {'$set': state}, upsert=True)

                if model == 'stockfish':
                    continue

                # record the aggregates
                p = state['performance']
                t = state['trickiness']
                e = state['model_entropy']

                # these dumb looking statements check if the value is NaN
                if p == p:
                    if agg['max_performance'] < p:
                        agg['max_performance'] = p
                    if agg['min_performance'] > p:
                        agg['min_performance'] = p
                    agg['avg_performance'] += p

                if e == e:
                    if agg['max_entropy'] < e:
                        agg['max_entropy'] = e
                    if agg['min_entropy'] > e:
                        agg['min_entropy'] = e
                    agg['avg_entropy'] += e

                if t == t:
                    if agg['max_trickiness'] < t:
                        agg['max_trickiness'] = t
                    if agg['min_trickiness'] > t:
                        agg['min_trickiness'] = t
                    agg['avg_trickiness'] += t

            # -------------------- state analysis done, record aggregates ---------------------------
            if model == 'stockfish':
                continue

            agg['avg_performance'] /= len(states)
            agg['avg_entropy'] /= len(states)
            agg['avg_trickiness'] /= len(states)

            aggregates[model] = agg

        # insert the aggregates
        await anal['stats'].update_one({'_id': game['_id']}, {'$set': aggregates}, upsert=True)

    # set the response to send
    response = {}
    response['status'] = 'success'
    response['total_games'] = len(found_games)
    response['new_games'] = len(new_games)
    response['game_ids'] = new_games
    response['previously_analyzed'] = analyzed_game_ids

    return JSONResponse(status_code=status.HTTP_200_OK, content=response)


@analysis_router.get("/analyzed_games/", response_description="Get a list of analyzed games")
async def get_analyzed_games():
    anal = db_client.get_analysis_db()

    # generate list of analyzed game lichess ids
    cursor = anal['analyzed'].find()
    mids = await cursor.to_list(length=100000)
    ids = []
    for m in mids:
        ids += [m['_id']]

    response = {
        'status': 'success',
        'games': ids
    }

    return JSONResponse(status_code=status.HTTP_200_OK, content=response)


@analysis_router.get("/stats/{game_id}", response_description="Get the aggregates for a given lichess game id")
async def get_analyzed_games(game_id: str):
    anal = db_client.get_analysis_db()

    # find the list of aggregates
    cursor = anal['stats'].find({'_id': game_id})
    stats = await cursor.to_list(length=1)

    response = {
        'status': 'success',
        'stats': stats
    }

    return JSONResponse(status_code=status.HTTP_200_OK, content=response)


@analysis_router.get("/game_states/{game_id}", response_description="Get states for a given lichess game id")
async def get_game_states(game_id: str, every: bool):
    anal = db_client.get_analysis_db()

    cursor = anal['game_states'].find({'game_id': game_id})
    if every:
        states = await cursor.to_list(length=100000000)  # arbitrary value to change
    else:
        states = await cursor.to_list(length=100)

    # ----------------------------- Convert the result into something JSON serializable ----------------------------
    def serialize_dict(d: dict):
        for k, v in d.items():
            if v != v:
                d[k] = 'NaN'
            if v == -0.0:
                d[k] = 0.0
            if type(v) == dict:
                serialize_dict(v)
    for s in states:
        serialize_dict(s)

    response = {
        'status': 'success',
        'game_states': states
    }

    return JSONResponse(status_code=status.HTTP_200_OK, content=response)