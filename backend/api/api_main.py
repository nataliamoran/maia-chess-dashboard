from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# import uvicorn
from .db_client import db_connect, db_disconnect
from .analysis_router import analysis_router
from .dashboard_router import dashboard_router
from .fe_router import fe_router

app = FastAPI(docs_url="/api/docs",
              openapi_url="/api/v1/openapi.json",
              )

origins = ["*", ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to Mongo on startup
app.add_event_handler("startup", db_connect)
app.add_event_handler("shutdown", db_disconnect)

# Have different components be handled separately
app.include_router(dashboard_router)
app.include_router(analysis_router)
app.include_router(fe_router)
