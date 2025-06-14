'use client';

import { useEffect, useState } from 'react';
import { PlusCircleIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import BackButton from '@/components/BackButton';

interface RentExpense {
  id: number;
  date: string;
  amount: number;
  description: string;
}

export default function RentPage() {
  const [expenses, setExpenses] = useState<RentExpense[]>([]);
  const [newExpense, setNewExpense] = useState({ date: '', amount: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/rent');
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error('Failed to fetch expenses', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleAddExpense = async () => {
    if (!newExpense.date || !newExpense.amount || !newExpense.description) return;
    try {
      const res = await fetch('http://localhost:8080/api/rent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: newExpense.date,
          amount: parseFloat(newExpense.amount),
          description: newExpense.description,
        }),
      });
      if (res.ok) {
        fetchExpenses();
        setNewExpense({ date: '', amount: '', description: '' });
      }
    } catch (err) {
      console.error('Failed to add expense', err);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/rent/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchExpenses();
    } catch (err) {
      console.error('Failed to delete expense', err);
    }
  };

  const handleEditClick = (expense: RentExpense) => {
    setEditingId(expense.id);
    setNewExpense({
      date: expense.date,
      amount: expense.amount.toString(),
      description: expense.description,
    });
  };

  const handleUpdateExpense = async () => {
    if (!newExpense.date || !newExpense.amount || !newExpense.description || editingId === null) return;
    try {
      const res = await fetch(`http://localhost:8080/api/rent/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: newExpense.date,
          amount: parseFloat(newExpense.amount),
          description: newExpense.description,
        }),
      });
      if (res.ok) {
        fetchExpenses();
        setNewExpense({ date: '', amount: '', description: '' });
        setEditingId(null);
      }
    } catch (err) {
      console.error('Failed to update expense', err);
    }
  };

  const handleCancelEdit = () => {
    setNewExpense({ date: '', amount: '', description: '' });
    setEditingId(null);
  };

  return (
    <div className="container mx-auto py-8">
      <BackButton href="/finance-manager/dashboard" label="Back to Dashboard" />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Rent Expenses</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {editingId ? 'Edit Expense' : 'Add New Expense'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="date"
            name="date"
            placeholder="Date"
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
            placeholder="Description"
            value={newExpense.description}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex space-x-4">
          {editingId ? (
            <>
              <button
                onClick={handleUpdateExpense}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <PencilSquareIcon className="h-5 w-5 mr-2" /> Update Expense
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAddExpense}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" /> Add Expense
            </button>
          )}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{expense.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">${expense.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{expense.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEditClick(expense)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600 mr-4">
                      <PencilSquareIcon className="h-5 w-5 inline" /> Edit
                    </button>
                    <button onClick={() => handleDeleteExpense(expense.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600">
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