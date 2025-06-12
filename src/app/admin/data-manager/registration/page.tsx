'use client';

import { useState, useEffect } from 'react';
import { Plus, Upload, Download, Search, Filter, Eye, Edit, Trash2, ArrowLeft } from 'lucide-react';
import DataForm, { FormField } from '../components/DataForm';
import DataView, { ViewField } from '../components/DataView';
import Link from 'next/link';

interface CompanyRegistration {
  id: number;
  companyName: string;
  registrationNumber: string;
  type: string;
  date: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Suspended';
}

const formFields: FormField[] = [
  { name: 'companyName', label: 'Company Name', type: 'text', required: true },
  { name: 'registrationNumber', label: 'Registration Number', type: 'text', required: true },
  { name: 'type', label: 'Company Type', type: 'select', options: ['Private Limited', 'Public Limited', 'LLP', 'Partnership', 'Sole Proprietorship'], required: true },
  { name: 'date', label: 'Registration Date', type: 'date', required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Pending', 'Suspended'], required: true }
];

const viewFields: ViewField[] = [
  { name: 'companyName', label: 'Company Name', type: 'text' },
  { name: 'registrationNumber', label: 'Registration Number', type: 'text' },
  { name: 'type', label: 'Company Type', type: 'text' },
  { name: 'date', label: 'Registration Date', type: 'date' },
  { name: 'status', label: 'Status', type: 'status' }
];

export default function CompanyRegistrationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<CompanyRegistration | null>(null);
  const [data, setData] = useState<CompanyRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:8080/api/companyregistrations';

  // --- Data Fetching (GET) ---
  const fetchRegistrations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (e: any) {
      setError(`Failed to fetch registrations: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleAddNew = () => {
    setSelectedRegistration(null);
    setIsFormOpen(true);
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
    link.setAttribute("download", "company_registrations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (item: CompanyRegistration) => {
    setSelectedRegistration(item);
    setIsViewOpen(true);
  };

 

  const filteredData = data.filter(item =>
    (item.companyName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (item.registrationNumber?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (item.type?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

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
        <h2 className="text-2xl font-bold text-gray-900">Company Registrations</h2>
        <div className="flex flex-wrap gap-2">
         
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
            placeholder="Search by company name, registration number, or type..."
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
        <div className="text-center py-8 text-gray-600">Loading company registrations...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : (
        <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
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
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No company registrations found.</td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.companyName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.registrationNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Active' ? 'bg-green-100 text-green-800' :
                        item.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                        item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(item)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
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


      {isViewOpen && selectedRegistration && (
        <DataView
          isOpen={isViewOpen}
          onClose={() => {
            setIsViewOpen(false);
            setSelectedRegistration(null);
          }}
          data={selectedRegistration}
          fields={viewFields}
          title="Company Registration Details"
        />
      )}
    </div>
  );
} 