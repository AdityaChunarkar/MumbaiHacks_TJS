import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from '../Sidebar/AppLayout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { 
  Home, 
  PieChart, 
  FileText, 
  Bell, 
  LogOut, 
  Edit, 
  Save, 
  X,
  BookOpen,
  DollarSign,
  PiggyBank,
  TrendingUp,
  Wallet
} from "lucide-react";

// Assuming you have a dashboard logo import
// import Dashboardlogo from "./path-to-your-logo.png";

const TaxPage = () => {
  const [selectedYear, setSelectedYear] = useState("2025-26");
  const [activeTab, setActiveTab] = useState("calculator");
  const [income, setIncome] = useState(1000000);
  const [deductions, setDeductions] = useState(150000);
  const [editing, setEditing] = useState(false);
  const [taxRegime, setTaxRegime] = useState("new");

  const taxHistory = [
    { year: "2024-25", amount: "₹85,000" },
    { year: "2023-24", amount: "₹78,500" },
  ];

  // New tax regime brackets for 2025-26
  const newRegimeTaxData = [
    { bracket: "0%", range: "₹0 - ₹3,00,000", rate: 0 },
    { bracket: "5%", range: "₹3,00,001 - ₹6,00,000", rate: 5 },
    { bracket: "10%", range: "₹6,00,001 - ₹9,00,000", rate: 10 },
    { bracket: "15%", range: "₹9,00,001 - ₹12,00,000", rate: 15 },
    { bracket: "20%", range: "₹12,00,001 - ₹15,00,000", rate: 20 },
    { bracket: "30%", range: "Above ₹15,00,000", rate: 30 },
  ];

  // Old tax regime brackets for 2025-26
  const oldRegimeTaxData = [
    { bracket: "0%", range: "₹0 - ₹2,50,000", rate: 0 },
    { bracket: "5%", range: "₹2,50,001 - ₹5,00,000", rate: 5 },
    { bracket: "20%", range: "₹5,00,001 - ₹10,00,000", rate: 20 },
    { bracket: "30%", range: "Above ₹10,00,000", rate: 30 },
  ];

  const calculateTax = () => {
    const taxableIncome = income - deductions;
    let tax = 0;
    
    if (taxRegime === "new") {
      // Calculate tax based on new regime
      if (taxableIncome <= 300000) {
        tax = 0;
      } else if (taxableIncome <= 600000) {
        tax = (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 900000) {
        tax = 15000 + (taxableIncome - 600000) * 0.1;
      } else if (taxableIncome <= 1200000) {
        tax = 45000 + (taxableIncome - 900000) * 0.15;
      } else if (taxableIncome <= 1500000) {
        tax = 90000 + (taxableIncome - 1200000) * 0.2;
      } else {
        tax = 150000 + (taxableIncome - 1500000) * 0.3;
      }
    } else {
      // Calculate tax based on old regime with deductions
      if (taxableIncome <= 250000) {
        tax = 0;
      } else if (taxableIncome <= 500000) {
        tax = (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        tax = 12500 + (taxableIncome - 500000) * 0.2;
      } else {
        tax = 112500 + (taxableIncome - 1000000) * 0.3;
      }
    }
    
    // Add cess (4% on tax amount)
    tax = tax * 1.04;
    
    return Math.round(tax);
  };

  const formatIndianCurrency = (amount) => {
    return amount.toLocaleString('en-IN');
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-secondary">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
        <div className="bg-white shadow-md p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Indian Tax Summary</h2>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2025-26">2025-26 (Budget)</option>
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
          </select>
        </div>

        <div className="p-6 space-y-6">
          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200">
            <button
              className={`px-4 py-3 font-medium border-b-2 transition ${
                activeTab === "calculator"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("calculator")}
            >
              <div className="flex items-center gap-2">
                <FileText size={18} /> Calculator
              </div>
            </button>
            <button
              className={`px-4 py-3 font-medium border-b-2 transition ${
                activeTab === "history"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("history")}
            >
              <div className="flex items-center gap-2">
                <PieChart size={18} /> History
              </div>
            </button>
          </div>

          {/* Calculator Tab */}
          {activeTab === "calculator" && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-700">Gross Income</h4>
                    {!editing ? (
                      <button 
                        onClick={() => setEditing(true)}
                        className="p-2 text-primary hover:bg-primary hover:bg-opacity-10 rounded-lg transition"
                      >
                        <Edit size={16} />
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditing(false)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={() => setEditing(false)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  {!editing ? (
                    <p className="text-2xl font-bold text-primary">₹{formatIndianCurrency(income)}</p>
                  ) : (
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                    />
                  )}
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Deductions (80C, etc.)</h4>
                  <p className="text-2xl font-bold text-orange-600">₹{formatIndianCurrency(deductions)}</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Estimated Tax</h4>
                  <p className="text-2xl font-bold text-red-600">₹{formatIndianCurrency(calculateTax())}</p>
                </div>
              </div>

              {/* Tax Regime Selection */}
              <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                <label className="block text-lg font-semibold text-gray-700">Tax Regime:</label>
                <div className="flex gap-4">
                  <button
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                      taxRegime === "new"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setTaxRegime("new")}
                  >
                    New Regime (No Exemptions)
                  </button>
                  <button
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                      taxRegime === "old"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setTaxRegime("old")}
                  >
                    Old Regime (With Exemptions)
                  </button>
                </div>
              </div>

              {/* Taxable Income */}
              <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                <label className="block text-lg font-semibold text-gray-700">Taxable Income:</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-semibold"
                  value={`₹${formatIndianCurrency(income - deductions)}`}
                  readOnly
                />
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Tax Payment History</h4>
              <div className="space-y-3">
                {taxHistory.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <span className="font-medium text-gray-700">{item.year}</span>
                    <span className="text-lg font-bold text-primary">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tax Brackets Section */}
          <h3 className="text-2xl font-bold text-gray-800">Tax Brackets ({taxRegime === "new" ? "New Regime" : "Old Regime"})</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Table */}
            <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Bracket</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Income Range</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {(taxRegime === "new" ? newRegimeTaxData : oldRegimeTaxData).map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">{item.bracket}</td>
                      <td className="px-4 py-3 text-gray-700">{item.range}</td>
                      <td className="px-4 py-3 font-semibold text-primary">{item.rate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taxRegime === "new" ? newRegimeTaxData : oldRegimeTaxData}>
                  <XAxis dataKey="bracket" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rate" fill="#213555" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TaxPage;