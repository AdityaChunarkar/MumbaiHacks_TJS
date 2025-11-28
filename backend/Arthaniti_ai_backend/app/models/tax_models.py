from pydantic import BaseModel

class TaxPayload(BaseModel):
    user_id: int
    gross_income: float
    deductions: float
    tax_regime: str
    tax_year: str
