from pydantic import BaseModel, Field
from bson import ObjectId
from .utils import PyObjectId
from datetime import datetime, timezone
from typing import Optional


class GameNumModel(BaseModel):
    games_analyzed_num: int = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "games_analyzed_num": 100,
            }
        }


class EventModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    event_title: str = Field(...)
    event_status: dict = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "event_title": "filter interesting games",
                "event_status": {},
            }
        }


class UserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    lichess_id: str = Field(...)
    lichess_info: dict = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "username": "name1",
                "lichess_info": {}
            }
        }


class UserFeedbackModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    username: str = Field(...)
    feedback: str = Field(...)
    created_at: Optional[datetime] = datetime.now(timezone.utc)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "username": "name1",
                "feedback": "Loved this!"
            }
        }


class UserFeedbackRatingModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    username: str = Field(...)
    thumb_up: int = Field(...)
    thumb_down: int = Field(...)
    created_at: Optional[datetime] = datetime.now(timezone.utc)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "username": "name1",
                "thumb_up": 1,
                "thumb_down": 0
            }
        }