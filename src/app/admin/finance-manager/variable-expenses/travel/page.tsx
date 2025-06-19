'use client';

import { useEffect, useState } from 'react';

import BackButton from '@/components/BackButton';

interface TravelExpense {
  id: number;
  date: string;
  amount: number;
  description: string;
}

const API_URL = 'http://localhost:8080/api/travel';

const travelAPI = {
  getAll: async (): Promise<TravelExpense[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch travel expenses');
    return res.json();
  },
};

export default function TravelPage() {
  const [expenses, setExpenses] = useState<TravelExpense[]>([]);
  const [newExpense, setNewExpense] = useState({ date: '', amount: '', description: '' });
  const [editingId, ] = useState<number | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await travelAPI.getAll();
        setExpenses(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpenses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  

  return (
    <div className="container mx-auto py-8">
      <BackButton href="/finance-manager/dashboard" label="Back to Dashboard" />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Travel Expenses</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {editingId ? 'Edit Travel Expense' : 'Add New Travel Expense'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            name="description"
            placeholder="Description / Purpose"
            value={newExpense.description}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Expense List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description / Purpose</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{expense.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">₹{expense.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{expense.description}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
