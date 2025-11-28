from typing import Dict, Any
from datetime import datetime

def goal_feasibility_tool(context: Dict[str, Any], args: Dict[str, Any]) -> Dict[str, Any]:
    goals = context.get('goals', [])
    income = context.get('income',0) or 0
    results = []
    for g in goals:
        target = g.get('target',0)
        saved = g.get('saved',0)
        date_str = g.get('target_date')
        months = 12
        try:
            td = datetime.fromisoformat(date_str)
            months = max(1, (td.year - datetime.now().year)*12 + td.month - datetime.now().month)
        except Exception:
            months = 12
        needed_per_month = max(0, (target - saved) / months)
        affordable = needed_per_month <= 0.5 * income
        results.append({'title':g.get('title'),'needed_per_month':round(needed_per_month,2),'affordable':affordable})
    return {'results':results}
