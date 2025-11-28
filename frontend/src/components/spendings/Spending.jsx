import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Home, BookOpen, DollarSign, PiggyBank, TrendingUp, FileText, Wallet, LogOut, Plus,
  Shield, Tv, ShoppingCart, Film, Zap, Car, Baby, Gift, Briefcase
} from 'lucide-react';
import AppLayout from '../Sidebar/AppLayout';

const Spendings = () => {
  const [spendingsData] = useState([
    { date: '2025-01-01', amount: 50 },
    { date: '2025-01-02', amount: 80 },
    { date: '2025-01-03', amount: 120 },
    { date: '2025-01-04', amount: 60 },
    { date: '2025-01-05', amount: 100 },
    { date: '2025-01-06', amount: 90 },
    { date: '2025-01-07', amount: 150 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [budget, setBudget] = useState(500);
  const [totalExpenses] = useState(690);
 

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const newExpense = parseFloat(formData.amount);

    if (totalExpenses + newExpense > budget) {
      alert('You have exceeded your budget! Please adjust your spending.');
      return;
    }
    setShowModal(false);
    setFormData({ category: '', amount: '', date: new Date().toISOString().split('T')[0] });
  };

  const categories = {
    'Fixed Expenses': [
      { icon: <Home className="w-6 h-6" />, label: 'Housing', description: 'Rent, mortgage, utilities, household items' },
      { icon: <Shield className="w-6 h-6" />, label: 'Insurance', description: 'Health, car, home insurance' },
      { icon: <Tv className="w-6 h-6" />, label: 'Subscriptions', description: 'Streaming, phone, cable' }
    ],
    'Variable Expenses': [
      { icon: <ShoppingCart className="w-6 h-6" />, label: 'Groceries', description: 'Food and personal care' },
      { icon: <Film className="w-6 h-6" />, label: 'Entertainment', description: 'Travel and fun' },
      { icon: <Zap className="w-6 h-6" />, label: 'Utilities', description: 'Electricity, water, internet' }
    ],
    'Living Expenses': [
      { icon: <Car className="w-6 h-6" />, label: 'Transportation', description: 'Gas, repairs, car payment' },
      { icon: <Baby className="w-6 h-6" />, label: 'Child Care', description: 'Child-related expenses' }
    ],
    'Other': [
      { icon: <Gift className="w-6 h-6" />, label: 'Giving', description: 'Charitable and personal gifts' },
      { icon: <Briefcase className="w-6 h-6" />, label: 'Professional', description: 'Financial and legal fees' },
    ]
  };

  const handleQuickAdd = (category) => {
    setFormData({
      ...formData,
      category: category
    });
    setShowModal(true);
  };

  return (
    <AppLayout>
      <div className='flex-1 p-4 md:p-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>Spendings</h1>

        {/* Budget Section */}
        <div className='card mb-8'>
          <label className='block text-sm font-medium text-gray-700 mb-3'>Set Your Budget</label>
          <input
            type='range'
            min='0'
            max='1000'
            step='10'
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value))}
            className='w-full'
          />
          <p className='text-gray-600 mt-2'>Budget: ₹{budget}</p>
        </div>

        {/* Chart */}
        <div className='card mb-8'>
          <div className='w-full h-80'>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#213555" name="Spending Amount" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Add Button */}
        <button 
          className='btn-primary mb-8 flex items-center gap-2'
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} /> Add Spending
        </button>

        {/* Modal */}
        {showModal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl'>
              <h2 className='text-xl font-bold text-gray-900 mb-6'>Add New Spending</h2>
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Category</label>
                  <input
                    type='text'
                    name='category'
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className='input-field'
                    readOnly
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Amount</label>
                  <input
                    type='number'
                    name='amount'
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className='input-field'
                    required
                  />
                </div>
                <div className='mb-6'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Date</label>
                  <input
                    type='date'
                    name='date'
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className='input-field'
                    required
                  />
                </div>
                <div className='flex gap-3'>
                  <button type='submit' className='flex-1 btn-primary'>Save</button>
                  <button
                    type='button'
                    onClick={() => setShowModal(false)}
                    className='flex-1 btn-secondary'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className='space-y-8'>
          {Object.entries(categories).map(([section, items]) => (
            <div key={section}>
              <h3 className='text-lg font-bold text-gray-900 mb-4'>{section}</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {items.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleQuickAdd(item.label)}
                    className='card hover:shadow-lg transition-shadow text-left'
                  >
                    <div className='flex items-start gap-3'>
                      <div className='text-primary flex-shrink-0'>
                        {item.icon}
                      </div>
                      <div>
                        <p className='font-semibold text-gray-900'>{item.label}</p>
                        <p className='text-sm text-gray-600'>{item.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Spendings;
