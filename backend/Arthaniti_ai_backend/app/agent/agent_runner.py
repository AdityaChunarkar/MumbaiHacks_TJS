# app/agent/agent_runner.py

import json
from app.llm.adapter import llm
from app.agent.prompt_builder import build_controlled_prompt

# Load demo data from your real file: app/demo/demo_data.py
try:
    from app.demo.demo_data import DEMO_CONTEXT
except Exception:
    DEMO_CONTEXT = {}


def safe_json(maybe):
    """
    Safely parse LLM output into dict.
    Handles:
    - properly returned dicts
    - string JSON
    - Gemini { 'text': '...json...' }
    - fallback to raw text
    """
    if isinstance(maybe, dict):
        return maybe

    # If Gemini returned {"text": "..."} wrapper
    if isinstance(maybe, dict) and "text" in maybe:
        txt = maybe["text"]
        try:
            start = txt.find("{")
            if start != -1:
                return json.loads(txt[start:])
        except Exception:
            return {"raw": txt}

    # If raw string
    if isinstance(maybe, str):
        try:
            return json.loads(maybe)
        except Exception:
            return {"raw": maybe}

    # Last fallback
    try:
        return json.loads(str(maybe))
    except Exception:
        return {"raw": str(maybe)}


def rule_based_fallback(context):
    """
    Deterministic fallback when LLM returns invalid or noop.
    Ensures agent always gives meaningful response.
    """

    income = context.get("income", 0)
    expenses = context.get("expenses", [])
    total = sum((x.get("amount", 0) for x in expenses), 0)

    # Overspending: >70% of income
    if income > 0 and total > income * 0.7:
        return {
            "action_name": "suggest_budget",
            "args": {"reduce_by": int(total - income * 0.6)},
            "explanation": "High expenditure detected. Suggest reducing discretionary spending.",
            "requires_confirmation": False,
            "plan_fragment": {
                "title": "Reduce Spending Plan",
                "detail": "Cut food delivery by 30% and track expenses weekly.",
                "duration_months": 2,
            },
            "metrics": {
                "predicted_next_month": int(total * 0.8)
            }
        }

    # Food delivery frequent
    descs = [x.get("description", "").lower() for x in expenses]
    if any(k in d for d in descs for k in ["zomato", "swiggy", "uber eats"]):
        return {
            "action_name": "tag_subscription",
            "args": {"tag": "food-delivery"},
            "explanation": "Frequent food delivery detected — tagging items.",
            "requires_confirmation": False,
            "plan_fragment": None,
            "metrics": {}
        }

    # Default fallback
    return {
        "action_name": "noop",
        "args": {},
        "explanation": "Finances look stable — no major actions required.",
        "requires_confirmation": False,
        "plan_fragment": None,
        "metrics": {}
    }


async def run_agent_loop(context: dict, mode: str = "online", max_steps: int = 3):
    """
    Main multi-step Agent loop.
    Returns steps suitable for your frontend.
    """

    # Use demo context if nothing provided
    if not context:
        context = dict(DEMO_CONTEXT)

    steps = []

    for i in range(max_steps):

        # FIX: MUST pass tools list
        prompt = build_controlled_prompt(
            context,
            tools=["suggest_budget", "predict_savings", "tag_subscription", "compute_emi"]
        )

        # Call the LLM
        resp = await llm.generate_structured(prompt, mode)

        # Parse safely
        parsed = safe_json(resp)

        # If LLM error or raw output → fallback
        if parsed.get("error") or parsed.get("raw"):
            parsed = rule_based_fallback(context)

        action = parsed.get("action_name", "noop")
        explanation = parsed.get("explanation", "")

        # If action empty or useless → fallback
        if not action or (action == "noop" and explanation.strip() == ""):
            parsed = rule_based_fallback(context)
            action = parsed["action_name"]

        # Build frontend-friendly step object
        step = {
            "step": i,
            "action_name": action,
            "args": parsed.get("args", {}),
            "explanation": parsed.get("explanation", "AI did not provide explanation."),
            "requires_confirmation": parsed.get("requires_confirmation", False),
            "plan_fragment": parsed.get("plan_fragment"),
            "metrics": parsed.get("metrics"),
            "raw": parsed
        }

        steps.append(step)

        # "Memory": if tool was applied, modify context
        if action == "tag_subscription":
            context.setdefault("tags", []).append({
                "tag": step["args"].get("tag", "unknown"),
                "by_agent": True
            })

        # Stop if noop
        if action == "noop":
            break

    return steps
