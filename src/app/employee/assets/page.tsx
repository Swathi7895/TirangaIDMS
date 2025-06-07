'use client';
import React from 'react';
import { Laptop, Smartphone, CreditCard, Car, Wifi, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Asset {
  id: number;
  name: string;
  type: 'laptop' | 'phone' | 'sim' | 'idCard' | 'vehicle';
  assignedDate: string;
  returnDate?: string;
  status: 'active' | 'returned' | 'maintenance';
  serialNumber: string;
  condition: 'good' | 'fair' | 'poor';
  notes?: string;
}

export default function AssetsPage() {
 const assets: Asset[] = [
    {
      id: 1,
      name: 'MacBook Pro 2023',
      type: 'laptop',
      assignedDate: '2024-01-01',
      status: 'active',
      serialNumber: 'MBP2023-001',
      condition: 'good'
    },
    {
      id: 2,
      name: 'iPhone 14',
      type: 'phone',
      assignedDate: '2024-01-01',
      status: 'active',
      serialNumber: 'IP14-001',
      condition: 'good'
    },
    {
      id: 3,
      name: 'Company ID Card',
      type: 'idCard',
      assignedDate: '2024-01-01',
      status: 'active',
      serialNumber: 'IDC-001',
      condition: 'good'
    },
    {
      id: 4,
      name: 'Company SIM Card',
      type: 'sim',
      assignedDate: '2024-01-01',
      status: 'active',
      serialNumber: 'SIM-001',
      condition: 'good'
    },
    {
      id: 5,
      name: 'Company Vehicle',
      type: 'vehicle',
      assignedDate: '2024-01-01',
      status: 'maintenance',
      serialNumber: 'VEH-001',
      condition: 'fair',
      notes: 'Regular maintenance due'
    }
  ];

  const getAssetIcon = (type: Asset['type']) => {
    switch (type) {
      case 'laptop':
        return <Laptop className="w-6 h-6 text-blue-600" />;
      case 'phone':
        return <Smartphone className="w-6 h-6 text-green-600" />;
      case 'sim':
        return <Wifi className="w-6 h-6 text-purple-600" />;
      case 'idCard':
        return <CreditCard className="w-6 h-6 text-orange-600" />;
      case 'vehicle':
        return <Car className="w-6 h-6 text-red-600" />;
    }
  };

  const getStatusColor = (status: Asset['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'returned':
        return 'bg-gray-100 text-gray-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getConditionColor = (condition: Asset['condition']) => {
    switch (condition) {
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/employee"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Assets</h1>
            <p className="mt-2 text-gray-600">View and manage your assigned company assets</p>
          </div>

          {/* Asset Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-green-600">
                    {assets.filter(a => a.status === 'active').length}
                  </p>
                  <p className="text-sm text-gray-600">Active Assets</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-yellow-600">
                    {assets.filter(a => a.status === 'maintenance').length}
                  </p>
                  <p className="text-sm text-gray-600">Under Maintenance</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-600">
                    {assets.filter(a => a.status === 'returned').length}
                  </p>
                  <p className="text-sm text-gray-600">Returned Assets</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Asset List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Asset List</h2>
            <div className="space-y-4">
              {assets.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getAssetIcon(asset.type)}
                    <div>
                      <p className="font-medium">{asset.name}</p>
                      <p className="text-sm text-gray-600">
                        Serial: {asset.serialNumber} | Assigned: {new Date(asset.assignedDate).toLocaleDateString()}
                      </p>
                      {asset.notes && (
                        <p className="text-sm text-yellow-600 mt-1">{asset.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                      {asset.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(asset.condition)}`}>
                      {asset.condition}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 