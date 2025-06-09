'use client';

import { useState } from 'react';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import DataForm, { FormField, FormValue } from '../components/DataForm';
import DataView, { ViewField } from '../components/DataView';
import Link from 'next/link';

type BankDocumentData = {
  documentType: string;
  bankName: string;
  accountNumber: string;
  date: string;
  status: 'Valid' | 'Expired' | 'Pending';
};

interface BankDocument extends BankDocumentData {
  id: number;
}

const sampleData: BankDocument[] = [
  { id: 1, documentType: 'Bank Statement', bankName: 'HDFC Bank', accountNumber: 'XXXX1234', date: '2024-01-15', status: 'Valid' },
  { id: 2, documentType: 'Bank Guarantee', bankName: 'ICICI Bank', accountNumber: 'XXXX5678', date: '2024-02-20', status: 'Pending' },
  { id: 3, documentType: 'Bank Certificate', bankName: 'SBI', accountNumber: 'XXXX9012', date: '2024-03-10', status: 'Expired' }
];

const formFields: FormField[] = [
  { name: 'documentType', label: 'Document Type', type: 'select', options: ['Bank Statement', 'Bank Guarantee', 'Bank Certificate'], required: true },
  { name: 'bankName', label: 'Bank Name', type: 'text', required: true },
  { name: 'accountNumber', label: 'Account Number', type: 'text', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['Valid', 'Expired', 'Pending'], required: true }
];

const viewFields: ViewField[] = [
  { name: 'documentType', label: 'Document Type', type: 'text' },
  { name: 'bankName', label: 'Bank Name', type: 'text' },
  { name: 'accountNumber', label: 'Account Number', type: 'text' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'status', label: 'Status', type: 'status' }
];

export default function BankDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BankDocument | null>(null);
  const [data, setData] = useState<BankDocument[]>(sampleData);

  const handleFormSubmit = (formData: Record<string, FormValue>) => {
    const bankData = formData as BankDocumentData;
    if (selectedItem) {
      // Edit existing item
      setData(prev => prev.map(item => 
        item.id === selectedItem.id ? { ...item, ...bankData } : item
      ));
    } else {
      // Add new item
      const newItem: BankDocument = {
        ...bankData,
        id: Math.max(...data.map(item => item.id)) + 1
      };
      setData(prev => [...prev, newItem]);
    }
    setIsFormOpen(false);
    setSelectedItem(null);
  };

  const handleView = (item: BankDocument) => {
    setSelectedItem(item);
    setIsViewOpen(true);
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
        <h2 className="text-2xl font-bold text-gray-900">Bank Documents</h2>
        <div className="flex flex-wrap gap-2">
         
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bank documents..."
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
                <option>Valid</option>
                <option>Pending</option>
                <option>Expired</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Document Type</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>All</option>
                <option>Bank Statement</option>
                <option>Bank Guarantee</option>
                <option>Bank Certificate</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleView(item)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.documentType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.bankName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.accountNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'Valid' ? 'bg-green-100 text-green-800' :
                    item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
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

      <DataForm<BankDocument>
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        title={selectedItem ? 'Edit Bank Document' : 'Add New Bank Document'}
        fields={formFields}
        initialData={selectedItem}
      />

      <DataView<BankDocument>
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Bank Document Details"
        fields={viewFields}
        data={selectedItem || {} as BankDocument}
      />
    </div>
  );
} 