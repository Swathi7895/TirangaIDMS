'use client';
 
import React, { useState, useEffect } from 'react';
 
interface Leave {
  id: string;
  employeeId?: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'approved' | 'pending' | 'rejected';
  reason: string;
  rejectionReason?: string;
}
 
interface Holiday {
  name: string;
  date: string;
  day: string;
  type: string;
  coverage: string;
}
 
interface LeaveData {
  approved: Leave[];
  pending: Leave[];
  rejected: Leave[];
  holidays: Holiday[];
}
 
interface StatusBadgeProps {
  status: 'approved' | 'pending' | 'rejected' | 'holiday';
}
 
interface ActionButtonProps {
  variant: 'approve' | 'reject' | 'view';
  onClick: () => void;
  children: React.ReactNode;
}
 
interface LeaveTableProps {
  leaves: Leave[] | Holiday[];
  showActions?: boolean;
  isHoliday?: boolean;
}
 
const LeaveManagementSystem = () => {
  const [leaveData, setLeaveData] = useState<LeaveData>({
    approved: [
      {
        id: 'EMP001',
        name: 'John Smith',
        type: 'Annual Leave',
        startDate: '2025-06-10',
        endDate: '2025-06-15',
        days: 6,
        status: 'approved',
        reason: 'Family vacation'
      },
      {
        id: 'EMP002',
        name: 'Sarah Johnson',
        type: 'Medical Leave',
        startDate: '2025-06-12',
        endDate: '2025-06-14',
        days: 3,
        status: 'approved',
        reason: 'Medical checkup and follow-up'
      },
      {
        id: 'EMP003',
        name: 'Michael Brown',
        type: 'Personal Leave',
        startDate: '2025-06-20',
        endDate: '2025-06-22',
        days: 3,
        status: 'approved',
        reason: 'Personal family matter'
      }
    ],
    pending: [
      {
        id: 'EMP004',
        name: 'Emily Davis',
        type: 'Annual Leave',
        startDate: '2025-06-08',
        endDate: '2025-06-12',
        days: 5,
        status: 'pending',
        reason: 'Attending a wedding'
      },
      {
        id: 'EMP006',
        name: 'Lisa Anderson',
        type: 'Medical Leave',
        startDate: '2025-06-25',
        endDate: '2025-06-30',
        days: 6,
        status: 'pending',
        reason: 'Dental surgery and recovery'
      }
    ],
    rejected: [
      {
        id: 'EMP005',
        name: 'David Wilson',
        type: 'Personal Leave',
        startDate: '2025-06-15',
        endDate: '2025-06-16',
        days: 2,
        status: 'rejected',
        reason: 'Personal work',
        rejectionReason: 'Critical project deadline during requested period'
      }
    ],
    holidays: [
      {
        name: 'Independence Day',
        date: '2025-07-04',
        day: 'Friday',
        type: 'National Holiday',
        coverage: 'All Employees'
      },
      {
        name: 'Labor Day',
        date: '2025-09-01',
        day: 'Monday',
        type: 'National Holiday',
        coverage: 'All Employees'
      },
      {
        name: 'Thanksgiving',
        date: '2025-11-27',
        day: 'Thursday',
        type: 'National Holiday',
        coverage: 'All Employees'
      },
      {
        name: 'Christmas Day',
        date: '2025-12-25',
        day: 'Thursday',
        type: 'National Holiday',
        coverage: 'All Employees'
      }
    ]
  });
 
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddHolidayModal, setShowAddHolidayModal] = useState(false);
  const [newHoliday, setNewHoliday] = useState<Holiday>({
    name: '',
    date: '',
    day: '',
    type: 'National Holiday',
    coverage: 'All Employees'
  });
 
  // Fetch leave requests from API and update non-approved leaves
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/leave-requests/hr/all');
        if (!res.ok) throw new Error('Failed to fetch leave requests');
        const apiLeaves = await res.json();
        // Map API data to Leave interface
        const mappedLeaves = apiLeaves.map((item: any) => ({
          id: item.id,
          employeeId: item.employeeId,
          name: item.employeeName || '',
          type: item.leaveType,
          startDate: item.startDate,
          endDate: item.endDate,
          days: item.numberOfDays,
          status: item.status.toLowerCase(),
          reason: item.reason,
          rejectionReason: item.status === 'REJECTED' ? item.hrComments : undefined,
        }));
        // Separate into approved, pending and rejected
        const approved = mappedLeaves.filter((l: any) => l.status === 'approved');
        const pending = mappedLeaves.filter((l: any) => l.status === 'pending');
        const rejected = mappedLeaves.filter((l: any) => l.status === 'rejected');
        setLeaveData(prev => ({
          ...prev,
          approved,
          pending,
          rejected,
        }));
      } catch (error) {
        // Optionally handle error
        console.error(error);
      }
    };
    fetchLeaves();
  }, []);
 
  const approveLeave = async (leaveId: string) => {
    if (window.confirm(`Are you sure you want to approve leave request ${leaveId}?`)) {
      try {
        // Call the approve API
        const res = await fetch(`http://localhost:8080/api/leave-requests/hr/${leaveId}/approve?hrComments=Approved`, {
          method: 'PUT',
        });
        if (!res.ok) throw new Error('Failed to approve leave');
        const updatedLeave = await res.json();
        // Map API response to Leave interface
        const approvedLeave = {
          id: updatedLeave.id,
          employeeId: updatedLeave.employeeId,
          name: updatedLeave.employeeName || '',
          type: updatedLeave.leaveType,
          startDate: updatedLeave.startDate,
          endDate: updatedLeave.endDate,
          days: updatedLeave.numberOfDays,
          status: updatedLeave.status.toLowerCase(),
          reason: updatedLeave.reason,
          rejectionReason: updatedLeave.status === 'REJECTED' ? updatedLeave.hrComments : undefined,
        };
        setLeaveData(prev => {
          // Remove from pending/rejected, add to approved
          return {
            ...prev,
            approved: [...prev.approved, approvedLeave],
            pending: prev.pending.filter(leave => leave.id !== leaveId),
            rejected: prev.rejected.filter(leave => leave.id !== leaveId),
          };
        });
        alert(`Leave approved for request ${leaveId}`);
      } catch (error) {
        alert('Failed to approve leave.');
        console.error(error);
      }
    }
  };
 
  const rejectLeave = async (leaveId: string) => {
    const reason = window.prompt(`Please provide a reason for rejecting leave request ${leaveId}:`);
    if (reason) {
      try {
        // Call the reject API
        const res = await fetch(`http://localhost:8080/api/leave-requests/hr/${leaveId}/reject?hrComments=${encodeURIComponent(reason)}`, {
          method: 'PUT',
        });
        if (!res.ok) throw new Error('Failed to reject leave');
        const updatedLeave = await res.json();
        // Map API response to Leave interface
        const rejectedLeave = {
          id: updatedLeave.id,
          employeeId: updatedLeave.employeeId,
          name: updatedLeave.employeeName || '',
          type: updatedLeave.leaveType,
          startDate: updatedLeave.startDate,
          endDate: updatedLeave.endDate,
          days: updatedLeave.numberOfDays,
          status: updatedLeave.status.toLowerCase(),
          reason: updatedLeave.reason,
          rejectionReason: updatedLeave.hrComments,
        };
        setLeaveData(prev => {
          // Remove from pending/approved, add to rejected
          return {
            ...prev,
            rejected: [...prev.rejected, rejectedLeave],
            pending: prev.pending.filter(leave => leave.id !== leaveId),
            approved: prev.approved.filter(leave => leave.id !== leaveId),
          };
        });
        alert(`Leave rejected for request ${leaveId}`);
      } catch (error) {
        alert('Failed to reject leave.');
        console.error(error);
      }
    }
  };
 
  const viewDetails = (empId: string) => {
    const leave = [...leaveData.approved, ...leaveData.pending, ...leaveData.rejected].find(
      (l) => l.id === empId
    );
    if (leave) {
      setSelectedLeave(leave);
      setShowDetailsModal(true);
    }
  };
 
  const addHoliday = async () => {
    if (!newHoliday.name || !newHoliday.date) {
      alert('Please fill in all required fields');
      return;
    }
 
    // Get day of week from date
    const date = new Date(newHoliday.date);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[date.getDay()];
 
    const holidayToAdd = {
      employeeId: 'ALL',
      employeeName: 'ALL',
      leaveType: 'Holiday',
      holidayName: newHoliday.name,
      startDate: newHoliday.date,
      endDate: newHoliday.date,
      day: dayOfWeek,
      type: newHoliday.type,
      status: 'HOLIDAY',
      coverage: newHoliday.coverage,
    };
 
    try {
      const res = await fetch('http://localhost:8080/api/holidays', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(holidayToAdd),
      });
      if (!res.ok) throw new Error('Failed to add holiday');
      const added = await res.json();
      setLeaveData(prev => ({
        ...prev,
        holidays: [
          ...prev.holidays,
          {
            name: added.holidayName,
            date: added.startDate,
            day: added.day,
            type: added.type,
            coverage: added.coverage,
            id: added.id,
          },
        ],
      }));
      // Reset form
      setNewHoliday({
        name: '',
        date: '',
        day: '',
        type: 'National Holiday',
        coverage: 'All Employees',
      });
      setShowAddHolidayModal(false);
      alert('Holiday added successfully');
    } catch (error) {
      alert('Failed to add holiday.');
      console.error(error);
    }
  };
 
  // Fetch holidays from API
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/holidays');
        if (!res.ok) throw new Error('Failed to fetch holidays');
        const apiHolidays = await res.json();
        // Map API data to Holiday interface
        const mappedHolidays = apiHolidays.map((item: any) => ({
          name: item.holidayName,
          date: item.startDate,
          day: item.day,
          type: item.type,
          coverage: item.coverage,
          id: item.id, // for actions
        }));
        setLeaveData(prev => ({
          ...prev,
          holidays: mappedHolidays,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchHolidays();
  }, []);
 
  // Delete holiday
  const deleteHoliday = async (holidayId: number) => {
    if (window.confirm('Are you sure you want to delete this holiday?')) {
      try {
        const res = await fetch(`http://localhost:8080/api/holidays/${holidayId}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete holiday');
        setLeaveData(prev => ({
          ...prev,
          holidays: prev.holidays.filter((h: any) => h.id !== holidayId),
        }));
        alert('Holiday deleted successfully');
      } catch (error) {
        alert('Failed to delete holiday.');
        console.error(error);
      }
    }
  };
 
  // Edit holiday (open modal with holiday data)
  const [editHoliday, setEditHoliday] = useState<any>(null);
  const [showEditHolidayModal, setShowEditHolidayModal] = useState(false);
 
 
  const handleEditHoliday = (holiday: any) => {
    setEditHoliday(holiday);
    setShowEditHolidayModal(true);
  };
 
  const updateHoliday = async () => {
    if (!editHoliday.name || !editHoliday.date) {
      alert('Please fill in all required fields');
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/api/holidays/${editHoliday.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: 'ALL',
          employeeName: 'ALL',
          leaveType: 'Holiday',
          holidayName: editHoliday.name,
          startDate: editHoliday.date,
          endDate: editHoliday.date,
          day: editHoliday.day,
          type: editHoliday.type,
          status: 'HOLIDAY',
          coverage: editHoliday.coverage,
        }),
      });
      if (!res.ok) throw new Error('Failed to update holiday');
      const updated = await res.json();
      setLeaveData(prev => ({
        ...prev,
        holidays: prev.holidays.map((h: any) => h.id === editHoliday.id ? {
          ...h,
          name: updated.holidayName,
          date: updated.startDate,
          day: updated.day,
          type: updated.type,
          coverage: updated.coverage,
        } : h),
      }));
      setShowEditHolidayModal(false);
      setEditHoliday(null);
      alert('Holiday updated successfully');
    } catch (error) {
      alert('Failed to update holiday.');
      console.error(error);
    }
  };
 
 
 
 
  const StatusBadge = ({ status }: StatusBadgeProps) => {
    const statusClasses = {
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      holiday: 'bg-orange-100 text-orange-800 border-orange-200'
    };
 
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };
 
  const ActionButton = ({ variant, onClick, children }: ActionButtonProps) => {
    const variants = {
      approve: 'bg-green-500 hover:bg-green-600 text-white',
      reject: 'bg-red-500 hover:bg-red-600 text-white',
      view: 'bg-blue-500 hover:bg-blue-600 text-white'
    };
 
    return (
      <button
        onClick={onClick}
        className={`px-3 py-1 rounded text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 ${variants[variant]}`}
      >
        {children}
      </button>
    );
  };
 
  const LeaveTable = ({ leaves, showActions = false, isHoliday = false }: LeaveTableProps) => (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
          <tr>
            {isHoliday ? (
              <>
                <th className="px-4 py-3 text-left font-semibold">Holiday Name</th>
                <th className="px-4 py-3 text-left font-semibold">Date</th>
                <th className="px-4 py-3 text-left font-semibold">Day</th>
                <th className="px-4 py-3 text-left font-semibold">Type</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Coverage</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </>
            ) : (
              <>
                <th className="px-4 py-3 text-left font-semibold">Employee ID</th>
                <th className="px-4 py-3 text-left font-semibold">Employee Name</th>
                <th className="px-4 py-3 text-left font-semibold">Leave Type</th>
                <th className="px-4 py-3 text-left font-semibold">Start Date</th>
                <th className="px-4 py-3 text-left font-semibold">End Date</th>
                <th className="px-4 py-3 text-left font-semibold">Days</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {isHoliday ? (
            (leaves as any[]).map((holiday, index) => (
              <tr key={holiday.id || index} className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td className="px-4 py-3">{holiday.name}</td>
                <td className="px-4 py-3">{holiday.date}</td>
                <td className="px-4 py-3">{holiday.day}</td>
                <td className="px-4 py-3">{holiday.type}</td>
                <td className="px-4 py-3"><StatusBadge status="holiday" /></td>
                <td className="px-4 py-3">{holiday.coverage}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <ActionButton variant="view" onClick={() => handleEditHoliday(holiday)}>
                      Edit
                    </ActionButton>
                    <ActionButton variant="reject" onClick={() => deleteHoliday(holiday.id)}>
                      Delete
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            (leaves as Leave[]).map((leave) => (
              <tr key={leave.id} className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td className="px-4 py-3 font-medium">{leave.employeeId || leave.id}</td>
                <td className="px-4 py-3">{leave.name}</td>
                <td className="px-4 py-3">{leave.type}</td>
                <td className="px-4 py-3">{leave.startDate}</td>
                <td className="px-4 py-3">{leave.endDate}</td>
                <td className="px-4 py-3">{leave.days}</td>
                <td className="px-4 py-3"><StatusBadge status={leave.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {showActions && leave.status === 'pending' && (
                      <>
                        <ActionButton variant="approve" onClick={() => approveLeave(leave.id)}>
                          Approve
                        </ActionButton>
                        <ActionButton variant="reject" onClick={() => rejectLeave(leave.id)}>
                          Reject
                        </ActionButton>
                      </>
                    )}
                    <ActionButton variant="view" onClick={() => viewDetails(leave.id)}>
                      View
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
 
  const totalLeaves = leaveData.approved.length + leaveData.pending.length + leaveData.rejected.length;
  const approvedCount = leaveData.approved.length;
  const pendingCount = leaveData.pending.length;
 
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-10 pb-6 border-b-4 border-blue-500">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 drop-shadow-lg">
            HR Leave Management System
          </h1>
          <p className="text-xl text-gray-600">
            Manage employee leave requests efficiently and transparently
          </p>
        </div>
 
        {/* Layout Container */}
        <div className="flex flex-col md:flex-row gap-8">
         
 
          {/* Main Content */}
          <div >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <h3 className="text-3xl font-bold mb-2">{totalLeaves}</h3>
                <p className="text-lg opacity-90">Total Leave Requests</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <h3 className="text-3xl font-bold mb-2">{approvedCount}</h3>
                <p className="text-lg opacity-90">Approved Leaves</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <h3 className="text-3xl font-bold mb-2">{pendingCount}</h3>
                <p className="text-lg opacity-90">Pending Requests</p>
              </div>
            </div>
 
 
  {/* Approved Leaves Section */}
            <div className="mb-10 bg-white rounded-2xl shadow-lg p-6 border-l-8 border-green-500">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  ✓
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Approved Leaves</h2>
              </div>
              <LeaveTable leaves={leaveData.approved} />
            </div>
 
            {/* Non-Approved Leaves Section */}
            <div className="mb-10 bg-white rounded-2xl shadow-lg p-6 border-l-8 border-red-500">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  ✗
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Non-Approved Leaves</h2>
              </div>
              <LeaveTable leaves={[...leaveData.pending, ...leaveData.rejected]} showActions={true} />
            </div>
 
            {/* Holiday Leaves Section */}
            <div className="mb-10 bg-white rounded-2xl shadow-lg p-6 border-l-8 border-orange-500">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    🎉
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Holiday Leaves</h2>
                </div>
                <button
                  onClick={() => setShowAddHolidayModal(true)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  <span>+</span> Add Holiday
                </button>
              </div>
              <LeaveTable leaves={leaveData.holidays} isHoliday={true} />
            </div>
          </div>
        </div>
 
        {/* Details Modal */}
        {showDetailsModal && selectedLeave && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl transform transition-all">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Leave Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Employee ID</p>
                    <p className="font-medium">{selectedLeave.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Employee Name</p>
                    <p className="font-medium">{selectedLeave.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Leave Type</p>
                    <p className="font-medium">{selectedLeave.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">
                      <StatusBadge status={selectedLeave.status} />
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">{selectedLeave.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium">{selectedLeave.endDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{selectedLeave.days} days</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Reason for Leave</p>
                    <p className="font-medium">{selectedLeave.reason}</p>
                  </div>
                  {selectedLeave.status === 'rejected' && selectedLeave.rejectionReason && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Rejection Reason</p>
                      <p className="font-medium text-red-600">{selectedLeave.rejectionReason}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
 
        {/* Add Holiday Modal */}
        {showAddHolidayModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Add New Holiday</h3>
                <button
                  onClick={() => setShowAddHolidayModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Holiday Name *
                  </label>
                  <input
                    type="text"
                    value={newHoliday.name}
                    onChange={(e) => setNewHoliday(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Republic Day"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newHoliday.date}
                    onChange={(e) => setNewHoliday(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newHoliday.type}
                    onChange={(e) => setNewHoliday(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="National Holiday">National Holiday</option>
                    <option value="State Holiday">State Holiday</option>
                    <option value="Company Holiday">Company Holiday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coverage
                  </label>
                  <select
                    value={newHoliday.coverage}
                    onChange={(e) => setNewHoliday(prev => ({ ...prev, coverage: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="All Employees">All Employees</option>
                    <option value="Specific Department">Specific Department</option>
                    <option value="Specific Location">Specific Location</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowAddHolidayModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addHoliday}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Add Holiday
                </button>
              </div>
            </div>
          </div>
        )}
 
        {/* Edit Holiday Modal */}
        {showEditHolidayModal && editHoliday && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Edit Holiday</h3>
                <button
                  onClick={() => setShowEditHolidayModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Holiday Name *
                  </label>
                  <input
                    type="text"
                    value={editHoliday.name}
                    onChange={e => setEditHoliday((prev: any) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Republic Day"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={editHoliday.date}
                    onChange={e => setEditHoliday((prev: any) => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Day
                  </label>
                  <input
                    type="text"
                    value={editHoliday.day}
                    onChange={e => setEditHoliday((prev: any) => ({ ...prev, day: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Monday"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={editHoliday.type}
                    onChange={e => setEditHoliday((prev: any) => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="National Holiday">National Holiday</option>
                    <option value="State Holiday">State Holiday</option>
                    <option value="Company Holiday">Company Holiday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coverage
                  </label>
                  <select
                    value={editHoliday.coverage}
                    onChange={e => setEditHoliday((prev: any) => ({ ...prev, coverage: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="All Employees">All Employees</option>
                    <option value="Specific Department">Specific Department</option>
                    <option value="Specific Location">Specific Location</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowEditHolidayModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={updateHoliday}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Update Holiday
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default LeaveManagementSystem;
 