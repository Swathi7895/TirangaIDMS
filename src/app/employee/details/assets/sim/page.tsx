import React from 'react';

export default function SimAssetPage() {
  const simDetails = {
    phoneNumber: '+1 123-456-7890',
    carrier: 'GlobalNet',
    simNumber: '8901410xxxxxxxx',
    assignedDate: '2022-06-01',
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Assigned SIM Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Phone Number:</p>
            <p className="mt-1 text-lg text-gray-900">{simDetails.phoneNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Carrier:</p>
            <p className="mt-1 text-lg text-gray-900">{simDetails.carrier}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">SIM Number:</p>
            <p className="mt-1 text-lg text-gray-900">{simDetails.simNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Assigned Date:</p>
            <p className="mt-1 text-lg text-gray-900">{simDetails.assignedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 