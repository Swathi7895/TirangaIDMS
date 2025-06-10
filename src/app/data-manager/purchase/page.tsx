'use client';

import { useState } from 'react';
import { Plus, Upload, Download, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import DataForm, { FormField } from '../components/DataForm';
import DataView, { ViewField } from '../components/DataView';

interface PurchaseItem {
  id: number;
  vendor: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Processing' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Partial';
  paymentMethod: 'Cash' | 'Bank Transfer' | 'Cheque' | 'Credit Card';
  description: string;
}

const sampleData: PurchaseItem[] = [
  { 
    id: 2, 
    vendor: 'XYZ Supplies', 
    amount: 120000, 
    date: '2024-06-02', 
    status: 'Pending', 
    paymentStatus: 'Pending',
    paymentMethod: 'Cheque',
    description: 'Office Supplies'
  }
];

const formFields: FormField[] = [
  { name: 'vendor', label: 'Vendor', type: 'text', required: true },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['Completed', 'Pending', 'Processing', 'Cancelled'], required: true },
  { name: 'paymentStatus', label: 'Payment Status', type: 'select', options: ['Paid', 'Pending', 'Partial'], required: true },
  { name: 'paymentMethod', label: 'Payment Method', type: 'select', options: ['Cash', 'Bank Transfer', 'Cheque', 'Credit Card'], required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true }
];

const viewFields: ViewField[] = [
  { name: 'vendor', label: 'Vendor', type: 'text' },
  { name: 'amount', label: 'Amount', type: 'currency' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'status', label: 'Status', type: 'status' },
  { name: 'paymentStatus', label: 'Payment Status', type: 'status' },
  { name: 'paymentMethod', label: 'Payment Method', type: 'text' },
  { name: 'description', label: 'Description', type: 'text' }
];

export default function PurchasePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PurchaseItem | null>(null);
  const [data, setData] = useState<PurchaseItem[]>(sampleData);

  const handleAddNew = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.pdf';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        alert(`Importing file: ${file.name}`);
      }
    };
    input.click();
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Vendor,Amount,Date,Status,Payment Status,Payment Method,Description\n"
      + data.map(item => [
          item.vendor,
          item.amount,
          item.date,
          item.status,
          item.paymentStatus,
          item.paymentMethod,
          item.description
        ].join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "purchases.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (item: PurchaseItem) => {
    setSelectedItem(item);
    setIsViewOpen(true);
  };

  const handleEdit = (item: PurchaseItem) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: PurchaseItem) => {
    if (confirm('Are you sure you want to delete this purchase record?')) {
      setData(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const handleFormSubmit = (formData: Omit<PurchaseItem, 'id'>) => {
    if (selectedItem) {
      // Edit existing item
      setData(prev => prev.map(item => 
        item.id === selectedItem.id ? { ...item, ...formData } : item
      ));
    } else {
      // Add new item
      const newItem = {
        ...formData,
        id: Math.max(...data.map(item => item.id)) + 1
      } as PurchaseItem;
      setData(prev => [...prev, newItem]);
    }
    setIsFormOpen(false);
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Purchase Management</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={handleAddNew}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Purchase
          </button>
          <button 
            onClick={handleImport}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search purchase records..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.vendor}</td>
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
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DataForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        title={selectedItem ? 'Edit Purchase Record' : 'Add New Purchase'}
        fields={formFields}
        initialData={selectedItem}
      />

      <DataView
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Purchase Details"
        fields={viewFields}
        data={selectedItem || {}}
      />
    </div>
  );
} 