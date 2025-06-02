'use client';

import { useState } from 'react';
import { ArrowTrendingUpIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Promotion {
  id: string;
  employeeName: string;
  employeeId: string;
  currentPosition: string;
  newPosition: string;
  department: string;
  promotionDate: string;
  effectiveDate: string;
  salaryIncrease: {
    percentage: number;
    amount: number;
    currency: string;
  };
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  approvedBy: string;
  approvedDate: string;
  reason: string;
  performanceMetrics: {
    rating: number;
    achievements: string[];
  };
}

export default function PromotionsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [promotions] = useState<Promotion[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      currentPosition: 'Software Engineer',
      newPosition: 'Senior Software Engineer',
      department: 'Engineering',
      promotionDate: '2024-03-15',
      effectiveDate: '2024-04-01',
      salaryIncrease: {
        percentage: 15,
        amount: 18000,
        currency: 'USD'
      },
      status: 'Pending',
      approvedBy: 'Jane Smith',
      approvedDate: '2024-03-20',
      reason: 'Outstanding performance and leadership',
      performanceMetrics: {
        rating: 4.5,
        achievements: [
          'Led successful project delivery',
          'Mentored junior developers',
          'Improved code quality metrics'
        ]
      }
    },
    // Add more sample data as needed
  ]);

  const filteredPromotions = promotions.filter(promotion =>
    promotion.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promotion.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promotion.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Promotion['status']) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Approved':
        return 'text-green-600 dark:text-green-400';
      case 'Rejected':
        return 'text-red-600 dark:text-red-400';
      case 'Completed':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const formatSalaryIncrease = (increase: Promotion['salaryIncrease']) => {
    return `${increase.percentage}% (${increase.currency} ${increase.amount.toLocaleString()})`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <ArrowTrendingUpIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Promotions Management
            </h1>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Initiate New Promotion
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by employee name, ID, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Promotions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Employee ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Current Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  New Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Promotion Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Effective Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Salary Increase
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Performance Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPromotions.map((promotion) => (
                <tr key={promotion.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {promotion.employeeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {promotion.employeeId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {promotion.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {promotion.currentPosition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {promotion.newPosition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {promotion.promotionDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {promotion.effectiveDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatSalaryIncrease(promotion.salaryIncrease)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`${getStatusColor(promotion.status)}`}>
                      {promotion.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {promotion.performanceMetrics.rating}/5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      View Details
                    </button>
                    {promotion.status === 'Pending' && (
                      <>
                        <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 mr-3">
                          Approve
                        </button>
                        <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 