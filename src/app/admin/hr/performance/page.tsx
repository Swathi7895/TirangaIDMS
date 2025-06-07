'use client';
import React, { useState } from 'react';
import { Award, Star, Search, Filter,  Eye, X,  User, Building } from 'lucide-react';

interface PerformanceReview {
  id: string;
  employeeName: string;
  position: string;
  department: string;
  rating: number;
  status: 'pending' | 'completed';
  lastReview: string;
  nextReview: string;
  goals?: string;
  feedback?: string;
  achievements?: string;
}

export default function PerformanceManagement() {
  const [reviews, setReviews] = useState<PerformanceReview[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      position: 'Senior Developer',
      department: 'Engineering',
      rating: 4.5,
      status: 'completed',
      lastReview: '2024-01-15',
      nextReview: '2024-07-15',
      goals: 'Improve code review process and mentor junior developers',
      feedback: 'Excellent technical skills and leadership qualities',
      achievements: 'Led successful migration to microservices architecture'
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      position: 'Product Manager',
      department: 'Product',
      rating: 4.8,
      status: 'pending',
      lastReview: '2024-02-01',
      nextReview: '2024-08-01',
      goals: 'Launch new product feature and increase user engagement',
      feedback: 'Outstanding strategic thinking and cross-team collaboration',
      achievements: 'Increased product adoption by 35% in Q1'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);
  const [formData, setFormData] = useState<Partial<PerformanceReview>>({});

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-blue-600';
    if (rating >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const openModal = (type: 'add' | 'edit' | 'view', review?: PerformanceReview) => {
    setModalType(type);
    setSelectedReview(review || null);
    if (type === 'add') {
      setFormData({
        employeeName: '',
        position: '',
        department: '',
        rating: 0,
        status: 'pending',
        lastReview: '',
        nextReview: '',
        goals: '',
        feedback: '',
        achievements: ''
      });
    } else if (review) {
      setFormData({ ...review });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReview(null);
    setFormData({});
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.employeeName || !formData.position || !formData.department || !formData.rating || !formData.status) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (modalType === 'add') {
      const newReview: PerformanceReview = {
        ...formData as PerformanceReview,
        id: Date.now().toString()
      };
      setReviews([...reviews, newReview]);
    } else if (modalType === 'edit' && selectedReview) {
      setReviews(reviews.map(review => 
        review.id === selectedReview.id 
          ? { ...formData as PerformanceReview, id: selectedReview.id }
          : review
      ));
    }
    
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this performance review?')) {
      setReviews(reviews.filter(review => review.id !== id));
    }
  };

  const filteredReviews = reviews.filter(review =>
    review.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Performance Management</h1>
      
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search performance reviews..."
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

      {/* Performance Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-50">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                review.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {review.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{review.employeeName}</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Position:</span> {review.position}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Department:</span> {review.department}
              </p>
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium text-gray-600">Rating:</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(review.rating)
                          ? getRatingColor(review.rating)
                          : 'text-gray-300'
                      }`}
                      fill={i < Math.floor(review.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                  <span className={`ml-2 text-sm font-medium ${getRatingColor(review.rating)}`}>
                    {review.rating}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Last Review:</span> {review.lastReview}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Next Review:</span> {review.nextReview}
              </p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => openModal('view', review)}
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
                  {modalType === 'add' && 'Add New Performance Review'}
                  {modalType === 'edit' && 'Edit Performance Review'}
                  {modalType === 'view' && 'Performance Review Details'}
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
              {modalType === 'view' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Employee Name</p>
                        <p className="font-medium">{selectedReview?.employeeName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-medium">{selectedReview?.department}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Position</p>
                      <p className="font-medium">{selectedReview?.position}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        selectedReview?.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedReview?.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(selectedReview?.rating || 0)
                                  ? getRatingColor(selectedReview?.rating || 0)
                                  : 'text-gray-300'
                              }`}
                              fill={i < Math.floor(selectedReview?.rating || 0) ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                        <span className="font-medium">{selectedReview?.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Last Review</p>
                      <p className="font-medium">{selectedReview?.lastReview}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Next Review</p>
                      <p className="font-medium">{selectedReview?.nextReview}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Goals</p>
                    <p className="bg-gray-50 p-3 rounded-lg">{selectedReview?.goals || 'No goals specified'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Feedback</p>
                    <p className="bg-gray-50 p-3 rounded-lg">{selectedReview?.feedback || 'No feedback provided'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Achievements</p>
                    <p className="bg-gray-50 p-3 rounded-lg">{selectedReview?.achievements || 'No achievements recorded'}</p>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.rating || ''}
                        onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                      >
                        <option value="">Select Rating</option>
                        <option value="1">1.0</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2.0</option>
                        <option value="2.5">2.5</option>
                        <option value="3">3.0</option>
                        <option value="3.5">3.5</option>
                        <option value="4">4.0</option>
                        <option value="4.5">4.5</option>
                        <option value="5">5.0</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.status || ''}
                        onChange={(e) => setFormData({...formData, status: e.target.value as 'pending' | 'completed'})}
                      >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Review Date</label>
                      <input
                        type="date"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.lastReview || ''}
                        onChange={(e) => setFormData({...formData, lastReview: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Next Review Date</label>
                      <input
                        type="date"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.nextReview || ''}
                        onChange={(e) => setFormData({...formData, nextReview: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Goals</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.goals || ''}
                      onChange={(e) => setFormData({...formData, goals: e.target.value})}
                      placeholder="Enter performance goals..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.feedback || ''}
                      onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                      placeholder="Enter feedback..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.achievements || ''}
                      onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                      placeholder="Enter achievements..."
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {modalType === 'add' ? 'Add Review' : 'Update Review'}
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