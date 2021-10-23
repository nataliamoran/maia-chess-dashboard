import fastapi
import httpx
import asyncio

from typing import List, Tuple
from pydantic import BaseModel, Field
from bson import ObjectId
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import Body, HTTPException, status
from .analysis_router import get_all_analysis_tests
from .dashboard_router import get_all_dashboard_tests
from .utils import PyObjectId
from .models import EventModel, UserModel, GameNumModel

fe_router = fastapi.APIRouter(prefix="/api", tags=['frontend'])


class StatModel(BaseModel):
    p: int = Field(..., ge=1, le=9)
    t: int = Field(..., ge=1, le=9)
    e: int = Field(..., ge=1, le=9)

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
    fen: str = Field(...)
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
                "move": "d5",
                "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                "stat": {"p": 4, "t": 5, "e": 1, },
                "last_move": ['a6', 'b6'],
                "maia_moves": [['e1']],
                "stockfish_moves": [['e1']],
            }
        }


class GameModel(BaseModel):
    game_id: str = Field(...)
    white_player: str = Field(...)
    black_player: str = Field(...)
    date: str = Field(...)
    board_states: List[str] = Field(...)
    average_stat: StatModel = Field(...)
    chosen_state: StateModel = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "game_id": '1004a',
                "white_player": "name1",
                "black_player": "name2",
                "date": "01/10/2021 13:15:03",
                "board_states": ['a6', 'b6'],
                "average_stat": {"p": 4, "t": 5, "e": 1, },
                "chosen_state": {
                                    "round": 1,
                                    "move": "d5",
                                    "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                                    "stat": {"p": 4, "t": 5, "e": 1, },
                                    "last_move": ['a6', 'b6'],
                                    "maia_moves": [['e1']],
                                    "stockfish_moves": [['e1']],
                                },
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
                "filter": 'mistakes',
                "games": [{
                            "game_id": '1004a',
                            "white_player": "name1",
                            "black_player": "name2",
                            "date": "01/10/2021 13:15:03",
                            "board_states": ['a6', 'b6'],
                            "average_stat": {"p": 4, "t": 5, "e": 1, },
                            "chosen_state": {
                                                "round": 1,
                                                "move": "d5",
                                                "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                                                "stat": {"p": 4, "t": 5, "e": 1, },
                                                "last_move": ['a6', 'b6'],
                                                "maia_moves": [['e1']],
                                                "stockfish_moves": [['e1']],
                                            },
                         }],
            }
        }


@fe_router.get("/tests", response_description="List all analysis & dashboard tests")
async def get_all_tests():
    async with httpx.AsyncClient() as client:
        analysis_tests = [get_all_analysis_tests()]
        dashboard_tests = [get_all_dashboard_tests()]
        analysis_result = await asyncio.gather(*analysis_tests)
        dashboard_result = await asyncio.gather(*dashboard_tests)
        return analysis_result[0] + dashboard_result[0]


@fe_router.get("/games/{game_id}", response_description="Get game state", response_model=GameModel)
async def get_game(game_id: str):
    pass


@fe_router.get("/filter/{games_filter}", response_description="Filter game", response_model=GameFilterModel)
async def filter_games(games_filter: str):
    pass


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
