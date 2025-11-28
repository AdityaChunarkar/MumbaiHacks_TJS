import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Home, BookOpen, DollarSign, PiggyBank, TrendingUp, FileText, Wallet, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppLayout from '../Sidebar/AppLayout';
import Dashboardlogo from "../assets/dashboardLogo.svg";

const Dashboard = () => {

    const [showModal, setShowModal] = useState(false);
    const [financialData, setFinancialData] = useState({
        income: 0,
    });
    const [spendings, setSpendings] = useState(0);

    useEffect(() => {
        const fetchSpendings = async () => {
            try {
                const fetchedSpendings = 10000; 
                setSpendings(fetchedSpendings);
            } catch (error) {
                console.error("Error fetching spendings:", error);
            }
        };
        fetchSpendings();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFinancialData({ ...financialData, [name]: parseInt(value) || 0 });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    const calculateSavings = () => {
        return financialData.income - spendings;
    };

    const data = [
        { name: 'Income', value: financialData.income },
        { name: 'Spendings', value: spendings },
        { name: 'Savings', value: calculateSavings() },
    ];

    const data2 = [
        { name: 'Fixed exp', value: 4000 },
        { name: 'Variable exp', value: 2000 },
        { name: 'Living exp', value: 1000 },
        { name: 'Others', value: 500 }
    ];

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
                <div className='mb-6'>
                    <h1 className='text-3xl font-bold text-gray-900'>Welcome! 😊</h1>
                </div>

                {/* Financial Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                    <div className='card'>
                        <h4 className='text-gray-600 font-medium mb-2'>Income</h4>
                        <p className='text-3xl font-bold text-success'>₹{financialData.income}</p>
                    </div>
                    <div className='card'>
                        <h4 className='text-gray-600 font-medium mb-2'>Spendings</h4>
                        <p className='text-3xl font-bold text-error'>₹{spendings}</p>
                    </div>
                    <div className='card'>
                        <h4 className='text-gray-600 font-medium mb-2'>Savings</h4>
                        <p className='text-3xl font-bold text-info'>₹{calculateSavings()}</p>
                    </div>
                </div>

                <button 
                    className='btn-primary mb-8'
                    onClick={() => setShowModal(true)}
                >
                    Edit Income
                </button>

                {/* Charts */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <div className='card'>
                        <h3 className='text-lg font-bold text-gray-900 mb-4'>Graphical Analysis 🏦</h3>
                        <div className='overflow-x-auto'>
                            <BarChart
                                width={400}
                                height={300}
                                data={data}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#213555" />
                            </BarChart>
                        </div>
                    </div>

                    <div className='card'>
                        <h3 className='text-lg font-bold text-gray-900 mb-4'>Spendings Analysis 📉</h3>
                        <div className='overflow-x-auto'>
                            <BarChart
                                width={400}
                                height={300}
                                data={data2}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#213555" />
                            </BarChart>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                        <div className='bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl'>
                            <h3 className='text-xl font-bold text-gray-900 mb-6'>Edit Income</h3>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-6'>
                                    <label htmlFor='income' className='block text-sm font-medium text-gray-700 mb-2'>
                                        Income
                                    </label>
                                    <input
                                        type='number'
                                        id='income'
                                        name='income'
                                        value={financialData.income}
                                        onChange={handleInputChange}
                                        className='input-field'
                                    />
                                </div>
                                <div className='flex gap-3'>
                                    <button type='submit' className='flex-1 btn-primary'>
                                        Save
                                    </button>
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
            </div>
        </AppLayout>
    );
};

export default Dashboard;