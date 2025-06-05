'use client';
import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle, XCircle, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Leave {
  id: number;
  type: 'holiday' | 'sick' | 'casual';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
}

export default function LeavesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([
    {
      id: 1,
      type: 'holiday',
      startDate: '2024-03-25',
      endDate: '2024-03-25',
      status: 'approved',
      reason: 'Holi Festival',
      appliedDate: '2024-03-01',
      approvedBy: 'John Manager',
      approvedDate: '2024-03-02'
    },
    {
      id: 2,
      type: 'sick',
      startDate: '2024-03-20',
      endDate: '2024-03-21',
      status: 'pending',
      reason: 'Fever',
      appliedDate: '2024-03-19'
    },
    {
      id: 3,
      type: 'casual',
      startDate: '2024-03-15',
      endDate: '2024-03-15',
      status: 'rejected',
      reason: 'Personal work',
      appliedDate: '2024-03-14',
      approvedBy: 'John Manager',
      approvedDate: '2024-03-14',
      rejectionReason: 'High workload during that period'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newLeave, setNewLeave] = useState<Partial<Leave>>({
    type: 'casual',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const leave: Leave = {
      id: leaves.length + 1,
      type: newLeave.type as Leave['type'],
      startDate: newLeave.startDate!,
      endDate: newLeave.endDate!,
      status: 'pending',
      reason: newLeave.reason!,
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setLeaves([leave, ...leaves]);
    setShowForm(false);
    setNewLeave({
      type: 'casual',
      startDate: '',
      endDate: '',
      reason: ''
    });
  };

  const getStatusColor = (status: Leave['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: Leave['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/employee"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
            <p className="mt-2 text-gray-600">Request and track your leaves</p>
          </div>

          {/* Leave Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-green-600">
                    {leaves.filter(l => l.status === 'approved').length}
                  </p>
                  <p className="text-sm text-gray-600">Approved Leaves</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-yellow-600">
                    {leaves.filter(l => l.status === 'pending').length}
                  </p>
                  <p className="text-sm text-gray-600">Pending Leaves</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-red-600">
                    {leaves.filter(l => l.status === 'rejected').length}
                  </p>
                  <p className="text-sm text-gray-600">Rejected Leaves</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Leave Request Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Request Leave</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>New Request</span>
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Leave Type</label>
                    <select
                      value={newLeave.type}
                      onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value as Leave['type'] })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="casual">Casual Leave</option>
                      <option value="sick">Sick Leave</option>
                      <option value="holiday">Holiday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reason</label>
                    <input
                      type="text"
                      value={newLeave.reason}
                      onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={newLeave.startDate}
                      onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="date"
                      value={newLeave.endDate}
                      onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Leave History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave History</h2>
            <div className="space-y-4">
              {leaves.map((leave) => (
                <div key={leave.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium capitalize">{leave.type} Leave</p>
                      <p className="text-sm text-gray-600">
                        {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">Reason: {leave.reason}</p>
                      {leave.rejectionReason && (
                        <p className="text-sm text-red-600 mt-1">Rejection Reason: {leave.rejectionReason}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                    {getStatusIcon(leave.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 