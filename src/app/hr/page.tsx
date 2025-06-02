'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  UserCircleIcon,        // Changed from UserCircle
  DocumentTextIcon,      // Changed from DocumentText  
  DevicePhoneMobileIcon, // Changed from DevicePhoneMobile
  CalendarDaysIcon,      // Already corrected
  ChartBarIcon,          // Already corrected
  DocumentDuplicateIcon, // Changed from DocumentDuplicate
  ClipboardDocumentListIcon // Changed from ClipboardDocumentList
} from '@heroicons/react/24/outline';

export default function HRDashboard() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          HR Operations Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Employee Documents Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-4">
              <DocumentTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100">
                Employee Documents
              </h2>
            </div>
            <div className="space-y-3">
              <Link href="/hr/documents/resume" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors">
                <h3 className="font-medium text-blue-800 dark:text-blue-200">Resume & Marks Cards</h3>
                <p className="text-sm text-blue-600 dark:text-blue-300">View and manage employee qualifications</p>
              </Link>
              <Link href="/hr/documents/id-proofs" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors">
                <h3 className="font-medium text-blue-800 dark:text-blue-200">ID Proofs</h3>
                <p className="text-sm text-blue-600 dark:text-blue-300">Manage identity documents</p>
              </Link>
              <Link href="/hr/documents/offer-letters" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors">
                <h3 className="font-medium text-blue-800 dark:text-blue-200">Offer Letters</h3>
                <p className="text-sm text-blue-600 dark:text-blue-300">Access and manage offer documents</p>
              </Link>
            </div>
          </div>

          {/* Asset Management Section */}
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-4">
              <DevicePhoneMobileIcon className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
              <h2 className="text-xl font-semibold text-green-900 dark:text-green-100">
                Asset Management
              </h2>
            </div>
            <div className="space-y-3">
              <Link href="/hr/assets/electronics" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-800/30 transition-colors">
                <h3 className="font-medium text-green-800 dark:text-green-200">Electronics</h3>
                <p className="text-sm text-green-600 dark:text-green-300">Phones, laptops, and systems</p>
              </Link>
              <Link href="/hr/assets/accessories" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-800/30 transition-colors">
                <h3 className="font-medium text-green-800 dark:text-green-200">Accessories</h3>
                <p className="text-sm text-green-600 dark:text-green-300">SIM cards and ID cards</p>
              </Link>
              <Link href="/hr/assets/vehicles" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-800/30 transition-colors">
                <h3 className="font-medium text-green-800 dark:text-green-200">Vehicles</h3>
                <p className="text-sm text-green-600 dark:text-green-300">Company vehicle assignments</p>
              </Link>
            </div>
          </div>

          {/* Leave Management Section */}
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-4">
              <CalendarDaysIcon className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
              <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100">
                Leave Management
              </h2>
            </div>
            <div className="space-y-3">
              <Link href="/hr/leaves/approved" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors">
                <h3 className="font-medium text-purple-800 dark:text-purple-200">Approved Leaves</h3>
                <p className="text-sm text-purple-600 dark:text-purple-300">View approved leave requests</p>
              </Link>
              <Link href="/hr/leaves/pending" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors">
                <h3 className="font-medium text-purple-800 dark:text-purple-200">Pending Requests</h3>
                <p className="text-sm text-purple-600 dark:text-purple-300">Manage pending leave requests</p>
              </Link>
              <Link href="/hr/leaves/holidays" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors">
                <h3 className="font-medium text-purple-800 dark:text-purple-200">Holiday Calendar</h3>
                <p className="text-sm text-purple-600 dark:text-purple-300">View and manage holidays</p>
              </Link>
            </div>
          </div>

          {/* Performance Management Section */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-4">
              <ChartBarIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-2" />
              <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100">
                Performance Management
              </h2>
            </div>
            <div className="space-y-3">
              <Link href="/hr/performance/positions" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800/30 transition-colors">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Positions</h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-300">Track employee positions</p>
              </Link>
              <Link href="/hr/performance/promotions" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800/30 transition-colors">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Promotions</h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-300">Manage promotion records</p>
              </Link>
              <Link href="/hr/performance/applications" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800/30 transition-colors">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Applications</h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-300">Track internal applications</p>
              </Link>
            </div>
          </div>

          {/* Joining/Relieving Section */}
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-4">
              <DocumentDuplicateIcon className="h-6 w-6 text-red-600 dark:text-red-400 mr-2" />
              <h2 className="text-xl font-semibold text-red-900 dark:text-red-100">
                Joining/Relieving
              </h2>
            </div>
            <div className="space-y-3">
              <Link href="/hr/joining/details" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors">
                <h3 className="font-medium text-red-800 dark:text-red-200">Joining Details</h3>
                <p className="text-sm text-red-600 dark:text-red-300">Manage onboarding process</p>
              </Link>
              <Link href="/hr/joining/documents" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors">
                <h3 className="font-medium text-red-800 dark:text-red-200">Joining Documents</h3>
                <p className="text-sm text-red-600 dark:text-red-300">Track joining documentation</p>
              </Link>
              <Link href="/hr/relieving" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors">
                <h3 className="font-medium text-red-800 dark:text-red-200">Relieving Process</h3>
                <p className="text-sm text-red-600 dark:text-red-300">Manage exit formalities</p>
              </Link>
            </div>
          </div>

          {/* Weekly Activities Section */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-4">
              <ClipboardDocumentListIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100">
                Weekly Activities
              </h2>
            </div>
            <div className="space-y-3">
              <Link href="/hr/activities/tasks" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition-colors">
                <h3 className="font-medium text-indigo-800 dark:text-indigo-200">Task List</h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-300">View and manage weekly tasks</p>
              </Link>
              <Link href="/hr/activities/calendar" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition-colors">
                <h3 className="font-medium text-indigo-800 dark:text-indigo-200">Activity Calendar</h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-300">Schedule and track activities</p>
              </Link>
              <Link href="/hr/activities/reports" className="block p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition-colors">
                <h3 className="font-medium text-indigo-800 dark:text-indigo-200">Weekly Reports</h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-300">Generate activity reports</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}