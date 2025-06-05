'use client';
import React, { useState } from 'react';
import { 
  FileText, 
  FileCheck, 
  FilePlus,
  Building,
  Users,
  Map,
  Target,
  Award,
  Calendar,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface Report {
  id: number;
  type: 'employee' | 'visit' | 'oem' | 'customer' | 'blueprint' | 'projection' | 'achievement';
  subtype?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  title: string;
  date: string;
  status: 'draft' | 'submitted' | 'approved';
  content: string;
  attachments?: string[];
  submittedBy?: string;
  approvedBy?: string;
  approvedDate?: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      type: 'employee',
      subtype: 'weekly',
      title: 'Weekly Activity Report',
      date: '2024-03-18',
      status: 'submitted',
      content: 'Weekly progress report including completed tasks and achievements.',
      submittedBy: 'John Doe'
    },
    {
      id: 2,
      type: 'visit',
      title: 'Client Visit Report - Tech Corp',
      date: '2024-03-17',
      status: 'approved',
      content: 'Visit to Tech Corp headquarters for project discussion.',
      attachments: ['meeting_notes.pdf', 'presentation.pptx'],
      submittedBy: 'John Doe',
      approvedBy: 'Manager Name',
      approvedDate: '2024-03-18'
    },
    {
      id: 3,
      type: 'oem',
      title: 'OEM Partnership Meeting',
      date: '2024-03-16',
      status: 'draft',
      content: 'Discussion with OEM partner regarding new product launch.',
      submittedBy: 'John Doe'
    }
  ]);

  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubtype, setSelectedSubtype] = useState<string>('all');
  const [showNewReportForm, setShowNewReportForm] = useState(false);
  const [newReport, setNewReport] = useState<Partial<Report>>({
    type: 'employee',
    subtype: 'daily',
    title: '',
    content: '',
    status: 'draft'
  });

  const reportTypes = [
    { id: 'employee', label: 'Employee Report', icon: <FileText className="w-5 h-5" /> },
    { id: 'visit', label: 'Visit Report', icon: <Map className="w-5 h-5" /> },
    { id: 'oem', label: 'OEM Report', icon: <Building className="w-5 h-5" /> },
    { id: 'customer', label: 'Customer Report', icon: <Users className="w-5 h-5" /> },
    { id: 'blueprint', label: 'Blueprint Report', icon: <FileText className="w-5 h-5" /> },
    { id: 'projection', label: 'Projection Report', icon: <Target className="w-5 h-5" /> },
    { id: 'achievement', label: 'Achievement Report', icon: <Award className="w-5 h-5" /> }
  ];

  const employeeSubtypes = [
    { id: 'daily', label: 'Daily Report', icon: <Calendar className="w-5 h-5" /> },
    { id: 'weekly', label: 'Weekly Report', icon: <Calendar className="w-5 h-5" /> },
    { id: 'monthly', label: 'Monthly Report', icon: <Calendar className="w-5 h-5" /> },
    { id: 'yearly', label: 'Yearly Report', icon: <Calendar className="w-5 h-5" /> }
  ];

  const getReportIcon = (type: string) => {
    const reportType = reportTypes.find(t => t.id === type);
    return reportType?.icon || <FileText className="w-5 h-5" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitReport = () => {
    const report: Report = {
      id: reports.length + 1,
      type: newReport.type as Report['type'],
      subtype: newReport.type === 'employee' ? newReport.subtype as Report['subtype'] : undefined,
      title: newReport.title || '',
      date: new Date().toISOString().split('T')[0],
      status: 'submitted',
      content: newReport.content || '',
      submittedBy: 'John Doe' // This should be the actual logged-in user
    };

    setReports([report, ...reports]);
    setShowNewReportForm(false);
    setNewReport({
      type: 'employee',
      subtype: 'daily',
      title: '',
      content: '',
      status: 'draft'
    });
  };

  const renderNewReportForm = () => {
    if (!showNewReportForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
         
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Report Type</label>
              <select
                value={newReport.type}
                onChange={(e) => {
                  const type = e.target.value as Report['type'];
                  setNewReport({ 
                    ...newReport, 
                    type,
                    // Reset subtype if not employee report
                    subtype: type === 'employee' ? newReport.subtype : undefined
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {reportTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
            {newReport.type === 'employee' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Report Subtype</label>
                <select
                  value={newReport.subtype || 'daily'}
                  onChange={(e) => setNewReport({ ...newReport, subtype: e.target.value as Report['subtype'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {employeeSubtypes.map(subtype => (
                    <option key={subtype.id} value={subtype.id}>{subtype.label}</option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newReport.title}
                onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                value={newReport.content}
                onChange={(e) => setNewReport({ ...newReport, content: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowNewReportForm(false);
                  setNewReport({
                    type: 'employee',
                    subtype: 'daily',
                    title: '',
                    content: '',
                    status: 'draft'
                  });
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReport}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Submit Report
              </button>
            </div>
          </div>
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

        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <button
              onClick={() => setShowNewReportForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <FilePlus className="w-5 h-5" />
              <span>New Report</span>
            </button>
          </div>

          {/* Report Type Filter */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedSubtype('all');
                }}
                className={`px-3 py-1 rounded-lg ${
                  selectedType === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Reports
              </button>
              {reportTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type.id);
                    setSelectedSubtype('all');
                  }}
                  className={`px-3 py-1 rounded-lg flex items-center space-x-2 ${
                    selectedType === type.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {type.icon}
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Employee Report Subtype Filter */}
          {selectedType === 'employee' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubtype('all')}
                  className={`px-3 py-1 rounded-lg ${
                    selectedSubtype === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  All Employee Reports
                </button>
                {employeeSubtypes.map(subtype => (
                  <button
                    key={subtype.id}
                    onClick={() => setSelectedSubtype(subtype.id)}
                    className={`px-3 py-1 rounded-lg flex items-center space-x-2 ${
                      selectedSubtype === subtype.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {subtype.icon}
                    <span>{subtype.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reports List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              {reports
                .filter(report => 
                  (selectedType === 'all' || report.type === selectedType) &&
                  (selectedType !== 'employee' || selectedSubtype === 'all' || report.subtype === selectedSubtype)
                )
                .map(report => (
                  <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {getReportIcon(report.type)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{report.title}</h3>
                          <div className="mt-1 text-sm text-gray-600">
                            <p>Type: {reportTypes.find(t => t.id === report.type)?.label}</p>
                            {report.type === 'employee' && report.subtype && (
                              <p>Subtype: {employeeSubtypes.find(s => s.id === report.subtype)?.label}</p>
                            )}
                            <p>Date: {new Date(report.date).toLocaleDateString()}</p>
                            <p>Submitted by: {report.submittedBy}</p>
                            {report.approvedBy && (
                              <p>Approved by: {report.approvedBy} on {new Date(report.approvedDate!).toLocaleDateString()}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                        {report.attachments && (
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                            <Download className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <p>{report.content}</p>
                    </div>
                    {report.attachments && (
                      <div className="mt-4 flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Attachments: {report.attachments.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {renderNewReportForm()}
    </div>
  );
} 