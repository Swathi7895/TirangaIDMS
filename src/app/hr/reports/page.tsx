'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Calendar, 
  Target, 
  ClipboardCheck, 
  TrendingUp,
  Clock,
  Star,
  Plus,
  Filter,
  Search,
  ArrowRight,
  Download,
  Eye,
  BarChart2,
  UserCheck,
  Award,
  FileText,
  Briefcase
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  icon: React.ElementType;
  gradient: string;
  path: string;
  description: string;
  lastUpdated?: string;
  metrics?: { value: string; label: string; trend?: number };
  subReports?: { name: string; path: string; }[];
  isPinned?: boolean;
  category: string;
}

const reports: Report[] = [
  {
    id: 'employee-performance',
    name: 'Performance Analytics',
    icon: BarChart2,
    gradient: 'from-blue-500 via-blue-600 to-indigo-700',
    path: '/hr/reports/performance',
    description: 'Comprehensive employee performance metrics and KPIs',
    category: 'Performance',
    metrics: { value: '87%', label: 'Average Performance', trend: 5 },
    isPinned: true,
    subReports: [
      { name: 'Daily Performance', path: '/daily' },
      { name: 'Weekly Review', path: '/weekly' },
      { name: 'Monthly Assessment', path: '/monthly' },
      { name: 'Quarterly Review', path: '/quarterly' },
      { name: 'Annual Evaluation', path: '/annual' }
    ]
  },
  {
    id: 'attendance',
    name: 'Attendance Reports',
    icon: Calendar,
    gradient: 'from-emerald-500 via-green-500 to-teal-600',
    path: '/hr/reports/attendance',
    description: 'Track employee attendance and leave management',
    category: 'Attendance',
    metrics: { value: '94%', label: 'Attendance Rate', trend: 2 },
    isPinned: true,
    subReports: [
      { name: 'Daily Attendance', path: '/daily' },
      { name: 'Leave Reports', path: '/leaves' },
      { name: 'Overtime Analysis', path: '/overtime' }
    ]
  },
  {
    id: 'recruitment',
    name: 'Recruitment Analytics',
    icon: UserCheck,
    gradient: 'from-purple-500 via-violet-600 to-purple-700',
    path: '/hr/reports/recruitment',
    description: 'Track hiring metrics and recruitment pipeline',
    category: 'Recruitment',
    metrics: { value: '24', label: 'Open Positions', trend: -3 }
  },
  {
    id: 'training',
    name: 'Training & Development',
    icon: Award,
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    path: '/hr/reports/training',
    description: 'Employee training progress and skill development',
    category: 'Development',
    metrics: { value: '156', label: 'Training Hours', trend: 15 }
  },
  {
    id: 'employee-projection',
    name: 'Career Projections',
    icon: Target,
    gradient: 'from-rose-500 via-pink-500 to-red-600',
    path: '/hr/reports/projection',
    description: 'Career growth and succession planning',
    category: 'Planning',
    metrics: { value: '34', label: 'Promotion Ready', trend: 8 }
  },
  {
    id: 'compensation',
    name: 'Compensation Analysis',
    icon: Briefcase,
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    path: '/hr/reports/compensation',
    description: 'Salary analysis and compensation management',
    category: 'Compensation',
    metrics: { value: '$2.4M', label: 'Total Compensation', trend: 12 }
  },
  {
    id: 'documents',
    name: 'Employee Documents',
    icon: FileText,
    gradient: 'from-teal-500 via-cyan-500 to-blue-600',
    path: '/hr/reports/documents',
    description: 'Manage employee documentation and records',
    category: 'Documents',
    metrics: { value: '1,234', label: 'Documents Filed', trend: 25 }
  },
  {
    id: 'compliance',
    name: 'Compliance Reports',
    icon: ClipboardCheck,
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    path: '/hr/reports/compliance',
    description: 'HR compliance and policy adherence tracking',
    category: 'Compliance',
    metrics: { value: '98%', label: 'Compliance Rate', trend: 1 }
  }
];

const categories = ['All', 'Performance', 'Attendance', 'Recruitment', 'Development', 'Planning', 'Compensation', 'Documents', 'Compliance'];

export default function HRReports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pinnedReports = filteredReports.filter(report => report.isPinned);
  const regularReports = filteredReports.filter(report => !report.isPinned);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                HR Analytics Hub
              </h1>
            </div>
            <p className="text-gray-600 text-lg">Comprehensive HR metrics and employee analytics</p>
          </div>
          
          <div className="flex gap-3">
            <button className="group relative px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Reports
              </div>
            </button>
            <button className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Generate Report
              </div>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search HR reports and analytics..."
              className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-300 text-gray-700 placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-white/50 text-gray-600 hover:bg-white/70'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Pinned Reports */}
        {pinnedReports.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <h2 className="text-xl font-semibold text-gray-800">Key Metrics</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pinnedReports.map((report) => (
                <ReportCard key={report.id} report={report} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* All Reports */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">All HR Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {regularReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ReportCard({ report, featured = false }: { report: Report; featured?: boolean }) {
  return (
    <Link
      href={report.path}
      className={`group block relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-white/20 ${
        featured ? 'lg:col-span-1' : ''
      }`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${report.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${report.gradient} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
          <report.icon className="w-7 h-7 text-white" />
        </div>
        {report.isPinned && (
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
          {report.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{report.description}</p>

        {/* Metrics */}
        {report.metrics && (
          <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
            <div>
              <div className="text-2xl font-bold text-gray-900">{report.metrics.value}</div>
              <div className="text-xs text-gray-500">{report.metrics.label}</div>
            </div>
            {report.metrics.trend && (
              <div className={`flex items-center gap-1 text-sm font-medium ${
                report.metrics.trend > 0 ? 'text-green-600' : 'text-red-500'
              }`}>
                <TrendingUp className={`w-4 h-4 ${report.metrics.trend < 0 ? 'rotate-180' : ''}`} />
                {Math.abs(report.metrics.trend)}%
              </div>
            )}
          </div>
        )}

        {/* Sub Reports */}
        {report.subReports && (
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Quick Access</div>
            <div className="grid grid-cols-2 gap-2">
              {report.subReports.slice(0, 4).map((subReport, index) => (
                <div key={index} className="text-xs text-gray-600 bg-gray-50/30 rounded-lg px-2 py-1">
                  {subReport.name}
                </div>
              ))}
            </div>
            {report.subReports.length > 4 && (
              <div className="text-xs text-gray-500">+{report.subReports.length - 4} more</div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Last updated 2 hours ago
        </div>
        <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
          View Details
          <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
} 