'use client';

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
      gradient: 'from-blue-500 to-blue-600', // Solid gradient for icons
      bgOpacity: 'bg-blue-500/10', // Consistent opacity for card background
      darkBgOpacity: 'dark:bg-blue-600/10',
      items: ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Attendance Summary'],
      href: '/admin/attendence',
    },
    {
      id: 'store',
      title: 'Store',
      icon: Package,
      color: 'green',
      gradient: 'from-green-500 to-green-600',
      bgOpacity: 'bg-green-500/10',
      darkBgOpacity: 'dark:bg-green-600/10',
      items: ['House Keeping/Stationary', 'Lab Materials', 'Capital Office Assets'],
      href: '/admin/store',
    },
    {
      id: 'hr',
      title: 'HR',
      icon: Users,
      color: 'amber',
      gradient: 'from-amber-500 to-amber-600',
      bgOpacity: 'bg-amber-500/10',
      darkBgOpacity: 'dark:bg-amber-600/10',
      items: ['Employee Details', 'Asset Management', 'Leave Management', 'Performance', 'Joining/Relieving', 'Weekly Activities'],
      href: '/admin/hr',
    },
    {
      id: 'data',
      title: 'Data Management',
      icon: Database,
      color: 'red',
      gradient: 'from-red-500 to-red-600',
      bgOpacity: 'bg-red-500/10',
      darkBgOpacity: 'dark:bg-red-600/10',
      items: ['Sales & Purchases', 'Logistics', 'Company Registration', 'Bank Documents', 'Billing', 'CA Doc', 'Tender Management', 'Finance reports'],
      href: '/admin/data-manager',
    },
    {
      id: 'finance',
      title: 'Finance',
      icon: DollarSign,
      color: 'indigo',
      gradient: 'from-indigo-500 to-indigo-600',
      bgOpacity: 'bg-indigo-500/10',
      darkBgOpacity: 'dark:bg-indigo-600/10',
      items: ['Fixed Expenses', 'Variable Expenses'],
      href: '/admin/finance-manager/dashboard',
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: FileText,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
      bgOpacity: 'bg-purple-500/10',
      darkBgOpacity: 'dark:bg-purple-600/10',
      items: ['Employee Reports', 'Visit Report', 'OEM Report', 'Customer Report', 'Blueprint Reports', 'Projection Reports', 'Projection Achieved Reports', 'Visit Inquiries', 'BQ Quatitions'],
      href: '/admin/reports',
    },
    {
      id: 'memo',
      title: 'Memo',
      icon: MessageSquare,
      color: 'teal',
      gradient: 'from-teal-500 to-teal-600',
      bgOpacity: 'bg-teal-500/10',
      darkBgOpacity: 'dark:bg-teal-600/10',
      items: ['Admin Memos', 'Employee Notices'],
      href: '/admin/memos',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 dark:bg-blue-500 shadow-md mb-6">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white tracking-tight mb-4">
            Admin Overview
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
            Centralized access to all organizational management tools.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dashboardItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group h-full"
              >
                <div className={`h-full relative overflow-hidden rounded-2xl p-7 shadow-lg backdrop-blur-xl
                  ${item.bgOpacity} ${item.darkBgOpacity}
                  border border-white/20 dark:border-gray-700/50
                  transform group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300 ease-in-out`}>

                  {/* Top Section: Icon and Title */}
                  <div className="flex items-center mb-5">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300
                      bg-gradient-to-br ${item.gradient}
                      transform group-hover:scale-110 group-hover:shadow-xl`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  {/* Sub-items List */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {item.items.map((subItem, index) => (
                      <div key={index} className="flex items-center">
                        <ChevronRight className="w-3.5 h-3.5 mr-2 text-gray-400 dark:text-gray-500" />
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