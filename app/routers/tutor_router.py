from fastapi import APIRouter
from app.models.tutor import *
from app.routers.deps.db_session import SessionDep
from sqlmodel import *

tutors_router = APIRouter(prefix="/tutors", tags=["Tutor"])

@tutors_router.get("/")
def get_tutors(db: SessionDep) -> list[Tutor]:
    statement = select(Tutor)
    result = db.exec(statement).all()
    return result

@tutors_router.post("/")
def add_tutor(db: SessionDep, tutor: TutorBase) -> Tutor:
    db_tutor = Tutor.model_validate(tutor)
    db.add(db_tutor)
    db.commit()
    db.refresh(db_tutor)
    return db_tutor