from . import budget_tools, spending_tools, loan_tools, tax_tools, investment_tools, goal_tools

TOOLS_REGISTRY = {
    **{ 'suggest_budget': budget_tools.suggest_budget_tool, 'predict_savings': budget_tools.predict_savings_tool },
    'tag_subscription': spending_tools.tag_subscription_tool,
    'compute_emi': loan_tools.compute_emi_tool,
}
