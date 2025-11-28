import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import {
  Home,
  BookOpen,
  DollarSign,
  PiggyBank,
  TrendingUp,
  FileText,
  Wallet,
  LogOut,
} from "lucide-react";
import { Link } from 'react-router-dom';
import AppLayout from '../Sidebar/AppLayout';

const Loan_page = () => {
  const [loans, setLoans] = useState([]);
  const [completedLoans, setCompletedLoans] = useState([]);
  const [categories, setCategories] = useState(["Personal", "Home", "Car", "Education"]);
  const [formData, setFormData] = useState({
    loanType: "Personal",
    loanAmount: "",
    interest: "",
    amountPaid: "",
  });
  const [editLoanIndex, setEditLoanIndex] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  const handleAddLoan = (e) => {
    e.preventDefault();
    if (formData.loanAmount && formData.interest) {
      const totalPayable = Number(formData.loanAmount) + (Number(formData.loanAmount) * Number(formData.interest)) / 100;
      const newLoan = {
        ...formData,
        loanAmount: Number(formData.loanAmount),
        interest: Number(formData.interest),
        amountPaid: Number(formData.amountPaid) || 0,
        totalPayable,
        paymentHistory: [],
        status: 'Active',
      };
      if (editLoanIndex === null) {
        setLoans([...loans, newLoan]);
      } else {
        const updatedLoans = [...loans];
        updatedLoans[editLoanIndex] = newLoan;
        setLoans(updatedLoans);
        setEditLoanIndex(null);
      }
      setFormData({ loanType: "Personal", loanAmount: "", interest: "", amountPaid: "" });
    }
  };

  const handleAddCategory = () => {
    const newCategory = prompt("Enter a new loan category:");
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const updateLoanStatus = (index) => {
    const loan = loans[index];
    if (loan.amountPaid >= loan.totalPayable) {
      loan.status = 'Completed';
      setLoans([...loans]);
      setCompletedLoans((prevCompletedLoans) => [...prevCompletedLoans, loan]);
      setLoans((prevLoans) => prevLoans.filter((_, i) => i !== index));
    }
  };

  const handlePaymentUpdate = (index) => {
    const payment = parseFloat(paymentAmount);
    if (!isNaN(payment) && payment > 0) {
      const updatedLoans = [...loans];
      updatedLoans[index].amountPaid += payment;
      updatedLoans[index].paymentHistory.push({
        amount: payment,
        date: new Date().toLocaleDateString(),
      });
      setLoans(updatedLoans);
      setPaymentAmount("");
      updateLoanStatus(index);
    }
  };

  const handleEditLoan = (index) => {
    const loan = loans[index];
    setFormData({
      loanType: loan.loanType,
      loanAmount: loan.loanAmount,
      interest: loan.interest,
      amountPaid: loan.amountPaid,
    });
    setEditLoanIndex(index);
  };

  const categoryData = categories.map((category) => {
    const categoryLoans = loans.filter((loan) => loan.loanType === category);
    const totalCategoryLoan = categoryLoans.reduce((sum, loan) => sum + loan.loanAmount, 0);
    return { name: category, value: totalCategoryLoan };
  });

  const categoryPaymentData = categories.map((category) => {
    const categoryLoans = loans.filter((loan) => loan.loanType === category);
    const totalAmountPaid = categoryLoans.reduce((sum, loan) => sum + loan.amountPaid, 0);
    const totalCategoryLoan = categoryLoans.reduce((sum, loan) => sum + loan.totalPayable, 0);
    return { name: category, paid: totalAmountPaid, payable: totalCategoryLoan };
  });

  return (
    <AppLayout>
      <div className="min-h-screen bg-secondary">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Loan Management</h1>

          {/* Add/Edit Loan Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editLoanIndex === null ? "Add a Loan" : "Edit Loan"}
            </h2>
            <form onSubmit={handleAddLoan} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Type</label>
                  <select
                    value={formData.loanType}
                    onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
                  <input
                    type="number"
                    value={formData.loanAmount}
                    onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                  <input
                    type="number"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Interest %"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount Paid (Optional)</label>
                  <input
                    type="number"
                    value={formData.amountPaid}
                    onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Amount Paid"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition font-medium"
              >
                {editLoanIndex === null ? "Add Loan" : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Active Loans Table */}
          {loans.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Loans</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Loan Type</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Amount</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Interest</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Total Payable</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Paid</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((loan, index) => loan.status === 'Active' && (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800">{loan.loanType}</td>
                        <td className="px-4 py-3 text-gray-800">₹{loan.loanAmount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-gray-800">{loan.interest}%</td>
                        <td className="px-4 py-3 text-gray-800">₹{loan.totalPayable.toFixed(2)}</td>
                        <td className="px-4 py-3 text-gray-800">₹{loan.amountPaid.toFixed(2)}</td>
                        <td className="px-4 py-3"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{loan.status}</span></td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditLoan(index)}
                              className="px-3 py-1 bg-primary text-white rounded hover:bg-opacity-90 transition text-sm"
                            >
                              Edit
                            </button>
                            <input
                              type="number"
                              value={paymentAmount}
                              onChange={(e) => setPaymentAmount(e.target.value)}
                              placeholder="Amount"
                              className="px-3 py-1 border border-gray-300 rounded text-sm w-24"
                            />
                            <button
                              onClick={() => handlePaymentUpdate(index)}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
                            >
                              Pay
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Completed Loans */}
          {completedLoans.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Completed Loans</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Loan Type</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Amount</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Interest</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Total Payable</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Paid</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedLoans.map((loan, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800">{loan.loanType}</td>
                        <td className="px-4 py-3 text-gray-800">₹{loan.loanAmount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-gray-800">{loan.interest}%</td>
                        <td className="px-4 py-3 text-gray-800">₹{loan.totalPayable.toFixed(2)}</td>
                        <td className="px-4 py-3 text-gray-800">₹{loan.amountPaid.toFixed(2)}</td>
                        <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{loan.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Pie Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Loan Distribution</h2>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#213555"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Paid vs Payable</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={categoryPaymentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="paid" fill="#10b981" />
                  <Bar dataKey="payable" fill="#213555" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Totals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 text-sm mb-2">Total Loan Amount</p>
              <p className="text-3xl font-bold text-primary">₹{loans.reduce((sum, loan) => sum + loan.loanAmount, 0).toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 text-sm mb-2">Total Amount Paid</p>
              <p className="text-3xl font-bold text-green-600">₹{loans.reduce((sum, loan) => sum + loan.amountPaid, 0).toFixed(2)}</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 text-sm mb-2">Total Payable</p>
              <p className="text-3xl font-bold text-orange-600">₹{loans.reduce((sum, loan) => sum + loan.totalPayable, 0).toFixed(2)}</p>
            </div>
          </div>

          {/* Add Category Button */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <button
              onClick={handleAddCategory}
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition font-medium"
            >
              Add New Loan Category
            </button>
          </div>
        </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Loan_page;
