import React from 'react';

export default function PersonalDocumentsPage() {
  const documents = [
    { type: 'Resume', filename: 'my_resume.pdf', uploadDate: '2023-10-01' },
    { type: 'Marks Card', filename: 'marks_card.pdf', uploadDate: '2023-09-15' },
    { type: 'ID Proof', filename: 'id_proof.jpg', uploadDate: '2023-09-10' },
    { type: 'Offer Letter', filename: 'offer_letter.pdf', uploadDate: '2023-09-05' },
    // Add more sample data here
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Personal Documents</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filename</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.filename}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">View</button>
                  <button className="text-gray-400 cursor-not-allowed">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 