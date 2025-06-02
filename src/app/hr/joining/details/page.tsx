'use client';

import { useState } from 'react';
import { ArrowLeftIcon, DocumentIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface JoiningDetails {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  joiningDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  documents: {
    name: string;
    status: 'Pending' | 'Received' | 'Verified';
    dueDate: string;
    notes?: string;
  }[];
  checklist: {
    item: string;
    status: 'Pending' | 'Completed';
    assignedTo: string;
    dueDate: string;
    notes?: string;
  }[];
  onboardingSchedule: {
    date: string;
    time: string;
    activity: string;
    location: string;
    responsible: string;
  }[];
  notes: {
    text: string;
    date: string;
    author: string;
  }[];
}

export default function JoiningDetailsPage() {
  const [joiningDetails] = useState<JoiningDetails>({
    id: '1',
    name: 'John Doe',
    employeeId: 'EMP001',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    joiningDate: '2024-04-01',
    status: 'In Progress',
    documents: [
      {
        name: 'Offer Letter',
        status: 'Received',
        dueDate: '2024-03-15',
        notes: 'Signed and returned'
      },
      {
        name: 'ID Proofs',
        status: 'Pending',
        dueDate: '2024-03-20',
        notes: 'Waiting for passport copy'
      },
      {
        name: 'Educational Certificates',
        status: 'Verified',
        dueDate: '2024-03-25',
        notes: 'All certificates verified'
      }
    ],
    checklist: [
      {
        item: 'Laptop Setup',
        status: 'Completed',
        assignedTo: 'IT Department',
        dueDate: '2024-03-28',
        notes: 'MacBook Pro configured'
      },
      {
        item: 'Email Account',
        status: 'Completed',
        assignedTo: 'IT Department',
        dueDate: '2024-03-28',
        notes: 'Email account created'
      },
      {
        item: 'Access Card',
        status: 'Pending',
        assignedTo: 'Admin',
        dueDate: '2024-03-30',
        notes: 'Request submitted'
      }
    ],
    onboardingSchedule: [
      {
        date: '2024-04-01',
        time: '09:00 AM',
        activity: 'Welcome Session',
        location: 'Conference Room A',
        responsible: 'HR Team'
      },
      {
        date: '2024-04-01',
        time: '10:30 AM',
        activity: 'IT Setup',
        location: 'IT Department',
        responsible: 'IT Support'
      },
      {
        date: '2024-04-01',
        time: '02:00 PM',
        activity: 'Team Introduction',
        location: 'Engineering Department',
        responsible: 'Team Lead'
      }
    ],
    notes: [
      {
        text: 'Candidate requested early joining',
        date: '2024-03-15',
        author: 'Jane Smith'
      },
      {
        text: 'Need to expedite access card process',
        date: '2024-03-20',
        author: 'John Manager'
      }
    ]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'In Progress':
        return 'text-blue-600 dark:text-blue-400';
      case 'Completed':
        return 'text-green-600 dark:text-green-400';
      case 'Cancelled':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case 'Received':
      case 'Verified':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Pending':
        return <XCircleIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <DocumentIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/hr/joining-relieving" className="mr-4">
              <ArrowLeftIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Joining Details
            </h1>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Update Status
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Cancel Process
            </button>
          </div>
        </div>

        {/* Employee Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Employee Information</h2>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Name:</span> {joiningDetails.name}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Employee ID:</span> {joiningDetails.employeeId}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Department:</span> {joiningDetails.department}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Position:</span> {joiningDetails.position}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Joining Date:</span> {joiningDetails.joiningDate}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Status:</span>{' '}
                <span className={getStatusColor(joiningDetails.status)}>
                  {joiningDetails.status}
                </span>
              </p>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Required Documents</h2>
            <div className="space-y-4">
              {joiningDetails.documents.map((doc, index) => (
                <div key={index} className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Due: {doc.dueDate}</p>
                    {doc.notes && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{doc.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    {getDocumentStatusIcon(doc.status)}
                    <span className={`ml-2 ${getStatusColor(doc.status)}`}>{doc.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Checklist and Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Checklist */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Onboarding Checklist</h2>
            <div className="space-y-4">
              {joiningDetails.checklist.map((item, index) => (
                <div key={index} className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">{item.item}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Assigned to: {item.assignedTo}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Due: {item.dueDate}</p>
                    {item.notes && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.notes}</p>
                    )}
                  </div>
                  <span className={`${getStatusColor(item.status)}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Onboarding Schedule */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Onboarding Schedule</h2>
            <div className="space-y-4">
              {joiningDetails.onboardingSchedule.map((schedule, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-600 pb-4 last:border-0">
                  <p className="text-gray-900 dark:text-white font-medium">{schedule.activity}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {schedule.date} at {schedule.time}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Location: {schedule.location}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Responsible: {schedule.responsible}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notes</h2>
          <div className="space-y-4">
            {joiningDetails.notes.map((note, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-600 pb-4 last:border-0">
                <p className="text-gray-900 dark:text-white">{note.text}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {note.date} by {note.author}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <textarea
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              rows={3}
              placeholder="Add a new note..."
            />
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 