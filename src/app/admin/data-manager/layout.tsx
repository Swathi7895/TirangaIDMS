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
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}


export default function DatamanagerLayout({
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

  return (
    <div className="min-h-screen bg-gray-50">
     
   
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */} 
       

        {/* Main Content */}
        <main>{children}</main>
      </div>
    </div>
  );
} 