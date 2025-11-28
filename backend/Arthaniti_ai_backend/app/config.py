from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
AI_MODE = os.getenv("AI_MODE", "online")
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
MAX_AGENT_STEPS = int(os.getenv("MAX_AGENT_STEPS", "3"))
