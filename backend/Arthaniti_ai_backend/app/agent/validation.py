# app/agent/validation.py
from typing import Dict, Any
from app.tools import budget_tools, loan_tools, spending_tools

TOOLS = {
    'suggest_budget': budget_tools.suggest_budget_tool,
    'predict_savings': budget_tools.predict_savings_tool,
    'compute_emi': loan_tools.compute_emi_tool,
    'tag_subscription': spending_tools.tag_subscription_tool
}

GLOBAL_BUDGET_CAP = 100000
MIN_SAVE_PERCENT = 0.01
MAX_SAVE_PERCENT = 0.5

async def validate_and_execute(action_obj: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
    name = action_obj.get('action_name')
    args = action_obj.get('args', {}) or {}
    if name not in TOOLS:
        return {"status": "rejected", "reason": "tool_not_whitelisted", "tool": name}

    # Basic safety checks for suggest_budget
    if name == 'suggest_budget':
        income = context.get('income', 0) or 0
        save_amount = args.get('save_amount', int(0.05 * income))
        if income > 0:
            pct = save_amount / income
            if pct < MIN_SAVE_PERCENT:
                return {"status": "rejected", "reason": "save_amount_too_small"}
            if pct > MAX_SAVE_PERCENT:
                action_obj['requires_confirmation'] = True
        if save_amount > GLOBAL_BUDGET_CAP:
            return {"status": "rejected", "reason": "save_amount_exceeds_global_cap"}

    tool_fn = TOOLS[name]
    try:
        result = tool_fn(context, args)
    except Exception as e:
        return {"status": "error", "reason": "tool_failed", "detail": str(e)}

    return {"status": "executed", "log": {"action_name": name, "args": args, "requires_confirmation": action_obj.get('requires_confirmation', False), "result": result}}
