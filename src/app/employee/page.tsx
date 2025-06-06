'use client';
import React, { useState } from 'react';
import { 
  Calendar, 
  FileText, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Star,
  TrendingUp,
  Bell,
  Settings,
  Download,
  Laptop,
  Car,
  Smartphone,
  CreditCard,
  FileCheck,
  Calendar as CalendarIcon,
  BarChart,
  ClipboardList,
  Building,
  Users,
  Map,
  Edit2,
  Save,
  X
} from 'lucide-react';
import Link from 'next/link';
import MemoViewer from '@/app/components/memos/MemoViewer';

interface Attendance {
  date: string;
  signIn: string;
  signOut: string;
  status: 'present' | 'absent' | 'half-day';
}

interface Document {
  id: number;
  name: string;
  type: 'resume' | 'marksCard' | 'idProof' | 'offerLetter';
  url: string;
  uploadDate: string;
}

interface Asset {
  id: number;
  name: string;
  type: 'laptop' | 'phone' | 'sim' | 'idCard' | 'vehicle';
  assignedDate: string;
  status: 'active' | 'returned';
}

interface Leave {
  id: number;
  type: 'holiday' | 'sick' | 'casual';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

interface Performance {
  position: string;
  promotionDate: string;
  rating: number;
  achievements: string[];
}

interface Report {
  id: number;
  type: 'employee' | 'visit' | 'oem' | 'customer' | 'blueprint' | 'projection' | 'achievement';
  title: string;
  date: string;
  status: 'draft' | 'submitted' | 'approved';
}

interface QuickLink {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: 'John Doe',
    position: 'Software Engineer',
    department: 'Technology',
    email: 'john.doe@company.com',
    phone: '+1-555-0123',
    address: '123 Main St, City, State'
  });

  const quickLinks: QuickLink[] = [
    {
      title: 'Attendance',
      description: 'Track your daily attendance and view history',
      icon: <Clock className="w-6 h-6" />,
      href: '/employee/attendance',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Documents',
      description: 'Manage your important documents',
      icon: <FileText className="w-6 h-6" />,
      href: '/employee/documents',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Assets',
      description: 'View and manage your assigned assets',
      icon: <Laptop className="w-6 h-6" />,
      href: '/employee/assets',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Leaves',
      description: 'Request and track your leaves',
      icon: <Calendar className="w-6 h-6" />,
      href: '/employee/leaves',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Performance',
      description: 'Track your career growth and achievements',
      icon: <Star className="w-6 h-6" />,
      href: '/employee/performance',
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Reports',
      description: 'Manage and view your reports',
      icon: <FileText className="w-6 h-6" />,
      href: '/employee/reports',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  // Sample employee data
  const employee = {
    name: 'John Doe',
    position: 'Software Engineer',
    department: 'Technology',
    employeeId: 'EMP001',
    email: 'john.doe@company.com',
    phone: '+1-555-0123',
    address: '123 Main St, City, State',
    joinDate: '2023-01-15',
    performance: 92,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    attendance: { present: 22, absent: 2, leaves: 1 },
    upcomingHolidays: [
      { date: '2024-03-25', name: 'Holi' },
      { date: '2024-04-09', name: 'Ram Navami' },
      { date: '2024-05-01', name: 'Labour Day' }
    ]
  };

  const attendance: Attendance[] = [
    { date: '2024-03-18', signIn: '09:00', signOut: '18:00', status: 'present' },
    { date: '2024-03-17', signIn: '09:15', signOut: '18:30', status: 'present' },
    { date: '2024-03-16', signIn: '09:30', signOut: '17:45', status: 'half-day' },
  ];

  const documents: Document[] = [
    { id: 1, name: 'Resume.pdf', type: 'resume', url: '/documents/resume.pdf', uploadDate: '2024-03-01' },
    { id: 2, name: 'Marks Card.pdf', type: 'marksCard', url: '/documents/marks.pdf', uploadDate: '2024-03-01' },
    { id: 3, name: 'Aadhar Card.pdf', type: 'idProof', url: '/documents/aadhar.pdf', uploadDate: '2024-03-01' },
    { id: 4, name: 'Offer Letter.pdf', type: 'offerLetter', url: '/documents/offer.pdf', uploadDate: '2024-03-01' },
  ];

  const assets: Asset[] = [
    { id: 1, name: 'MacBook Pro 2023', type: 'laptop', assignedDate: '2024-01-01', status: 'active' },
    { id: 2, name: 'iPhone 14', type: 'phone', assignedDate: '2024-01-01', status: 'active' },
    { id: 3, name: 'Company ID Card', type: 'idCard', assignedDate: '2024-01-01', status: 'active' },
  ];

  const leaves: Leave[] = [
    { id: 1, type: 'holiday', startDate: '2024-03-25', endDate: '2024-03-25', status: 'approved', reason: 'Holi Festival' },
    { id: 2, type: 'sick', startDate: '2024-03-20', endDate: '2024-03-21', status: 'pending', reason: 'Fever' },
  ];

  const performance: Performance = {
    position: 'Senior Software Engineer',
    promotionDate: '2024-01-01',
    rating: 4.5,
    achievements: ['Best Employee Q4 2023', 'Project Excellence Award']
  };

  const reports: Report[] = [
    { id: 1, type: 'employee', title: 'Weekly Activity Report', date: '2024-03-18', status: 'submitted' },
    { id: 2, type: 'visit', title: 'Client Visit Report', date: '2024-03-17', status: 'approved' },
    { id: 3, type: 'oem', title: 'OEM Meeting Report', date: '2024-03-16', status: 'draft' },
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the profile
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({
      name: employee.name,
      position: employee.position,
      department: employee.department,
      email: employee.email,
      phone: employee.phone,
      address: employee.address
    });
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Attendance</h3>
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Sign In
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Sign Out
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance History</h3>
              <div className="space-y-4">
                {attendance.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">Sign In: {record.signIn} | Sign Out: {record.signOut}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${record.status === 'present' ? 'bg-green-100 text-green-800' : 
                        record.status === 'half-day' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">My Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-600">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'assets':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Assets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {asset.type === 'laptop' && <Laptop className="w-6 h-6 text-blue-600" />}
                      {asset.type === 'phone' && <Smartphone className="w-6 h-6 text-blue-600" />}
                      {asset.type === 'idCard' && <CreditCard className="w-6 h-6 text-blue-600" />}
                      <div>
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-sm text-gray-600">Assigned: {new Date(asset.assignedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${asset.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {asset.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'leaves':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Management</h3>
              <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Request Leave
              </button>
              <div className="space-y-4">
                {leaves.map((leave) => (
                  <div key={leave.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{leave.type}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">{leave.reason}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${leave.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        leave.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {leave.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <p className="font-medium">Current Position</p>
                  <p className="text-lg">{performance.position}</p>
                  <p className="text-sm text-gray-600">Promoted on: {new Date(performance.promotionDate).toLocaleDateString()}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="font-medium">Current Rating</p>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <p className="text-lg">{performance.rating}/5</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="font-medium">Achievements</p>
                  <ul className="list-disc list-inside mt-2">
                    {performance.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-600">{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileCheck className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-sm text-gray-600">Date: {new Date(report.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${report.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        report.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-start space-x-6">
                <img src={employee.photo} alt={employee.name} className="w-24 h-24 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    {isEditing ? (
                      <div className="space-y-4 w-full">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={editedProfile.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Position</label>
                          <input
                            type="text"
                            name="position"
                            value={editedProfile.position}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Department</label>
                          <input
                            type="text"
                            name="department"
                            value={editedProfile.department}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={editedProfile.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={editedProfile.phone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={editedProfile.address}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </button>
                          <button
                            onClick={handleCancel}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
                          <p className="text-gray-600">{employee.position} • {employee.department}</p>
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{employee.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{employee.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{employee.address}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Briefcase className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">ID: {employee.employeeId}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={handleEdit}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit Profile
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Attendance</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">09:00</p>
                    <p className="text-sm text-gray-600">Sign In Time</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{employee.performance}%</p>
                    <p className="text-sm text-gray-600">Current Rating</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Tasks</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">3</p>
                    <p className="text-sm text-gray-600">Tasks Due Today</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start space-x-6">
            <img src={employee.photo} alt={employee.name} className="w-24 h-24 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                {isEditing ? (
                  <div className="space-y-4 w-full">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editedProfile.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Position</label>
                      <input
                        type="text"
                        name="position"
                        value={editedProfile.position}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={editedProfile.department}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editedProfile.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={editedProfile.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={editedProfile.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
                      <p className="text-gray-600">{employee.position} • {employee.department}</p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{employee.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{employee.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{employee.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">ID: {employee.employeeId}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Attendance</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Present</span>
                <span className="font-semibold text-green-600">{employee.attendance.present} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Absent</span>
                <span className="font-semibold text-red-600">{employee.attendance.absent} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Leaves</span>
                <span className="font-semibold text-yellow-600">{employee.attendance.leaves} days</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">{employee.performance}%</p>
                <p className="text-sm text-gray-600">Current Rating</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Holidays</h3>
            <div className="space-y-3">
              {employee.upcomingHolidays.map((holiday, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{holiday.name}</span>
                  <span className="font-semibold">{new Date(holiday.date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Memos Section */}
        <div className="mb-8">
          <MemoViewer userId="current-user-id" userRole="employee" />
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block p-6 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${link.color}`}>
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{link.title}</h3>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}