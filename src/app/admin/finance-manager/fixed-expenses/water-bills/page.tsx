'use client';

import { useState } from 'react';
import { PlusCircleIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import BackButton from '@/components/BackButton';

interface WaterBillExpense {
  id: number;
  date: string;
  amount: number;
  description: string;
}

export default function WaterBillsPage() {
  const [expenses, setExpenses] = useState<WaterBillExpense[]>([
    { id: 1, date: '2023-10-20', amount: 50.00, description: 'October Usage' },
    { id: 2, date: '2023-11-20', amount: 55.50, description: 'November Usage' },
    { id: 3, date: '2023-12-20', amount: 60.00, description: 'December Usage' },
  ]);
  const [newExpense, setNewExpense] = useState({ date: '', amount: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleAddExpense = () => {
    if (!newExpense.date || !newExpense.amount || !newExpense.description) return;
    const expenseToAdd: WaterBillExpense = {
      id: Date.now(), // Simple unique ID
      date: newExpense.date,
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
    };
    setExpenses([...expenses, expenseToAdd]);
    setNewExpense({ date: '', amount: '', description: '' });
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleEditClick = (expense: WaterBillExpense) => {
    setEditingId(expense.id);
    setNewExpense({ date: expense.date, amount: expense.amount.toString(), description: expense.description });
  };

  const handleUpdateExpense = () => {
    if (!newExpense.date || !newExpense.amount || !newExpense.description || editingId === null) return;
    setExpenses(expenses.map(expense =>
      expense.id === editingId
        ? { ...expense, date: newExpense.date, amount: parseFloat(newExpense.amount), description: newExpense.description }
        : expense
    ));
    setNewExpense({ date: '', amount: '', description: '' });
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setNewExpense({ date: '', amount: '', description: '' });
    setEditingId(null);
  };

  return (
    <div className="container mx-auto py-8">
        <BackButton href="/admin/finance-manager/dashboard" label="Back to Dashboard" />
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Water Bills</h1>


      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Expense List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description / Billing Period</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{expense.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">${expense.amount.toFixed(2)}</td>
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