# import fastapi
# import httpx
# import asyncio
#
# from api.analysis_api import get_all_analysis_tests
# from api.dashboard_api import get_all_dashboard_tests
#
# fe_router = fastapi.APIRouter(prefix="/api", tags=['frontend'])
#
#
# @fe_router.get("/tests", response_description="List all analysis & dashboard tests")
# async def get_all_tests():
#     async with httpx.AsyncClient() as client:
#         analysis_tests = [get_all_analysis_tests()]
#         dashboard_tests = [get_all_dashboard_tests()]
#         analysis_result = await asyncio.gather(*analysis_tests)
#         dashboard_result = await asyncio.gather(*dashboard_tests)
#         return analysis_result[0] + dashboard_result[0]
#
