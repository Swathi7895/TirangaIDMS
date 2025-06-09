'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  FileText, 
  Laptop, 
  Calendar, 
  Award, 
  UserPlus, 
  Clock,
  Search,
  Bell,
  Settings,
  LogOut,
  LucideIcon,
  User
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

const menuItems: MenuItem[] = [
  { id: 'overview', label: 'Overview', icon: Home, path: '/hr' },
  { id: 'documents', label: 'Employee Documents', icon: FileText, path: '/hr/documents' },
  { id: 'assets', label: 'Asset Management', icon: Laptop, path: '/hr/assets' },
  { id: 'leaves', label: 'Leave Management', icon: Calendar, path: '/hr/leaves' },
  { id: 'performance', label: 'Performance', icon: Award, path: '/hr/performance' },
  { id: 'joining', label: 'Joining/Relieving', icon: UserPlus, path: '/hr/joining' },
  { id: 'activities', label: 'Weekly Activities', icon: Clock, path: '/hr/activities' }
];

export default function HRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    router.push('/login');
  };
 const handleClick = () => {
  
    router.push('/hr/employeeRegister');
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">HR Dashboard</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
             
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      isActive
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main>{children}</main>
      </div>
    </div>
  );
} 