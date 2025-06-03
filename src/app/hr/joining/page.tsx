'use client';

import { useState } from 'react';
import { 
  UserCheck,
  UserX,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
  Briefcase,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface Employee {
  id: string;
  name: string;
  type: 'joining' | 'releaving';
  department: string;
  position: string;
  date: string;
  status: 'pending' | 'in-progress' | 'completed';
  documents: {
    id: string;
    name: string;
    status: 'pending' | 'completed';
  }[];
  tasks: {
    id: string;
    title: string;
    status: 'pending' | 'completed';
  }[];
}

const JoiningReleaving = () => {
  const [activeTab, setActiveTab] = useState('joining');
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      name: 'John Doe',
      type: 'joining',
      department: 'Engineering',
      position: 'Senior Developer',
      date: '2024-04-01',
      status: 'pending',
      documents: [
        { id: '1', name: 'Offer Letter', status: 'completed' },
        { id: '2', name: 'ID Proof', status: 'pending' },
        { id: '3', name: 'Address Proof', status: 'pending' }
      ],
      tasks: [
        { id: '1', title: 'System Access Setup', status: 'pending' },
        { id: '2', title: 'Email Account Creation', status: 'pending' },
        { id: '3', title: 'Equipment Issuance', status: 'pending' }
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      type: 'releaving',
      department: 'Marketing',
      position: 'Marketing Manager',
      date: '2024-03-31',
      status: 'in-progress',
      documents: [
        { id: '1', name: 'Exit Interview', status: 'completed' },
        { id: '2', name: 'Asset Return', status: 'completed' },
        { id: '3', name: 'Final Settlement', status: 'pending' }
      ],
      tasks: [
        { id: '1', title: 'Knowledge Transfer', status: 'completed' },
        { id: '2', title: 'System Access Removal', status: 'pending' },
        { id: '3', title: 'Final Documentation', status: 'pending' }
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in-progress':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'in-progress':
        return <Clock className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
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
              <h1 className="text-2xl font-bold text-gray-900">Joining / Releaving</h1>
              <p className="text-gray-600">Manage employee onboarding and offboarding</p>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            New Process
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">New Joinings</p>
                <p className="text-xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <UserX className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Releaving</p>
                <p className="text-xl font-semibold text-gray-900">5</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Documents Pending</p>
                <p className="text-xl font-semibold text-gray-900">8</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Tasks Pending</p>
                <p className="text-xl font-semibold text-gray-900">15</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'joining' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('joining')}
            >
              New Joinings
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'releaving' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('releaving')}
            >
              Releaving
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search employees..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            Filter
          </button>
        </div>

        {/* Employees Table */}
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
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tasks
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
              {employees
                .filter(emp => emp.type === activeTab)
                .map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {employee.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center mb-1">
                            <CheckCircle2 className={`w-4 h-4 mr-2 ${
                              doc.status === 'completed' ? 'text-green-500' : 'text-gray-300'
                            }`} />
                            <span>{doc.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {employee.tasks.map((task) => (
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
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                        {getStatusIcon(employee.status)}
                        <span className="ml-1 capitalize">{employee.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900">Update</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JoiningReleaving; 