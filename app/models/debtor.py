from sqlmodel import SQLModel, Field

class Debtor(SQLModel):
    id: int
    athlete_name: str = Field(max_length=200)
    tutor_name: str = Field(max_length=200)
    phone: str = Field(max_length=15)
    debt_amount: float