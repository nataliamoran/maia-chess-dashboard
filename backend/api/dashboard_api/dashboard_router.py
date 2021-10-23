# import fastapi
#
# from typing import List
# from pydantic import BaseModel, Field
# from bson import ObjectId
# from fastapi.responses import JSONResponse
# from fastapi.encoders import jsonable_encoder
# from fastapi import Body, HTTPException, status
# from api.utils import PyObjectId
# from database import get_dashboard_db
#
# dashboard_router = fastapi.APIRouter(prefix="/api/dashboard", tags=['dashboard'])
#
#
# class DashboardTestModel(BaseModel):
#     id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
#     dashboard_name: str = Field(...)
#
#     class Config:
#         allow_population_by_field_name = True
#         arbitrary_types_allowed = True
#         json_encoders = {ObjectId: str}
#         schema_extra = {
#             "example": {
#                 "dashboard_name": "dashboard test",
#             }
#         }
#
#
# @dashboard_router.get("/tests", response_description="List all dashboard tests", response_model=List[DashboardTestModel])
# async def get_all_dashboard_tests():
#     client = get_dashboard_db
#     res = await client["tests"].find().to_list(1000)
#     return res
#
#
# @dashboard_router.post("/tests", response_description="Add new dashboard test", response_model=DashboardTestModel)
# async def post_test(test: DashboardTestModel = Body(...)):
#     dashboard_test = jsonable_encoder(test)
#     client = get_dashboard_db
#     new_test = await client["tests"].insert_one(dashboard_test)
#     created_test = await client["tests"].find_one({"_id": new_test.inserted_id})
#     return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_test)
