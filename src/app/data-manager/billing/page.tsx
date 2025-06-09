'use client';

import { useState } from 'react';
import { Plus,  Download, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import DataForm, { FormField } from '../components/DataForm';
import DataView, { ViewField } from '../components/DataView';

interface BillingItem {
  id: number;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

// Type-safe wrapper for DataView
function BillingDataView({ isOpen, onClose, data, fields, title }: {
  isOpen: boolean;
  onClose: () => void;
  data: BillingItem;
  fields: ViewField[];
  title: string;
}) {
  // Convert BillingItem to a type that DataView can accept
  const viewData = {
    ...data,
    id: data.id.toString(),
    amount: data.amount.toString(),
    status: data.status
  };

  return (
    <DataView
      isOpen={isOpen}
      onClose={onClose}
      data={viewData}
      fields={fields}
      title={title}
    />
  );
}

const formFields: FormField[] = [
  { name: 'invoiceNumber', label: 'Invoice Number', type: 'text', required: true },
  { name: 'clientName', label: 'Client', type: 'text', required: true },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
  { name: 'date', label: 'Due Date', type: 'date', required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['paid', 'pending', 'overdue'], required: true },
  { name: 'description', label: 'Type', type: 'text', required: true }
];

const viewFields: ViewField[] = [
  { name: 'invoiceNumber', label: 'Invoice Number', type: 'text' },
  { name: 'clientName', label: 'Client', type: 'text' },
  { name: 'amount', label: 'Amount', type: 'currency' },
  { name: 'date', label: 'Due Date', type: 'date' },
  { name: 'status', label: 'Status', type: 'status' },
  { name: 'description', label: 'Type', type: 'text' }
];

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BillingItem | null>(null);
  const [data, setData] = useState<BillingItem[]>([
    { id: 1, invoiceNumber: 'INV-2024-001', clientName: 'ABC Corp', amount: 5000.00, date: '2024-04-15', status: 'paid', description: 'Invoice' },
    { id: 2, invoiceNumber: 'INV-2024-002', clientName: 'XYZ Ltd', amount: 7500.00, date: '2024-04-20', status: 'pending', description: 'Invoice' },
    { id: 3, invoiceNumber: 'CN-2024-001', clientName: 'DEF Inc', amount: -1500.00, date: '2024-04-10', status: 'overdue', description: 'Credit Note' }
  ]);

  const handleAddNew = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleView = (item: BillingItem) => {
    setSelectedItem(item);
    setIsViewOpen(true);
  };

  const handleEdit = (item: BillingItem) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleFormSubmit = (formData: Omit<BillingItem, 'id'>) => {
    if (selectedItem) {
      // Edit existing item
      setData(prev => prev.map(item => 
        item.id === selectedItem.id ? { ...item, ...formData } : item
      ));
    } else {
      // Add new item
      const newItem: BillingItem = {
        id: Math.max(...data.map(item => item.id)) + 1,
        ...formData
      };
      setData(prev => [...prev, newItem]);
    }
    setIsFormOpen(false);
    setSelectedItem(null);
  };

  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Invoice Number,Client,Amount,Due Date,Type,Status\n"
      + data.map(item => [
        item.invoiceNumber,
        item.clientName,
        item.amount,
        item.date,
        item.description,
        item.status
      ].join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "billing_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: BillingItem['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Billing Management</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleAddNew}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by invoice number, client, or type..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          {showFilter && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={() => {
                    setSelectedStatus('all');
                    setShowFilter(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedStatus === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setSelectedStatus('paid');
                    setShowFilter(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedStatus === 'paid' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  Paid
                </button>
                <button
                  onClick={() => {
                    setSelectedStatus('pending');
                    setShowFilter(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedStatus === 'pending' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => {
                    setSelectedStatus('overdue');
                    setShowFilter(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedStatus === 'overdue' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  Overdue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.invoiceNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.clientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${item.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleView(item)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-yellow-600 hover:text-yellow-900 mr-4"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DataForm<BillingItem>
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedItem(null);
        }}
        onSubmit={handleFormSubmit}
        title={selectedItem ? 'Edit Billing Item' : 'Add Billing Item'}
        fields={formFields}
        initialData={selectedItem}
      />

      {isViewOpen && selectedItem && (
        <BillingDataView
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          data={selectedItem}
          fields={viewFields}
          title="Billing Details"
        />
      )}
    </div>
  );
} 