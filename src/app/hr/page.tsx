'use client';
import React, { useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Smartphone, 
  
  Calendar, 
  CheckCircle, 
  
  TrendingUp, 
  Award, 
  UserPlus, 
 
  Clock,
  LucideIcon,
  Building,

 UserCheck ,
 UserX
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  trend?: string;
  color?: string;
  bgColor?: string;
}

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
  path: string;
}

interface RecentActivityProps {
  icon: LucideIcon;
  title: string;
  time: string;
  status: 'completed' | 'pending' | 'rejected';
}

export default function HRPage() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const roles = JSON.parse(sessionStorage.getItem('roles') || '[]');
    
    if (!token || !roles.includes('ROLE_HR')) {
      router.replace('/login');
    }
  }, [router]);

  const StatCard = ({ icon: Icon, title, value, trend, color = 'blue', bgColor = 'bg-blue-50' }: StatCardProps) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
          {trend && (
            <p className="text-sm text-green-600 flex items-center mt-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-xl ${bgColor}`}>
          <Icon className={`w-8 h-8 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ icon: Icon, title, description, color = 'blue', path }: QuickActionCardProps) => (
    <a 
      href={path}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group block"
    >
      <div className={`p-3 rounded-lg bg-${color}-50 w-fit mb-4 group-hover:bg-${color}-100 transition-colors`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </a>
  );

  const RecentActivity = ({ icon: Icon, title, time, status }: RecentActivityProps) => (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="p-2 rounded-lg bg-blue-50">
        <Icon className="w-4 h-4 text-blue-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        status === 'completed' ? 'bg-green-100 text-green-800' :
        status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">HR Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to HR Management</h2>
          <p className="text-gray-600">This is the HR dashboard where you can manage employee information and HR operations.</p>
        </div>
      </div>
    </div>
  );
}