'use client';

import { useState, useEffect } from 'react';
import { Plus, Upload, Download, Search, Filter, Eye, Edit, ArrowLeft } from 'lucide-react';
import DataForm, { FormField } from '../components/DataForm';
import DataView, { ViewField } from '../components/DataView';
import Link from 'next/link';
interface FinanceReport {
  id: number;
  reportType: string;
  period: string;
  date: string;
  status: 'Draft' | 'Final' | 'Under Review' | 'Approved';
  amount: number;
  department: string;
  preparedBy: string;
}

const formFields: FormField[] = [
  { name: 'reportType', label: 'Report Type', type: 'select', options: ['Income Statement', 'Balance Sheet', 'Cash Flow', 'Profit & Loss'], required: true },
  { name: 'period', label: 'Period', type: 'text', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'status', label: 'Status', type: 'select', options: ['Draft', 'Final', 'Under Review', 'Approved'], required: true },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
  { name: 'department', label: 'Department', type: 'text', required: true },
  { name: 'preparedBy', label: 'Prepared By', type: 'text', required: true }
];

const viewFields: ViewField[] = [
  { name: 'reportType', label: 'Report Type', type: 'text' },
  { name: 'period', label: 'Period', type: 'text' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'status', label: 'Status', type: 'status' },
  { name: 'amount', label: 'Amount', type: 'currency' },
  { name: 'department', label: 'Department', type: 'text' },
  { name: 'preparedBy', label: 'Prepared By', type: 'text' }
];

export default function FinancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<FinanceReport | null>(null);
  const [data, setData] = useState<FinanceReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:8080/api/financereports';

  // --- Data Fetching (GET) ---
  const fetchReports = async () => {
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
      setError(`Failed to fetch reports: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

 

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Report Type,Period,Date,Status,Amount,Department,Prepared By\n"
      + data.map(item => [
        item.reportType,
        item.period,
        item.date,
        item.status,
        item.amount,
        item.department,
        item.preparedBy
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
    setSelectedReport(item);
    setIsViewOpen(true);
  };




  const filteredData = data.filter(item =>
    (item.reportType?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (item.period?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (item.department?.toLowerCase() || '').includes(searchTerm.toLowerCase())
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
        <h2 className="text-2xl font-bold text-gray-900">Finance Reports</h2>
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
            placeholder="Search by report type, period, or department..."
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
        <div className="text-center py-8 text-gray-600">Loading finance reports...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : (
        <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">No finance reports found.</td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.reportType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Final' ? 'bg-green-100 text-green-800' :
                        item.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                        item.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.preparedBy}</td>
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


      {isViewOpen && selectedReport && (
        <DataView
          isOpen={isViewOpen}
          onClose={() => {
            setIsViewOpen(false);
            setSelectedReport(null);
          }}
          data={selectedReport}
          fields={viewFields}
          title="Finance Report Details"
        />
      )}
    </div>
  );
} 