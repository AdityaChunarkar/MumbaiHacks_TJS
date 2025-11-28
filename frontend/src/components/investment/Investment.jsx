import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Plus,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AppLayout from '../Sidebar/AppLayout';

const Investment = () => {
  const [investmentType, setInvestmentType] = useState(null);
  const [investmentData, setInvestmentData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    amount: '',
    purchaseDate: '',
    description: '',
    expectedReturns: '',
    currentValue: '',
  });

  const investmentTypes = [
    { id: 'stocks', label: 'Stocks/ETFs' },
    { id: 'mutualFunds', label: 'Mutual Funds' },
    { id: 'bonds', label: 'Bonds/CDs' },
    { id: 'realEstate', label: 'Real Estate' },
    { id: 'crypto', label: 'Cryptocurrency' },
    { id: 'others', label: 'Others' },
  ];

  const staticInvestmentData = [
    {
      id: 1,
      name: 'Tesla Stocks',
      purchaseDate: '2023-03-15',
      amount: 5000,
      currentValue: 6500,
      description: 'Investment in Tesla stocks for long-term growth.',
    },
    {
      id: 2,
      name: 'Bitcoin',
      purchaseDate: '2022-12-01',
      amount: 3000,
      currentValue: 5000,
      description: 'Bitcoin investment during the dip.',
    },
    {
      id: 3,
      name: 'Amazon ETFs',
      purchaseDate: '2023-06-10',
      amount: 4000,
      currentValue: 4400,
      description: "ETFs tracking Amazon's performance.",
    },
  ];

  const fetchInvestmentData = async (type) => {
    try {
      const response = await fetch(`/api/investments?type=${type}`);
      const data = await response.json();
      setInvestmentData(data);
    } catch (error) {
      console.error('Error fetching investment data:', error);
      setInvestmentData(staticInvestmentData);
    }
  };

  const handleInvestmentTypeClick = (type) => {
    setInvestmentType(type);
    fetchInvestmentData(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/investments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: investmentType,
        }),
      });

      if (response.ok) {
        fetchInvestmentData(investmentType);
        setShowModal(false);
        setFormData({
          type: '',
          name: '',
          amount: '',
          purchaseDate: '',
          description: '',
          expectedReturns: '',
          currentValue: '',
        });
      }
    } catch (error) {
      console.error('Error saving investment:', error);
    }
  };

  const [recentInvestments, setRecentInvestments] = useState([]);

  async function fetchRecentInvestments() {
    try {
      const response = await fetch('/api/recent-investments');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recent investments:', error);
      return [];
    }
  }

  useEffect(() => {
    const thingsOther = async () => {
      const investments = await fetchRecentInvestments();
      setRecentInvestments(investments);
    };
    thingsOther();
  }, []);

  return (
    <AppLayout>
      <div className="min-h-screen bg-secondary">

      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 overflow-y-auto p-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Investment Portfolio</h1>
            <p className="text-gray-600">Know what you own, and know why you own it.</p>
          </div>

          {/* Investment Type Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            {investmentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleInvestmentTypeClick(type.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  investmentType === type.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-800 border border-gray-300 hover:border-primary'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Investment Content */}
          {investmentType && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {investmentTypes.find((t) => t.id === investmentType)?.label}
                </h2>

                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                  <Plus size={20} />
                  Add Investment
                </button>
              </div>

              {investmentData.length > 0 ? (
                <>
                  {/* Chart */}
                  <div className="mb-8 bg-gray-50 rounded-lg p-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={investmentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="purchaseDate" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="amount" stroke="#213555" name="Investment Amount" />
                        <Line type="monotone" dataKey="currentValue" stroke="#10b981" name="Current Value" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Name</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Purchase Date</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Amount</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Current Value</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Returns</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {investmentData.map((item) => (
                          <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-800">{item.name}</td>
                            <td className="px-4 py-3 text-gray-800">
                              {new Date(item.purchaseDate).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-gray-800">₹{item.amount.toLocaleString()}</td>
                            <td className="px-4 py-3 text-gray-800">₹{item.currentValue.toLocaleString()}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  ((item.currentValue - item.amount) / item.amount) * 100 >= 0
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {(((item.currentValue - item.amount) / item.amount) * 100).toFixed(2)}%
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-600">{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-600 py-8">No data available for this investment type.</p>
              )}
            </div>
          )}

          {/* Recent Investments */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Transactions</h3>
            {recentInvestments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentInvestments.map((investment, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="font-semibold text-gray-800">{investment.name}</p>
                    <p className="text-primary font-bold">₹{investment.amount}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 py-8">No recent investments found.</p>
            )}
          </div>

        </div>
      </div>

      {/* ================= MODAL FIXED ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Add {investmentTypes.find((t) => t.id === investmentType)?.label}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount Invested</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Returns (%)</label>
                <input
                  type="number"
                  name="expectedReturns"
                  value={formData.expectedReturns}
                  onChange={handleInputChange}
                  required
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Value</label>
                <input
                  type="number"
                  name="currentValue"
                  value={formData.currentValue}
                  onChange={handleInputChange}
                  required
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition font-medium"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
      </div>
    </AppLayout>
  );
};

export default Investment;
