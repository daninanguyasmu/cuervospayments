from fastapi import APIRouter
from app.models import Tutor
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

@tutors_router.get("/search")
async def search_tutor(name: str, db: SessionDep):
    statement = select(Tutor).where(or_(Tutor.first_name.icontains(name), Tutor.last_name.icontains(name))).limit(10)
    result = db.exec(statement).all()
    return result
#Buscar tutor por id
@tutors_router.get("/{id}")
def get_tutor_by_id(db: SessionDep, id: int) -> list[Tutor]:
    statement = (
        select(Tutor)
        .where(Tutor.id == id)
    )

    result = db.exec(statement).all()

    if not result:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Tutor not found")

    return result