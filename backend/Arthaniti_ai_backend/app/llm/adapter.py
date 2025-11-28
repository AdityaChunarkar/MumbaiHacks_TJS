from app.llm.gemini_client import call_gemini
from app.llm.ollama_client import call_ollama
from app.config import AI_MODE

class LLMAdapter:
    async def generate_structured(self, prompt: str, mode: str | None = None):
        use_mode = mode or AI_MODE
        if use_mode == "online":
            return await call_gemini(prompt)
        return await call_ollama(prompt)

# ✔ Export a global instance so other modules can import `llm`
llm = LLMAdapter()
