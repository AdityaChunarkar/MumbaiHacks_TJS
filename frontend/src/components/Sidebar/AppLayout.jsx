import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Home,
  BookOpen,
  DollarSign,
  PiggyBank,
  TrendingUp,
  FileText,
  Wallet,
  Smartphone,
  PieChart,
  MessageSquare,
  Percent,
  BarChart2
} from 'lucide-react';

const AppLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', link: '/dashboard' },
    { icon: <BookOpen size={20} />, label: 'Income', link: '/income' },
    { icon: <DollarSign size={20} />, label: 'Spendings', link: '/spendings' },
    { icon: <PiggyBank size={20} />, label: 'Savings', link: '/savings' },
    { icon: <TrendingUp size={20} />, label: 'Investment', link: '/investment' },
    { icon: <PieChart size={20} />, label: 'budgetplanningtools', link: '/budgetplanningtools' },
    { icon: <FileText size={20} />, label: 'Report', link: '/report' },
    { icon: <Wallet size={20} />, label: 'Loans', link: '/loan_page' },
    { icon: <MessageSquare size={20} />, label: 'Chatbot', link: '/chatbot' },
    { icon: <Percent size={20} />, label: 'Tax', link: '/taxpage' },
  ];

  return (
    <div className='min-h-screen flex bg-secondary'>
      <aside
        className={`fixed top-0 left-0 h-screen bg-white w-64 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='p-6 border-b flex items-center justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setOpen(!open)}
              className='bg-white p-2 rounded-md shadow-sm'
              aria-label='Toggle sidebar'
            >
              <Menu size={18} />
            </button>
            <div className='text-2xl font-bold text-primary'>Arthaniti</div>
          </div>
        </div>

        <nav className='p-4 space-y-1 overflow-y-auto'>
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.link}
              className='flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary hover:text-white transition-transform transform hover:translate-x-2'
            >
              <span className='flex-shrink-0'>{item.icon}</span>
              <span className='text-sm font-medium'>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* persistent open button when sidebar is hidden */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className='fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md'
          aria-label='Open sidebar'
        >
          <Menu size={18} />
        </button>
      )}

      <div className={`flex-1 transition-all duration-300 ${open ? 'ml-64' : 'ml-0'}`}>
        <div className='p-4 md:p-6'>
          {/* Hamburger moved into sidebar header to avoid overlapping title */}

          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
