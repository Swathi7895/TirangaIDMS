'use client';

import { useState } from 'react';
import { UserPlusIcon, UserMinusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  type: 'Joining' | 'Relieving';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  date: string;
  documents: {
    name: string;
    status: 'Pending' | 'Received' | 'Verified';
    dueDate: string;
  }[];
  checklist: {
    item: string;
    status: 'Pending' | 'Completed';
    assignedTo: string;
  }[];
  notes: string[];
}

export default function JoiningRelievingManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      name: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      type: 'Joining',
      status: 'In Progress',
      date: '2024-04-01',
      documents: [
        {
          name: 'Offer Letter',
          status: 'Received',
          dueDate: '2024-03-15'
        },
        {
          name: 'ID Proofs',
          status: 'Pending',
          dueDate: '2024-03-20'
        },
        {
          name: 'Educational Certificates',
          status: 'Verified',
          dueDate: '2024-03-25'
        }
      ],
      checklist: [
        {
          item: 'Laptop Setup',
          status: 'Completed',
          assignedTo: 'IT Department'
        },
        {
          item: 'Email Account',
          status: 'Completed',
          assignedTo: 'IT Department'
        },
        {
          item: 'Access Card',
          status: 'Pending',
          assignedTo: 'Admin'
        }
      ],
      notes: [
        'Candidate requested early joining',
        'Need to expedite access card process'
      ]
    },
    // Add more sample data as needed
  ]);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Employee['status']) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'In Progress':
        return 'text-blue-600 dark:text-blue-400';
      case 'Completed':
        return 'text-green-600 dark:text-green-400';
      case 'Cancelled':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getDocumentStatusColor = (status: Employee['documents'][0]['status']) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Received':
        return 'text-blue-600 dark:text-blue-400';
      case 'Verified':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="flex items-center mr-8">
              <UserPlusIcon className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Joining/Relieving
              </h1>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <UserPlusIcon className="h-5 w-5 mr-2" />
              New Joining
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center">
              <UserMinusIcon className="h-5 w-5 mr-2" />
              New Relieving
            </button>
          </div>
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

        {/* Employees Table */}
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
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Checklist
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
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {employee.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {employee.employeeId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {employee.department}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {employee.position}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.type === 'Joining'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {employee.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {employee.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {employee.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between mb-1">
                          <span>{doc.name}</span>
                          <span className={`${getDocumentStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {employee.checklist.map((item, index) => (
                        <div key={index} className="flex items-center justify-between mb-1">
                          <span>{item.item}</span>
                          <span className={item.status === 'Completed' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      View Details
                    </button>
                    {employee.status !== 'Completed' && (
                      <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                        Update Status
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