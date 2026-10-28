from fastapi import FastAPI
from sqlmodel import SQLModel
from app.config.db import engine
from app.routers.athlete_router import athletes_router
from app.routers.tutor_router import tutors_router

SQLModel.metadata.create_all(engine)

app = FastAPI()

app.include_router(tutors_router)
app.include_router(athletes_router)

@app.get('/')
async def home():
    return {"message": "Hello World!"}