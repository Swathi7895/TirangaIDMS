'use client';

import { useState } from 'react';
import { FlagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Goal {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  title: string;
  description: string;
  category: 'Professional' | 'Personal' | 'Team' | 'Project';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed';
  startDate: string;
  targetDate: string;
  completionDate?: string;
  progress: number;
  metrics: {
    target: string;
    current: string;
    unit: string;
  };
  dependencies: string[];
  milestones: {
    title: string;
    dueDate: string;
    completed: boolean;
  }[];
  comments: string[];
}

export default function GoalsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [goals] = useState<Goal[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      title: 'Improve Code Quality Metrics',
      description: 'Implement automated testing and improve code coverage across the project',
      category: 'Professional',
      priority: 'High',
      status: 'In Progress',
      startDate: '2024-01-01',
      targetDate: '2024-06-30',
      progress: 65,
      metrics: {
        target: '90',
        current: '65',
        unit: '%'
      },
      dependencies: [
        'Set up CI/CD pipeline',
        'Train team on testing practices'
      ],
      milestones: [
        {
          title: 'Set up testing framework',
          dueDate: '2024-02-15',
          completed: true
        },
        {
          title: 'Achieve 70% coverage',
          dueDate: '2024-04-30',
          completed: true
        },
        {
          title: 'Achieve 90% coverage',
          dueDate: '2024-06-30',
          completed: false
        }
      ],
      comments: [
        'Testing framework successfully implemented',
        'Team training completed'
      ]
    },
    // Add more sample data as needed
  ]);

  const filteredGoals = goals.filter(goal =>
    goal.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    goal.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    goal.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'Not Started':
        return 'text-gray-600 dark:text-gray-400';
      case 'In Progress':
        return 'text-blue-600 dark:text-blue-400';
      case 'Completed':
        return 'text-green-600 dark:text-green-400';
      case 'Delayed':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: Goal['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryColor = (category: Goal['category']) => {
    switch (category) {
      case 'Professional':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Personal':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Team':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Project':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FlagIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Goals Management
            </h1>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Set New Goal
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by employee name, ID, or goal title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Goals Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Goal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Target Date
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
              {filteredGoals.map((goal) => (
                <tr key={goal.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {goal.employeeName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {goal.employeeId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {goal.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {goal.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(goal.category)}`}>
                      {goal.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(goal.priority)}`}>
                      {goal.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                      {goal.progress}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {goal.targetDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`${getStatusColor(goal.status)}`}>
                      {goal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      View Details
                    </button>
                    {goal.status !== 'Completed' && (
                      <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                        Update Progress
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