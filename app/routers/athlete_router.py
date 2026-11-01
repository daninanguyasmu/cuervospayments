from fastapi import APIRouter, HTTPException
from app.models.athlete import *
from app.routers.deps.db_session import SessionDep
from sqlmodel import *

athletes_router = APIRouter(prefix="/athletes", tags=["Athlete"])

@athletes_router.get("/")
async def get_athletes(db: SessionDep) -> list[Athlete]:
    statement = select(Athlete)
    result = db.exec(statement).all()

    if not result:
        raise HTTPException(status_code=404, detail="No athletes found")

    return result

@athletes_router.post("/")
async def create_athlete(athlete: Athlete, db: SessionDep):
    db.add(athlete)
    db.commit()
    db.refresh(athlete)

    return athlete