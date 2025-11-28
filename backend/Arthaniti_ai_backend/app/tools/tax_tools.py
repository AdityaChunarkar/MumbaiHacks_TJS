from typing import Dict, Any

def tax_optimizer_tool(context: Dict[str, Any], args: Dict[str, Any]) -> Dict[str, Any]:
    gross = context.get('gross_income', 0)
    deductions = context.get('deductions', 0)
    est_new = 0.04 * max(0, gross - deductions)
    est_old = 0.045 * max(0, gross - deductions)
    better = 'new' if est_new < est_old else 'old'
    return {"est_new": est_new, "est_old": est_old, "recommendation": better}
