from pydantic import BaseModel
from typing import Optional
from datetime import date

class Transaction(BaseModel):
    id: Optional[str]
    date: date
    amount: float
    category: Optional[str]
    description: Optional[str]
