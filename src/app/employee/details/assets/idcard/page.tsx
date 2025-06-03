import React from 'react';

export default function IdCardAssetPage() {
  const idCardDetails = {
    cardType: 'Employee ID',
    cardNumber: 'EMP123456',
    issueDate: '2022-01-15',
    expiryDate: '2025-01-15',
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Assigned ID Card Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Card Type:</p>
            <p className="mt-1 text-lg text-gray-900">{idCardDetails.cardType}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Card Number:</p>
            <p className="mt-1 text-lg text-gray-900">{idCardDetails.cardNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Issue Date:</p>
            <p className="mt-1 text-lg text-gray-900">{idCardDetails.issueDate}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Expiry Date:</p>
            <p className="mt-1 text-lg text-gray-900">{idCardDetails.expiryDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 