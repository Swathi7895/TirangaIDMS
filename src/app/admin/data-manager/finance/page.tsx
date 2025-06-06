'use client';

import { useState } from 'react';
import { Plus, Upload, Download, Search, Filter, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import DataForm, { FormField } from '../components/DataForm';
import DataView, { ViewField } from '../components/DataView';
import Link from 'next/link';
interface FinanceReport {
  id: number;
  reportType: 'Income Statement' | 'Balance Sheet' | 'Cash Flow' | 'Profit & Loss' | 'Tax Report';
  period: string;
  date: string;
  status: 'Draft' | 'Final' | 'Approved' | 'Archived';
  amount: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'INR';
  department: string;
  preparedBy: string;
  notes: string;
}

const sampleData: FinanceReport[] = [
  {
    id: 1,
    reportType: 'Income Statement',
    period: 'Q1 2024',
    date: '2024-03-31',
    status: 'Final',
    amount: 1250000,
    currency: 'USD',
    department: 'Finance',
    preparedBy: 'John Smith',
    notes: 'Q1 financial performance review'
  },
  {
    id: 2,
    reportType: 'Balance Sheet',
    period: 'Q1 2024',
    date: '2024-03-31',
    status: 'Approved',
    amount: 2500000,
    currency: 'USD',
    department: 'Finance',
    preparedBy: 'Sarah Johnson',
    notes: 'End of Q1 balance sheet'
  },
  {
    id: 3,
    reportType: 'Cash Flow',
    period: 'Q1 2024',
    date: '2024-03-31',
    status: 'Draft',
    amount: 750000,
    currency: 'USD',
    department: 'Finance',
    preparedBy: 'Mike Brown',
    notes: 'Q1 cash flow analysis'
  }
];

const formFields: FormField[] = [
  { name: 'reportType', label: 'Report Type', type: 'select', options: ['Income Statement', 'Balance Sheet', 'Cash Flow', 'Profit & Loss', 'Tax Report'], required: true },
  { name: 'period', label: 'Period', type: 'text', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['Draft', 'Final', 'Approved', 'Archived'], required: true },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
  { name: 'currency', label: 'Currency', type: 'select', options: ['USD', 'EUR', 'GBP', 'INR'], required: true },
  { name: 'department', label: 'Department', type: 'text', required: true },
  { name: 'preparedBy', label: 'Prepared By', type: 'text', required: true },
  { name: 'notes', label: 'Notes', type: 'textarea', required: true }
];

const viewFields: ViewField[] = [
  { name: 'reportType', label: 'Report Type', type: 'text' },
  { name: 'period', label: 'Period', type: 'text' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'status', label: 'Status', type: 'status' },
  { name: 'amount', label: 'Amount', type: 'currency' },
  { name: 'currency', label: 'Currency', type: 'text' },
  { name: 'department', label: 'Department', type: 'text' },
  { name: 'preparedBy', label: 'Prepared By', type: 'text' },
  { name: 'notes', label: 'Notes', type: 'text' }
];

export default function FinancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FinanceReport | null>(null);
  const [data, setData] = useState<FinanceReport[]>(sampleData);



  const handleFormSubmit = (formData: any) => {
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
      };
      setData(prev => [...prev, newItem]);
    }
    setIsFormOpen(false);
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
        <h2 className="text-2xl font-bold text-gray-900">Finance Reports</h2>
        
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search reports..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prepared By</th>
             
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.reportType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      item.status === 'Final' ? 'bg-blue-100 text-blue-800' :
                      item.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: item.currency
                    }).format(item.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.preparedBy}</td>
               
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
        title={selectedItem ? 'Edit Report' : 'Add New Report'}
        fields={formFields}
        initialData={selectedItem}
      />

      <DataView
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Report Details"
        fields={viewFields}
        data={selectedItem || {}}
      />
    </div>
  );
} 