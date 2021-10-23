import os
import motor.motor_asyncio


class DataBase:
    client: motor.motor_asyncio.AsyncIOMotorClient = None


db = DataBase()
DASHBOARD_DB = os.getenv('DASHBOARD_DB', 'dev_dashboard')
ANALYSIS_DB = os.getenv('ANALYSIS_DB', 'dev_analysis')


def get_analysis_db():
    return db.client[ANALYSIS_DB]


def get_dashboard_db():
    return db.client[DASHBOARD_DB]


def db_connect():
    MONGODB_URL = os.environ.get("MONGODB_URL", 'mongodb://root:example@localhost:27017')
    db.client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)


def db_disconnect():
    db.client.close()


async def write_one_analysis(table, data):
    client = await get_analysis_db()
    return client[table].insert_one(data)


async def write_one_dashboard(table, data):
    client = await get_dashboard_db()
    await client[table].insert_one(data)
