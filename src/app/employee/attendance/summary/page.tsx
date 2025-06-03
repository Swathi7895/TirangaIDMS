import React from 'react';

export default function AttendanceSummaryPage() {
  const summaryData = [
    { period: 'Last 30 Days', totalHours: '185', averageHours: '9.25', onTimeArrival: '95%' },
    { period: 'Last 90 Days', totalHours: '550', averageHours: '9.17', onTimeArrival: '93%' },
    // Add more sample data here
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Attendance Summary</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Hours/Day</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On-Time Arrival</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {summaryData.map((record, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.period}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.totalHours}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.averageHours}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.onTimeArrival}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 