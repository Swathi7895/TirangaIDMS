'use client';

import { useState } from 'react';
import { Plus, Upload, Download, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import DataForm, { FormField } from '../components/DataForm';
import DataView, { ViewField } from '../components/DataView';

interface LogisticsDocument {
  id: number;
  documentType: 'Bill of Lading' | 'Packing List' | 'Commercial Invoice' | 'Certificate of Origin' | 'Customs Declaration';
  reference: string;
  date: string;
  status: 'Active' | 'Pending' | 'Expired' | 'Cancelled';
  origin: string;
  destination: string;
  carrier: string;
  trackingNumber: string;
  description: string;
}

const sampleData: LogisticsDocument[] = [
  {
    id: 1,
    documentType: 'Bill of Lading',
    reference: 'BL-2024-001',
    date: '2024-03-15',
    status: 'Active',
    origin: 'New York, USA',
    destination: 'London, UK',
    carrier: 'Global Shipping Co.',
    trackingNumber: 'TRK123456789',
    description: 'Electronics shipment'
  },
  {
    id: 2,
    documentType: 'Commercial Invoice',
    reference: 'CI-2024-001',
    date: '2024-03-16',
    status: 'Pending',
    origin: 'Shanghai, China',
    destination: 'Singapore',
    carrier: 'Asia Logistics Ltd',
    trackingNumber: 'TRK987654321',
    description: 'Raw materials'
  },
  {
    id: 3,
    documentType: 'Certificate of Origin',
    reference: 'CO-2024-001',
    date: '2024-03-17',
    status: 'Active',
    origin: 'Dubai, UAE',
    destination: 'Mumbai, India',
    carrier: 'Middle East Shipping',
    trackingNumber: 'TRK456789123',
    description: 'Textile products'
  }
];

const formFields: FormField[] = [
  { name: 'documentType', label: 'Document Type', type: 'select', options: ['Bill of Lading', 'Packing List', 'Commercial Invoice', 'Certificate of Origin', 'Customs Declaration'], required: true },
  { name: 'reference', label: 'Reference Number', type: 'text', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Pending', 'Expired', 'Cancelled'], required: true },
  { name: 'origin', label: 'Origin', type: 'text', required: true },
  { name: 'destination', label: 'Destination', type: 'text', required: true },
  { name: 'carrier', label: 'Carrier', type: 'text', required: true },
  { name: 'trackingNumber', label: 'Tracking Number', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true }
];

const viewFields: ViewField[] = [
  { name: 'documentType', label: 'Document Type', type: 'text' },
  { name: 'reference', label: 'Reference Number', type: 'text' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'status', label: 'Status', type: 'status' },
  { name: 'origin', label: 'Origin', type: 'text' },
  { name: 'destination', label: 'Destination', type: 'text' },
  { name: 'carrier', label: 'Carrier', type: 'text' },
  { name: 'trackingNumber', label: 'Tracking Number', type: 'text' },
  { name: 'description', label: 'Description', type: 'text' }
];

export default function LogisticsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LogisticsDocument | null>(null);
  const [data, setData] = useState<LogisticsDocument[]>(sampleData);

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
      + "Document Type,Reference,Date,Status,Origin,Destination,Carrier,Tracking Number,Description\n"
      + data.map(item => [
          item.documentType,
          item.reference,
          item.date,
          item.status,
          item.origin,
          item.destination,
          item.carrier,
          item.trackingNumber,
          item.description
        ].join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "logistics_documents.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (item: LogisticsDocument) => {
    setSelectedItem(item);
    setIsViewOpen(true);
  };

  const handleEdit = (item: LogisticsDocument) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: LogisticsDocument) => {
    if (confirm(`Are you sure you want to delete document ${item.reference}?`)) {
      setData(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const handleFormSubmit = (formData: Omit<LogisticsDocument, 'id'>) => {
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
        <h2 className="text-2xl font-bold text-gray-900">Logistics Documents</h2>
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
                  placeholder="Search documents..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrier</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.documentType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.reference}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Active' ? 'bg-green-100 text-green-800' :
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'Expired' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.origin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.carrier}</td>
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
        title={selectedItem ? 'Edit Document' : 'Add New Document'}
        fields={formFields}
        initialData={selectedItem}
      />

      <DataView
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Document Details"
        fields={viewFields}
        data={selectedItem || {}}
      />
    </div>
  );
} 