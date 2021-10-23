import fastapi
import database

from typing import List
from pydantic import BaseModel, Field
from bson import ObjectId
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import Body, HTTPException, status

from api.utils import PyObjectId

analysis_router = fastapi.APIRouter(prefix="/api/analysis", tags=['analysis'])


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


@analysis_router.get("/tests", response_description="List all analysis tests", response_model=List[AnalysisTestModel])
async def get_all_analysis_tests():
    client = database.get_analysis_db()
    return await client["tests"].find().to_list(1000)


@analysis_router.post("/tests", response_description="Add new analysis test", response_model=AnalysisTestModel)
async def post_test(test: AnalysisTestModel = Body(...)):
    analysis_test = jsonable_encoder(test)
    client = database.get_analysis_db()
    new_test = await client["tests"].insert_one(analysis_test)
    created_test = await client["tests"].find_one({"_id": new_test.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_test)
