import fastapi

from typing import List
from pydantic import BaseModel, Field
from bson import ObjectId
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import Body, HTTPException, status
from .utils import PyObjectId
from .db_client import get_dashboard_db
from .models import EventModel, UserModel

dashboard_router = fastapi.APIRouter(prefix="/api/dashboard", tags=['dashboard'])


class DashboardTestModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    dashboard_name: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "dashboard_name": "dashboard test",
            }
        }


@dashboard_router.get("/tests", response_description="List all dashboard tests", response_model=List[DashboardTestModel])
async def get_all_dashboard_tests():
    client = get_dashboard_db()
    res = await client["tests"].find().to_list(1000)
    return res


@dashboard_router.post("/tests", response_description="Add new dashboard test", response_model=DashboardTestModel)
async def post_test(test: DashboardTestModel = Body(...)):
    dashboard_test = jsonable_encoder(test)
    client = get_dashboard_db()
    new_test = await client["tests"].insert_one(dashboard_test)
    created_test = await client["tests"].find_one({"_id": new_test.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_test)


@dashboard_router.post("/events", response_description="Log frontend event")
async def log_fe_event(event: EventModel = Body(...)):
    pass


@dashboard_router.get("/lichess_users/{username}", response_description="Get user profile from Lichess", response_model=UserModel)
async def get_user_profile_from_lichess(username: str):
    pass


@dashboard_router.get("/users/{username}", response_description="Check if username is in Maia DB")
async def find_username_in_maia_db(username: str):
    pass


@dashboard_router.post("/users/{username}", response_description="Add username to Maia DB")
async def add_username_to_maia_db(username: str):
    pass


@dashboard_router.post("/login/{username}", response_description="Login with Lichess")
async def login(username: str):
    pass


@dashboard_router.post("/logout/{username}", response_description="Logout")
async def logout(username: str):
    pass