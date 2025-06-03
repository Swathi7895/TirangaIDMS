import React from 'react';

export default function VehicleAssetPage() {
  const vehicleDetails = {
    make: 'Toyota',
    model: 'Camry',
    year: '2020',
    licensePlate: 'ABC-123',
    assignedDate: '2022-03-10',
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Assigned Vehicle Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Make:</p>
            <p className="mt-1 text-lg text-gray-900">{vehicleDetails.make}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Model:</p>
            <p className="mt-1 text-lg text-gray-900">{vehicleDetails.model}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Year:</p>
            <p className="mt-1 text-lg text-gray-900">{vehicleDetails.year}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">License Plate:</p>
            <p className="mt-1 text-lg text-gray-900">{vehicleDetails.licensePlate}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Assigned Date:</p>
            <p className="mt-1 text-lg text-gray-900">{vehicleDetails.assignedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 