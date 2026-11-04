from typing import List

from sqlmodel import SQLModel
from .debtor import Debtor

class Dashboard(SQLModel):
    total_athletes: int
    collected: float
    projected: float
    debtors: List[Debtor]