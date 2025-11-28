from pydantic import BaseModel
from typing import Any, Dict, List, Optional

class AgentRequest(BaseModel):
    user_id: int
    context: Dict[str, Any]
    mode: Optional[str] = None  # 'online' or 'offline'
    max_steps: Optional[int] = 3

class AgentAction(BaseModel):
    action_name: str
    args: Dict[str, Any] = {}
    requires_confirmation: bool = False
    explanation: Optional[str] = None
    score: Optional[float] = None

class AgentResponse(BaseModel):
    status: str
    logs: List[Dict[str, Any]]
