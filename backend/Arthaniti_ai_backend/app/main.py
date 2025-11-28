# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import agent, coach, tools_exec, graph, health

app = FastAPI(title="Arthaniti Agentic AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/health")
app.include_router(agent.router, prefix="/ai/agent")
app.include_router(coach.router, prefix="/ai/coach")
app.include_router(tools_exec.router, prefix="/ai/tools")
app.include_router(graph.router, prefix="/ai/graph")

@app.get("/")
def root():
    return {"status": "ok"}
