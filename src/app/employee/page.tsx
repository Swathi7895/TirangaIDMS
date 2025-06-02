'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EmployeeDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and is an employee
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');

    if (!isAuthenticated || userRole !== 'employee') {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Employee Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Employee Dashboard Cards */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
                My Tasks
              </h2>
              <p className="text-blue-800 dark:text-blue-200">
                View and manage your assigned tasks
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
                Time Tracking
              </h2>
              <p className="text-green-800 dark:text-green-200">
                Track your work hours and attendance
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
                My Profile
              </h2>
              <p className="text-purple-800 dark:text-purple-200">
                Update your personal information and preferences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 