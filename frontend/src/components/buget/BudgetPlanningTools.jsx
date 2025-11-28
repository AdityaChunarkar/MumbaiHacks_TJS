import React, { useState, useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from "recharts";
import { 
  Calendar, 
  DollarSign, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Edit, 
  Save, 
  Plus, 
  Trash2, 
  LineChart,
  PlusCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from '../Sidebar/AppLayout';


const BudgetPlanningTools = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  const [categories, setCategories] = useState([
    { id: 1, name: "Housing", planned: 25000, actual: 24500, color: "#6366F1" },
    { id: 2, name: "Food", planned: 12000, actual: 14300, color: "#F59E0B" },
    { id: 3, name: "Transportation", planned: 8000, actual: 7200, color: "#10B981" },
    { id: 4, name: "Entertainment", planned: 5000, actual: 7800, color: "#EF4444" },
    { id: 5, name: "Utilities", planned: 4000, actual: 3900, color: "#8B5CF6" },
    { id: 6, name: "Shopping", planned: 6000, actual: 8400, color: "#EC4899" }
  ]);
  const [newCategory, setNewCategory] = useState({ name: "", planned: "" });
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [scenario, setScenario] = useState({
    name: "New Home Purchase",
    monthlyIncome: 85000,
    newExpense: 35000,
    duration: 240,
    interestRate: 7.5,
    downPayment: 1500000
  });

  const totalPlanned = categories.reduce((sum, cat) => sum + cat.planned, 0);
  const totalActual = categories.reduce((sum, cat) => sum + cat.actual, 0);
  
  const monthlyData = [
    { name: "Jan", planned: 58000, actual: 61000 },
    { name: "Feb", planned: 60000, actual: 59000 },
    { name: "Mar", planned: 58000, actual: 62000 },
    { name: "Apr", planned: 60000, actual: 63000 },
    { name: "May", planned: 59000, actual: 58000 },
    { name: "Jun", planned: 62000, actual: 65000 },
  ];

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.planned) {
      const colors = ["#6366F1", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6", "#EC4899"];
      const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
      setCategories([
        ...categories, 
        { 
          id: newId, 
          name: newCategory.name, 
          planned: parseInt(newCategory.planned), 
          actual: 0, 
          color: colors[newId % colors.length]
        }
      ]);
      setNewCategory({ name: "", planned: "" });
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const startEditing = (id, currentValue) => {
    setEditingId(id);
    setEditValue(currentValue);
  };

  const saveEditing = (id) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, planned: parseInt(editValue) } : cat
    ));
    setEditingId(null);
  };

  const calculateMonthlyPayment = () => {
    const principal = scenario.newExpense - scenario.downPayment;
    const monthlyRate = scenario.interestRate / 100 / 12;
    const payments = scenario.duration;
    if (principal <= 0) return 0;
    const x = Math.pow(1 + monthlyRate, payments);
    const monthly = (principal * x * monthlyRate) / (x - 1);
    return Math.round(monthly);
  };

  const monthlyPayment = calculateMonthlyPayment();
  const affordabilityRatio = monthlyPayment / scenario.monthlyIncome;
  const affordabilityStatus = affordabilityRatio < 0.33 ? "Good" : affordabilityRatio < 0.45 ? "Moderate" : "High Risk";

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-white shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-800">Budget Planning Dude 🧑‍💻</h2>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 flex gap-8">
        <button 
          className={`px-4 py-3 font-medium border-b-2 transition ${
            activeTab === "monthly"
              ? "border-primary text-primary"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("monthly")}
        >
          <div className="flex items-center gap-2">
            <Calendar size={18} /> Monthly Budget
          </div>
        </button>
        <button 
          className={`px-4 py-3 font-medium border-b-2 transition ${
            activeTab === "comparison"
              ? "border-primary text-primary"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("comparison")}
        >
          <div className="flex items-center gap-2">
            <BarChart size={18} /> Budget vs. Actual
          </div>
        </button>
        <button 
          className={`px-4 py-3 font-medium border-b-2 transition ${
            activeTab === "scenario"
              ? "border-primary text-primary"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("scenario")}
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={18} /> Scenario Planning
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Monthly Budget Tab */}
        {activeTab === "monthly" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Budget Categories Card */}
              <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Budget Categories</h3>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Category name" 
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input 
                      type="number" 
                      placeholder="Amount" 
                      value={newCategory.planned}
                      onChange={(e) => setNewCategory({...newCategory, planned: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button 
                      onClick={handleAddCategory} 
                      className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition flex items-center justify-center gap-2"
                    >
                      <Plus size={16} /> Add Category
                    </button>
                  </div>
                </div>

                {/* Categories List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition">
                      <div className="flex items-center gap-3 flex-1">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="font-medium text-gray-700 flex-1">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {editingId === category.id ? (
                          <>
                            <input 
                              type="number" 
                              value={editValue} 
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button 
                              onClick={() => saveEditing(category.id)} 
                              className="p-1 text-green-600 hover:bg-green-100 rounded"
                            >
                              <Save size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="text-sm font-semibold text-primary">₹{category.planned.toLocaleString('en-IN')}</span>
                            <button 
                              className="p-1 text-blue-600 hover:bg-blue-100 rounded" 
                              onClick={() => startEditing(category.id, category.planned)}
                            >
                              <Edit size={14} />
                            </button>
                          </>
                        )}
                        <button 
                          className="p-1 text-red-600 hover:bg-red-100 rounded" 
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Budget */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total Budget</span>
                    <span className="text-xl font-bold text-primary">₹{totalPlanned.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Budget Allocation Chart */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Budget Allocation</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={categories}
                      dataKey="planned"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Budget vs Actual Tab */}
        {activeTab === "comparison" && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-gray-700">Planned Budget</h4>
                  <PieChartIcon size={20} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">₹{totalPlanned.toLocaleString('en-IN')}</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-gray-700">Actual Spending</h4>
                  <DollarSign size={20} className="text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-orange-600">₹{totalActual.toLocaleString('en-IN')}</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-gray-700">Difference</h4>
                  {totalPlanned >= totalActual ? (
                    <ArrowDownRight size={20} className="text-green-600" />
                  ) : (
                    <ArrowUpRight size={20} className="text-red-600" />
                  )}
                </div>
                <div className={`text-3xl font-bold ${totalPlanned >= totalActual ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{Math.abs(totalPlanned - totalActual).toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Comparison Table and Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Comparison Table */}
              <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Category Comparison</h3>
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Planned</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Actual</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Variance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(category => (
                      <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: category.color }}
                            ></div>
                            <span className="text-gray-700">{category.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">₹{category.planned.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 text-gray-700">₹{category.actual.toLocaleString('en-IN')}</td>
                        <td className={`px-4 py-3 font-semibold ${category.planned >= category.actual ? 'text-green-600' : 'text-red-600'}`}>
                          {category.planned >= category.actual ? '-' : '+'}
                          ₹{Math.abs(category.planned - category.actual).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Monthly Comparison Chart */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                    <Legend />
                    <Bar dataKey="planned" name="Planned" fill="#6366F1" />
                    <Bar dataKey="actual" name="Actual" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Scenario Planning Tab */}
        {activeTab === "scenario" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scenario Inputs */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">New Purchase Scenario</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Income</label>
                    <div className="relative">
                      <DollarSign size={16} className="absolute left-3 top-3 text-gray-400" />
                      <input 
                        type="number" 
                        value={scenario.monthlyIncome}
                        onChange={(e) => setScenario({...scenario, monthlyIncome: Number(e.target.value)})}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Property Value</label>
                    <div className="relative">
                      <DollarSign size={16} className="absolute left-3 top-3 text-gray-400" />
                      <input 
                        type="number" 
                        value={scenario.newExpense}
                        onChange={(e) => setScenario({...scenario, newExpense: Number(e.target.value)})}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Down Payment</label>
                    <div className="relative">
                      <DollarSign size={16} className="absolute left-3 top-3 text-gray-400" />
                      <input 
                        type="number" 
                        value={scenario.downPayment}
                        onChange={(e) => setScenario({...scenario, downPayment: Number(e.target.value)})}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Duration (months)</label>
                    <input 
                      type="number" 
                      value={scenario.duration}
                      onChange={(e) => setScenario({...scenario, duration: Number(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Interest Rate (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={scenario.interestRate}
                      onChange={(e) => setScenario({...scenario, interestRate: Number(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Scenario Results */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Financial Impact</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Monthly EMI</span>
                    <span className="text-lg font-bold text-primary">₹{monthlyPayment.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Total Loan Amount</span>
                    <span className="text-lg font-bold text-primary">
                      ₹{(scenario.newExpense - scenario.downPayment).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Total Interest Paid</span>
                    <span className="text-lg font-bold text-orange-600">
                      ₹{((monthlyPayment * scenario.duration) - 
                        (scenario.newExpense - scenario.downPayment)).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Affordability Ratio</span>
                    <span className="text-lg font-bold text-gray-800">
                      {(affordabilityRatio * 100).toFixed(1)}% of Income
                    </span>
                  </div>

                  {/* Affordability Status */}
                  <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Affordability Status</div>
                    <div className={`text-lg font-bold ${
                      affordabilityStatus === "Good" ? "text-green-600" :
                      affordabilityStatus === "Moderate" ? "text-orange-600" :
                      "text-red-600"
                    }`}>
                      {affordabilityStatus}
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">Recommendation</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      {affordabilityRatio < 0.33 
                        ? "This purchase appears affordable based on your current income. You're in a good position to proceed."
                        : affordabilityRatio < 0.45
                        ? "This purchase is within reasonable limits but may strain your budget. Consider increasing your down payment."
                        : "This purchase may be too expensive for your current income level. We recommend increasing your down payment."}
                    </p>
                    {affordabilityRatio >= 0.33 && (
                      <div className="p-3 bg-yellow-50 rounded border border-yellow-200 text-sm text-yellow-800">
                        Consider increasing your down payment to ₹{(scenario.newExpense - 
                        (scenario.monthlyIncome * 0.33 * 12 * (scenario.duration/12) / 
                        (1 + scenario.interestRate/100 * (scenario.duration/24)))).toLocaleString('en-IN')} 
                        for better affordability.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions Footer */}
      <div className="bg-white border-t border-gray-200 p-6 flex gap-4 justify-end">
        <Link 
          to="/dashboard" 
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          Back to Dashboard
        </Link>
        <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition font-medium">
          Save Budget
        </button>
      </div>
      </div>
    </AppLayout>
  );
};

export default BudgetPlanningTools;
