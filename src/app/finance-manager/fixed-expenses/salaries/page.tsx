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

  const handleAddExpense = async () => {
    if (!newExpense.employeeName || !newExpense.date || !newExpense.amount || !newExpense.description) return;
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeName: newExpense.employeeName,
          date: newExpense.date,
          amount: parseFloat(newExpense.amount),
          description: newExpense.description,
        }),
      });
      if (!res.ok) throw new Error('Add failed');
      fetchExpenses();
      setNewExpense({ employeeName: '', date: '', amount: '', description: '' });
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      fetchExpenses();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEditClick = (expense: SalaryExpense) => {
    setEditingId(expense.id);
    setNewExpense({
      employeeName: expense.employeeName,
      date: expense.date,
      amount: expense.amount.toString(),
      description: expense.description,
    });
  };

  const handleUpdateExpense = async () => {
    if (!newExpense.employeeName || !newExpense.date || !newExpense.amount || !newExpense.description || editingId === null) return;
    try {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeName: newExpense.employeeName,
          date: newExpense.date,
          amount: parseFloat(newExpense.amount),
          description: newExpense.description,
        }),
      });
      if (!res.ok) throw new Error('Update failed');
      fetchExpenses();
      setNewExpense({ employeeName: '', date: '', amount: '', description: '' });
      setEditingId(null);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleCancelEdit = () => {
    setNewExpense({ employeeName: '', date: '', amount: '', description: '' });
    setEditingId(null);
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
        <div className="flex space-x-4">
          {editingId ? (
            <>
              <button onClick={handleUpdateExpense} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <PencilSquareIcon className="h-5 w-5 mr-2" /> Update Entry
              </button>
              <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={handleAddExpense} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              <PlusCircleIcon className="h-5 w-5 mr-2" /> Add Entry
            </button>
          )}
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
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEditClick(expense)} className="text-blue-600 mr-4 hover:text-blue-900">
                      <PencilSquareIcon className="h-5 w-5 inline" /> Edit
                    </button>
                    <button onClick={() => handleDeleteExpense(expense.id)} className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-5 w-5 inline" /> Delete
                    </button>
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
