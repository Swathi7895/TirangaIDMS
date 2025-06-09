'use client';
import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 

  Search, 
 
  XCircle,
  AlertCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface Employee {
  id: string;
  name: string;
  department: string;
  email: string;
}

interface Memo {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'warning' | 'notice' | 'general';
  priority: 'high' | 'medium' | 'low';
  sender: string;
  recipients: string[];
  createdAt: string;
  status: 'sent' | 'draft';
}

export default function AdminMemosPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [memoTitle, setMemoTitle] = useState('');
  const [memoContent, setMemoContent] = useState('');
  const [memoType, setMemoType] = useState<Memo['type']>('general');
  const [memoPriority, setMemoPriority] = useState<Memo['priority']>('medium');
  const [sentMemos, setSentMemos] = useState<Memo[]>([]);
  const [draftMemos, setDraftMemos] = useState<Memo[]>([]);
  const [activeTab, setActiveTab] = useState<'compose' | 'sent' | 'drafts'>('compose');

  // Sample data initialization
  useEffect(() => {
    const sampleEmployees: Employee[] = [
      { id: '1', name: 'John Doe', department: 'Engineering', email: 'john@company.com' },
      { id: '2', name: 'Jane Smith', department: 'Marketing', email: 'jane@company.com' },
      { id: '3', name: 'Mike Johnson', department: 'Sales', email: 'mike@company.com' },
      { id: '4', name: 'Sarah Wilson', department: 'HR', email: 'sarah@company.com' },
      { id: '5', name: 'David Brown', department: 'Engineering', email: 'david@company.com' },
      { id: '6', name: 'Lisa Davis', department: 'Finance', email: 'lisa@company.com' },
      { id: '7', name: 'Tom Anderson', department: 'Marketing', email: 'tom@company.com' },
      { id: '8', name: 'Emily Taylor', department: 'Sales', email: 'emily@company.com' }
    ];

    setEmployees(sampleEmployees);
  }, []);

  const departments = [...new Set(employees.map(emp => emp.department))];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleEmployeeSelect = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSendMemo = () => {
    if (!memoTitle || !memoContent || selectedEmployees.length === 0) {
      alert('Please fill in all required fields and select at least one recipient');
      return;
    }

    const newMemo: Memo = {
      id: Date.now().toString(),
      title: memoTitle,
      content: memoContent,
      type: memoType,
      priority: memoPriority,
      sender: 'Admin',
      recipients: selectedEmployees,
      createdAt: new Date().toISOString(),
      status: 'sent'
    };

    setSentMemos(prev => [newMemo, ...prev]);
    setMemoTitle('');
    setMemoContent('');
    setSelectedEmployees([]);
    setMemoType('general');
    setMemoPriority('medium');
  };

  const handleSaveDraft = () => {
    if (!memoTitle || !memoContent) {
      alert('Please fill in the memo title and content');
      return;
    }

    const newDraft: Memo = {
      id: Date.now().toString(),
      title: memoTitle,
      content: memoContent,
      type: memoType,
      priority: memoPriority,
      sender: 'Admin',
      recipients: selectedEmployees,
      createdAt: new Date().toISOString(),
      status: 'draft'
    };

    setDraftMemos(prev => [newDraft, ...prev]);
    setMemoTitle('');
    setMemoContent('');
    setSelectedEmployees([]);
    setMemoType('general');
    setMemoPriority('medium');
  };

  const getPriorityColor = (priority: Memo['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: Memo['type']) => {
    switch (type) {
      case 'announcement':
        return <AlertCircle className="w-4 h-4" />;
      case 'warning':
        return <XCircle className="w-4 h-4" />;
      case 'notice':
        return <Clock className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Memos</h1>
          <p className="text-gray-600">Send memos and notices to employees</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['compose', 'sent', 'drafts'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'compose' | 'sent' | 'drafts')}
                  className={`${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {activeTab === 'compose' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Employee Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Recipients</h3>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredEmployees.map(emp => (
                      <div
                        key={emp.id}
                        className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                          selectedEmployees.includes(emp.id)
                            ? 'bg-blue-50 border border-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleEmployeeSelect(emp.id)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedEmployees.includes(emp.id)}
                          onChange={() => {}}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                          <p className="text-xs text-gray-500">{emp.department}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Memo Composition */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Compose Memo</h3>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Memo Title"
                    value={memoTitle}
                    onChange={(e) => setMemoTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={memoType}
                      onChange={(e) => setMemoType(e.target.value as Memo['type'])}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="general">General</option>
                      <option value="announcement">Announcement</option>
                      <option value="warning">Warning</option>
                      <option value="notice">Notice</option>
                    </select>

                    <select
                      value={memoPriority}
                      onChange={(e) => setMemoPriority(e.target.value as Memo['priority'])}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>

                  <textarea
                    placeholder="Write your memo here..."
                    value={memoContent}
                    onChange={(e) => setMemoContent(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={handleSaveDraft}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Save as Draft
                    </button>
                    <button
                      onClick={handleSendMemo}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Memo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sent' && (
          <div className="space-y-4">
            {sentMemos.map(memo => (
              <div key={memo.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{memo.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Sent to {memo.recipients.length} recipients • {new Date(memo.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(memo.priority)}`}>
                      {memo.priority} Priority
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-gray-100 text-gray-800 border-gray-200">
                      {getTypeIcon(memo.type)}
                      <span className="ml-1 capitalize">{memo.type}</span>
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">{memo.content}</p>
              </div>
            ))}
            {sentMemos.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No sent memos</h3>
                <p className="text-gray-500 mt-1">Your sent memos will appear here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'drafts' && (
          <div className="space-y-4">
            {draftMemos.map(memo => (
              <div key={memo.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{memo.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Last edited {new Date(memo.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(memo.priority)}`}>
                      {memo.priority} Priority
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-gray-100 text-gray-800 border-gray-200">
                      {getTypeIcon(memo.type)}
                      <span className="ml-1 capitalize">{memo.type}</span>
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">{memo.content}</p>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setMemoTitle(memo.title);
                      setMemoContent(memo.content);
                      setMemoType(memo.type);
                      setMemoPriority(memo.priority);
                      setSelectedEmployees(memo.recipients);
                      setActiveTab('compose');
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Edit Draft
                  </button>
                  <button
                    onClick={() => {
                      setDraftMemos(prev => prev.filter(m => m.id !== memo.id));
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Draft
                  </button>
                </div>
              </div>
            ))}
            {draftMemos.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No draft memos</h3>
                <p className="text-gray-500 mt-1">Your draft memos will appear here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
