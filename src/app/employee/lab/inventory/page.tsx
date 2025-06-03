import React from 'react';

export default function LabInventoryPage() {
  const inventoryData = [
    { item: 'Resistor 1k ohm', type: 'Component', quantity: '10', date: '2023-10-26', transaction: 'Out' },
    { item: 'Oscilloscope', type: 'Instrument', quantity: '1', date: '2023-10-25', transaction: 'In' },
    // Add more sample data here
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Lab Materials In/Out Details</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Type</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventoryData.map((record, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.item}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.transaction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 