'use client';

import { useState } from 'react';
import { Plus, Upload, Download, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import DataForm, { FormField } from '../components/DataForm';
import DataView, { ViewField } from '../components/DataView';

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
      + "Report Type,Period,Date,Status,Amount,Currency,Department,Prepared By,Notes\n"
      + data.map(item => [
          item.reportType,
          item.period,
          item.date,
          item.status,
          item.amount,
          item.currency,
          item.department,
          item.preparedBy,
          item.notes
        ].join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "finance_reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (item: FinanceReport) => {
    setSelectedItem(item);
    setIsViewOpen(true);
  };

  const handleEdit = (item: FinanceReport) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: FinanceReport) => {
    if (confirm(`Are you sure you want to delete the ${item.reportType} report for ${item.period}?`)) {
      setData(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const handleFormSubmit = (formData: Omit<FinanceReport, 'id'>) => {
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Finance Reports</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={handleAddNew}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New
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
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2 justify-end">
                      <button 
                        onClick={() => handleView(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(item)}
                        className="text-green-600 hover:text-green-900"
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