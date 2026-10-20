from sqlmodel import SQLModel, Field
from datetime import date

class AthleteBase(SQLModel):
    first_name: str = Field(max_length=100)
    last_name: str = Field(max_length=100)
    date_of_birth: date
    monthly_payment: float

    tutor_id: int = Field(foreign_key='tutors.id')

class Athlete(AthleteBase, table=True):
    __tablename__ = "athletes"
    id: int | None = Field(default=None, primary_key=True)