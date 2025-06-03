'use client';

import { useState } from 'react';
import { 
  ClipboardCheck,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface Activity {
  id: string;
  employeeName: string;
  department: string;
  weekStart: string;
  weekEnd: string;
  status: 'completed' | 'pending' | 'overdue';
  tasks: {
    id: string;
    title: string;
    status: 'completed' | 'pending';
  }[];
  hoursLogged: number;
  comments: string;
}

const WeeklyActivities = () => {
  const [activeTab, setActiveTab] = useState('reports');
  const [activities] = useState<Activity[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      department: 'Engineering',
      weekStart: '2024-03-18',
      weekEnd: '2024-03-24',
      status: 'completed',
      tasks: [
        { id: '1', title: 'Complete API Integration', status: 'completed' },
        { id: '2', title: 'Code Review', status: 'completed' },
        { id: '3', title: 'Documentation Update', status: 'completed' }
      ],
      hoursLogged: 40,
      comments: 'All tasks completed successfully'
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      department: 'Marketing',
      weekStart: '2024-03-18',
      weekEnd: '2024-03-24',
      status: 'pending',
      tasks: [
        { id: '1', title: 'Social Media Campaign', status: 'completed' },
        { id: '2', title: 'Content Creation', status: 'pending' },
        { id: '3', title: 'Analytics Report', status: 'pending' }
      ],
      hoursLogged: 32,
      comments: 'Working on content creation'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'overdue':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className='mb-10'>
          <Link href="/hr" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            </div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
          
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Weekly Activities</h1>
              <p className="text-gray-600">Track employee work reports and checklists</p>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            New Report
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ClipboardCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-xl font-semibold text-gray-900">45</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-semibold text-gray-900">30</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('reports')}
            >
              Weekly Reports
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'checklists' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('checklists')}
            >
              Checklists
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Previous Week
          </button>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-gray-900 font-medium">March 18 - March 24, 2024</span>
          </div>
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            Next Week
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            Filter
          </button>
        </div>

        {/* Weekly Reports Table */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tasks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hours Logged
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{activity.employeeName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{activity.department}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {activity.tasks.map((task) => (
                          <div key={task.id} className="flex items-center mb-1">
                            <CheckCircle2 className={`w-4 h-4 mr-2 ${
                              task.status === 'completed' ? 'text-green-500' : 'text-gray-300'
                            }`} />
                            <span>{task.title}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{activity.hoursLogged} hours</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {getStatusIcon(activity.status)}
                        <span className="ml-1 capitalize">{activity.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Analytics Section */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Completion Rate</h3>
              <div className="h-64 flex items-center justify-center">
                <BarChart2 className="w-16 h-16 text-gray-400" />
                {/* Add chart component here */}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hours Logged Distribution</h3>
              <div className="h-64 flex items-center justify-center">
                <BarChart2 className="w-16 h-16 text-gray-400" />
                {/* Add chart component here */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyActivities; 