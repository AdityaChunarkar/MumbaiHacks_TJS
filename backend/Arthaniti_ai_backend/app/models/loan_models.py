from pydantic import BaseModel
from typing import Optional

class LoanItem(BaseModel):
    id: Optional[int]
    type: str
    principal: float
    paid: float = 0.0
    interest_rate: float
    start_date: Optional[str]
    tenure_months: Optional[int]
