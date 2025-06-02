'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StoreDashboard() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Store Management Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stationary Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg hover:shadow-md transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
              Stationary
            </h2>
            <div className="space-y-3">
              <Link href="/store/stationary/regular" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors">
                <h3 className="font-medium text-blue-800 dark:text-blue-200">Regular Usage</h3>
                <p className="text-sm text-blue-600 dark:text-blue-300">Daily office supplies and consumables</p>
              </Link>
              <Link href="/store/stationary/fixed" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors">
                <h3 className="font-medium text-blue-800 dark:text-blue-200">Fixed Items</h3>
                <p className="text-sm text-blue-600 dark:text-blue-300">Permanent stationary items</p>
              </Link>
              <Link href="/store/stationary/inventory" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors">
                <h3 className="font-medium text-blue-800 dark:text-blue-200">In/Out Details</h3>
                <p className="text-sm text-blue-600 dark:text-blue-300">Track stationary movement</p>
              </Link>
            </div>
          </div>

          {/* Lab Materials Section */}
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg hover:shadow-md transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-4">
              Lab Materials
            </h2>
            <div className="space-y-3">
              <Link href="/store/lab/instruments" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-800/30 transition-colors">
                <h3 className="font-medium text-green-800 dark:text-green-200">Instruments</h3>
                <p className="text-sm text-green-600 dark:text-green-300">Lab equipment and tools</p>
              </Link>
              <Link href="/store/lab/components" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-800/30 transition-colors">
                <h3 className="font-medium text-green-800 dark:text-green-200">Components</h3>
                <p className="text-sm text-green-600 dark:text-green-300">Lab parts and components</p>
              </Link>
              <Link href="/store/lab/materials" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-800/30 transition-colors">
                <h3 className="font-medium text-green-800 dark:text-green-200">Materials</h3>
                <p className="text-sm text-green-600 dark:text-green-300">Lab consumables and materials</p>
              </Link>
              <Link href="/store/lab/inventory" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-800/30 transition-colors">
                <h3 className="font-medium text-green-800 dark:text-green-200">In/Out Details</h3>
                <p className="text-sm text-green-600 dark:text-green-300">Track lab items movement</p>
              </Link>
            </div>
          </div>

          {/* Fixed Office Assets Section */}
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg hover:shadow-md transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4">
              Fixed Office Assets
            </h2>
            <div className="space-y-3">
              <Link href="/store/assets/furniture" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors">
                <h3 className="font-medium text-purple-800 dark:text-purple-200">Furniture</h3>
                <p className="text-sm text-purple-600 dark:text-purple-300">Office furniture and fixtures</p>
              </Link>
              <Link href="/store/assets/systems" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors">
                <h3 className="font-medium text-purple-800 dark:text-purple-200">Systems</h3>
                <p className="text-sm text-purple-600 dark:text-purple-300">Computers and electronic systems</p>
              </Link>
              <Link href="/store/assets/printers" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors">
                <h3 className="font-medium text-purple-800 dark:text-purple-200">Printers & Equipment</h3>
                <p className="text-sm text-purple-600 dark:text-purple-300">Printers and other office equipment</p>
              </Link>
              <Link href="/store/assets/inventory" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors">
                <h3 className="font-medium text-purple-800 dark:text-purple-200">Asset Tracking</h3>
                <p className="text-sm text-purple-600 dark:text-purple-300">Track fixed assets movement</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 