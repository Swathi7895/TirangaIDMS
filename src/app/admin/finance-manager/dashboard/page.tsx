'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react'; // Import useState and useEffect

import {
  BuildingOfficeIcon,
  TagIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

import {
  ArrowLeft,
} from 'lucide-react';

// Add type definitions for better type safety
interface ExpenseData {
  amount: number;
  date?: string;
  description?: string;
}

interface ExpenseState {
  [key: string]: ExpenseData[];
}

interface ApiResponse {
  data: Array<{
    amount: number;
    date?: string;
    description?: string;
  }>;
}

interface ExpenseResult {
  name: string;
  data: ExpenseData[];
  error: boolean;
}

export default function FinanceManagerDashboard() {
  // State to hold dynamic expense data for each feature
  const [fixedExpensesData, setFixedExpensesData] = useState<ExpenseState>({
    'Rent': [],
    'Electric Bills': [],
    'Internet Bills': [],
    'SIM Bills': [],
    'Water Bills': [],
    'Salaries': [],
  });

  const [variableExpensesData, setVariableExpensesData] = useState<ExpenseState>({
    'Travel': [],
    'Expo Advertisement': [],
    'Incentives': [],
    'Commissions': [],
  });

  // State to hold dynamic stats
  const [dynamicStats, setDynamicStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Base URL for your Spring Boot backend
  const API_BASE_URL = 'http://localhost:8080/api';

  // Improved error handling and data validation
  const fetchExpenseData = async (endpoint: string, expenseName: string): Promise<ExpenseResult> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json() as ApiResponse;
      
      // Validate the data structure
      if (!result.data || !Array.isArray(result.data)) {
        console.warn(`Invalid data structure for ${expenseName}`);
        return { name: expenseName, data: [], error: false };
      }

      // Ensure each expense has the required fields
      const validatedData = result.data.map((item) => ({
        amount: Number(item.amount) || 0,
        date: item.date || new Date().toISOString(),
        description: item.description || '',
      }));

      return { name: expenseName, data: validatedData, error: false };
    } catch (err) {
      console.error(`Failed to fetch ${expenseName} data:`, err);
      return { name: expenseName, data: [], error: true };
    }
  };

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        const fixedExpenseEndpoints = [
          { name: 'Rent', endpoint: 'rent' },
          { name: 'Electric Bills', endpoint: 'electric-bills' },
          { name: 'Internet Bills', endpoint: 'internet-bills' },
          { name: 'SIM Bills', endpoint: 'sim-bills' },
          { name: 'Water Bills', endpoint: 'water-bills' },
          { name: 'Salaries', endpoint: 'salaries' },
        ];

        const variableExpenseEndpoints = [
          { name: 'Travel', endpoint: 'travel' },
          { name: 'Expo Advertisement', endpoint: 'expo-advertisement' },
          { name: 'Incentives', endpoint: 'incentives' },
          { name: 'Commissions', endpoint: 'commission' },
        ];

        // Fetch Fixed Expenses with error handling
        const fetchedFixed = await Promise.all(
          fixedExpenseEndpoints.map(item => fetchExpenseData(item.endpoint, item.name))
        );
        
        const newFixedData: ExpenseState = {};
        let hasFixedErrors = false;
        
        fetchedFixed.forEach(item => {
          newFixedData[item.name] = item.data;
          if (item.error) hasFixedErrors = true;
        });
        
        setFixedExpensesData(newFixedData);

        // Fetch Variable Expenses with error handling
        const fetchedVariable = await Promise.all(
          variableExpenseEndpoints.map(item => fetchExpenseData(item.endpoint, item.name))
        );
        
        const newVariableData: ExpenseState = {};
        let hasVariableErrors = false;
        
        fetchedVariable.forEach(item => {
          newVariableData[item.name] = item.data;
          if (item.error) hasVariableErrors = true;
        });
        
        setVariableExpensesData(newVariableData);

        // Calculate totals with null checks
        const totalFixedCosts = Object.values(newFixedData).reduce((sum, expenses) => {
          return sum + expenses.reduce((expenseSum, expense) => expenseSum + (expense.amount || 0), 0);
        }, 0);

        const totalVariableCosts = Object.values(newVariableData).reduce((sum, expenses) => {
          return sum + expenses.reduce((expenseSum, expense) => expenseSum + (expense.amount || 0), 0);
        }, 0);

        const monthlyBudget = 245000;
        const savings = monthlyBudget - (totalFixedCosts + totalVariableCosts);

        const calculateChange = () => {
          const randomChange = Number((Math.random() * 20 - 10).toFixed(0));
          return `${randomChange > 0 ? '+' : ''}${randomChange}%`;
        };

        setDynamicStats([
          { name: 'Monthly Budget', value: `₹${monthlyBudget.toLocaleString('en-IN')}`, change: '+12%', icon: BanknotesIcon },
          { name: 'Fixed Costs', value: `₹${totalFixedCosts.toLocaleString('en-IN')}`, change: calculateChange(), icon: BuildingOfficeIcon },
          { name: 'Variable Costs', value: `₹${totalVariableCosts.toLocaleString('en-IN')}`, change: calculateChange(), icon: ChartBarIcon },
          { name: 'Savings', value: `₹${savings.toLocaleString('en-IN')}`, change: calculateChange(), icon: ArrowTrendingUpIcon },
        ]);

        // Set error message if any endpoints failed
        if (hasFixedErrors || hasVariableErrors) {
          setError('Some expense data could not be loaded. Please try refreshing the page.');
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load finance data. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const financeSections = [
    {
      title: 'Fixed Expenses',
      icon: BuildingOfficeIcon,
      description: 'Manage recurring fixed costs and monthly obligations',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      features: [
        { name: 'Rent', link: '/admin/finance-manager/fixed-expenses/rent', icon: '🏠', data: fixedExpensesData['Rent'] },
        { name: 'Electric Bills', link: '/admin/finance-manager/fixed-expenses/electric-bills', icon: '⚡', data: fixedExpensesData['Electric Bills'] },
        { name: 'Internet Bills', link: '/admin/finance-manager/fixed-expenses/internet-bills', icon: '🌐', data: fixedExpensesData['Internet Bills'] },
        { name: 'SIM Bills', link: '/admin/finance-manager/fixed-expenses/sim-bills', icon: '📱', data: fixedExpensesData['SIM Bills'] },
        { name: 'Water Bills', link: '/admin/finance-manager/fixed-expenses/water-bills', icon: '💧', data: fixedExpensesData['Water Bills'] },
        { name: 'Salaries', link: '/admin/finance-manager/fixed-expenses/salaries', icon: '👥', data: fixedExpensesData['Salaries'] },
      ],
    },
    {
      title: 'Variable Expenses',
      icon: TagIcon,
      description: 'Track fluctuating costs and dynamic business expenses',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      features: [
        { name: 'Travel', link: '/admin/finance-manager/variable-expenses/travel', icon: '✈️', data: variableExpensesData['Travel'] },
        { name: 'Expo Advertisement', link: '/admin/finance-manager/variable-expenses/expo-advertisement', icon: '📢', data: variableExpensesData['Expo Advertisement'] },
        { name: 'Incentives', link: '/admin/finance-manager/variable-expenses/incentives', icon: '🎯', data: variableExpensesData['Incentives'] },
        { name: 'Commissions', link: '/admin/finance-manager/variable-expenses/commissions', icon: '💰', data: variableExpensesData['Commissions'] },
      ],
    },
  ];

  // Use dynamicStats for rendering
  const statsToDisplay = dynamicStats.length > 0 ? dynamicStats : [
    { name: 'Monthly Budget', value: 'Loading...', change: '', icon: BanknotesIcon },
    { name: 'Fixed Costs', value: 'Loading...', change: '', icon: BuildingOfficeIcon },
    { name: 'Variable Costs', value: 'Loading...', change: '', icon: ChartBarIcon },
    { name: 'Savings', value: 'Loading...', change: '', icon: ArrowTrendingUpIcon },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading finance data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <p className="text-xl text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div>
          <Link href="/admin" className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 mt-5 rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Finance Manager
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Comprehensive expense tracking and budget management
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 bg-green-50 dark:bg-green-900/30 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Live Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsToDisplay.map((stat) => (
            <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">{stat.change}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <stat.icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {financeSections.map((section) => (
            <div key={section.title} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 h-full">
                {/* Section Header */}
                <div className={`${section.bgColor} p-6 relative overflow-hidden`}>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-white dark:bg-gray-800 shadow-md`}>
                        <section.icon className={`h-7 w-7 ${section.iconColor}`} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{section.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -mr-16 -mt-16"></div>
                </div>

                {/* Features Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.features.map((feature) => (
                      <Link key={feature.name} href={feature.link}>
                        <div className="group/item p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{feature.icon}</span>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                                {feature.name}
                              </p>
                              {/* Display a snippet of data or total if available */}
                              {feature.data && feature.data.length > 0 && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  Last: ₹{feature.data[0].amount.toLocaleString('en-IN')} on {feature.data[0].date}
                                </p>
                              )}
                              {feature.data && feature.data.length === 0 && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">No data available</p>
                              )}
                            </div>
                            <svg className="w-4 h-4 text-gray-400 group-hover/item:text-blue-500 group-hover/item:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Section Footer */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {section.features.length} categories
                    </span>
                    <button className={`text-sm font-medium ${section.iconColor} hover:underline flex items-center space-x-1`}>
                      <span>View all</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}