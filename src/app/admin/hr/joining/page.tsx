'use client';
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  X, 
  User, 
  Calendar, 
  Building,
  FileText,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  status: 'pending' | 'submitted' | 'verified';
  type: string;
}

interface OnboardingTask {
  id: string;
  name: string;
  status: 'pending' | 'completed';
  assignedTo: string;
}

interface JoiningRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  position: string;
  joiningDate: string;
  relievingDate?: string;
  status: 'joining' | 'relieving' | 'completed';
  documents: Document[];
  onboardingTasks: OnboardingTask[];
  notes?: string;
}

type ModalType = 'add' | 'edit' | 'view';

export default function JoiningPage() {
  const [records, setRecords] = useState<JoiningRecord[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      position: 'Senior Developer',
      joiningDate: '2024-03-15',
      status: 'joining',
      documents: [
        { id: '1', name: 'Resume', status: 'verified', type: 'Resume' },
        { id: '2', name: 'ID Proof', status: 'submitted', type: 'ID Proof' },
        { id: '3', name: 'Address Proof', status: 'pending', type: 'Address Proof' }
      ],
      onboardingTasks: [
        { id: '1', name: 'System Access Setup', status: 'completed', assignedTo: 'IT Team' },
        { id: '2', name: 'Email Setup', status: 'completed', assignedTo: 'IT Team' },
        { id: '3', name: 'Orientation Session', status: 'pending', assignedTo: 'HR Team' }
      ]
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      employeeId: 'EMP002',
      department: 'Marketing',
      position: 'Marketing Manager',
      joiningDate: '2024-02-01',
      relievingDate: '2024-03-31',
      status: 'relieving',
      documents: [
        { id: '1', name: 'Resignation Letter', status: 'verified', type: 'Resignation' },
        { id: '2', name: 'Exit Interview Form', status: 'submitted', type: 'Exit' }
      ],
      onboardingTasks: [
        { id: '1', name: 'Knowledge Transfer', status: 'pending', assignedTo: 'Team Lead' },
        { id: '2', name: 'Asset Return', status: 'pending', assignedTo: 'Admin Team' }
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<JoiningRecord | null>(null);
  const [formData, setFormData] = useState<Partial<JoiningRecord>>({});

  const isEditMode = modalType === 'edit';
  const isViewMode = modalType === 'view';

  const openModal = (type: ModalType, record?: JoiningRecord) => {
    setModalType(type);
    setSelectedRecord(record || null);
    if (type === 'add') {
      setFormData({
        employeeName: '',
        employeeId: '',
        department: '',
        position: '',
        joiningDate: '',
        status: 'joining',
        documents: [],
        onboardingTasks: []
      });
    } else if (record) {
      setFormData({ ...record });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
    setFormData({});
  };

  const handleSubmit = () => {
    if (!formData.employeeName || !formData.employeeId || !formData.department || !formData.position || !formData.joiningDate) {
      alert('Please fill in all required fields');
      return;
    }

    if (modalType === 'add') {
      const newRecord: JoiningRecord = {
        ...formData as JoiningRecord,
        id: Date.now().toString(),
        documents: [],
        onboardingTasks: []
      };
      setRecords([...records, newRecord]);
    } else if (modalType === 'edit' && selectedRecord) {
      setRecords(records.map(record => 
        record.id === selectedRecord.id 
          ? { ...formData as JoiningRecord, id: selectedRecord.id }
          : record
      ));
    }
    
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setRecords(records.filter(record => record.id !== id));
    }
  };

  const handleDocumentStatusChange = (recordId: string, documentId: string, newStatus: Document['status']) => {
    setRecords(records.map(record => {
      if (record.id === recordId) {
        return {
          ...record,
          documents: record.documents.map(doc => 
            doc.id === documentId ? { ...doc, status: newStatus } : doc
          )
        };
      }
      return record;
    }));
  };

  const handleTaskStatusChange = (recordId: string, taskId: string, newStatus: OnboardingTask['status']) => {
    setRecords(records.map(record => {
      if (record.id === recordId) {
        return {
          ...record,
          onboardingTasks: record.onboardingTasks.map(task => 
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        };
      }
      return record;
    }));
  };

  const filteredRecords = records.filter(record =>
    record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Joining & Relieving Management</h1>
       
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search records..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-50">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                record.status === 'joining' ? 'bg-green-100 text-green-800' :
                record.status === 'relieving' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{record.employeeName}</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">ID:</span> {record.employeeId}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Position:</span> {record.position}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Department:</span> {record.department}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">{record.status === 'relieving' ? 'Relieving Date:' : 'Joining Date:'}</span> {record.status === 'relieving' ? record.relievingDate : record.joiningDate}
              </p>
            </div>

            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => openModal('view', record)}
                className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
             
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalType === 'add' && 'Add New Record'}
                  {modalType === 'edit' && 'Edit Record'}
                  {modalType === 'view' && 'Record Details'}
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
              {isViewMode ? (
                <div className="space-y-6">
                  {/* Employee Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Employee Name</p>
                        <p className="font-medium">{selectedRecord?.employeeName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-medium">{selectedRecord?.department}</p>
                      </div>
                    </div>
                  </div>

                  {/* Documents Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Documents</h3>
                    <div className="space-y-3">
                      {selectedRecord?.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-gray-500">{doc.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              doc.status === 'verified' ? 'bg-green-100 text-green-800' :
                              doc.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </span>
                            {isEditMode && selectedRecord && (
                              <select
                                value={doc.status}
                                onChange={(e) => handleDocumentStatusChange(selectedRecord.id, doc.id, e.target.value as Document['status'])}
                                className="text-sm border border-gray-300 rounded-lg px-2 py-1"
                              >
                                <option value="pending">Pending</option>
                                <option value="submitted">Submitted</option>
                                <option value="verified">Verified</option>
                              </select>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Onboarding Tasks Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Onboarding Tasks</h3>
                    <div className="space-y-3">
                      {selectedRecord?.onboardingTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div>
                            <p className="font-medium">{task.name}</p>
                            <p className="text-sm text-gray-500">Assigned to: {task.assignedTo}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                            </span>
                            {isEditMode && selectedRecord && (
                              <button
                                onClick={() => handleTaskStatusChange(selectedRecord.id, task.id, task.status === 'completed' ? 'pending' : 'completed')}
                                className={`p-1 rounded-full ${
                                  task.status === 'completed' ? 'text-green-600 hover:bg-green-50' : 'text-yellow-600 hover:bg-yellow-50'
                                }`}
                              >
                                {task.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.employeeName || ''}
                        onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.employeeId || ''}
                        onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.department || ''}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.position || ''}
                        onChange={(e) => setFormData({...formData, position: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.status || ''}
                        onChange={(e) => setFormData({...formData, status: e.target.value as JoiningRecord['status']})}
                      >
                        <option value="joining">Joining</option>
                        <option value="relieving">Relieving</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {formData.status === 'relieving' ? 'Relieving Date' : 'Joining Date'}
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.status === 'relieving' ? formData.relievingDate || '' : formData.joiningDate || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          [formData.status === 'relieving' ? 'relievingDate' : 'joiningDate']: e.target.value
                        })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Add any additional notes..."
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {modalType === 'add' ? 'Add Record' : 'Update Record'}
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