'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
 
  CheckCircle,
  XCircle,
  AlertCircle,
 
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
 
interface Attendance {
  id?: number;
  date: string;
  signIn: string | null;
  signOut: string | null;
  status: 'present' | 'absent' | 'half-day' | 'late';
  workHours: number;
  employeeId: string;
}
 
const API_BASE_URL = 'http://localhost:8080/api/attendance';
 
export default function AttendancePage() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
 
  const [viewMode, setViewMode] = useState<'week' | 'month' | 'year'>('week');
  const [todayAttendance, setTodayAttendance] = useState<Attendance | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const employeeId = 'EMP001';
 
  // Define fetchAttendance outside useEffect
  const fetchAttendance = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const response = await axios.get(`${API_BASE_URL}/employee/${employeeId}`);
      const fetchedAttendance: Attendance[] = response.data.map((record: any) => ({
        ...record,
        signIn: record.checkInTime || null,
        signOut: record.checkOutTime || null,
        workHours: record.workHours || (record.checkInTime && record.checkOutTime
          ? (new Date(`${record.date}T${record.checkOutTime}`).getTime() - new Date(`${record.date}T${record.checkInTime}`).getTime()) / (1000 * 60 * 60)
          : 0),
      }));
      setAttendance(fetchedAttendance);
 
      const today = new Date();
      const formattedToday = today.toISOString().split('T')[0];
      const existingTodayAttendance = fetchedAttendance.find((a: Attendance) => a.date === formattedToday);
 
      if (!existingTodayAttendance) {
        const newAttendance: Attendance = {
          date: formattedToday,
          signIn: null,
          signOut: null,
          status: 'absent',
          workHours: 0,
          employeeId: employeeId,
        };
        setTodayAttendance(newAttendance);
        console.log("useEffect: No existing attendance for today. Setting newAttendance:", newAttendance);
      } else {
        setTodayAttendance(existingTodayAttendance);
        console.log("useEffect: Found existing attendance for today:", existingTodayAttendance);
      }
    } catch (err) {
      setError('Failed to fetch attendance data. Make sure backend is running.');
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
      console.log("useEffect: Finished fetching. Loading set to false.");
    }
  }, [employeeId]); // Add employeeId to useCallback dependencies
 
  // Fetch attendance data on component mount and when employeeId changes
  useEffect(() => {
    console.log("useEffect: Fetching attendance data...");
    fetchAttendance();
  }, [fetchAttendance]); // Add fetchAttendance to useEffect dependencies
 
  // Console log current state for debugging
  console.log("Render: loading=", loading, "todayAttendance=", todayAttendance);
  console.log("Render: todayAttendance.signIn=", todayAttendance?.signIn, "todayAttendance.signOut=", todayAttendance?.signOut);
 
  const handleSignIn = async () => {
    if (!todayAttendance) return;
 
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
 
      const newAttendanceData: Attendance = {
        ...todayAttendance,
        signIn: timeString,
        status: 'present',
        workHours: 0, // Reset work hours on sign-in
      };
 
      // console.log("handleSignIn: Sending payload to backend:", newAttendanceData);
      const response = await axios.post(`${API_BASE_URL}/mark`, {
        ...newAttendanceData,
        employeeId: employeeId,
      });
 
      // console.log("handleSignIn: Backend response data:", response.data);
      setTodayAttendance(response.data);
      // fetchAttendance(); // Removed: Re-fetch all attendance data to ensure history is up-to-date
      // console.log("handleSignIn: todayAttendance after set:", todayAttendance);
      console.log("handleSignIn: Successfully signed in.");
 
    } catch (err) {
      setError('Failed to sign in. Make sure backend is running.');
      console.error('Error signing in:', err);
    } finally {
      setLoading(false);
    }
  };
 
  const handleSignOut = async () => {
    if (!todayAttendance || !todayAttendance.signIn) return;
 
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
 
      // Calculate work hours
      const signInTime = new Date(`${todayAttendance.date}T${todayAttendance.signIn}`);
      const signOutTime = now;
      const workHours = (signOutTime.getTime() - signInTime.getTime()) / (1000 * 60 * 60);
 
      // Determine status based on work hours
      let status: 'present' | 'half-day' | 'absent' = 'present';
      if (workHours < 4.5) {
        status = 'absent';
      } else if (workHours < 9) {
        status = 'half-day';
      }
 
      const updatedAttendanceData: Attendance = {
        ...todayAttendance,
        signOut: timeString,
        status,
        workHours: Number(workHours.toFixed(1))
      };
 
      const response = await axios.post(`${API_BASE_URL}/mark`, {
        ...updatedAttendanceData,
        employeeId: employeeId,
      });
 
      // console.log("handleSignOut: Backend response data:", response.data);
      setTodayAttendance(response.data);
      // fetchAttendance(); // Removed: Re-fetch all attendance data to ensure history is up-to-date
      // console.log("handleSignOut: todayAttendance after set:", todayAttendance);
      console.log("handleSignOut: Successfully signed out.");
 
    } catch (err) {
      setError('Failed to sign out. Make sure backend is running.');
      console.error('Error signing out:', err);
    } finally {
      setLoading(false);
    }
  };
 
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'half-day':
        return 'bg-yellow-100 text-yellow-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late': // Added late status for consistency
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
 
  const renderAttendanceStats = () => {
    const stats = attendance.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
 
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Present</p>
              <p className="text-2xl font-bold text-green-600">{stats.present || 0}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Half Day</p>
              <p className="text-2xl font-bold text-yellow-600">{stats['half-day'] || 0}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">{stats.absent || 0}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>
    );
  };
 
  const renderAttendanceHistory = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Attendance History</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-lg ${
                viewMode === 'week' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded-lg ${
                viewMode === 'month' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('year')}
              className={`px-3 py-1 rounded-lg ${
                viewMode === 'year' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Year
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {attendance.map((record, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                <div className="text-sm text-gray-600">
                  {record.signIn ? `Sign In: ${record.signIn}` : 'Not signed in'}
                  {record.signOut ? ` | Sign Out: ${record.signOut}` : ''}
                  {record.workHours > 0 ? ` | Work Hours: ${record.workHours.toFixed(1)}` : ''}
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                {record.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
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
 
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
 
        <div className="space-y-6">
          {/* Today's Attendance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today&rsquo;s Attendance</h3>
            <div className="flex space-x-4">
              <button
                onClick={handleSignIn}
                disabled={loading || todayAttendance?.signIn !== null}
                className={`px-4 py-2 rounded-lg ${
                  todayAttendance?.signIn !== null
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={handleSignOut}
                disabled={loading || !todayAttendance?.signIn || todayAttendance?.signOut !== null}
                className={`px-4 py-2 rounded-lg ${
                  !todayAttendance?.signIn || todayAttendance?.signOut !== null
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                Sign Out
              </button>
            </div>
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading...</p>
              </div>
            ) : (
              todayAttendance && (
                <div className="mt-4 p-4 border rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Sign In Time</p>
                      <p className="font-medium">{todayAttendance.signIn || 'Not signed in'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sign Out Time</p>
                      <p className="font-medium">{todayAttendance.signOut || 'Not signed out'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Work Hours</p>
                      <p className="font-medium">{todayAttendance.workHours || 0} hours</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className={`font-medium ${getStatusColor(todayAttendance.status)}`}>
                        {todayAttendance.status}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
 
          {/* Attendance Stats */}
          {renderAttendanceStats()}
 
          {/* Attendance History */}
          {renderAttendanceHistory()}
        </div>
      </div>
    </div>
  );
}
 