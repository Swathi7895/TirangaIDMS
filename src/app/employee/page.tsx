'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EmployeeDashboard() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Check if user is authenticated and is an employee
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');

    if (!isAuthenticated || userRole !== 'employee') {
      router.push('/login');
    }

    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [router]);

  // Mock data for dashboard metrics
  const stats = [
    { title: "Attendance Rate", value: "96.2%", change: "+2.1%", trend: "up", color: "green" },
    { title: "Tasks Completed", value: "24", change: "+5", trend: "up", color: "blue" },
    { title: "Pending Leaves", value: "2", change: "-1", trend: "down", color: "amber" },
    { title: "Performance Score", value: "8.7/10", change: "+0.3", trend: "up", color: "purple" }
  ];

  const recentActivities = [
    { title: "Checked in", time: "09:00 AM", type: "attendance" },
    { title: "Lab equipment audit completed", time: "11:30 AM", type: "task" },
    { title: "Leave application submitted", time: "02:15 PM", type: "leave" },
    { title: "Weekly report uploaded", time: "04:45 PM", type: "report" }
  ];

  const upcomingTasks = [
    { title: "Monthly performance review", due: "Tomorrow", priority: "high" },
    { title: "Lab inventory check", due: "Dec 8", priority: "medium" },
    { title: "Training session attendance", due: "Dec 10", priority: "low" },
    { title: "Project milestone delivery", due: "Dec 12", priority: "high" }
  ];

  const quickActions = [
    { title: "Apply for Leave", href: "/employee/details/leave/apply", type: "primary" },
    { title: "View Attendance", href: "/employee/attendance/daily", type: "secondary" },
    { title: "Lab Inventory", href: "/employee/lab/inventory", type: "secondary" },
    { title: "Generate Report", href: "/employee/reports/employee", type: "secondary" }
  ];

  const modules = [
    {
      title: "Attendance",
      description: "Track your daily, weekly, and monthly attendance",
      href: "/employee/attendance",
      color: "bg-blue-500",
      count: "5 views"
    },
    {
      title: "Lab Resources",
      description: "Access laboratory equipment and materials",
      href: "/employee/lab",
      color: "bg-emerald-500",
      count: "12 items"
    },
    {
      title: "Employee Portal",
      description: "Manage documents, assets, and performance",
      href: "/employee/details",
      color: "bg-purple-500",
      count: "8 sections"
    },
    {
      title: "Reports",
      description: "Generate and view business analytics",
      href: "/employee/reports",
      color: "bg-amber-500",
      count: "7 reports"
    },
    {
      title: "Notifications",
      description: "View memos and announcements",
      href: "/employee/memo",
      color: "bg-rose-500",
      count: "3 new"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Dashboard</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Welcome back, John Doe • {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                Active
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2`}>
                  <div className={`h-2 rounded-full ${
                    stat.color === 'green' ? 'bg-green-500' :
                    stat.color === 'blue' ? 'bg-blue-500' :
                    stat.color === 'amber' ? 'bg-amber-500' :
                    'bg-purple-500'
                  }`} style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div className={`p-3 rounded-lg border-2 border-dashed transition-all duration-200 hover:border-solid cursor-pointer ${
                    action.type === 'primary' 
                      ? 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30' 
                      : 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}>
                    <p className={`font-medium ${
                      action.type === 'primary' 
                        ? 'text-blue-700 dark:text-blue-300' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>{action.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'attendance' ? 'bg-green-500' :
                    activity.type === 'task' ? 'bg-blue-500' :
                    activity.type === 'leave' ? 'bg-amber-500' :
                    'bg-purple-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Tasks</h3>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Due: {task.due}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    task.priority === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Dashboard Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {modules.map((module, index) => (
              <Link key={index} href={module.href}>
                <div className="group p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <div className={`w-10 h-10 ${module.color} rounded-lg mb-3 flex items-center justify-center`}>
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{module.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{module.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{module.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleString()} • System Status: Operational
          </p>
        </div>
      </div>
    </div>
  );
}