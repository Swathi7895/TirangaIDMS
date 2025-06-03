'use client';

import { useState } from 'react';
import { 
  FileText,
  Upload,
  Download,
  Trash2,
  Search,
  Filter,
  ArrowLeft,
  FileCheck,
  FileX,
  File,
  Mail
} from 'lucide-react';
import Link from 'next/link';

interface OfferLetter {
  id: string;
  employeeName: string;
  position: string;
  fileName: string;
  uploadDate: string;
  status: 'verified' | 'pending' | 'expired';
  joiningDate: string;
}

export default function OfferLettersManagement() {
  const [activeTab, setActiveTab] = useState('all');
  const [offerLetters] = useState<OfferLetter[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      position: 'Software Engineer',
      fileName: 'john_doe_offer.pdf',
      uploadDate: '2024-01-15',
      status: 'verified',
      joiningDate: '2024-02-01'
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      position: 'Product Manager',
      fileName: 'jane_smith_offer.pdf',
      uploadDate: '2024-02-01',
      status: 'pending',
      joiningDate: '2024-03-01'
    },
    {
      id: '3',
      employeeName: 'Mike Johnson',
      position: 'UI/UX Designer',
      fileName: 'mike_johnson_offer.pdf',
      uploadDate: '2024-01-20',
      status: 'expired',
      joiningDate: '2024-02-20'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'expired':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <FileCheck className="w-5 h-5" />;
      case 'expired':
        return <FileX className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/hr/documents" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Documents
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Offer Letters Management</h1>
              <p className="text-gray-600">Manage employee offer letters and joining details</p>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Upload className="w-5 h-5 mr-2" />
            Upload Offer Letter
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Offer Letters</p>
                <p className="text-xl font-semibold text-gray-900">45</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileCheck className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-xl font-semibold text-gray-900">35</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <File className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-semibold text-gray-900">10</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Offer Letters
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Verification
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'expired' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('expired')}
            >
              Expired
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search offer letters..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            Filter
          </button>
        </div>

        {/* Offer Letters Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joining Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {offerLetters.map((letter) => (
                <tr key={letter.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{letter.employeeName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{letter.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{letter.fileName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{letter.uploadDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{letter.joiningDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(letter.status)}`}>
                      {getStatusIcon(letter.status)}
                      <span className="ml-1 capitalize">{letter.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Download className="w-4 h-4 inline" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      <FileCheck className="w-4 h-4 inline" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 