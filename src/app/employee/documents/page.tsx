'use client';
import React, { useState } from 'react';
import { FileText, Download, Upload,  Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Document {
  id: number;
  name: string;
  type: 'resume' | 'marksCard' | 'idProof' | 'offerLetter';
  url: string;
  uploadDate: string;
  status: 'verified' | 'pending' | 'rejected';
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    { 
      id: 1, 
      name: 'Resume.pdf', 
      type: 'resume', 
      url: '/documents/resume.pdf', 
      uploadDate: '2024-03-01',
      status: 'verified'
    },
    { 
      id: 2, 
      name: 'Marks Card.pdf', 
      type: 'marksCard', 
      url: '/documents/marks.pdf', 
      uploadDate: '2024-03-01',
      status: 'pending'
    },
    { 
      id: 3, 
      name: 'Aadhar Card.pdf', 
      type: 'idProof', 
      url: '/documents/aadhar.pdf', 
      uploadDate: '2024-03-01',
      status: 'verified'
    },
    { 
      id: 4, 
      name: 'Offer Letter.pdf', 
      type: 'offerLetter', 
      url: '/documents/offer.pdf', 
      uploadDate: '2024-03-01',
      status: 'verified'
    },
  ]);

  const handleUpload = (type: Document['type']) => {
    // Implement file upload logic here
    console.log(`Uploading ${type} document`);
  };

  const handleDownload = (document: Document) => {
    // Implement file download logic here
    console.log(`Downloading ${document.name}`);
  };

  const handleView = (document: Document) => {
    // Implement document preview logic here
    console.log(`Viewing ${document.name}`);
  };

  const getDocumentIcon = (type: Document['type']) => {
    switch (type) {
      case 'resume':
        return <FileText className="w-6 h-6 text-blue-600" />;
      case 'marksCard':
        return <FileText className="w-6 h-6 text-green-600" />;
      case 'idProof':
        return <FileText className="w-6 h-6 text-purple-600" />;
      case 'offerLetter':
        return <FileText className="w-6 h-6 text-orange-600" />;
    }
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
    }
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
            <p className="mt-2 text-gray-600">Manage and view your important documents</p>
          </div>

          {/* Document Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {['resume', 'marksCard', 'idProof', 'offerLetter'].map((type) => (
              <div key={type} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  {getDocumentIcon(type as Document['type'])}
                  <button
                    onClick={() => handleUpload(type as Document['type'])}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="font-medium text-gray-900 capitalize">
                  {type.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Upload or update your {type.toLowerCase().replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            ))}
          </div>

          {/* Document List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Document List</h2>
            <div className="space-y-4">
              {documents.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getDocumentIcon(document.type)}
                    <div>
                      <p className="font-medium">{document.name}</p>
                      <p className="text-sm text-gray-600">
                        Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                      {document.status}
                    </span>
                    <button
                      onClick={() => handleView(document)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDownload(document)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 