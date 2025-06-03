import React from 'react';

export default function WeeklyAttendancePage() {
  const weeklyData = [
    { week: 'Week 43', totalHours: '45', status: 'Regular' },
    { week: 'Week 42', totalHours: '42', status: 'Regular' },
    // Add more sample data here
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Weekly Attendance</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {weeklyData.map((record, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.week}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.totalHours}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 