'use client';

import { useEffect, useState } from 'react';
import { PlusCircleIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import BackButton from '@/components/BackButton';

interface WaterBillExpense {
  id: number;
  date: string;
  amount: number;
  description: string;
}

export default function WaterBillsPage() {
  const [expenses, setExpenses] = useState<WaterBillExpense[]>([]);
  const [newExpense, setNewExpense] = useState({ date: '', amount: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const API_URL = 'http://localhost:8080/api/water-bills';

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Fetch failed');
      setExpenses(await res.json());
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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Water Bills</h1>

      {/* Input Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? 'Edit Water Bill' : 'Add New Water Bill'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input type="date" name="date" value={newExpense.date} onChange={handleInputChange} 
                 className="p-2 border rounded-md dark:bg-gray-700 dark:text-white" />
          <input type="number" name="amount" placeholder="Amount" value={newExpense.amount} onChange={handleInputChange} 
                 className="p-2 border rounded-md dark:bg-gray-700 dark:text-white" />
          <input type="text" name="description" placeholder="Description" value={newExpense.description} onChange={handleInputChange} 
                 className="p-2 border rounded-md dark:bg-gray-700 dark:text-white" />
        </div>
        
      </div>

      {/* Expense List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Expense List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500">Amount</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {expenses.map(e => (
                <tr key={e.id}>
                  <td className="px-6 py-4">{e.date}</td>
                  <td className="px-6 py-4">${e.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">{e.description}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
