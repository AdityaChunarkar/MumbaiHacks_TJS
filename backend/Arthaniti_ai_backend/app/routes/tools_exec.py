# app/routes/tools_exec.py
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ToolExecRequest(BaseModel):
    user_id: int
    tool: str
    args: dict | None = None

@router.post("/execute")
async def execute_tool(req: ToolExecRequest):
    # VERY SIMPLE: simulate success and return what was "executed"
    return {"status": "ok", "tool": req.tool, "args": req.args or {}}
