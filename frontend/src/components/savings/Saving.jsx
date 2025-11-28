import React, { useState } from 'react';
import { Search, Home, BookOpen, DollarSign, PiggyBank, TrendingUp, FileText, LogOut, Plus } from 'lucide-react';
import AppLayout from '../Sidebar/AppLayout';
import { Link } from 'react-router-dom';

const Saving = () => {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    goalType: 'Car',
    goalAmount: '',
    targetDate: '',
  });

  const goalOptions = ['Car', 'Home', 'Child', 'Retirement', 'Other'];
  const menuItems = [
    { icon: <Home size={28} />, label: 'Dashboard', link: '/dashboard' },
    { icon: <BookOpen size={28} />, label: 'Accounts', link: '/Income' },
    { icon: <DollarSign size={28} />, label: 'Spendings', link: '/spendings' },
    { icon: <PiggyBank size={28} />, label: 'Savings', link: '/savings' },
    { icon: <TrendingUp size={28} />, label: 'Investments', link: '/investments' },
    { icon: <FileText size={28} />, label: 'Reports', link: '/reports' },
  ];

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (formData.goalAmount && formData.targetDate && formData.goalType) {
      setGoals([...goals, { ...formData, savedAmount: 0 }]);
      setFormData({ goalType: 'Car', goalAmount: '', targetDate: '' });
    }
  };

  const handleAddMoney = (index) => {
    const amount = prompt("Enter the amount to add:");
    if (amount && !isNaN(amount)) {
      const updatedGoals = [...goals];
      updatedGoals[index].savedAmount += parseFloat(amount);
      setGoals(updatedGoals);
    }
  };

  return (
    <AppLayout>
      {/* Main Content */}
      <main className='flex-1 p-4 md:p-8'>
        {/* Header */}
        <div className='mb-8 flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-gray-900'>Savings Goals</h1>
          <div className='flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-md'>
            <Search size={20} className='text-gray-400' />
            <input
              type="text"
              placeholder="Search goals..."
              className='outline-none text-sm'
            />
          </div>
        </div>

        {/* Add New Goal Form */}
        <div className='card mb-8'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>Create New Goal</h2>
          <form onSubmit={handleAddGoal} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Goal Type</label>
                <select
                  value={formData.goalType}
                  onChange={(e) => setFormData({ ...formData, goalType: e.target.value })}
                  className='input-field'
                >
                  {goalOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Goal Amount</label>
                <input
                  type="number"
                  placeholder="1000"
                  value={formData.goalAmount}
                  onChange={(e) => setFormData({ ...formData, goalAmount: e.target.value })}
                  className='input-field'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Target Date</label>
                <input
                  type="date"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                  className='input-field'
                />
              </div>
            </div>
            <button type="submit" className='btn-primary flex items-center gap-2'>
              <Plus size={20} /> Add Goal
            </button>
          </form>
        </div>

        {/* Goals Grid */}
        {goals.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {goals.map((goal, index) => (
              <div key={index} className='card hover:shadow-lg transition-shadow'>
                <h3 className='text-lg font-bold text-primary mb-4'>{goal.goalType}</h3>
                <div className='space-y-2 mb-4'>
                  <p className='text-gray-600'>Total Goal: <span className='font-semibold text-gray-900'>₹{goal.goalAmount}</span></p>
                  <p className='text-gray-600'>Saved: <span className='font-semibold text-success'>₹{goal.savedAmount}</span></p>
                  <p className='text-gray-600'>Target Date: <span className='font-semibold'>{goal.targetDate}</span></p>
                </div>
                
                {/* Progress Bar */}
                <div className='mb-4'>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div 
                      className='bg-success h-2 rounded-full transition-all'
                      style={{ width: `${(goal.savedAmount / goal.goalAmount) * 100}%` }}
                    ></div>
                  </div>
                  <p className='text-xs text-gray-500 mt-1'>
                    {Math.round((goal.savedAmount / goal.goalAmount) * 100)}% complete
                  </p>
                </div>

                <button 
                  onClick={() => handleAddMoney(index)} 
                  className='w-full btn-primary'
                >
                  Add Money
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className='card text-center py-16'>
            <PiggyBank size={48} className='mx-auto text-gray-300 mb-4' />
            <p className='text-gray-500'>No savings goals yet. Create one to get started!</p>
          </div>
        )}
      </main>
    </AppLayout>
  );
};

export default Saving;
