'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios'; // Ensure axios is installed: npm install axios
 
interface Leave {
  id: number;
  type: 'holiday' | 'sick' | 'casual';
  startDate: string; // YYYY-MM-DD from backend
  endDate: string;   // YYYY-MM-DD from backend
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  appliedDate: string; // YYYY-MM-DD from backend
  approvedBy?: string;
  approvedDate?: string; // YYYY-MM-DD from backend
  rejectionReason?: string;
}
 
export default function LeavesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newLeave, setNewLeave] = useState<Partial<Leave>>({
    type: 'casual',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_LEAVES || 'http://localhost:8080/api/leaves';
 
  // Fetch leaves from backend
  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get<Leave[]>(API_BASE_URL)
      .then(res => {
        setLeaves(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch leaves:", err);
        setError("Failed to load leave history. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [API_BASE_URL]);
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
 
    // Basic validation
    if (!newLeave.startDate || !newLeave.endDate || !newLeave.reason) {
      setError("Please fill in all required fields (Start Date, End Date, Reason).");
      return;
    }
    if (new Date(newLeave.startDate) > new Date(newLeave.endDate)) {
        setError("Start Date cannot be after End Date.");
        return;
    }
 
 
    const leave: Omit<Leave, 'id'> = {
      type: newLeave.type as Leave['type'],
      startDate: newLeave.startDate, // Already YYYY-MM-DD
      endDate: newLeave.endDate,     // Already YYYY-MM-DD
      status: 'pending',
      reason: newLeave.reason,
      appliedDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };
 
    axios.post<Leave>(API_BASE_URL, leave)
      .then(res => {
        setLeaves([res.data, ...leaves]); // Add new leave to the top
        setShowForm(false);
        setNewLeave({ type: 'casual', startDate: '', endDate: '', reason: '' });
      })
      .catch(err => {
        console.error("Failed to submit leave request:", err);
        setError("Failed to submit leave request. Please check your input and try again.");
      });
  };
 
  const getStatusColor = (status: Leave['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800'; // Fallback
    }
  };
 
  const getStatusIcon = (status: Leave['status']) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return null;
    }
  };
 
  // Helper function to format date
  const formatDateForDisplay = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';
    try {
      // Attempt to parse and format. If it's already YYYY-MM-DD, new Date() should handle it.
      // If it fails, fallback to displaying the original string.
      const date = new Date(dateString);
      if (isNaN(date.getTime())) { // Check if date is "Invalid Date"
        return dateString; // Return original string if parsing failed
      }
      return date.toLocaleDateString(); // Localized date format
    } catch (e) {
      console.warn("Failed to parse date string, displaying as-is:", dateString, e);
      return dateString; // Fallback to original string on error
    }
  };
 
 
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/employee" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
 
        <div className="space-y-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
            <p className="mt-2 text-gray-600">Request and track your leaves</p>
          </div>
 
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {['approved', 'pending', 'rejected'].map(status => (
              <div key={status} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`text-3xl font-bold ${
                      status === 'approved' ? 'text-green-600' :
                      status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {leaves.filter(l => l.status === status).length}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">{status} Leaves</p>
                  </div>
                  <div className={`p-3 rounded-full ${
                    status === 'approved' ? 'bg-green-100' :
                    status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    {getStatusIcon(status as Leave['status'])}
                  </div>
                </div>
              </div>
            ))}
          </div>
 
          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Request Leave</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-1" />
                New Request
              </button>
            </div>
 
            {showForm && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline ml-2">{error}</span>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Leave Type</label>
                    <select
                      value={newLeave.type}
                      onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value as Leave['type'] })}
                      className="w-full mt-1 border rounded-md p-2"
                      required
                    >
                      <option value="casual">Casual Leave</option>
                      <option value="sick">Sick Leave</option>
                      <option value="holiday">Holiday</option>
                    </select>
                  </div>
 
                  <div>
                    <label className="text-sm font-medium">Reason</label>
                    <input
                      type="text"
                      value={newLeave.reason}
                      onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                      className="w-full mt-1 border rounded-md p-2"
                      required
                      placeholder="e.g., Personal appointment"
                    />
                  </div>
 
                  <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <input
                      type="date"
                      value={newLeave.startDate}
                      onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                      className="w-full mt-1 border rounded-md p-2"
                      required
                    />
                  </div>
 
                  <div>
                    <label className="text-sm font-medium">End Date</label>
                    <input
                      type="date"
                      value={newLeave.endDate}
                      onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                      className="w-full mt-1 border rounded-md p-2"
                      required
                    />
                  </div>
                </div>
 
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => {
                    setShowForm(false);
                    setError(null); // Clear error on cancel
                    setNewLeave({ type: 'casual', startDate: '', endDate: '', reason: '' });
                  }} className="px-4 py-2 border rounded-lg">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
 
          {/* Leave History */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Leave History</h2>
            {loading && <div className="text-center text-gray-500 py-8">Loading leave history...</div>}
            {!loading && error && <div className="text-center text-red-600 py-8">Error: {error}</div>}
            {!loading && !error && leaves.length === 0 && (
              <div className="text-center text-gray-500 py-8">No leave requests found.</div>
            )}
            {!loading && !error && leaves.length > 0 && (
              <div className="space-y-4">
                {leaves.map((leave) => (
                  <div key={leave.id} className="flex justify-between border p-4 rounded-lg">
                    <div className="flex gap-4 items-start">
                      <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium capitalize">{leave.type} Leave</p>
                        <p className="text-sm text-gray-600">
                          {formatDateForDisplay(leave.startDate)} - {formatDateForDisplay(leave.endDate)}
                        </p>
                        <p className="text-sm text-gray-600">Reason: {leave.reason}</p>
                        {leave.rejectionReason && (
                          <p className="text-sm text-red-600">Rejection Reason: {leave.rejectionReason}</p>
                        )}
                        <p className="text-sm text-gray-500">Applied on: {formatDateForDisplay(leave.appliedDate)}</p>
                        {leave.approvedBy && leave.approvedDate && (
                            <p className="text-sm text-gray-500">Approved by: {leave.approvedBy} on {formatDateForDisplay(leave.approvedDate)}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(leave.status)}`}>
                        {leave.status}
                      </span>
                      {getStatusIcon(leave.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 