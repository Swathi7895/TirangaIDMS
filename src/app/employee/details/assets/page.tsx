import React from 'react';
import Link from 'next/link';

export default function EmployeeAssetsPage() {
  const assetTypes = [
    { name: 'Phone', href: '/employee/details/assets/phone' },
    { name: 'SIM', href: '/employee/details/assets/sim' },
    { name: 'IDCard', href: '/employee/details/assets/idcard' },
    { name: 'Laptop/System', href: '/employee/details/assets/laptop' },
    { name: 'Vehicle', href: '/employee/details/assets/vehicle' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Employees Handling Assets</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Select Asset Type</h2>
        <ul className="space-y-4">
          {assetTypes.map((asset, index) => (
            <li key={index}>
              <Link href={asset.href} className="text-lg text-blue-600 hover:underline">
                {asset.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 