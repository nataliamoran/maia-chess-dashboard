import fastapi

from typing import List
from pydantic import BaseModel, Field
from bson import ObjectId
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import Body, HTTPException, status
from .utils import PyObjectId
from .db_client import get_analysis_db
from .models import GameNumModel

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

class LichessUserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    lichess_user: str = Field(...)
    password: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
            }
        }


@analysis_router.get("/tests", response_description="List all analysis tests", response_model=List[AnalysisTestModel])
async def get_all_analysis_tests():
    client = get_analysis_db()
    return await client["tests"].find().to_list(1000)


@analysis_router.post("/tests", response_description="Add new analysis test", response_model=AnalysisTestModel)
async def post_test(test: AnalysisTestModel = Body(...)):
    analysis_test = jsonable_encoder(test)
    client = get_analysis_db()
    new_test = await client["tests"].insert_one(analysis_test)
    created_test = await client["tests"].find_one({"_id": new_test.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_test)


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


@analysis_router.post("/analyze/{username}",
                      response_description="Analyse user games",
                      response_model=List[ProcessedGameModel])
async def post_user_games_analysis():
    pass


@analysis_router.post("/games/{username}",
                      response_description="Retrieve raw games from Lichess and store them in Maia DB",
                      response_model=List[RawGameModel])
async def post_user_raw_games():
    pass
