'use client';

import { useState } from 'react';
import { Plus, Upload, Download, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import DataForm, { FormField } from '../components/DataForm';
import DataView, { ViewField } from '../components/DataView';

interface RegistrationItem {
  id: number;
  companyName: string;
  registrationNumber: string;
  type: string;
  date: string;
  status: 'Active' | 'Pending' | 'Expired';
}

const sampleData: RegistrationItem[] = [
  { id: 1, companyName: 'ABC Corporation', registrationNumber: 'REG-001', type: 'Private Limited', date: '2024-01-01', status: 'Active' },
  { id: 2, companyName: 'XYZ Industries', registrationNumber: 'REG-002', type: 'Public Limited', date: '2024-02-15', status: 'Pending' },
  { id: 3, companyName: 'DEF Enterprises', registrationNumber: 'REG-003', type: 'Partnership', date: '2024-03-20', status: 'Expired' }
];

const formFields: FormField[] = [
  { name: 'companyName', label: 'Company Name', type: 'text', required: true },
  { name: 'registrationNumber', label: 'Registration Number', type: 'text', required: true },
  { name: 'type', label: 'Company Type', type: 'select', options: ['Private Limited', 'Public Limited', 'Partnership'], required: true },
  { name: 'date', label: 'Registration Date', type: 'date', required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Pending', 'Expired'], required: true }
];

const viewFields: ViewField[] = [
  { name: 'companyName', label: 'Company Name', type: 'text' },
  { name: 'registrationNumber', label: 'Registration Number', type: 'text' },
  { name: 'type', label: 'Company Type', type: 'text' },
  { name: 'date', label: 'Registration Date', type: 'date' },
  { name: 'status', label: 'Status', type: 'status' }
];

export default function RegistrationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RegistrationItem | null>(null);
  const [data, setData] = useState<RegistrationItem[]>(sampleData);

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
      + "Company Name,Registration Number,Type,Date,Status\n"
      + data.map(item => [
          item.companyName,
          item.registrationNumber,
          item.type,
          item.date,
          item.status
        ].join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "registrations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (item: RegistrationItem) => {
    setSelectedItem(item);
    setIsViewOpen(true);
  };

  const handleEdit = (item: RegistrationItem) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: RegistrationItem) => {
    if (confirm(`Are you sure you want to delete registration for ${item.companyName}?`)) {
      setData(prev => prev.filter(i => i.id !== item.id));
    }
  };

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Company Registration</h2>
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

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search registrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <button 
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {showFilter && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date Range</label>
              <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>All</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Expired</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Type</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>All</option>
                <option>Private Limited</option>
                <option>Public Limited</option>
                <option>Partnership</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.companyName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.registrationNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'Active' ? 'bg-green-100 text-green-800' :
                    item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
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

      <DataForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        title={selectedItem ? 'Edit Registration' : 'Add New Registration'}
        fields={formFields}
        initialData={selectedItem}
      />

      <DataView
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Registration Details"
        fields={viewFields}
        data={selectedItem || {}}
      />
    </div>
  );
} 