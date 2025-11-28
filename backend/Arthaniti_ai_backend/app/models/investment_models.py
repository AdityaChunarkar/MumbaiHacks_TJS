from pydantic import BaseModel
from typing import List

class InvestmentItem(BaseModel):
    name: str
    purchase_date: str
    amount: float
    current_value: float
    type: str

class PortfolioPayload(BaseModel):
    user_id: int
    investments: List[InvestmentItem]
