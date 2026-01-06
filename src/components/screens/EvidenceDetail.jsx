import React, { useState } from 'react';
import Modal from '../common/Modal';
import StatusChip from '../common/StatusChip';
import { evidenceData } from '../../data/mockData';

const EvidenceDetail = ({ evidenceId, onBack }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadNotes, setUploadNotes] = useState('');
  const [uploadExpiry, setUploadExpiry] = useState('');

  const evidence = evidenceData.find(item => item.id === evidenceId);

  if (!evidence) {
    return (
      <div className="p-6">
        <button onClick={onBack} className="text-blue-600 hover:text-blue-800 mb-4">
          ← Back to Vault
        </button>
        <p>Evidence not found</p>
      </div>
    );
  }

  const handleUpload = () => {
    if (!uploadNotes.trim()) {
      alert('Notes are required');
      return;
    }
    
    console.log('Uploading new version:', {
      evidenceId,
      notes: uploadNotes,
      expiry: uploadExpiry
    });
    
    setShowUploadModal(false);
    setUploadNotes('');
    setUploadExpiry('');
    alert('New version uploaded successfully!');
  };

  return (
    <div className="p-6">
      <button 
        onClick={onBack}
        className="text-blue-600 hover:text-blue-800 mb-6 flex items-center"
      >
        ← Back to Vault
      </button>

      {/* Evidence Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{evidence.docName}</h1>
            <p className="text-gray-600 mb-4">{evidence.description}</p>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Type: <span className="font-medium capitalize">{evidence.docType.replace('_', ' ')}</span></span>
              <StatusChip status={evidence.status} />
              <span className="text-gray-700">Expiry: {evidence.expiry}</span>
              <span className="text-gray-700">Last Updated: {evidence.lastUpdated}</span>
            </div>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Upload New Version
          </button>
        </div>
      </div>

      {/* Versions Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Version History</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploader</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File Size</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {evidence.versionsList.map((version) => (
              <tr key={version.version} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{version.version}</td>
                <td className="px-6 py-4 text-gray-700">{version.date}</td>
                <td className="px-6 py-4 text-gray-700">{version.uploader}</td>
                <td className="px-6 py-4 text-gray-700">{version.notes}</td>
                <td className="px-6 py-4 text-gray-700">{version.fileSize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload New Version"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              value={uploadNotes}
              onChange={(e) => setUploadNotes(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows="3"
              placeholder="Enter notes about this version..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date (Optional)
            </label>
            <input
              type="date"
              value={uploadExpiry}
              onChange={(e) => setUploadExpiry(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
              <p className="text-gray-500">Drag & drop or click to upload</p>
              <p className="text-sm text-gray-400 mt-1">Max file size: 10MB</p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowUploadModal(false)}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Upload Version
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EvidenceDetail;