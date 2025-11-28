# app/routes/graph.py
from fastapi import APIRouter
from pydantic import BaseModel
from app.demo.demo_data import demo_financial_context

router = APIRouter()

@router.post("/from-agent")
async def graph_from_agent(payload: dict):
    # simple transformation: return spend_by_cat from provided context
    context = payload.get("context") or demo_financial_context
    spend = context.get("spendings", {})
    cats = spend.get("categories", [])
    labels = [c["name"] for c in cats]
    values = [c.get("monthly", 0) for c in cats]
    return {"labels": labels, "values": values}

@router.get("/spendings")
async def get_spendings():
    context = demo_financial_context
    cats = context.get("spendings", {}).get("categories", [])
    labels = [c["name"] for c in cats]
    values = [c.get("monthly", 0) for c in cats]
    return {"labels": labels, "values": values}

@router.get("/income-timeseries")
async def income_timeseries():
    # simple demo time series
    series = [
        {"date": "2025-01-01", "income": 80000},
        {"date": "2025-02-01", "income": 82000},
        {"date": "2025-03-01", "income": 78000},
        {"date": "2025-04-01", "income": 85000},
    ]
    return {"series": series}
