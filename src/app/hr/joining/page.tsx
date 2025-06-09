'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Filter, 
  Plus, 
  X, 
  User, 

  Building,
  FileText,
  Edit,
  Trash2,
  Eye,
  EyeOff,
 
  Mail,
  Phone,
  Droplet,
  MapPin,
  Hash,
  Briefcase,
  Calendar,
  Badge,
  Lock
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
  email: string;
  phoneNumber: string;
  bloodGroup: string;
  currentAddress: string;
  permanentAddress: string;
  password: string;
  confirmPassword: string;
  profilePhoto: string;
  department: string;
  position: string;
  joiningDate: string;
  relievingDate?: string;
  status: 'joining' | 'relieving' | 'completed';
  documents: Document[];
  onboardingTasks: OnboardingTask[];
}

type ModalType = 'add' | 'edit' | 'view';

export default function JoiningPage() {
  const [records, setRecords] = useState<JoiningRecord[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      bloodGroup: 'O+',
      currentAddress: '123 Current St, City',
      permanentAddress: '456 Permanent St, City',
      password: '12345678',
      confirmPassword: '12345678',
      profilePhoto: '',
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
      email: 'jane.smith@example.com',
      phoneNumber: '+1987654321',
      bloodGroup: 'B+',
      currentAddress: '789 Current Ave, City',
      permanentAddress: '101 Permanent Ave, City',
      password: '12345678',
      confirmPassword: '12345678',
      profilePhoto: '',
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [viewShowPassword, setViewShowPassword] = useState(false);

  
  const isViewMode = modalType === 'view';

  const openModal = (type: ModalType, record?: JoiningRecord) => {
    setModalType(type);
    setSelectedRecord(record || null);
    if (type === 'add') {
      setFormData({
        employeeName: '',
        employeeId: '',
        email: '',
        phoneNumber: '',
        bloodGroup: '',
        currentAddress: '',
        permanentAddress: '',
        password: '',
        confirmPassword: '',
        profilePhoto: '',
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
    if (!formData.employeeName || !formData.employeeId || !formData.email || 
        !formData.phoneNumber || !formData.bloodGroup || !formData.currentAddress || 
        !formData.permanentAddress || !formData.password || !formData.confirmPassword || 
        !formData.department || !formData.position || !formData.joiningDate) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
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

 


  const filteredRecords = records.filter(record =>
    record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Joining & Relieving Management</h1>
        <button 
          onClick={() => openModal('add')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Employee Create</span>
        </button>
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
              <button 
                onClick={() => openModal('edit', record)}
                className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center space-x-1"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button 
                onClick={() => handleDelete(record.id)}
                className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4" />
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
                  {/* Profile Photo */}
                  {selectedRecord?.profilePhoto && (
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <Image 
                          src={selectedRecord.profilePhoto} 
                          alt="Profile" 
                          className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                        />
                      </div>
                    </div>
                  )}

                  {/* Employee Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-600">Employee Name</p>
                            <p className="font-medium">{selectedRecord?.employeeName}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Hash className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-600">Employee ID</p>
                            <p className="font-medium">{selectedRecord?.employeeId}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium">{selectedRecord?.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-600">Phone Number</p>
                            <p className="font-medium">{selectedRecord?.phoneNumber}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Droplet className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-600">Blood Group</p>
                            <p className="font-medium">{selectedRecord?.bloodGroup}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Lock className="w-5 h-5 text-blue-500" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">Password</p>
                            <div className="relative">
                              <p className="font-medium font-mono">
                                {viewShowPassword ? selectedRecord?.password : '••••••••'}
                              </p>
                              <button
                                type="button"
                                className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
                                onClick={() => setViewShowPassword(!viewShowPassword)}
                              >
                                {viewShowPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Building className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-600">Department</p>
                            <p className="font-medium">{selectedRecord?.department}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Briefcase className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-600">Position</p>
                            <p className="font-medium">{selectedRecord?.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-600">Joining Date</p>
                            <p className="font-medium">{selectedRecord?.joiningDate}</p>
                          </div>
                        </div>
                        {selectedRecord?.relievingDate && (
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-blue-500" />
                            <div>
                              <p className="text-sm text-gray-600">Relieving Date</p>
                              <p className="font-medium">{selectedRecord.relievingDate}</p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center space-x-3">
                          <Badge className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-600">Status</p>
                            <p className="font-medium capitalize">{selectedRecord?.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-blue-500" />
                            <p className="text-sm font-medium text-gray-600">Current Address</p>
                          </div>
                          <p className="text-gray-700 pl-8">{selectedRecord?.currentAddress}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-blue-500" />
                            <p className="text-sm font-medium text-gray-600">Permanent Address</p>
                          </div>
                          <p className="text-gray-700 pl-8">{selectedRecord?.permanentAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents Section */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedRecord?.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-gray-500">{doc.type}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                            doc.status === 'verified' ? 'bg-green-100 text-green-800' :
                            doc.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Onboarding Tasks Section */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Onboarding Tasks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedRecord?.onboardingTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                          <div>
                            <p className="font-medium">{task.name}</p>
                            <p className="text-sm text-gray-500">Assigned to: {task.assignedTo}</p>
                          </div>
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                            task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                          </span>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.phoneNumber || ''}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.bloodGroup || ''}
                        onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({...formData, profilePhoto: reader.result as string});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Address</label>
                      <textarea
                        required
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.currentAddress || ''}
                        onChange={(e) => setFormData({...formData, currentAddress: e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Permanent Address</label>
                      <textarea
                        required
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.permanentAddress || ''}
                        onChange={(e) => setFormData({...formData, permanentAddress: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                          value={formData.password || ''}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                          value={formData.confirmPassword || ''}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
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