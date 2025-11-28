from typing import Dict, Any

def predict_savings_tool(context: Dict[str, Any], args: Dict[str, Any]) -> Dict[str, Any]:
    expenses = context.get('expenses', [])
    if not expenses:
        return {"predicted_spend": 0.0, "predicted_savings": 0.0}
    amounts = [e.get('amount', 0) for e in expenses]
    avg_spend = sum(amounts) / len(amounts)
    income = context.get('income', 0) or 0
    predicted_spend = avg_spend
    predicted_savings = max(0.0, income - predicted_spend)
    return {"predicted_spend": predicted_spend, "predicted_savings": predicted_savings}

def suggest_budget_tool(context: Dict[str, Any], args: Dict[str, Any]) -> Dict[str, Any]:
    income = context.get('income', 0) or 0
    spendings = context.get('spendings_total', 0) or 0
    surplus = max(0, income - spendings)
    save_amount = args.get('save_amount', int(0.2 * surplus if surplus>0 else 0.05*income))
    duration = args.get('duration_months', 3)
    return {"save_amount": save_amount, "duration_months": duration, "message": f"Save ₹{save_amount}/month for {duration} months."}
