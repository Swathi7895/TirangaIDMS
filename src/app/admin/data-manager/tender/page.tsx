'use client';

import { useState } from 'react';
import {  Search, Filter, ArrowLeft} from 'lucide-react';
import DataForm, { FormField } from '../components/DataForm';
import DataView, { ViewField } from '../components/DataView';
import Link from 'next/link';
interface Tender {
  id: number;
  tenderNumber: string;
  title: string;
  organization: string;
  submissionDate: string;
  openingDate: string;
  estimatedValue: number;
  status: 'Open' | 'Closed' | 'Awarded' | 'Cancelled';
  category: 'Government' | 'Private' | 'International';
}

const sampleData: Tender[] = [
  { id: 1, tenderNumber: 'TND-2024-001', title: 'IT Infrastructure Upgrade', organization: 'Ministry of Technology', submissionDate: '2024-04-15', openingDate: '2024-04-20', estimatedValue: 500000, status: 'Open', category: 'Government' },
  { id: 2, tenderNumber: 'TND-2024-002', title: 'Office Supplies Procurement', organization: 'Global Corp Ltd', submissionDate: '2024-03-20', openingDate: '2024-03-25', estimatedValue: 100000, status: 'Awarded', category: 'Private' },
  { id: 3, tenderNumber: 'TND-2024-003', title: 'International Trade Project', organization: 'World Trade Organization', submissionDate: '2024-05-01', openingDate: '2024-05-10', estimatedValue: 1000000, status: 'Open', category: 'International' }
];

const formFields: FormField[] = [
  { name: 'tenderNumber', label: 'Tender Number', type: 'text', required: true },
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'organization', label: 'Organization', type: 'text', required: true },
  { name: 'submissionDate', label: 'Submission Date', type: 'date', required: true },
  { name: 'openingDate', label: 'Opening Date', type: 'date', required: true },
  { name: 'estimatedValue', label: 'Estimated Value', type: 'number', required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['Open', 'Closed', 'Awarded', 'Cancelled'], required: true },
  { name: 'category', label: 'Category', type: 'select', options: ['Government', 'Private', 'International'], required: true }
];

const viewFields: ViewField[] = [
  { name: 'tenderNumber', label: 'Tender Number', type: 'text' },
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'organization', label: 'Organization', type: 'text' },
  { name: 'submissionDate', label: 'Submission Date', type: 'date' },
  { name: 'openingDate', label: 'Opening Date', type: 'date' },
  { name: 'estimatedValue', label: 'Estimated Value', type: 'currency' },
  { name: 'status', label: 'Status', type: 'status' },
  { name: 'category', label: 'Category', type: 'text' }
];

export default function TenderManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedItem] = useState<Tender | null>(null);
  const [data, setData] = useState<Tender[]>(sampleData);

 

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
        <h2 className="text-2xl font-bold text-gray-900">Tender Management</h2>
    
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tenders..."
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
              <label className="block text-sm font-medium text-gray-700">Submission Date Range</label>
              <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>All</option>
                <option>Open</option>
                <option>Closed</option>
                <option>Awarded</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>All</option>
                <option>Government</option>
                <option>Private</option>
                <option>International</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tender Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opening Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
      
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.tenderNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.organization}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.submissionDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.openingDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.estimatedValue)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'Open' ? 'bg-green-100 text-green-800' :
                    item.status === 'Awarded' ? 'bg-blue-100 text-blue-800' :
                    item.status === 'Closed' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
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
        title={selectedItem ? 'Edit Tender' : 'Add New Tender'}
        fields={formFields}
        initialData={selectedItem}
      />

      <DataView
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Tender Details"
        fields={viewFields}
        data={selectedItem || {}}
      />
    </div>
  );
} 