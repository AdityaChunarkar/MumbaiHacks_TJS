from typing import Dict, Any

def portfolio_health_tool(context: Dict[str, Any], args: Dict[str, Any]) -> Dict[str, Any]:
    investments = context.get('investments', [])
    total = sum([i.get('current_value',0) for i in investments])
    if total == 0:
        return {"status":"empty","diversification":None}
    types = {}
    for i in investments:
        t = i.get('type','other')
        types[t] = types.get(t,0) + i.get('current_value',0)
    diversification = {k: round(v/total*100,1) for k,v in types.items()}
    return {"total":total, "diversification":diversification}
