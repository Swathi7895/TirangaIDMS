'use client';
import { useState } from 'react';
import Head from 'next/head';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  joinDate: string;
  status: string;
}

interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
  reason: string;
}

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: 'John Doe',
      position: 'Software Engineer',
      department: 'IT',
      email: 'john.doe@company.com',
      phone: '+1234567890',
      joinDate: '2023-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'HR Manager',
      department: 'Human Resources',
      email: 'jane.smith@company.com',
      phone: '+1234567891',
      joinDate: '2022-06-10',
      status: 'Active'
    }
  ]);

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Company Policy Update',
      content: 'Updated remote work policy effective immediately.',
      date: '2024-06-01',
      type: 'policy'
    },
    {
      id: 2,
      title: 'Holiday Schedule',
      content: 'Summer holidays schedule has been published.',
      date: '2024-05-28',
      type: 'holiday'
    }
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      employeeId: 1,
      employeeName: 'John Doe',
      type: 'Annual Leave',
      startDate: '2024-06-15',
      endDate: '2024-06-20',
      status: 'Pending',
      reason: 'Family vacation'
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Jane Smith',
      type: 'Sick Leave',
      startDate: '2024-06-05',
      endDate: '2024-06-06',
      status: 'Approved',
      reason: 'Medical appointment'
    }
  ]);

  const [assets, setAssets] = useState([
    {
      id: 1,
      employeeId: 1,
      type: 'Laptop',
      model: 'MacBook Pro 16"',
      serialNumber: 'MBP123456',
      assignedDate: '2023-01-15',
      status: 'Active'
    },
    {
      id: 2,
      employeeId: 1,
      type: 'Phone',
      model: 'iPhone 14',
      serialNumber: 'IP789012',
      assignedDate: '2023-01-15',
      status: 'Active'
    }
  ]);

  const [weeklyActivities, setWeeklyActivities] = useState([
    {
      id: 1,
      week: 'Week 23, 2024',
      activities: [
        'Conducted 5 interviews',
        'Processed 3 new hires',
        'Updated employee handbook',
        'Organized team building event'
      ]
    }
  ]);

  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    type: 'general'
  });

  const [showNoticeForm, setShowNoticeForm] = useState(false);

  const handleLeaveApproval = (leaveId: number, status: string) => {
    setLeaveRequests(prev => 
      prev.map(leave => 
        leave.id === leaveId ? { ...leave, status } : leave
      )
    );
  };

  const handleAddNotice = () => {
    if (newNotice.title && newNotice.content) {
      const notice = {
        id: Date.now(),
        ...newNotice,
        date: new Date().toISOString().split('T')[0]
      };
      setNotices(prev => [notice, ...prev]);
      setNewNotice({ title: '', content: '', type: 'general' });
      setShowNoticeForm(false);
    }
  };

  const renderEmployeeDetails = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-green-600">Employee Details & Documents</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3 text-green-600">Resume, Marks Card, ID Proof, Offer Letter</h4>
          <div className="space-y-2">
            {employees.map(emp => (
              <div key={emp.id} className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
                   onClick={() => setSelectedEmployee(emp)}>
                <div className="font-medium">{emp.name}</div>
                <div className="text-sm text-gray-600">{emp.position} - {emp.department}</div>
                <div className="text-sm text-gray-500">Joined: {emp.joinDate}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3 text-green-600">Employees Handling Assets</h4>
          <div className="space-y-3">
            <div className="text-sm font-medium">1. PHONE</div>
            <div className="text-sm font-medium">2. SIM</div>
            <div className="text-sm font-medium">3. IDCARD</div>
            <div className="text-sm font-medium">4. LAPTOP/SYSTEM</div>
            <div className="text-sm font-medium">5. VEHICLE</div>
          </div>
          
          <div className="mt-4">
            {assets.map(asset => (
              <div key={asset.id} className="p-2 border rounded mb-2">
                <div className="font-medium">{asset.type}: {asset.model}</div>
                <div className="text-sm text-gray-600">Serial: {asset.serialNumber}</div>
                <div className="text-sm text-gray-500">Employee ID: {asset.employeeId}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeaveManagement = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-green-600">Leave Management</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-medium mb-3 text-green-600">a) APPROVED</h4>
          {leaveRequests.filter(leave => leave.status === 'Approved').map(leave => (
            <div key={leave.id} className="p-3 border border-green-200 rounded mb-2 bg-green-50">
              <div className="font-medium">{leave.employeeName}</div>
              <div className="text-sm">{leave.type}</div>
              <div className="text-sm text-gray-600">{leave.startDate} to {leave.endDate}</div>
            </div>
          ))}
        </div>
        
        <div>
          <h4 className="font-medium mb-3 text-green-600">b) NON-APPROVED</h4>
          {leaveRequests.filter(leave => leave.status === 'Rejected').map(leave => (
            <div key={leave.id} className="p-3 border border-red-200 rounded mb-2 bg-red-50">
              <div className="font-medium">{leave.employeeName}</div>
              <div className="text-sm">{leave.type}</div>
              <div className="text-sm text-gray-600">{leave.startDate} to {leave.endDate}</div>
            </div>
          ))}
        </div>
        
        <div>
          <h4 className="font-medium mb-3 text-green-600">c) HOLIDAY LEAVES</h4>
          {leaveRequests.filter(leave => leave.status === 'Pending').map(leave => (
            <div key={leave.id} className="p-3 border border-yellow-200 rounded mb-2 bg-yellow-50">
              <div className="font-medium">{leave.employeeName}</div>
              <div className="text-sm">{leave.type}</div>
              <div className="text-sm text-gray-600">{leave.startDate} to {leave.endDate}</div>
              <div className="mt-2 space-x-2">
                <button 
                  onClick={() => handleLeaveApproval(leave.id, 'Approved')}
                  className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button 
                  onClick={() => handleLeaveApproval(leave.id, 'Rejected')}
                  className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-green-600">Employee Performance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-medium mb-3 text-green-600">1. POSITIONS</h4>
          <div className="space-y-2">
            {employees.map(emp => (
              <div key={emp.id} className="p-2 border rounded">
                <div className="font-medium">{emp.name}</div>
                <div className="text-sm text-gray-600">{emp.position}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-3 text-green-600">2. PROMOTIONS</h4>
          <div className="p-3 border rounded bg-blue-50">
            <div className="text-sm">Q2 2024 Promotions</div>
            <div className="text-sm text-gray-600">2 employees promoted</div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-3 text-green-600">3. APPLICATION</h4>
          <div className="p-3 border rounded bg-purple-50">
            <div className="text-sm">Performance Reviews</div>
            <div className="text-sm text-gray-600">Quarterly assessments</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderJoiningDetails = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-green-600">Joining/Relieving Details and Documents</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Employee Name</th>
              <th className="px-4 py-2 text-left">Position</th>
              <th className="px-4 py-2 text-left">Join Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="border-b">
                <td className="px-4 py-2">{emp.name}</td>
                <td className="px-4 py-2">{emp.position}</td>
                <td className="px-4 py-2">{emp.joinDate}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    emp.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderWeeklyActivities = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-green-600">Weekly Activities List</h3>
      
      <div className="space-y-4">
        {weeklyActivities.map(week => (
          <div key={week.id} className="border rounded p-4">
            <h4 className="font-medium mb-3 text-gray-800">{week.week}</h4>
            <ul className="space-y-2">
              {week.activities.map((activity, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotices = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-red-600">Memo from Admin - To Selected Employee Notice</h3>
        <button 
          onClick={() => setShowNoticeForm(!showNoticeForm)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Add Notice
        </button>
      </div>

      {showNoticeForm && (
        <div className="mb-6 p-4 border rounded bg-red-50">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Notice Title"
              value={newNotice.title}
              onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Notice Content"
              value={newNotice.content}
              onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
              className="w-full p-2 border rounded h-24"
            />
            <select
              value={newNotice.type}
              onChange={(e) => setNewNotice({...newNotice, type: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="general">General</option>
              <option value="policy">Policy</option>
              <option value="holiday">Holiday</option>
              <option value="urgent">Urgent</option>
            </select>
            <div className="space-x-2">
              <button 
                onClick={handleAddNotice}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Notice
              </button>
              <button 
                onClick={() => setShowNoticeForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {notices.map(notice => (
          <div key={notice.id} className="border border-red-200 rounded p-4 bg-red-50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-red-800">{notice.title}</h4>
              <span className="text-xs text-red-600">{notice.date}</span>
            </div>
            <p className="text-gray-700 mb-2">{notice.content}</p>
            <span className="inline-block px-2 py-1 bg-red-200 text-red-800 text-xs rounded">
              {notice.type}
            </span>
          </div>
        ))}
      </div>
      
      
    </div>
  );

  return (
    <>
      <Head>
        <title>HR Dashboard - Employee Management System</title>
        <meta name="description" content="Comprehensive HR management system for employee administration" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold text-gray-900">HR PAGE</h1>
              <div className="text-sm text-gray-600">
                Employee Management System
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-8 border-b">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'details'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Employee Details
              </button>
              <button
                onClick={() => setActiveTab('leave')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'leave'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Leave Management
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'performance'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Performance
              </button>
              <button
                onClick={() => setActiveTab('joining')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'joining'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Joining/Relieving
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'activities'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Weekly Activities
              </button>
              <button
                onClick={() => setActiveTab('notices')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'notices'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Admin Notices
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            {activeTab === 'details' && renderEmployeeDetails()}
            {activeTab === 'leave' && renderLeaveManagement()}
            {activeTab === 'performance' && renderPerformance()}
            {activeTab === 'joining' && renderJoiningDetails()}
            {activeTab === 'activities' && renderWeeklyActivities()}
            {activeTab === 'notices' && renderNotices()}
          </div>
        </div>
      </div>
    </>
  );
};

export default HRDashboard;