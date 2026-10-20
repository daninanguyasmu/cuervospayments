from sqlmodel import SQLModel, Field
from datetime import date

class PaymentBase(SQLModel):
    payment_date: date
    month_paid: date
    amount: float
    payment_method: str = Field(max_length=50)

    athlete_id: int = Field(foreign_key="athletes.id")
    #Hola

class Payment(PaymentBase, table=True):
    __tablename__ = "payments"
    id: int | None = Field(default=None, primary_key=True)