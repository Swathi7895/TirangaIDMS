'use client';

import { useState } from 'react';
import { 
  Briefcase,
  Upload,
  Download,
  Trash2,
  Search,
  Filter,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Laptop,
  Smartphone,
  Car,
  Headphones
} from 'lucide-react';
import Link from 'next/link';

interface Asset {
  id: string;
  employeeName: string;
  assetType: string;
  assetName: string;
  issueDate: string;
  status: 'active' | 'pending' | 'returned';
  category: 'electronics' | 'accessories' | 'vehicles';
}

export default function AssetManagement() {
  const [activeTab, setActiveTab] = useState('all');
  const [assets] = useState<Asset[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      assetType: 'Laptop',
      assetName: 'MacBook Pro 2023',
      issueDate: '2024-01-15',
      status: 'active',
      category: 'electronics'
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      assetType: 'Headphones',
      assetName: 'Sony WH-1000XM4',
      issueDate: '2024-02-01',
      status: 'pending',
      category: 'accessories'
    },
    {
      id: '3',
      employeeName: 'Mike Johnson',
      assetType: 'Company Car',
      assetName: 'Toyota Camry 2023',
      issueDate: '2024-01-20',
      status: 'returned',
      category: 'vehicles'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'returned':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'returned':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'electronics':
        return <Laptop className="w-6 h-6" />;
      case 'accessories':
        return <Headphones className="w-6 h-6" />;
      case 'vehicles':
        return <Car className="w-6 h-6" />;
      default:
        return <Briefcase className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/hr" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
              <p className="text-gray-600">Track company assets issued to employees</p>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Upload className="w-5 h-5 mr-2" />
            Issue New Asset
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Assets</p>
                <p className="text-xl font-semibold text-gray-900">150</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Laptop className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Electronics</p>
                <p className="text-xl font-semibold text-gray-900">75</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Headphones className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Accessories</p>
                <p className="text-xl font-semibold text-gray-900">45</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Car className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Vehicles</p>
                <p className="text-xl font-semibold text-gray-900">30</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Link href="/hr/assets/electronics" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Laptop className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Electronics</h3>
                <p className="text-sm text-gray-600">Laptops, phones, and other devices</p>
              </div>
            </div>
          </Link>
          <Link href="/hr/assets/accessories" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Headphones className="w-8 h-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Accessories</h3>
                <p className="text-sm text-gray-600">Headphones, chargers, and more</p>
              </div>
            </div>
          </Link>
          <Link href="/hr/assets/vehicles" className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Car className="w-8 h-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Vehicles</h3>
                <p className="text-sm text-gray-600">Company cars and transportation</p>
              </div>
            </div>
          </Link>
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
              All Assets
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'active' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('active')}
            >
              Active
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'returned' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('returned')}
            >
              Returned
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
                placeholder="Search assets..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            Filter
          </button>
        </div>

        {/* Assets Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
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
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{asset.employeeName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{asset.assetType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{asset.assetName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      {getCategoryIcon(asset.category)}
                      <span className="ml-2 capitalize">{asset.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{asset.issueDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                      {getStatusIcon(asset.status)}
                      <span className="ml-1 capitalize">{asset.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Download className="w-4 h-4 inline" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      <CheckCircle2 className="w-4 h-4 inline" />
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