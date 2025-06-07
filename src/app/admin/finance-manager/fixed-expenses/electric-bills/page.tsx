'use client';

import { useState } from 'react';

import BackButton from '@/components/BackButton';

interface ElectricBillExpense {
  id: number;
  date: string;
  amount: number;
  description: string;
}

export default function ElectricBillsPage() {
  const [expenses] = useState<ElectricBillExpense[]>([
    { id: 1, date: '2023-10-15', amount: 120.50, description: 'October Billing Period' },
    { id: 2, date: '2023-11-18', amount: 135.75, description: 'November Billing Period' },
    { id: 3, date: '2023-12-20', amount: 110.00, description: 'December Billing Period' },
  ]);





  return (
    <div className="container mx-auto py-8">
      <BackButton href="/admin/finance-manager/dashboard" label="Back to Dashboard" />
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Electric Bills</h1>


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