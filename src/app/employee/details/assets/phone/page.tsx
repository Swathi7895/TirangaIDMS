import React from 'react';

export default function PhoneAssetPage() {
  const phoneDetails = {
    brand: 'Samsung',
    model: 'Galaxy S21',
    serialNumber: 'SN123456789',
    assignedDate: '2022-05-10',
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Assigned Phone Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Brand:</p>
            <p className="mt-1 text-lg text-gray-900">{phoneDetails.brand}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Model:</p>
            <p className="mt-1 text-lg text-gray-900">{phoneDetails.model}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Serial Number:</p>
            <p className="mt-1 text-lg text-gray-900">{phoneDetails.serialNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Assigned Date:</p>
            <p className="mt-1 text-lg text-gray-900">{phoneDetails.assignedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 