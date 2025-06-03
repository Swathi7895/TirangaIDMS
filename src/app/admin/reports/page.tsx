'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Calendar, 
  Factory, 
  UserCheck, 
  MapPin, 
  Target, 
  ClipboardCheck, 
  FileSearch, 
  FileSpreadsheet,
  Plus,
  Filter,
  Search,
  ArrowRight,
  Download,
  Eye
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  path: string;
  description: string;
  lastUpdated?: string;
  createdBy: string;
  department: string;
  status: 'pending' | 'approved' | 'rejected';
  subReports?: { name: string; path: string; }[];
}

// Sample data - In real application, this would come from an API
const reports: Report[] = [
  {
    id: 'employee-reports-1',
    name: 'Employee Performance Report',
    icon: Users,
    color: 'bg-blue-500',
    path: '/admin/reports/employee/1',
    description: 'Monthly performance report for March 2024',
    lastUpdated: '2024-03-15',
    createdBy: 'John Doe',
    department: 'Sales',
    status: 'approved',
    subReports: [
      { name: 'Daily Activities', path: '/daily' },
      { name: 'Weekly Summary', path: '/weekly' },
      { name: 'Monthly Overview', path: '/monthly' }
    ]
  },
  {
    id: 'visit-report-1',
    name: 'Customer Visit Report',
    icon: Calendar,
    color: 'bg-green-500',
    path: '/admin/reports/visit/1',
    description: 'Visit report for Tech Solutions Inc.',
    lastUpdated: '2024-03-14',
    createdBy: 'Jane Smith',
    department: 'Customer Relations',
    status: 'pending'
  },
  // Add more sample reports as needed
];

export default function AdminReports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || report.id.includes(selectedFilter);
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesFilter && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Employee Reports</h2>
          <p className="mt-1 text-sm text-gray-500">View and manage reports from all employees</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Download className="w-5 h-5 mr-2" />
            Export All
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Create Report
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reports by name, description, or employee..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="employee">Employee Reports</option>
            <option value="visit">Visit Reports</option>
            <option value="customer">Customer Reports</option>
          </select>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-lg ${report.color}`}>
                <report.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">
                  Updated: {report.lastUpdated}
                </span>
                <span className={`text-sm px-2 py-1 rounded-full mt-1 ${
                  report.status === 'approved' ? 'bg-green-100 text-green-800' :
                  report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </span>
              </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{report.name}</h3>
            <p className="mt-2 text-sm text-gray-600">{report.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              Created by: {report.createdBy}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Department: {report.department}
            </div>
            {report.subReports && (
              <div className="mt-4 space-y-1">
                {report.subReports.map((subReport, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    • {subReport.name}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 flex items-center justify-between">
              <Link
                href={report.path}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Link>
              <button className="flex items-center text-sm text-green-600 hover:text-green-800">
                <Download className="w-4 h-4 mr-1" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 