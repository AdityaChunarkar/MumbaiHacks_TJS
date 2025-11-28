# app/demo/demo_data.py

demo_financial_context = {
    "user": {
        "name": "Ameya  Surve",
        "age": 24,
        "jobRole": "Software Developer",
        "income": {"monthlyIncome": 82000, "otherSources": 5000, "total": 87000},
        "goals": [
            {"name": "Buy Laptop", "targetAmount": 90000, "deadline": "2025-09-01"},
            {"name": "Goa Trip", "targetAmount": 25000, "deadline": "2025-03-01"},
        ],
    },
    "spendings": {
        "categories": [
            {"name": "Food", "monthly": 14000},
            {"name": "Rent", "monthly": 18000},
            {"name": "Travel", "monthly": 6000},
            {"name": "Shopping", "monthly": 4000},
            {"name": "Entertainment", "monthly": 2500},
            {"name": "Utilities", "monthly": 3500},
        ],
        "totalMonthly": 48000,
    },
    "savings": {"current": 12000, "emergencyFund": 8000, "idealEmergencyFund": 30000},
    "investments": [
        {"name": "Nippon India Growth Fund", "amount": 20000, "returnsPercent": 14},
        {"name": "SBI Nifty ETF", "amount": 15000, "returnsPercent": 11},
        {"name": "Bitcoin", "amount": 5000, "returnsPercent": -4},
    ],
    "loans": [
        {
            "type": "Personal Loan",
            "principal": 50000,
            "interestRate": 14,
            "paid": 12000,
            "remainingTenureMonths": 18,
        }
    ],
    "tax": {"regime": "new", "annualIncome": 1040000, "deductions": 150000},
}
