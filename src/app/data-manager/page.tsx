'use client';

import Link from 'next/link';
import { 
  BarChart2, 
  FileText, 
  Building2, 
  CreditCard, 
  Receipt, 
  Calculator, 
  Gavel, 
  LineChart,
  ArrowRight
} from 'lucide-react';

interface Module {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  path: string;
  count: number;
}

const modules: Module[] = [
  {
    id: 'sales-purchase',
    name: 'Sales & Purchase',
    icon: BarChart2,
    color: 'bg-blue-500',
    path: '/data-manager/sales-purchase',
    count: 12
  },
  {
    id: 'logistics',
    name: 'Logistics Documents',
    icon: FileText,
    color: 'bg-green-500',
    path: '/data-manager/logistics',
    count: 8
  },
  {
    id: 'registration',
    name: 'Company Registration',
    icon: Building2,
    color: 'bg-purple-500',
    path: '/data-manager/registration',
    count: 5
  },
  {
    id: 'bank',
    name: 'Bank Documents',
    icon: CreditCard,
    color: 'bg-yellow-500',
    path: '/data-manager/bank',
    count: 15
  },
  {
    id: 'billing',
    name: 'Billing Management',
    icon: Receipt,
    color: 'bg-red-500',
    path: '/data-manager/billing',
    count: 20
  },
  {
    id: 'ca',
    name: 'CA Documents',
    icon: Calculator,
    color: 'bg-indigo-500',
    path: '/data-manager/ca',
    count: 7
  },
  {
    id: 'tender',
    name: 'Tender Management',
    icon: Gavel,
    color: 'bg-orange-500',
    path: '/data-manager/tender',
    count: 10
  },
  {
    id: 'finance',
    name: 'Finance Reports',
    icon: LineChart,
    color: 'bg-teal-500',
    path: '/data-manager/finance',
    count: 25
  }
];

export default function DataManagerDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Data Manager Dashboard</h2>
        <p className="mt-1 text-sm text-gray-500">Overview of all data management features</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <span className="text-sm font-medium text-gray-500">
                {module.count} items
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{module.name}</h3>
            <div className="mt-2 flex items-center text-sm text-blue-600">
              View details
              <ArrowRight className="ml-1 w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-600">New tender submitted - IT Infrastructure Upgrade</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Bank statement updated - March 2024</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-gray-600">CA document pending review - Annual Audit</span>
            </div>
          </div>
        </div>
{/* 
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Link href="/data-manager/finance" className="p-3 text-left text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              Generate New Report
            </Link>
            <Link href="/data-manager/logistics" className="p-3 text-left text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              Upload Documents
            </Link>
            <Link href="/data-manager/tender" className="p-3 text-left text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              View Pending Tasks
            </Link>
            <Link href="/data-manager/finance" className="p-3 text-left text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              Export Data
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
} 