from typing import Annotated, Generator
from fastapi import Depends
from pydantic.v1.main import ANNOTATED_FIELD_UNTOUCHED_TYPES
from sqlmodel import Session
from app.config.db import engine

def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_db)]