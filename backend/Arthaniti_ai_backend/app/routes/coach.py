# app/routes/coach.py
from fastapi import APIRouter
from pydantic import BaseModel
from app.llm.adapter import llm

router = APIRouter()

class CoachRequest(BaseModel):
    context: dict | None = None
    question: str
    mode: str = "online"

@router.post("/")
async def coach(req: CoachRequest):
    ctx = req.context or {}
    prompt = f"You are a friendly finance coach. Context: {ctx}\n\nQuestion: {req.question}\n\nAnswer in a short JSON: {{\"answer\":\"...\"}}"
    resp = await llm.generate_structured(prompt, req.mode)
    return {"response": resp}
