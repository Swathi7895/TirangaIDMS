import React from 'react';
import Link from 'next/link';

export default function LeaveManagementPage() {
  const leaveOptions = [
    { name: 'Leave Application', href: '/employee/details/leave/apply' },
    { name: 'Approved Leaves', href: '/employee/details/leave/approved' },
    { name: 'Non-Approved Leaves', href: '/employee/details/leave/non-approved' },
    { name: 'Holiday Leaves', href: '/employee/details/leave/holidays' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Leave Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Select Leave Option</h2>
        <ul className="space-y-4">
          {leaveOptions.map((option, index) => (
            <li key={index}>
              <Link href={option.href} className="text-lg text-blue-600 hover:underline">
                {option.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 