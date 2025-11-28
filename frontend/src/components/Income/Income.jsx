import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dashboardlogo from "../assets/Dashboardlogo.svg";
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
import AppLayout from '../Sidebar/AppLayout';

const Income = () => {
  const [salary, setSalary] = useState(100);
  const [freelancing, setFreelancing] = useState(0);
  const [savings, setSavings] = useState(0);
  const [investment, setInvestment] = useState(0);
  const [spending, setSpending] = useState(0);

  const handleEdit = (type) => {
    const newValue = prompt(`Enter new value for ${type}:`);
    if (newValue !== null) {
      switch (type) {
        case "Salary":
          setSalary(parseFloat(newValue));
          break;
        case "Freelancing":
          setFreelancing(parseFloat(newValue));
          break;
        case "Savings":
          setSavings(parseFloat(newValue));
          break;
        case "Investment":
          setInvestment(parseFloat(newValue));
          break;
        case "Spending":
          setSpending(parseFloat(newValue));
          break;
        default:
          break;
      }
    }
  };

  const totalIncome = salary + freelancing + savings + investment;
  const menuItems = [
    { icon: <Home size={28} />, label: 'Dashboard', link: '/dashboard' },
    { icon: <BookOpen size={28} />, label: 'Accounts', link: '/Income' },
    { icon: <DollarSign size={28} />, label: 'Spendings', link: '/spendings' },
    { icon: <PiggyBank size={28} />, label: 'Savings', link: '/savings' },
    { icon: <TrendingUp size={28} />, label: 'Investment', link: '/investment' },
    { icon: <FileText size={28} />, label: 'Report', link: '/report' },
    { icon: <Wallet size={28} />, label: 'Loans', link: '/Loan_page' },
  ];

  return (
    <AppLayout>
      {/* Main Content */}
      <div className='flex-1 p-4 md:p-8'>
        {/* Income Sources */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>Income Sources</h2>
          <div className='space-y-4'>
            <div className='card flex justify-between items-center'>
              <div>
                <h3 className='text-lg font-semibold text-gray-700'>Salary</h3>
              </div>
              <div className='flex items-center gap-4'>
                <h3 className='text-xl font-bold text-primary'>₹ {salary}</h3>
                <button 
                  onClick={() => handleEdit("Salary")}
                  className='btn-primary text-sm'
                >
                  Edit
                </button>
              </div>
            </div>
            <div className='card flex justify-between items-center'>
              <div>
                <h3 className='text-lg font-semibold text-gray-700'>Freelancing</h3>
              </div>
              <div className='flex items-center gap-4'>
                <h3 className='text-xl font-bold text-primary'>₹ {freelancing}</h3>
                <button 
                  onClick={() => handleEdit("Freelancing")}
                  className='btn-primary text-sm'
                >
                  Edit
                </button>
              </div>
            </div>
            <div className='bg-primary text-white rounded-lg p-6 text-lg font-bold'>
              Total Income: ₹{totalIncome}
            </div>
          </div>
        </div>

        {/* Accounts */}
        <div>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>Accounts</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <div className='card flex justify-between items-center'>
              <div>
                <h3 className='text-lg font-semibold text-gray-700'>Savings</h3>
              </div>
              <div className='flex items-center gap-4'>
                <h3 className='text-xl font-bold text-success'>₹ {savings}</h3>
                <button 
                  onClick={() => handleEdit("Savings")}
                  className='btn-primary text-sm'
                >
                  Edit
                </button>
              </div>
            </div>
            <div className='card flex justify-between items-center'>
              <div>
                <h3 className='text-lg font-semibold text-gray-700'>Salary</h3>
              </div>
              <div className='flex items-center gap-4'>
                <h3 className='text-xl font-bold text-primary'>₹ {salary}</h3>
                <button 
                  onClick={() => handleEdit("Salary")}
                  className='btn-primary text-sm'
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='card flex justify-between items-center'>
              <div>
                <h3 className='text-lg font-semibold text-gray-700'>Investment</h3>
              </div>
              <div className='flex items-center gap-4'>
                <h3 className='text-xl font-bold text-info'>₹ {investment}</h3>
                <button 
                  onClick={() => handleEdit("Investment")}
                  className='btn-primary text-sm'
                >
                  Edit
                </button>
              </div>
            </div>
            <div className='card flex justify-between items-center'>
              <div>
                <h3 className='text-lg font-semibold text-gray-700'>Spending</h3>
              </div>
              <div className='flex items-center gap-4'>
                <h3 className='text-xl font-bold text-error'>₹ {spending}</h3>
                <button 
                  onClick={() => handleEdit("Spending")}
                  className='btn-primary text-sm'
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Income;
