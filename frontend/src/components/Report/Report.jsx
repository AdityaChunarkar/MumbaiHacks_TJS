import React from 'react';
import {
  Home,
  BookOpen,
  DollarSign,
  PiggyBank,
  TrendingUp,
  FileText,
  Wallet,
  LogOut,
  Search,
} from "lucide-react";
import { Link } from 'react-router-dom';
import AppLayout from '../Sidebar/AppLayout';

const Report = () => {
  const reports = [
    { id: 'A', title: 'Income Summary', description: 'Monthly income report' },
    { id: 'B', title: 'Expense Breakdown', description: 'Category-wise expenses' },
    { id: 'C', title: 'Savings Goal', description: 'Savings progress' },
    { id: 'D', title: 'Investment Returns', description: 'Portfolio performance' },
    { id: 'E', title: 'Tax Summary', description: 'Tax information' },
  ];

  return (
    <AppLayout>
      {/* Main Content */}
      <div className="flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-md p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              {[
                { icon: <Home size={28} />, label: 'Dashboard' },
                { icon: <BookOpen size={28} />, label: 'Accounts' },
                { icon: <DollarSign size={28} />, label: 'Spending' },
                { icon: <PiggyBank size={28} />, label: 'Savings' },
                { icon: <TrendingUp size={28} />, label: 'Trends' },
                { icon: <FileText size={28} />, label: 'Reports' },
                { icon: <Wallet size={28} />, label: 'Wallet' },
              ].map((item, index) => (
                <button
                  key={index}
                  className="p-2 text-gray-700 hover:text-primary transition"
                  title={item.label}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 px-6 flex gap-6">
          {['Savings', 'Spendings', 'Loans', 'Investment', 'Income'].map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-3 font-medium border-b-2 transition ${
                index === 0
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{report.id}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition font-medium">
                  View Report
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Report;