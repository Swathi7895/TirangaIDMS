'use client';

import { useEffect, useState } from 'react';
import { PlusCircleIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import BackButton from '@/components/BackButton';

interface SalaryExpense {
  id: number;
  employeeName: string;
  date: string;
  amount: number;
  description: string;
}

export default function SalariesPage() {
  const [expenses, setExpenses] = useState<SalaryExpense[]>([]);
  const [newExpense, setNewExpense] = useState({ employeeName: '', date: '', amount: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const API_URL = 'http://localhost:8080/api/salaries';

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

 

  return (
    <div className="container mx-auto py-8">
      <BackButton href="/finance-manager/dashboard" label="Back to Dashboard" />

      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Salaries Expenses</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          {editingId ? 'Edit Salary Entry' : 'Add New Salary Entry'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input type="text" name="employeeName" placeholder="Employee Name" value={newExpense.employeeName} onChange={handleInputChange}
                 className="p-2 border rounded-md dark:bg-gray-700 dark:text-white" />
          <input type="date" name="date" placeholder="Date" value={newExpense.date} onChange={handleInputChange}
                 className="p-2 border rounded-md dark:bg-gray-700 dark:text-white" />
          <input type="number" name="amount" placeholder="Amount" value={newExpense.amount} onChange={handleInputChange}
                 className="p-2 border rounded-md dark:bg-gray-700 dark:text-white" />
          <input type="text" name="description" placeholder="Description / Pay Period" value={newExpense.description} onChange={handleInputChange}
                 className="p-2 border rounded-md dark:bg-gray-700 dark:text-white" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Salary List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300">Employee Name</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300">Date</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300">Amount</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {expenses.map(expense => (
                <tr key={expense.id}>
                  <td className="px-6 py-4">{expense.employeeName}</td>
                  <td className="px-6 py-4">{expense.date}</td>
                  <td className="px-6 py-4">${expense.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">{expense.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
