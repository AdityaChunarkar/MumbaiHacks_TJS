# app/llm/ollama_client.py
import httpx
import json
from app.config import OLLAMA_URL

async def call_ollama(prompt: str) -> dict:
    try:
        async with httpx.AsyncClient(timeout=30.0) as c:
            resp = await c.post(f"{OLLAMA_URL}/generate", json={"model": "llama2", "prompt": prompt})
            j = resp.json()
            text = j.get("text", "")
            start = text.find("{")
            if start != -1:
                try:
                    return json.loads(text[start:])
                except Exception:
                    pass
            return {"text": text}
    except Exception as e:
        return {"error": str(e)}
