'use client';
import React, { useState, useEffect } from 'react';
import { File, Search, Filter, Eye,  X,  User, FileText, CreditCard, Briefcase, GraduationCap, LucideIcon, Upload } from 'lucide-react';

interface Document {
  id?: number;
  employeeId: string;
  documentType: string;
  fileName: string;
  fileDownloadUri: string;
  fileType: string;
  size: number;
  status?: 'approved' | 'pending' | 'rejected';
  uploadDate?: string;
  employee?: string;
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);
  
  const [documents, setDocuments] = useState<Document[]>([]);

  const documentTypes: DocumentType[] = [
    { id: 'resume', name: 'Resume', icon: FileText, color: 'blue' },
    { id: 'marks', name: 'Marks Card', icon: GraduationCap, color: 'green' },
    { id: 'id', name: 'ID Proof', icon: CreditCard, color: 'purple' },
    { id: 'offer', name: 'Offer Letter', icon: Briefcase, color: 'orange' }
  ];

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      setFetchError(null);
      const response = await fetch('http://localhost:8080/api/hr/documents');
      
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }

      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      setFetchError(error instanceof Error ? error.message : 'Failed to fetch documents');
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentType = (type: string): string => {
    return type.toLowerCase();
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || getDocumentType(doc.documentType) === selectedCategory;
    const matchesSearch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  const handleViewDocument = (document: Document) => {
    setViewingDocument(document);
    setShowViewModal(true);
  };

  const handleDownloadDocument = (document: Document) => {
    // Create a temporary anchor element to trigger download
    const link = window.document.createElement('a');
    link.href = document.fileDownloadUri;
    link.download = document.fileName;
    link.target = '_blank';
    
    // For demo purposes with example URLs, we'll show an alert
    if (document.fileDownloadUri.includes('example.com')) {
      alert(`Downloading: ${document.fileName}\nIn a real application, this would download the actual file.`);
      return;
    }
    
    // For actual uploaded files
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8080/api/hr/upload/RESUME/EMP001', {
        method: 'POST',
        body: JSON.stringify({
          employeeId: "EMP001",
          documentType: "RESUME",
          fileName: file.name,
          fileDownloadUri: "/api/hr/download/EMP001/RESUME",
          fileType: file.type,
          size: file.size
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      // Add the new document to the documents list
      const newDocument: Document = {
        id: documents.length + 1,
        employeeId: "EMP001",
        documentType: "RESUME",
        fileName: file.name,
        fileDownloadUri: data.fileDownloadUri || '#',
        fileType: file.type,
        size: file.size,
        status: 'pending',
        uploadDate: new Date().toISOString().split('T')[0],
      };

      // Update the documents state
      setDocuments([...documents, newDocument]);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">HR Document Management</h1>
        <div className="flex items-center space-x-4">
          <label className="relative">
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx"
              disabled={isUploading}
            />
            <button
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isUploading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'Uploading...' : 'Upload Document'}</span>
            </button>
          </label>
        </div>
      </div>

      {uploadError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{uploadError}</span>
        </div>
      )}

      {fetchError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{fetchError}</span>
        </div>
      )}

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
            const count = documents.filter(doc => getDocumentType(doc.documentType) === type.id).length;
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
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading documents...</p>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => {
                const IconComponent = getDocumentIcon(getDocumentType(doc.documentType));
                const colorClasses = getDocumentColorClasses(getDocumentType(doc.documentType));
                
                return (
                  <div key={doc.fileDownloadUri} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status || 'pending')}`}>
                        {doc.status || 'pending'}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 truncate">{doc.fileName}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>{doc.employeeId}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <File className="w-4 h-4" />
                        <span>{doc.fileType} • {formatFileSize(doc.size)}</span>
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
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

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
                <span className="font-medium">Name:</span> {viewingDocument.fileName}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Type:</span> {documentTypes.find(t => t.id === getDocumentType(viewingDocument.documentType))?.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Size:</span> {formatFileSize(viewingDocument.size)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Uploaded by:</span> {viewingDocument.employeeId}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Date:</span> {new Date(viewingDocument.uploadDate || '').toLocaleDateString()}
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
    </div>
  );
}