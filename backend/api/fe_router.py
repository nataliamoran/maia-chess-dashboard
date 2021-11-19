import fastapi
import httpx
import asyncio
import os

from typing import List, Tuple
from pydantic import BaseModel, Field
from bson import ObjectId
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import Body, HTTPException, status
from .utils import PyObjectId
from .models import EventModel, UserModel, GameNumModel

import json

from .get_games import get_user_games

fe_router = fastapi.APIRouter(prefix="/api", tags=['frontend'])


class StatModel(BaseModel):
    p: int = Field(..., ge=-1, le=1)
    t: int = Field(..., ge=0, le=1)
    e: int = Field(..., ge=0)

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
    date: int = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "ID": "sozvQYHn",
                "whitePlayer": "neltew",
                "blackPlayer": "maia1",
                "date": 1637018565917
            }
        }


class UserGames(BaseModel):
    username: str = Field(...)
    games: List[RawGameModel] = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "username": "maia1",
                "games": [
                    {
                        "ID": "sozvQYHn",
                        "whitePlayer": "neltew",
                        "blackPlayer": "maia1",
                        "date": 1637018565917
                    },
                    {
                        "ID": "pd5v0Q3k",
                        "whitePlayer": "maia1",
                        "blackPlayer": "sampowell",
                        "date": 1637018565917
                    }
                ]
            }
        }


@fe_router.get("/games/{game_id}", response_description="Get game state", response_model=GameModel)
async def get_game(game_id: str):
    pass


@fe_router.get("/get_games", response_description="Return games that the user has played", response_model=UserGames)
async def get_game(username: str = "maia1"):
    user_games: list = get_user_games(username, 4)
    res = {
        "username": username,
        "games": user_games
    }
    return res


@fe_router.get("/filters", response_description="Filter game", response_model=GameFilterModel)
async def filter_games(gameFilter: str):
    script_dir = os.path.dirname(__file__)
    if gameFilter == 'mistakes':
        file_path = os.path.join(script_dir, 'resources/mistakes.json')
    elif gameFilter == 'interesting':
        file_path = os.path.join(script_dir, 'resources/interesting.json')
    else:
        file_path = os.path.join(script_dir, 'resources/tricky.json')
    data = json.load(open(file_path))
    return data


@fe_router.get("/num_games/{username}", response_description="Get the number of games analyzed", response_model=GameNumModel)
async def get_num_games(username: str):
    pass


@fe_router.get("/stats/{username}", response_description="Get user stats", response_model=StatModel)
async def get_stats(username: str):
    pass


@fe_router.get("/users/{username}", response_description="Get user profile", response_model=UserModel)
async def get_user_profile(username: str):
    pass


@fe_router.post("/events", response_description="Log frontend event")
async def log_event(event: EventModel = Body(...)):
    pass


@fe_router.post("/login/{username}", response_description="Login with Lichess")
async def login(username: str):
    pass


@fe_router.post("/logout/{username}", response_description="Logout")
async def logout(username: str):
    pass
