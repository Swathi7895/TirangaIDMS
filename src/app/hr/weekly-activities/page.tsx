'use client';

import { useState } from 'react';
import { CalendarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Activity {
  id: string;
  title: string;
  type: 'Meeting' | 'Training' | 'Event' | 'Deadline' | 'Other';
  date: string;
  time: string;
  duration: string;
  location: string;
  organizer: string;
  participants: string[];
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  description: string;
  agenda?: string[];
  materials?: {
    name: string;
    type: string;
    url: string;
  }[];
  notes?: string[];
}

export default function WeeklyActivitiesManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activities] = useState<Activity[]>([
    {
      id: '1',
      title: 'New Employee Orientation',
      type: 'Training',
      date: '2024-03-25',
      time: '10:00 AM',
      duration: '2 hours',
      location: 'Conference Room A',
      organizer: 'Jane Smith',
      participants: [
        'John Doe',
        'Alice Johnson',
        'Bob Wilson'
      ],
      status: 'Scheduled',
      description: 'Orientation session for new employees joining this week',
      agenda: [
        'Company Overview',
        'HR Policies',
        'Benefits Introduction',
        'Team Introductions'
      ],
      materials: [
        {
          name: 'Orientation Guide',
          type: 'PDF',
          url: '/materials/orientation-guide.pdf'
        },
        {
          name: 'Benefits Overview',
          type: 'PDF',
          url: '/materials/benefits-overview.pdf'
        }
      ],
      notes: [
        'Please bring laptops for digital forms',
        'Snacks will be provided'
      ]
    },
    // Add more sample data as needed
  ]);

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'Scheduled':
        return 'text-blue-600 dark:text-blue-400';
      case 'In Progress':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Completed':
        return 'text-green-600 dark:text-green-400';
      case 'Cancelled':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getTypeColor = (type: Activity['type']) => {
    switch (type) {
      case 'Meeting':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Training':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Event':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Deadline':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Other':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Weekly Activities
            </h1>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Schedule New Activity
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by activity title, organizer, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Activities Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Organizer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Participants
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
              {filteredActivities.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {activity.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(activity.type)}`}>
                      {activity.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {activity.date}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {activity.time} ({activity.duration})
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {activity.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {activity.organizer}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {activity.participants.map((participant, index) => (
                        <div key={index}>{participant}</div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      View Details
                    </button>
                    {activity.status === 'Scheduled' && (
                      <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                        Start Activity
                      </button>
                    )}
                    {activity.status === 'In Progress' && (
                      <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                        Complete
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