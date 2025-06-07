'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, 
  Package, 
  Users, 
  Database, 
  DollarSign, 
  FileText, 
  MessageSquare,
  ChevronRight,
  Activity,

} from 'lucide-react';

export default function AdminDashboard() {


  const dashboardItems = [
    {
      id: 'attendance',
      title: 'Attendance',
      icon: Calendar,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      darkBgGradient: 'from-blue-900/20 to-cyan-900/20',
      items: ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Attendance Summary'],
      href: '/admin/attendence'
    },
    {
      id: 'store',
      title: 'Store',
      icon: Package,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      darkBgGradient: 'from-green-900/20 to-emerald-900/20',
      items: ['House Keeping/Stationary', 'Lab Materials', 'Fixed Office Assets'],
      href: '/admin/store'
    },
    {
      id: 'hr',
      title: 'HR',
      icon: Users,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
      darkBgGradient: 'from-amber-900/20 to-orange-900/20',
      items: ['Employee Details', 'Asset Management', 'Leave Management', 'Performance', 'Joining/Relieving', 'Weekly Activities'],
      href: '/admin/hr'
    },
    {
      id: 'data',
      title: 'Data Management',
      icon: Database,
      color: 'red',
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50',
      darkBgGradient: 'from-red-900/20 to-pink-900/20',
      items: ['Sales & Purchases', 'Logistics', 'Company Registration', 'Bank Documents', 'Billing', 'CA Doc', 'Tender Management', 'Finance reports' ],
      href: '/admin/data-manager'
    },
    {
      id: 'finance',
      title: 'Finance',
      icon: DollarSign,
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      darkBgGradient: 'from-indigo-900/20 to-purple-900/20',
      items: ['Fixed Expenses', 'Variable Expenses'],
      href: '/admin/finance-manager/dashboard'
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: FileText,
      color: 'purple',
      gradient: 'from-purple-500 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50',
      darkBgGradient: 'from-purple-900/20 to-violet-900/20',
      items: ['Employee Reports', 'Visit Report', 'OEM Report', 'Customer Report', 'Blueprint Reports', 'Projection Reports', 'Projection Achieved Reports', 'Visit Inquiries', 'BQ Quatitions'  ],
      href: '/admin/reports'
    },
    {
      id: 'memo',
      title: 'Memo',
      icon: MessageSquare,
      color: 'teal',
      gradient: 'from-teal-500 to-green-500',
      bgGradient: 'from-teal-50 to-green-50',
      darkBgGradient: 'from-teal-900/20 to-green-900/20',
      items: ['Admin Memos', 'Employee Notices'],
      href: '/admin/memos'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-lg">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            View and manage all aspects of your organization
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group h-full"
              >
                <div className={`h-full bg-gradient-to-br ${item.bgGradient} dark:${item.darkBgGradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 backdrop-blur-sm transform hover:-translate-y-1`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-3">
                      <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {item.items.map((subItem, index) => (
                      <div key={index} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <ChevronRight className="w-3.5 h-3.5 mr-1.5" />
                        <span className="line-clamp-1">{subItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}