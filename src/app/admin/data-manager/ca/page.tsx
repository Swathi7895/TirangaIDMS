'use client';

import { useState, useEffect } from 'react';
import {  Download, Search, Filter, Eye,  ArrowLeft } from 'lucide-react';

import DataView, { ViewField } from '../components/DataView';
import Link from 'next/link';

interface CADocument {
  id: number;
  documentNumber: string;
  client: string;
  amount: number;
  date: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
}

// Raw API response interface
interface RawCADocument {
  id: number;
  documentNumber?: string;
  client?: string;
  amount?: string | number;
  date?: string;
  description?: string;
  status?: 'active' | 'inactive' | 'pending';
}

// Type-safe wrapper for DataView
function CADataView({ isOpen, onClose, data, fields, title }: {
  isOpen: boolean;
  onClose: () => void;
  data: CADocument;
  fields: ViewField[];
  title: string;
}) {
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

const viewFields: ViewField[] = [
  { name: 'documentNumber', label: 'Document Number', type: 'text' },
  { name: 'client', label: 'Client', type: 'text' },
  { name: 'amount', label: 'Amount', type: 'currency' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'description', label: 'Description', type: 'text' },
  { name: 'status', label: 'Status', type: 'status' }
];

const API_BASE_URL = 'http://localhost:8080/api/cadocuments';

export default function CAPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CADocument | null>(null);
  const [data, setData] = useState<CADocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedRawData: RawCADocument[] = await response.json();
  
      const processedData: CADocument[] = fetchedRawData.map(rawItem => ({
        id: rawItem.id,
        documentNumber: rawItem.documentNumber || '',
        client: rawItem.client || '',
        amount: parseFloat(String(rawItem.amount)) || 0,
        date: rawItem.date || '',
        description: rawItem.description || '',
        status: rawItem.status || 'pending'
      }));
  
      setData(processedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleView = (item: CADocument) => {
    setSelectedItem(item);
    setIsViewOpen(true);
  };

  const filteredData = data.filter(item => {
    const matchesSearch =
      item.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Document Number,Client,Amount,Date,Description,Status\n"
      + data.map(item => [
        item.documentNumber,
        item.client,
        item.amount,
        item.date,
        item.description,
        item.status
      ].join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ca_documents.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: CADocument['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
        <h2 className="text-2xl font-bold text-gray-900">CA Documents Management</h2>
        <div className="flex flex-wrap gap-2">
         
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
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
            placeholder="Search by document number, client, or description..."
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
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
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
                    setSelectedStatus('active');
                    setShowFilter(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedStatus === 'active' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => {
                    setSelectedStatus('inactive');
                    setShowFilter(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedStatus === 'inactive' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  Inactive
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
              </div>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-600">Loading CA documents...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">Error: {error}</div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
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
                    {item.documentNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {typeof item.amount === 'number' 
                      ? `$${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : '$0.00'}
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
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && !isLoading && !error && (
            <p className="text-center py-8 text-gray-500">No CA documents found.</p>
          )}
        </div>
      )}

      {isViewOpen && selectedItem && (
        <CADataView
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          data={selectedItem}
          fields={viewFields}
          title="CA Document Details"
        />
      )}
    </div>
  );
}