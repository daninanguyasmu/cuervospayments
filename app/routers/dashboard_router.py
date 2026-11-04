from fastapi import APIRouter
from datetime import date
from app.models import *
from sqlmodel import *

from app.models.athlete import AthleteBase
from app.routers.deps.db_session import SessionDep

dashboard_router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@dashboard_router.get("/", response_model=Dashboard)
async def get_dashboard_summary(db: SessionDep):
    current_month = date.today().replace(day=1)

    total_athletes_count = 0
    total_collected = 0.0
    total_projected = 0.0
    debtors_list = []

    statement = select(func.count(Athlete.id))
    total_athletes_count = db.exec(statement).one()

    statement = select(func.sum(Athlete.monthly_payment))
    total_projected = db.exec(statement).one() or 0.0

    statement = select(func.sum(Payment.amount)).where(
        func.extract('month',Payment.payment_date) == current_month.month,
        func.extract('year', Payment.payment_date) == current_month.year
    )

    total_collected = db.exec(statement).one() or 0.0

    month_payments = select(Payment.athlete_id).where(
        func.extract('month',Payment.payment_date) == current_month.month,
        func.extract('year', Payment.payment_date) == current_month.year
    )
    statement = select(Athlete, Tutor).join(Tutor).where(Athlete.id.notin_(month_payments)).limit(5)

    results =  db.exec(statement).all()

    debtors_list = [Debtor(
        id=athlete.id,
        athlete_name=f"{athlete.first_name} {athlete.last_name}",
        tutor_name=f"{tutor.first_name} {tutor.last_name}",
        phone = tutor.phone_number,
        debt_amount= athlete.monthly_payment
    )
    for athlete, tutor  in results]

    return Dashboard(total_athletes=total_athletes_count,
                     collected=total_collected,
                     projected=total_projected,
                     debtors=debtors_list
                     )