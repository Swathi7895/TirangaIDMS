'use client';

import { useState, useEffect } from 'react';
import { Plus, Upload, Download, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import DataForm, { FormField } from '../components/DataForm';
import DataView, { ViewField } from '../components/DataView';

interface LogisticsDocument {
  id: number;
  documentType: string;
  reference: string;
  date: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Completed';
  origin: string;
  destination: string;
  carrier: string;
}

const formFields: FormField[] = [
  { name: 'documentType', label: 'Document Type', type: 'select', options: ['Bill of Lading', 'Airway Bill', 'Packing List', 'Commercial Invoice', 'Certificate of Origin'], required: true },
  { name: 'reference', label: 'Reference Number', type: 'text', required: true },
  { name: 'date', label: 'Document Date', type: 'date', required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Pending', 'Completed'], required: true },
  { name: 'origin', label: 'Origin', type: 'text', required: true },
  { name: 'destination', label: 'Destination', type: 'text', required: true },
  { name: 'carrier', label: 'Carrier', type: 'text', required: true }
];

const viewFields: ViewField[] = [
  { name: 'documentType', label: 'Document Type', type: 'text' },
  { name: 'reference', label: 'Reference Number', type: 'text' },
  { name: 'date', label: 'Document Date', type: 'date' },
  { name: 'status', label: 'Status', type: 'status' },
  { name: 'origin', label: 'Origin', type: 'text' },
  { name: 'destination', label: 'Destination', type: 'text' },
  { name: 'carrier', label: 'Carrier', type: 'text' }
];

export default function LogisticsDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<LogisticsDocument | null>(null);
  const [data, setData] = useState<LogisticsDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:8080/api/logisticsdocuments';

  // --- Data Fetching (GET) ---
  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (e: Error | unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
      setError(`Failed to fetch logistics documents: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleAddNew = () => {
    setSelectedDocument(null);
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
        // In a real application, you'd send this file to a backend endpoint for processing
      }
    };
    input.click();
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Document Type,Reference,Date,Status,Origin,Destination,Carrier\n"
      + data.map(item => [
        item.documentType,
        item.reference,
        item.date,
        item.status,
        item.origin,
        item.destination,
        item.carrier
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
    setSelectedDocument(item);
    setIsViewOpen(true);
  };

  const handleEdit = (item: LogisticsDocument) => {
    setSelectedDocument(item);
    setIsFormOpen(true);
  };

  // --- Data Deletion (DELETE) ---
  const handleDelete = async (item: LogisticsDocument) => {
    if (confirm(`Are you sure you want to delete document ${item.reference}?`)) {
      try {
        const response = await fetch(`${API_URL}/${item.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setData(prev => prev.filter(i => i.id !== item.id));
        alert('Document deleted successfully!');
      } catch (e: Error | unknown) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        alert(`Failed to delete document: ${errorMessage}`);
      }
    }
  };

  // --- Form Submission (POST/PUT) ---
  const handleFormSubmit = async (formData: Omit<LogisticsDocument, 'id'>) => {
    try {
      if (selectedDocument) {
        // Edit existing item (PUT)
        const response = await fetch(`${API_URL}/${selectedDocument.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedDocument = await response.json();
        setData(prev => prev.map(item =>
          item.id === selectedDocument.id ? updatedDocument : item
        ));
        alert('Document updated successfully!');
      } else {
        // Add new item (POST)
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newDocument = await response.json();
        setData(prev => [...prev, newDocument]);
        alert('Document added successfully!');
      }
      setIsFormOpen(false);
      setSelectedDocument(null);
    } catch (e: Error | unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
      alert(`Failed to save document: ${errorMessage}`);
    }
  };

  const filteredData = data.filter(item =>
    (item.documentType?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (item.reference?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (item.origin?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (item.destination?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (item.carrier?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
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

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by document type, reference, origin, destination, or carrier..."
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
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-600">Loading logistics documents...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : (
        <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">No logistics documents found.</td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.documentType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.reference}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Active' ? 'bg-green-100 text-green-800' :
                        item.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                        item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.origin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.destination}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.carrier}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <DataForm<LogisticsDocument>
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedDocument(null);
        }}
        onSubmit={handleFormSubmit}
        title={selectedDocument ? 'Edit Logistics Document' : 'Add Logistics Document'}
        fields={formFields}
        initialData={selectedDocument}
      />

      {isViewOpen && selectedDocument && (
        <DataView
          isOpen={isViewOpen}
          onClose={() => {
            setIsViewOpen(false);
            setSelectedDocument(null);
          }}
          data={selectedDocument}
          fields={viewFields}
          title="Logistics Document Details"
        />
      )}
    </div>
  );
} 