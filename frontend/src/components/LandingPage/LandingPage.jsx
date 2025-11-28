import React from "react";
import lp_bg from "../assets/lp_bg.png";
import Image1 from "../assets/Image1.svg";
import Image2 from "../assets/Image2.svg";
import Image3 from "../assets/Image3.svg";
import Image4 from "../assets/Image4.svg";
import Image5 from "../assets/Image5.svg";
import Tick from "../assets/Tick.svg";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    { img: Image1, title: "Track your spending", desc: "Connect your bank accounts, credit cards, and other financial accounts to see all of your transactions in one place." },
    { img: Image2, title: "Understand your income", desc: "Categorize your income to understand where it's coming from and how it's changing over time." },
    { img: Image3, title: "See your cash flow", desc: "Monitor your cash inflows and outflows to understand your business's liquidity and make better financial decisions." },
    { img: Image4, title: "Customize your reports", desc: "Create custom reports to track the metrics that matter most to your business." },
    { img: Image5, title: "Integrate with your favourite tools", desc: "Sync your financial data with popular tools like Ai Assistant, etc." }
  ];

  const plans = [
    { name: "Free", price: "$0", period: "/mo", features: ["Unlimited Transactions", "Real-Time Dashboards", "Custom Reports", "Automatic Categorization", "Tools Integration"], cta: "Sign Up for Free" },
    { name: "Premium", price: "$29", period: "/mo", features: ["Everything in Free, plus:", "Advanced Analytics", "Priority Support", "Team Collaboration", "Custom Integrations"], cta: "Start Premium Trial" }
  ];

  return (
    <div className="w-full overflow-x-hidden bg-secondary">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">Finance Manager</div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-gray-700 hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors">Features</a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors">Resources</a>
          </nav>
          <div className="flex gap-3">
            <Link to="/signup" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors">
              Sign Up
            </Link>
            <Link to="/login" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors">
              Login
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Register Banner */}
        <div className="bg-gray-100 rounded-lg p-4 md:p-6 my-8 flex justify-between items-center">
          <span className="text-lg font-semibold text-primary">Register Now</span>
          <Link to="/signup" className="text-2xl">✅</Link>
        </div>

        {/* Hero Section */}
        <div className="text-center py-12 md:py-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Manage your money, all in one place</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Finance Manager helps you stay on top of your finances, so you can focus on what matters most - growing your business.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <img src={feature.img} alt={feature.title} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h2>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        <img src={lp_bg} alt="Background" className="w-full h-40 object-cover rounded-lg my-8" />

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {[
            { number: "10,000+", label: "Customers", growth: "+15%" },
            { number: "10,000+", label: "Custom reports created", growth: "+15%" },
            { number: "10,000+", label: "Customers", growth: "+15%" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-gray-600 mb-2">{stat.label}</div>
              <div className="text-success font-semibold">{stat.growth}</div>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-md">
                <div className="mb-6">
                  <p className="text-2xl font-bold text-gray-900">{plan.name}</p>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>
                <button className="w-full bg-primary hover:bg-accent text-white font-semibold py-2 rounded-lg transition-colors mb-6">
                  {plan.cta}
                </button>
                <div className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex gap-2">
                      <img src={Tick} alt="Included" className="w-5 h-5" />
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Signup */}
        <div className="bg-primary text-white rounded-lg p-8 md:p-12 my-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Enter your email to get started</h2>
          <div className="flex flex-col md:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter email here"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-accent hover:bg-opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;