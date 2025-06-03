import React from 'react';

export default function LabComponentsPage() {
  const componentsData = [
    { name: 'Resistor 1k ohm', quantity: '100', bin: 'A1' },
    { name: 'Capacitor 10uF', quantity: '50', bin: 'A2' },
    // Add more sample data here
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Lab Components</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bin Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {componentsData.map((component, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{component.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{component.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{component.bin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 