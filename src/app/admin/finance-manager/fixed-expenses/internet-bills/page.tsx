'use client';

import { useEffect, useState } from 'react';
import { PlusCircleIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import BackButton from '@/components/BackButton';

interface InternetBillExpense {
  id: number;
  date: string;
  amount: number;
  description: string;
}

export default function InternetBillsPage() {
  const [expenses, setExpenses] = useState<InternetBillExpense[]>([]);
  const [newExpense, setNewExpense] = useState({ date: '', amount: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const API_URL = 'http://localhost:8080/api/internet-bills';

  // 🟢 Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setExpenses(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  

  return (
    <div className="container mx-auto py-8">
      <BackButton href="/finance-manager/dashboard" label="Back to Dashboard" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Internet Bills</h1>

      {/* Input Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          {editingId ? 'Edit Internet Bill' : 'Add New Internet Bill'}
        </h2>
       
       
      </div>

      {/* Expense List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Expense List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{expense.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">${expense.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{expense.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
