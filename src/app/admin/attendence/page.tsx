'use client';
import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ArrowLeft,
  Users,
  TrendingUp,
  Search,
 
} from 'lucide-react';
import Link from 'next/link';
interface Employee {
  id: string;
  name: string;
  department: string;
  email: string;
}

interface AttendanceRecord {
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  signIn: string | null;
  signOut: string | null;
  status: 'present' | 'absent' | 'half-day' | 'late';
  workHours: number;
}

interface AttendanceStats {
  present?: number;
  late?: number;
  'half-day'?: number;
  absent?: number;
  total?: number;
  totalWorkHours: number;
  avgWorkHours: string;
}

export default function AdminAttendanceDashboard() {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);

  const [viewMode, setViewMode] = useState<'today' | 'week' | 'month' | 'year'>('today');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
 

  // Sample data initialization
  useEffect(() => {
    const sampleEmployees: Employee[] = [
      { id: '1', name: 'John Doe', department: 'Engineering', email: 'john@company.com' },
      { id: '2', name: 'Jane Smith', department: 'Marketing', email: 'jane@company.com' },
      { id: '3', name: 'Mike Johnson', department: 'Sales', email: 'mike@company.com' },
      { id: '4', name: 'Sarah Wilson', department: 'HR', email: 'sarah@company.com' },
      { id: '5', name: 'David Brown', department: 'Engineering', email: 'david@company.com' },
      { id: '6', name: 'Lisa Davis', department: 'Finance', email: 'lisa@company.com' },
      { id: '7', name: 'Tom Anderson', department: 'Marketing', email: 'tom@company.com' },
      { id: '8', name: 'Emily Taylor', department: 'Sales', email: 'emily@company.com' }
    ];

    const generateAttendanceData = () => {
      const records: AttendanceRecord[] = [];
      const today = new Date();
      
      // Generate data for the last 30 days
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        sampleEmployees.forEach(employee => {
          const random = Math.random();
          let status: 'present' | 'absent' | 'half-day' | 'late';
          let signIn: string | null = null;
          let signOut: string | null = null;
          let workHours = 0;
          
          if (random > 0.85) {
            status = 'absent';
          } else if (random > 0.75) {
            status = 'half-day';
            signIn = '09:' + Math.floor(Math.random() * 60).toString().padStart(2, '0');
            signOut = '13:' + Math.floor(Math.random() * 60).toString().padStart(2, '0');
            workHours = 4;
          } else if (random > 0.65) {
            status = 'late';
            signIn = '09:' + (30 + Math.floor(Math.random() * 30)).toString().padStart(2, '0');
            signOut = '18:' + Math.floor(Math.random() * 30).toString().padStart(2, '0');
            workHours = 8;
          } else {
            status = 'present';
            signIn = '09:' + Math.floor(Math.random() * 30).toString().padStart(2, '0');
            signOut = '18:' + Math.floor(Math.random() * 30).toString().padStart(2, '0');
            workHours = 8;
          }
          
          records.push({
            employeeId: employee.id,
            employeeName: employee.name,
            department: employee.department,
            date: dateString,
            signIn,
            signOut,
            status,
            workHours
          });
        });
      }
      
      return records;
    };

    setAttendanceData(generateAttendanceData());
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'half-day':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'late':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'absent':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4" />;
      case 'half-day':
        return <AlertCircle className="w-4 h-4" />;
      case 'late':
        return <Clock className="w-4 h-4" />;
      case 'absent':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filterDataByDateRange = () => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    switch (viewMode) {
      case 'today':
        return attendanceData.filter(record => record.date === todayString);
      case 'week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return attendanceData.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate >= weekStart && recordDate <= weekEnd;
        });
      case 'month':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return attendanceData.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate >= monthStart && recordDate <= monthEnd;
        });
      case 'year':
        const yearStart = new Date(today.getFullYear(), 0, 1);
        const yearEnd = new Date(today.getFullYear(), 11, 31);
        return attendanceData.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate >= yearStart && recordDate <= yearEnd;
        });
      default:
        return attendanceData;
    }
  };

  const filteredData = filterDataByDateRange().filter(record => {
    const matchesDepartment = selectedDepartment === 'all' || record.department === selectedDepartment;
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const calculateStats = () => {
    const stats = filteredData.reduce((acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;
      acc.total = (acc.total || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalWorkHours = filteredData.reduce((sum, record) => sum + record.workHours, 0);
    const avgWorkHours = stats.total > 0 ? (totalWorkHours / stats.total).toFixed(1) : '0';
    
    return { ...stats, totalWorkHours, avgWorkHours };
  };

  const stats: AttendanceStats = calculateStats();
  const departments = [...new Set(attendanceData.map(record => record.department))];

  const renderStatsCards = () => {
    const statCards = [
      { 
        title: 'Total Present', 
        value: stats.present || 0, 
        icon: CheckCircle, 
        color: 'text-emerald-600', 
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200'
      },
      { 
        title: 'Late Arrivals', 
        value: stats.late || 0, 
        icon: Clock, 
        color: 'text-orange-600', 
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
      },
      { 
        title: 'Half Days', 
        value: stats['half-day'] || 0, 
        icon: AlertCircle, 
        color: 'text-amber-600', 
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200'
      },
      { 
        title: 'Absent', 
        value: stats.absent || 0, 
        icon: XCircle, 
        color: 'text-red-600', 
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div key={index} className={`${card.bgColor} ${card.borderColor} border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:scale-105`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
              </div>
              <div className={`p-3 rounded-full ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAttendanceTable = () => {
    const groupedData = viewMode === 'today' ? 
      filteredData : 
      filteredData.reduce((acc, record) => {
        const key = `${record.employeeId}-${record.date}`;
        if (!acc[key]) {
          acc[key] = record;
        }
        return acc;
      }, {} as Record<string, AttendanceRecord>);

    const dataToShow = Array.isArray(groupedData) ? groupedData : Object.values(groupedData);

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Attendance Records - {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
            </h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button> */}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sign In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sign Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dataToShow.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{record.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(record.date).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.signIn || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.signOut || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.workHours}h</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      <span className="ml-1 capitalize">{record.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between">
        
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Dashboard</h1>
              <p className="text-gray-600">Monitor and manage employee attendance records</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                {['today', 'week', 'month', 'year'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as 'today' | 'week' | 'month' | 'year')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      viewMode === mode
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {renderStatsCards()}

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Records</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total || 0}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Work Hours</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalWorkHours || 0}h</p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Avg Work Hours</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgWorkHours || 0}h</p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        {renderAttendanceTable()}
      </div>
    </div>
  );
}