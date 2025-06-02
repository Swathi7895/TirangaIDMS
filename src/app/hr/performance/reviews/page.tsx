'use client';

import { useState } from 'react';
import { ClipboardDocumentCheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface PerformanceReview {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  position: string;
  reviewPeriod: {
    start: string;
    end: string;
  };
  reviewType: 'Annual' | 'Quarterly' | 'Probation' | 'Project';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  reviewer: string;
  dueDate: string;
  metrics: {
    overall: number;
    categories: {
      technical: number;
      communication: number;
      leadership: number;
      initiative: number;
    };
  };
  goals: {
    achieved: string[];
    pending: string[];
  };
  feedback: {
    strengths: string[];
    areas: string[];
    comments: string;
  };
}

export default function PerformanceReviewsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [reviews] = useState<PerformanceReview[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      reviewPeriod: {
        start: '2024-01-01',
        end: '2024-03-31'
      },
      reviewType: 'Quarterly',
      status: 'In Progress',
      reviewer: 'Jane Smith',
      dueDate: '2024-04-15',
      metrics: {
        overall: 4.2,
        categories: {
          technical: 4.5,
          communication: 4.0,
          leadership: 4.3,
          initiative: 4.1
        }
      },
      goals: {
        achieved: [
          'Completed project X ahead of schedule',
          'Implemented new testing framework'
        ],
        pending: [
          'Improve documentation coverage',
          'Mentor junior team members'
        ]
      },
      feedback: {
        strengths: [
          'Strong technical skills',
          'Excellent problem-solving abilities'
        ],
        areas: [
          'Documentation needs improvement',
          'Could take more initiative in team leadership'
        ],
        comments: 'Overall strong performance with room for growth in leadership.'
      }
    },
    // Add more sample data as needed
  ]);

  const filteredReviews = reviews.filter(review =>
    review.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: PerformanceReview['status']) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'In Progress':
        return 'text-blue-600 dark:text-blue-400';
      case 'Completed':
        return 'text-green-600 dark:text-green-400';
      case 'Overdue':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getReviewTypeColor = (type: PerformanceReview['reviewType']) => {
    switch (type) {
      case 'Annual':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Quarterly':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Probation':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Project':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <ClipboardDocumentCheckIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Performance Reviews
            </h1>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Schedule New Review
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

        {/* Reviews Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Review Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Reviewer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Overall Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredReviews.map((review) => (
                <tr key={review.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {review.employeeName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {review.employeeId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {review.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getReviewTypeColor(review.reviewType)}`}>
                      {review.reviewType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {review.reviewPeriod.start} to {review.reviewPeriod.end}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {review.reviewer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {review.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {review.metrics.overall}/5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`${getStatusColor(review.status)}`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      View Details
                    </button>
                    {review.status === 'Pending' && (
                      <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                        Start Review
                      </button>
                    )}
                    {review.status === 'In Progress' && (
                      <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                        Complete Review
                      </button>
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