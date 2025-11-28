from pydantic import BaseModel
from typing import List

class BudgetItem(BaseModel):
    category: str
    amount: float

class BudgetPayload(BaseModel):
    user_id: int
    budget: List[BudgetItem]
    actuals: List[BudgetItem] | None = None
    month: str | None = None
