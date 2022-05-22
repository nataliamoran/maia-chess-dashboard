import fastapi
import httpx
import asyncio
import os
import ast

from typing import List, Tuple
from pydantic import BaseModel, Field
from bson import ObjectId
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import Body, HTTPException, status, Request, APIRouter
from .utils import PyObjectId
from .models import EventModel, UserModel, GameNumModel, UserFeedbackModel, UserFeedbackRatingModel
from . import db_client, dashboard_router, analysis_router
from datetime import datetime, time, timedelta

import json

from .get_games import get_user_games
from .get_stats import get_user_stats
from .get_game_state import get_game_states
from .filters import get_filters

fe_router = fastapi.APIRouter(prefix="/api", tags=['frontend'])


class StatModel(BaseModel):
    p: float = Field(...)
    t: float = Field(...)
    e: float = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "p": 4,
                "t": 5,
                "e": 1,
            }
        }


class StateModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    round: int = Field(...)
    move: str = Field(...)
    FEN: str = Field(...)
    stat: StatModel = Field(...)
    last_move: List[str] = Field(...)
    maia_moves: List[List[str]] = Field(...)
    stockfish_moves: List[List[str]] = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "round": 1,
                "move": "e4 e1",
                "FEN": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                "stat": {
                    "p": 4,
                    "t": 5,
                    "e": 1
                },
                "last_move": [
                    "a6",
                    "b6"
                ],
                "maia_moves": [
                    [
                        "e1",
                        "e2",
                        0.6
                    ]
                ],
                "stockfish_moves": [
                    [
                        "a1",
                        "a2",
                        0.7
                    ]
                ]
            }
        }


class GameModel(BaseModel):
    ID: str = Field(...)
    whitePlayer: str = Field(...)
    blackPlayer: str = Field(...)
    date: str = Field(...)
    averageStat: StatModel = Field(...)
    state: StateModel = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "ID": "1a",
                "whitePlayer": "name1",
                "blackPlayer": "name2",
                "date": "01/10/2021 13:15:03",
                        "averageStat": {
                            "p": 4,
                            "t": 5,
                            "e": 1
                        },
                "state": {
                            "round": 1,
                            "move": "e4 e1",
                            "FEN": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                            "stat": {
                                "p": 4,
                                "t": 5,
                                "e": 1
                            },
                            "last_move": [
                                "a6",
                                "b6"
                            ],
                            "maia_moves": [
                                [
                                    "e1",
                                    "e2",
                                    0.6
                                ]
                            ],
                            "stockfish_moves": [
                                [
                                    "a1",
                                    "a2",
                                    0.7
                                ]
                            ]
                        }
            }
        }


class GameFilterModel(BaseModel):
    filter: str = Field(...)
    games: List[GameModel] = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "filter": "mistakes",
                "games": [
                    {
                        "ID": "1a",
                        "whitePlayer": "name1",
                        "blackPlayer": "name2",
                        "date": "01/10/2021 13:15:03",
                        "averageStat": {
                            "p": 4,
                            "t": 5,
                            "e": 1
                        },
                        "state": {
                            "round": 1,
                            "move": "e4 e1",
                            "FEN": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                            "stat": {
                                "p": 4,
                                "t": 5,
                                "e": 1
                            },
                            "last_move": [
                                "a6",
                                "b6"
                            ],
                            "maia_moves": [
                                [
                                    "e1",
                                    "e2",
                                    0.6
                                ]
                            ],
                            "stockfish_moves": [
                                [
                                    "a1",
                                    "a2",
                                    0.7
                                ]
                            ]
                        }
                    }
                ]
            }
        }


class RawGameModel(BaseModel):
    ID: str = Field(...)
    whitePlayer: str = Field(...)
    blackPlayer: str = Field(...)
    date: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "ID": "sozvQYHn",
                "whitePlayer": "neltew",
                "blackPlayer": "maia1",
                "date": '2021.11.25 19:03:19'
            }
        }


class UserGames(BaseModel):
    username: str = Field(...)
    number_of_games: int = Field(...)
    games: List[RawGameModel] = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "username": "maia1",
                "number_of_games": 2,
                "games": [
                    {
                        "ID": "sozvQYHn",
                        "whitePlayer": "neltew",
                        "blackPlayer": "maia1",
                        "date": '2021.11.25 19:03:19'
                    },
                    {
                        "ID": "pd5v0Q3k",
                        "whitePlayer": "maia1",
                        "blackPlayer": "sampowell",
                        "date": '2021.11.25 19:03:19'
                    }
                ]
            }
        }

class GameStates(BaseModel):
    gameId: str = Field(...)
    states: list = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "gameId": "xj53pmTF",
                "states": [
                    {
                        "FEN": "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1",
                        "PGN": "d4"
                    }
                ]
            }
        }

@fe_router.get("/games/{game_id}", response_description="Get game state", response_model=GameStates)
async def get_game(game_id: str):
    states = await get_game_states(game_id)
    res = {
        "gameId": game_id,
        "states": states
    }
    return res


@fe_router.get("/get_games", response_description="Return games that the user has played", response_model=UserGames)
async def get_game(username: str = "maia1"):
    user_games, num_ganes = await get_user_games(username)
    res = {
        "username": username,
        "number_of_games": num_ganes,
        "games": user_games
    }
    return res


@fe_router.get("/filters", response_description="Filter game", response_model=GameFilterModel)
async def filter_games(gameFilter: str, games: str, username: str, filterString:str = None):
    custom = None
    isCustom = False
    if filterString and gameFilter == 'custom':
        try:
            custom = ast.literal_eval(filterString)
        except:
            pass
        isCustom = True
    currFilter = gameFilter
    if gameFilter == 'mistakes':
        currFilter = 'p'
    elif gameFilter == 'interesting':
        currFilter = 'e'
    else:
        currFilter = 't'
    list_of_games = games.split(",")
    filtered_games = await get_filters(username, currFilter, list_of_games, custom, isCustom)
    res = {
        "filter": gameFilter,
        "games": filtered_games
    }
    return res

@fe_router.get("/num_games/{username}",
               response_description="Get the number of games analyzed",
               response_model=GameNumModel)
async def get_num_games(username: str):
    return await analysis_router.get_analyzed_games_num(username)

@fe_router.get("/users/{username}", response_description="Get user profile", response_model=UserModel)
async def get_user_profile(username: str):
    pass


@fe_router.post("/log", response_description="Log frontend event")
async def log_event(event: EventModel = Body(...)):
    return await dashboard_router.log_fe_event(event)


@fe_router.post("/login/{username}", response_description="Login with Lichess")
async def login(username: str):
    pass


@fe_router.post("/logout/{username}", response_description="Logout")
async def logout(username: str):
    pass


@fe_router.post("/feedback", response_description="User feedback")
async def send_user_feedback(feedback: UserFeedbackModel = Body(...)):
    return await dashboard_router.send_user_feedback(feedback)


@fe_router.post("/feedback_rating", response_description="User feedback rating")
async def send_user_feedback_rating(feedback_rating: UserFeedbackRatingModel = Body(...)):
    return await dashboard_router.send_user_feedback_rating(feedback_rating)
