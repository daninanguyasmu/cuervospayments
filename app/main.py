from fastapi import FastAPI
from sqlmodel import SQLModel
from app.config.db import engine
from app.routers.athlete_router import athletes_router
from app.routers.tutor_router import tutors_router
from fastapi.middleware.cors import CORSMiddleware
SQLModel.metadata.create_all(engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tutors_router)
app.include_router(athletes_router)

@app.get('/')
async def home():
    return {"message": "Hello World!"}