'use client';
import React, { useState } from 'react';
import { 
  FileText, 
   
  FilePlus,
  Building,
  Users,
  Map,
  Target,
  Award,
  Calendar,
  Download,

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

    const maxWords = 1000;
    const wordCount = newReport.content?.trim().split(/\s+/).filter(word => word.length > 0).length || 0;
    const remainingWords = maxWords - wordCount;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl transform transition-all">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <FilePlus className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Create New Report</h2>
                <p className="text-sm text-gray-500 mt-1">Fill in the details below to create your report</p>
              </div>
            </div>
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
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Report Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Report Type</label>
                <div className="relative">
                  <select
                    value={newReport.type}
                    onChange={(e) => {
                      const type = e.target.value as Report['type'];
                      setNewReport({ 
                        ...newReport, 
                        type,
                        subtype: type === 'employee' ? newReport.subtype : undefined
                      });
                    }}
                    className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors appearance-none bg-white pr-10 py-2.5"
                  >
                    {reportTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {newReport.type === 'employee' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Report Subtype</label>
                  <div className="relative">
                    <select
                      value={newReport.subtype || 'daily'}
                      onChange={(e) => setNewReport({ ...newReport, subtype: e.target.value as Report['subtype'] })}
                      className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors appearance-none bg-white pr-10 py-2.5"
                    >
                      {employeeSubtypes.map(subtype => (
                        <option key={subtype.id} value={subtype.id}>{subtype.label}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Title Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newReport.title}
                onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                placeholder="Enter a descriptive title for your report"
                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors py-2.5"
              />
            </div>

            {/* Content Textarea */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {wordCount} words
                  </span>
                  <span className={`text-sm ${remainingWords < 100 ? 'text-red-500' : 'text-gray-500'}`}>
                    ({remainingWords} remaining)
                  </span>
                </div>
              </div>
              <textarea
                value={newReport.content}
                onChange={(e) => {
                  const text = e.target.value;
                  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
                  if (words.length <= maxWords) {
                    setNewReport({ ...newReport, content: text });
                  }
                }}
                rows={8}
                placeholder="Write your report content here (max 1000 words)"
                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors resize-none py-2.5"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
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
                className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReport}
                disabled={!newReport.title || !newReport.content || wordCount === 0}
                className="px-6 py-2.5 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add these styles at the top of your file, after the imports
  const styles = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .animate-fadeIn {
      animation: fadeIn 0.2s ease-out;
    }
    .animate-slideIn {
      animation: slideIn 0.3s ease-out;
    }
  `;

  return (
    <>
      <style>{styles}</style>
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
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FilePlus className="w-5 h-5 mr-2 transition-transform group-hover:rotate-90 duration-200" />
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
      </div>
      {renderNewReportForm()}
    </>
  );
} 