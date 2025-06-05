'use client';
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  X, 
  Calendar,
  Clock,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  User
} from 'lucide-react';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  duration: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
  approvedBy?: string;
  approvedOn?: string;
  comments?: string;
}

interface LeaveBalance {
  leaveType: string;
  total: number;
  used: number;
  remaining: number;
}

interface LeavesPageProps {
  userRole: string;
  userId: string;
}

export default function LeavesPage({ userRole, userId }: LeavesPageProps) {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      leaveType: 'Annual Leave',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      duration: 5,
      reason: 'Family vacation',
      status: 'pending',
      appliedOn: '2024-03-01'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Jane Smith',
      leaveType: 'Sick Leave',
      startDate: '2024-03-10',
      endDate: '2024-03-12',
      duration: 3,
      reason: 'Medical appointment',
      status: 'approved',
      appliedOn: '2024-03-05',
      approvedBy: 'HR Manager',
      approvedOn: '2024-03-06'
    }
  ]);

  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([
    {
      leaveType: 'Annual Leave',
      total: 20,
      used: 5,
      remaining: 15
    },
    {
      leaveType: 'Sick Leave',
      total: 10,
      used: 3,
      remaining: 7
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'view' | 'edit'>('add');
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [formData, setFormData] = useState<Partial<LeaveRequest>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const isHR = userRole === 'hr';

  const openModal = (type: 'add' | 'view' | 'edit', request?: LeaveRequest) => {
    setModalType(type);
    setSelectedRequest(request || null);
    if (type === 'add') {
      setFormData({
        employeeId: userId,
        leaveType: '',
        startDate: '',
        endDate: '',
        duration: 0,
        reason: '',
        status: 'pending',
        appliedOn: new Date().toISOString().split('T')[0]
      });
    } else if (request) {
      setFormData({ ...request });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
    setFormData({});
  };

  const handleSubmit = () => {
    if (!formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {
      alert('Please fill in all required fields');
      return;
    }

    if (modalType === 'add') {
      const newRequest: LeaveRequest = {
        ...formData as LeaveRequest,
        id: Date.now().toString(),
        status: 'pending',
        appliedOn: new Date().toISOString().split('T')[0]
      };
      setLeaveRequests([...leaveRequests, newRequest]);
    } else if (modalType === 'edit' && selectedRequest) {
      setLeaveRequests(leaveRequests.map(request => 
        request.id === selectedRequest.id 
          ? { ...formData as LeaveRequest, id: selectedRequest.id }
          : request
      ));
    }
    
    closeModal();
  };

  const handleApprove = (id: string) => {
    setLeaveRequests(leaveRequests.map(request => 
      request.id === id 
        ? { 
            ...request, 
            status: 'approved',
            approvedBy: 'HR Manager',
            approvedOn: new Date().toISOString().split('T')[0]
          }
        : request
    ));
  };

  const handleReject = (id: string) => {
    setLeaveRequests(leaveRequests.map(request => 
      request.id === id 
        ? { 
            ...request, 
            status: 'rejected',
            approvedBy: 'HR Manager',
            approvedOn: new Date().toISOString().split('T')[0]
          }
        : request
    ));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      setLeaveRequests(leaveRequests.filter(request => request.id !== id));
    }
  };

  // Filter requests based on user role and search query
  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = 
      request.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.leaveType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesUser = isHR || request.employeeId === userId;

    return matchesSearch && matchesStatus && matchesUser;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
        {!isHR && (
          <button 
            onClick={() => openModal('add')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Request Leave</span>
          </button>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leave requests..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Leave Balances */}
      {!isHR && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave Balances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leaveBalances.map((balance) => (
              <div key={balance.leaveType} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900">{balance.leaveType}</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">Total: {balance.total} days</p>
                  <p className="text-sm text-gray-600">Used: {balance.used} days</p>
                  <p className="text-sm text-gray-600">Remaining: {balance.remaining} days</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leave Requests */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leave Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied On
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.employeeName}</div>
                        <div className="text-sm text-gray-500">{request.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.leaveType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.duration} days</div>
                    <div className="text-sm text-gray-500">
                      {request.startDate} to {request.endDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.appliedOn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => openModal('view', request)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {isHR && request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      {(!isHR && request.status === 'pending') && (
                        <button
                          onClick={() => handleDelete(request.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalType === 'add' && 'Request Leave'}
                  {modalType === 'edit' && 'Edit Leave Request'}
                  {modalType === 'view' && 'Leave Request Details'}
                </h2>
                <button 
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {modalType === 'view' ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Employee</p>
                      <p className="font-medium">{selectedRequest?.employeeName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Leave Type</p>
                      <p className="font-medium">{selectedRequest?.leaveType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-medium">{selectedRequest?.duration} days</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="font-medium">{selectedRequest?.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Start Date</p>
                      <p className="font-medium">{selectedRequest?.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">End Date</p>
                      <p className="font-medium">{selectedRequest?.endDate}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Reason</p>
                    <p className="text-gray-900">{selectedRequest?.reason}</p>
                  </div>

                  {selectedRequest?.status !== 'pending' && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        {selectedRequest?.status === 'approved' ? 'Approved' : 'Rejected'} by {selectedRequest?.approvedBy} on {selectedRequest?.approvedOn}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.leaveType || ''}
                        onChange={(e) => setFormData({...formData, leaveType: e.target.value})}
                      >
                        <option value="">Select Leave Type</option>
                        <option value="Annual Leave">Annual Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Unpaid Leave">Unpaid Leave</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration (days)</label>
                      <input
                        type="number"
                        required
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.duration || ''}
                        onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.startDate || ''}
                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="date"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.endDate || ''}
                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.reason || ''}
                      onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {modalType === 'add' ? 'Submit Request' : 'Update Request'}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}