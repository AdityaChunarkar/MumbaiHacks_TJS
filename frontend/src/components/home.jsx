import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from './Sidebar/AppLayout';

const Home = () => {
    const links = [
        { path: "/login", label: "Login" },
        { path: "/signup", label: "Sign Up" },
        { path: "/dashboard", label: "Dashboard" },
        { path: "/details", label: "Details" },
        { path: "/detailstwo", label: "Details Two" },
        { path: "/detailspf", label: "Details Three" },
        { path: "/investment", label: "Investment" },
        { path: "/income", label: "Income" },
        { path: "/report", label: "Report" },
        { path: "/landingpage", label: "Landing Page" },
        { path: "/savings", label: "Savings" },
        { path: "/spendings", label: "Spendings" },
        { path: "/loan_page", label: "Expenses" },
        { path: "/chatbot", label: "Chatbot" },
        { path: "/taxpage", label: "Tax Page" },
        { path: "/budgetplanningtools", label: "Budget" },
        {path: "/aishowcase", label: "AI Showcase"},
    ];

    return (
        <AppLayout>
            <div className="min-h-screen bg-secondary p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-primary mb-8 text-center">Arthaniti</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="block bg-white hover:bg-primary hover:text-white text-primary font-semibold py-3 px-4 rounded-lg shadow-md transition-all transform hover:scale-105 text-center"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Home;