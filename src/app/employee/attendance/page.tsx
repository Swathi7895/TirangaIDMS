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
 
// Changed interface to use checkInTime and checkOutTime for consistency with backend
interface Attendance {
  id?: number;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: 'present' | 'absent' | 'half-day' | 'late';
  workHours: number;
  employeeId: string;
}
 
interface AttendanceRecord {
  id?: number;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  workHours: number;
  status: 'present' | 'absent' | 'half-day' | 'late';
  employeeId: string;
}
 
const API_BASE_URL = 'http://localhost:8080/api/attendance';
 
export default function AttendancePage() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [viewMode, setViewMode] = useState<'week' | 'month' | 'year'>('week');
  const [todayAttendance, setTodayAttendance] = useState<Attendance | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const employeeId = 'EMP001'; // Static employee ID for this example
 
  // Define fetchAttendance using useCallback to memoize it
  const fetchAttendance = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const response = await axios.get(`${API_BASE_URL}/employee/${employeeId}`);
     
      const fetchedAttendance: Attendance[] = response.data.map((record: AttendanceRecord) => ({
        ...record,
        // Map backend fields to the Attendance interface. Assuming backend sends 'checkInTime' and 'checkOutTime'
        checkInTime: record.checkInTime || null,
        checkOutTime: record.checkOutTime || null,
        // Calculate workHours if not provided by backend, or if checkIn/Out are present
        workHours: record.workHours || (record.checkInTime && record.checkOutTime
          ? (new Date(`${record.date}T${record.checkOutTime}`).getTime() - new Date(`${record.date}T${record.checkInTime}`).getTime()) / (1000 * 60 * 60)
          : 0),
      }));
     
      setAttendance(fetchedAttendance); // Update the main attendance history
 
      const today = new Date();
      const formattedToday = today.toISOString().split('T')[0];
      const existingTodayAttendance = fetchedAttendance.find((a: Attendance) => a.date === formattedToday);
 
      if (!existingTodayAttendance) {
        // If no attendance record exists for today, create a new one for initial state
        const newAttendance: Attendance = {
          date: formattedToday,
          checkInTime: null,
          checkOutTime: null,
          status: 'absent', // Default to absent if no activity
          workHours: 0,
          employeeId: employeeId,
        };
        setTodayAttendance(newAttendance);
        // Add this new record to the main attendance list immediately for UI consistency
        setAttendance(prev => [newAttendance, ...prev]);
        console.log("No existing attendance for today. Setting newAttendance and adding to list:", newAttendance);
      } else {
        setTodayAttendance(existingTodayAttendance);
        console.log("Found existing attendance for today:", existingTodayAttendance);
      }
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Failed to fetch attendance data: ${errorMessage}`);
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
      console.log("Finished fetching attendance. Loading set to false.");
    }
  }, [employeeId]); // Dependency array for useCallback
 
  // Fetch attendance data on component mount (and when fetchAttendance changes due to its dependencies)
  useEffect(() => {
    console.log("useEffect: Initial/re-fetch attendance data...");
    fetchAttendance();
  }, [fetchAttendance]); // Dependency array for useEffect
 
  // Console logs for debugging (can be removed in production)
  console.log("Render: loading=", loading, "todayAttendance=", todayAttendance);
  console.log("Render: todayAttendance.checkInTime=", todayAttendance?.checkInTime, "todayAttendance.checkOutTime=", todayAttendance?.checkOutTime);
 
  const handleSignIn = async () => {
    if (!todayAttendance) return; // Prevent action if todayAttendance is null
 
    try {
      console.log("[handleSignIn] Attempting to sign in. Current todayAttendance:", todayAttendance);
      setLoading(true);
      setError(null); // Clear previous errors
      const now = new Date();
      // Format time as HH:MM:SS (24-hour format)
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
 
      const payload = {
        ...todayAttendance, // Use current todayAttendance state
        checkInTime: timeString, // Set checkInTime
        status: 'present', // Assume present on sign-in
        workHours: 0, // Reset work hours on sign-in, will be calculated on sign-out
        employeeId: employeeId,
      };
 
      console.log("[handleSignIn] Sending payload to backend:", payload);
      // Use axios.post for marking attendance
      const response = await axios.post(`${API_BASE_URL}/mark`, payload);
 
      const updatedRecord = response.data as Attendance; // Backend should return the updated attendance record
      setTodayAttendance(updatedRecord); // Update todayAttendance state directly
 
      // Update the main attendance array with the new/updated record
      setAttendance(prev => {
        const index = prev.findIndex(a => a.date === updatedRecord.date);
        if (index !== -1) {
          // If record exists, update it
          const newArr = [...prev];
          newArr[index] = updatedRecord;
          return newArr;
        } else {
          // If record doesn't exist (e.g., first sign-in of the day), add it
          return [updatedRecord, ...prev];
        }
      });
      console.log("[handleSignIn] Backend response data & state updated:", updatedRecord);
      console.log("handleSignIn: Successfully signed in.");
 
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Failed to sign in: ${errorMessage}`);
      console.error('[handleSignIn] Error signing in:', err);
    } finally {
      setLoading(false);
      console.log("[handleSignIn] Loading set to false.");
    }
  };
 
  const handleSignOut = async () => {
    // Ensure todayAttendance exists and employee has signed in
    if (!todayAttendance || !todayAttendance.checkInTime) return;
 
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const now = new Date();
      // Format time as HH:MM:SS (24-hour format)
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
 
      // Calculate work hours based on sign-in and sign-out times
      const signInTime = new Date(`${todayAttendance.date}T${todayAttendance.checkInTime}`);
      const signOutTime = now;
      const workHours = (signOutTime.getTime() - signInTime.getTime()) / (1000 * 60 * 60); // Hours
 
      // Determine status based on work hours
      let status: 'present' | 'half-day' | 'absent' = 'present';
      if (workHours < 4.5) { // Example threshold for absent
        status = 'absent';
      } else if (workHours < 9) { // Example threshold for half-day
        status = 'half-day';
      }
 
      const payload = {
        ...todayAttendance, // Use current todayAttendance state
        checkOutTime: timeString, // Set checkOutTime
        status, // Update status
        workHours: Number(workHours.toFixed(1)), // Round work hours to one decimal place
        employeeId: employeeId,
      };
 
      const response = await axios.post(`${API_BASE_URL}/mark`, payload);
 
      const updatedRecord = response.data as Attendance; // Backend should return the updated attendance record
      setTodayAttendance(updatedRecord); // Update todayAttendance state directly
 
      // Update the main attendance array with the updated record
      setAttendance(prev => {
        const index = prev.findIndex(a => a.date === updatedRecord.date);
        if (index !== -1) {
          const newArr = [...prev];
          newArr[index] = updatedRecord;
          return newArr;
        }
        return prev; // Should always find it if it was signed in
      });
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
      case 'late': // Added late status for consistency in UI, though not explicitly set by logic yet
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
 
  const renderAttendanceStats = () => {
    // Calculate attendance statistics from the 'attendance' array
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
    // Filter attendance based on viewMode (week, month, year)
    const now = new Date();
    let filteredAttendance = attendance;
 
    if (viewMode === 'week') {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Sunday
      filteredAttendance = attendance.filter(record =>
        new Date(record.date) >= startOfWeek
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort descending
    } else if (viewMode === 'month') {
      filteredAttendance = attendance.filter(record =>
        new Date(record.date).getMonth() === now.getMonth() &&
        new Date(record.date).getFullYear() === now.getFullYear()
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (viewMode === 'year') {
      filteredAttendance = attendance.filter(record =>
        new Date(record.date).getFullYear() === now.getFullYear()
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
 
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
          {filteredAttendance.length > 0 ? (
            filteredAttendance.map((record, index) => (
              <div key={record.id || index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                  <div className="text-sm text-gray-600">
                    {record.checkInTime ? `Sign In: ${record.checkInTime}` : 'Not signed in'}
                    {record.checkOutTime ? ` | Sign Out: ${record.checkOutTime}` : ''}
                    {record.workHours > 0 ? ` | Work Hours: ${record.workHours.toFixed(1)}` : ''}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No attendance records found for this period.</p>
          )}
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
            href="/employee" // Adjust this path if your dashboard is elsewhere
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
          {/* Today's Attendance Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today&rsquo;s Attendance</h3>
            <div className="flex space-x-4">
              <button
                onClick={handleSignIn}
                // Disable if loading or already signed in today
                disabled={loading || todayAttendance?.checkInTime !== null}
                className={`px-4 py-2 rounded-lg ${
                  todayAttendance?.checkInTime !== null
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={handleSignOut}
                // Disable if loading, not signed in yet, or already signed out
                disabled={loading || !todayAttendance?.checkInTime || todayAttendance?.checkOutTime !== null}
                className={`px-4 py-2 rounded-lg ${
                  !todayAttendance?.checkInTime || todayAttendance?.checkOutTime !== null
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
              todayAttendance && ( // Only render if todayAttendance is available
                <div className="mt-4 p-4 border rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Sign In Time</p>
                      <p className="font-medium">{todayAttendance.checkInTime || 'Not signed in'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sign Out Time</p>
                      <p className="font-medium">{todayAttendance.checkOutTime || 'Not signed out'}</p>
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
 
          {/* Attendance Stats Section */}
          {renderAttendanceStats()}
 
          {/* Attendance History Section */}
          {renderAttendanceHistory()}
        </div>
      </div>
    </div>
  );
}
 