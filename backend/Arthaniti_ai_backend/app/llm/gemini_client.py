import google.generativeai as genai
import json
from app.config import GEMINI_API_KEY

# configure sdk
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# THE CORRECT MODEL NAME FOR YOU
MODEL_NAME = "gemini-2.5-flash"


def _extract_json(text: str):
    """Try to extract JSON from LLM response."""
    try:
        start = text.index("{")
        return json.loads(text[start:])
    except:
        return {"text": text}


async def call_gemini(prompt: str, function_spec: dict | None = None):
    """
    Unified Gemini call that works with newest SDK
    """
    try:
        model = genai.GenerativeModel(MODEL_NAME)

        # handle tool calling if needed (not required now)
        if function_spec:
            response = model.generate_content(
                prompt,
                tools=[function_spec],   # only if you design tools
            )
        else:
            response = model.generate_content(prompt)

        # Gemini returns .text attribute
        text = response.text if hasattr(response, "text") else str(response)
        return _extract_json(text)

    except Exception as e:
        return {"error": str(e)}
