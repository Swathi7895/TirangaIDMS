'use client';

import { useState } from 'react';
import { Plus, Upload, Download, Search, Filter, Eye, Edit, Trash2, ArrowLeft } from 'lucide-react';
import DataForm, { FormField } from '../components/DataForm';
import DataView, { ViewField } from '../components/DataView';
import Link from 'next/link';

interface SalesItem {
  id: number;
  customer: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Processing' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Partial';
  paymentMethod: 'Cash' | 'Bank Transfer' | 'Cheque' | 'Credit Card';
  description: string;
}

const sampleData: SalesItem[] = [
  { 
    id: 1, 
    customer: 'ABC Corp', 
    amount: 250000, 
    date: '2024-06-01', 
    status: 'Completed', 
    paymentStatus: 'Paid',
    paymentMethod: 'Bank Transfer',
    description: 'IT Equipment Sale'
  },
  { 
    id: 3, 
    customer: 'DEF Ltd', 
    amount: 380000, 
    date: '2024-06-03', 
    status: 'Processing', 
    paymentStatus: 'Partial',
    paymentMethod: 'Credit Card',
    description: 'Software License'
  }
];

const formFields: FormField[] = [
  { name: 'customer', label: 'Customer', type: 'text', required: true },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['Completed', 'Pending', 'Processing', 'Cancelled'], required: true },
  { name: 'paymentStatus', label: 'Payment Status', type: 'select', options: ['Paid', 'Pending', 'Partial'], required: true },
  { name: 'paymentMethod', label: 'Payment Method', type: 'select', options: ['Cash', 'Bank Transfer', 'Cheque', 'Credit Card'], required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true }
];

const viewFields: ViewField[] = [
  { name: 'customer', label: 'Customer', type: 'text' },
  { name: 'amount', label: 'Amount', type: 'currency' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'status', label: 'Status', type: 'status' },
  { name: 'paymentStatus', label: 'Payment Status', type: 'status' },
  { name: 'paymentMethod', label: 'Payment Method', type: 'text' },
  { name: 'description', label: 'Description', type: 'text' }
];

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SalesItem | null>(null);
  const [data, setData] = useState<SalesItem[]>(sampleData);

  const handleAddNew = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };


  const handleView = (item: SalesItem) => {
    setSelectedItem(item);
    setIsViewOpen(true);
  };



 
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Link
          href="/admin/data-manager"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Sales Management</h2>
      
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search sales records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                      item.paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.paymentMethod}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleView(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                     
                    
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    

      <DataView
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Sale Details"
        fields={viewFields}
        data={selectedItem || {}}
      />
    </div>
  );
} 