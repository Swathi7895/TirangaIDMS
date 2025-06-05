'use client';
import React, { useState } from 'react';
import { File, Upload, Search, Filter, Eye, Download, Plus, X, Calendar, User, FileText, CreditCard, Briefcase, GraduationCap, LucideIcon } from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  employee: string;
  status: 'approved' | 'pending' | 'rejected';
  fileUrl: string;
  file?: File;
}

interface DocumentType {
  id: string;
  name: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

export default function DocumentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: 'John Doe Resume', type: 'resume', size: '2.4 MB', uploadDate: '2024-06-03', employee: 'John Doe', status: 'approved', fileUrl: 'https://example.com/resume1.pdf' },
    { id: 2, name: 'Jane Smith Marks Card', type: 'marks', size: '1.8 MB', uploadDate: '2024-06-02', employee: 'Jane Smith', status: 'pending', fileUrl: 'https://example.com/marks1.pdf' },
    { id: 3, name: 'Mike Johnson ID Proof', type: 'id', size: '3.1 MB', uploadDate: '2024-06-01', employee: 'Mike Johnson', status: 'approved', fileUrl: 'https://example.com/id1.pdf' },
    { id: 4, name: 'Sarah Wilson Offer Letter', type: 'offer', size: '1.2 MB', uploadDate: '2024-05-30', employee: 'Sarah Wilson', status: 'approved', fileUrl: 'https://example.com/offer1.pdf' },
    { id: 5, name: 'David Brown Resume', type: 'resume', size: '2.7 MB', uploadDate: '2024-05-28', employee: 'David Brown', status: 'rejected', fileUrl: 'https://example.com/resume2.pdf' },
  ]);

  const documentTypes: DocumentType[] = [
    { id: 'resume', name: 'Resume', icon: FileText, color: 'blue' },
    { id: 'marks', name: 'Marks Card', icon: GraduationCap, color: 'green' },
    { id: 'id', name: 'ID Proof', icon: CreditCard, color: 'purple' },
    { id: 'offer', name: 'Offer Letter', icon: Briefcase, color: 'orange' }
  ];

  const getDocumentIcon = (type: string): LucideIcon => {
    const docType = documentTypes.find(dt => dt.id === type);
    return docType ? docType.icon : File;
  };

  const getDocumentColorClasses = (type: string) => {
    const docType = documentTypes.find(dt => dt.id === type);
    if (!docType) return { bg: 'bg-gray-100', text: 'text-gray-600' };
    
    const colorMap: Record<DocumentType['color'], { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' }
    };
    
    return colorMap[docType.color] || { bg: 'bg-gray-100', text: 'text-gray-600' };
  };

  const getStatusColor = (status: Document['status']) => {
    switch(status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.type === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.employee.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedDocType) {
      // Create a URL for the uploaded file (in a real app, this would be uploaded to a server)
      const fileUrl = URL.createObjectURL(file);
      
      const newDocument: Document = {
        id: documents.length + 1,
        name: file.name,
        type: selectedDocType,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        employee: 'Current User',
        status: 'pending',
        fileUrl: fileUrl,
        file: file // Store the actual file for demo purposes
      };
      setDocuments([...documents, newDocument]);
      setShowUploadModal(false);
      setSelectedDocType('');
    }
  };

  const handleViewDocument = (document: Document) => {
    setViewingDocument(document);
    setShowViewModal(true);
  };

  const handleDownloadDocument = (document: Document) => {
    // Create a temporary anchor element to trigger download
    const link = window.document.createElement('a');
    link.href = document.fileUrl;
    link.download = document.name;
    link.target = '_blank';
    
    // For demo purposes with example URLs, we'll show an alert
    if (document.fileUrl.includes('example.com')) {
      alert(`Downloading: ${document.name}\nIn a real application, this would download the actual file.`);
      return;
    }
    
    // For actual uploaded files
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  const handleDeleteDocument = (document: Document) => {
    setDocumentToDelete(document);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (documentToDelete) {
      setDocuments(documents.filter(doc => doc.id !== documentToDelete.id));
      setShowDeleteModal(false);
      setDocumentToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">HR Document Management</h1>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload className="w-5 h-5" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Document Type Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Document Categories</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Documents ({documents.length})
          </button>
          {documentTypes.map((type) => {
            const Icon = type.icon;
            const count = documents.filter(doc => doc.type === type.id).length;
            const colorClasses = getDocumentColorClasses(type.id);
            return (
              <button
                key={type.id}
                onClick={() => setSelectedCategory(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === type.id 
                    ? `${colorClasses.bg} ${colorClasses.text}` 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{type.name} ({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search documents or employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="p-4">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => {
                const IconComponent = getDocumentIcon(doc.type);
                const colorClasses = getDocumentColorClasses(doc.type);
                
                return (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>{doc.employee}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <File className="w-4 h-4" />
                        <span>PDF • {doc.size}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4">
                      <button 
                        onClick={() => handleViewDocument(doc)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button 
                        onClick={() => handleDownloadDocument(doc)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteDocument(doc)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Upload Document</h2>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type
                </label>
                <select
                  value={selectedDocType}
                  onChange={(e) => setSelectedDocType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select document type</option>
                  {documentTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose File
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  disabled={!selectedDocType}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Document Modal */}
      {showViewModal && viewingDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">View Document</h2>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Document Preview</p>
            </div>
            
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Name:</span> {viewingDocument.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Type:</span> {documentTypes.find(t => t.id === viewingDocument.type)?.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Size:</span> {viewingDocument.size}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Uploaded by:</span> {viewingDocument.employee}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Date:</span> {new Date(viewingDocument.uploadDate).toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => handleDownloadDocument(viewingDocument)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && documentToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Document</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{documentToDelete.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDocumentToDelete(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}