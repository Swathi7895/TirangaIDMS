'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import BackButton from '@/app/components/BackButton';

interface InventoryTransaction {
  id: string;
  itemName: string;
  type: 'in' | 'out';
  quantity: number;
  date: Date;
  location: string;
  notes: string;
}

const API_BASE_URL = 'http://localhost:8080/api/store/stationary/inventory';

export default function StationaryInventoryPage() {
  const [transactions, setTransactions] = useState<InventoryTransaction[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState<Omit<InventoryTransaction, 'id' | 'date'>>({
    itemName: '',
    type: 'in',
    quantity: 0,
    location: '',
    notes: '',
  });

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const data: InventoryTransaction[] = await response.json();
        setTransactions(data.map(transaction => ({
          ...transaction,
          date: new Date(transaction.date),
        })));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // Add a new transaction via API
  const handleAdd = async () => {
    const newTransactionData = {
      ...newTransaction,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransactionData),
      });

      if (!response.ok) throw new Error(`Failed to add transaction: ${response.status}`);

      const addedTransaction: InventoryTransaction = await response.json();
      setTransactions([...transactions, { ...addedTransaction, date: new Date(addedTransaction.date) }]);
      setIsAddModalOpen(false);
      setNewTransaction({ itemName: '', type: 'in', quantity: 0, location: '', notes: '' });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackButton />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Stationary Inventory Transactions
          </h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add Transaction
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{transaction.itemName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.type === 'in' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                      {transaction.type === 'in' ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
                      {transaction.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{transaction.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{transaction.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{transaction.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Transaction Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
              <h3 className="text-lg font-medium mb-4">Add New Transaction</h3>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Name</label>
                <input type="text" value={newTransaction.itemName} onChange={e => setNewTransaction({ ...newTransaction, itemName: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">Cancel</button>
                <button onClick={handleAdd} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">Add Transaction</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
