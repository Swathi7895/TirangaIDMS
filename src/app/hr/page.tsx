'use client';

import Link from 'next/link';
import { 
  Users, 
  Calendar, 
  Target, 
  ClipboardCheck, 
  BarChart2,
  UserCheck,
  Award,
  FileText,
  Briefcase,
  Building2,
  Settings,
  Bell,
  Mail,
  Plus,
  ArrowRight
} from 'lucide-react';

interface Module {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  path: string;
  description: string;
}

const modules: Module[] = [
  {
    id: 'documents',
    name: 'Employee Documents',
    icon: FileText,
    color: 'bg-green-600',
    path: '/hr/documents',
    description: 'Manage resume, ID proof, offer letter and more'
  },
  {
    id: 'assets',
    name: 'Assets Issued',
    icon: Briefcase,
    color: 'bg-green-600',
    path: '/hr/assets/accessories',
    description: 'Track phones, SIMs, laptops, and more issued to employees'
  },
  {
    id: 'leave-management',
    name: 'Leave Management',
    icon: Calendar,
    color: 'bg-green-600',
    path: '/hr/leaves',
    description: 'Approve or view employee leave records'
  },
  {
    id: 'employee-performance',
    name: 'Performance',
    icon: Target,
    color: 'bg-green-600',
    path: '/hr/performance',
    description: 'Monitor promotions, applications, and positions'
  },
  {
    id: 'joining-releaving',
    name: 'Joining / Releaving',
    icon: UserCheck,
    color: 'bg-green-600',
    path: '/hr/joining',
    description: 'View joining or relieving details'
  },
  {
    id: 'weekly-activities',
    name: 'Weekly Activities',
    icon: ClipboardCheck,
    color: 'bg-green-600',
    path: '/hr/weekly-activities',
    description: 'Track weekly work reports and checklists'
  }
];


export default function HRMain() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Building2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">HR Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Bell className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Mail className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back, HR Manager</h2>
          <p className="mt-2 text-gray-600">Here's an overview of your HR management system</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Plus className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-gray-700">Add Employee</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Calendar className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-gray-700">Manage Leave</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <FileText className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-gray-700">Generate Reports</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Settings className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-gray-700">Settings</span>
          </button>
        </div>

        {/* Main Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Link
              key={module.id}
              href={module.path}
              className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg ${module.color}`}>
                  <module.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{module.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{module.description}</p>
              <div className="mt-4 flex items-center text-sm text-blue-600">
                View details
                <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}