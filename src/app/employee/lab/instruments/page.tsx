import React from 'react';

export default function LabInstrumentsPage() {
  const instrumentsData = [
    { name: 'Oscilloscope', quantity: '5', location: 'Lab A' },
    { name: 'Spectrum Analyzer', quantity: '3', location: 'Lab B' },
    // Add more sample data here
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Lab Instruments</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instrument Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {instrumentsData.map((instrument, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{instrument.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{instrument.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{instrument.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 