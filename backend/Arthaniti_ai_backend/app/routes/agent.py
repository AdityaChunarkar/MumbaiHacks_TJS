# app/routes/agent.py
from fastapi import APIRouter
from pydantic import BaseModel
from app.agent.agent_runner import run_agent_loop
from app.demo.demo_data import demo_financial_context

router = APIRouter()

class AgentRequest(BaseModel):
    context: dict | None = None
    mode: str = "online"
    max_steps: int = 3

@router.post("/run")
async def run_agent(req: AgentRequest):
    context = req.context or demo_financial_context
    steps = await run_agent_loop(context, req.mode, req.max_steps)
    return {"steps": steps}
