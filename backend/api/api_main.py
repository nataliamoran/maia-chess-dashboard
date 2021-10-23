from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# import uvicorn
# import database
# from api.analysis_api import analysis_router
# from api.dashboard_api import dashboard_router
# from api.fe_api import fe_router

app = FastAPI(docs_url="/api/docs",
              openapi_url="/api/v1/openapi.json",
              )

origins = ["*", ]

# Allow NGINX to proxy
# app.add_middleware(
#     uvicorn.middleware.proxy_headers.ProxyHeadersMiddleware,
#     trusted_hosts="*",
# )

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to Mongo on startup
# app.add_event_handler("startup", database.db_connect)
# app.add_event_handler("shutdown", database.db_disconnect)

# Have different components be handled separately
# app.include_router(dashboard_router)
# app.include_router(analysis_router)
# app.include_router(fe_router)
