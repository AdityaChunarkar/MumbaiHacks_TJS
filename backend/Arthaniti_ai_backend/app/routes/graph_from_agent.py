# app/routes/graph.py  (extend)
from fastapi import APIRouter, Body
router = APIRouter()

@router.post("/from-agent")
async def graph_from_agent(data: dict = Body(...)):
    """
    Accept agent response or context and return chart-ready JSON.
    Example input: {"metrics": {...} } or {"context": {...}}.
    """
    metrics = data.get("metrics") or {}
    # If metrics contain spend_by_cat -> convert to labels/values
    spend = metrics.get("spend_by_cat", {})
    if spend:
        labels = list(spend.keys())
        values = [spend[k] for k in labels]
        return {"labels": labels, "values": values, "source": "agent_metrics"}

    # fallback: if context has category-wise txns
    ctx = data.get("context", {})
    expenses = ctx.get("expenses", [])
    agg = {}
    for e in expenses:
        cat = e.get("category") or e.get("description","uncategorized")
        amt = float(e.get("amount",0))
        agg[cat] = agg.get(cat,0) + amt
    labels = list(agg.keys())
    values = [agg[k] for k in labels]
    return {"labels": labels, "values": values, "source": "context_agg"}
