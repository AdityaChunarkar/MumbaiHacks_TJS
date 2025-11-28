from typing import Dict, Any

def compute_emi_tool(context: Dict[str, Any], args: Dict[str, Any]) -> Dict[str, Any]:
    P = args.get('principal') or context.get('principal') or 0
    r = (args.get('interest_rate') or context.get('interest_rate') or 0) / 100.0 / 12.0
    n = args.get('tenure_months') or context.get('tenure_months') or 0
    if P <=0 or n <=0:
        return {"error":"invalid_inputs"}
    if r == 0:
        emi = P / n
    else:
        emi = P * r * (1 + r) ** n / ((1 + r) ** n - 1)
    total_pay = emi * n
    total_interest = total_pay - P
    return {"emi": round(emi,2), "total_payment": round(total_pay,2), "total_interest": round(total_interest,2)}
