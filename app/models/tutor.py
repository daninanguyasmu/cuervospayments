from sqlmodel import SQLModel, Field
from datetime import date

class TutorBase(SQLModel):
    first_name: str = Field(max_length=100)
    last_name: str = Field(max_length=100)
    date_of_birth: date
    phone_number: str = Field(max_length=15)
    email: str = Field(max_length=100)

class Tutor(TutorBase, table=True):
    __tablename__ = "tutors"
    id: int | None = Field(default=None, primary_key=True)