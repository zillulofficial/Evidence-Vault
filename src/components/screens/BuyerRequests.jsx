import React, { useState } from 'react';
import Modal from '../common/Modal';
import StatusChip from '../common/StatusChip';
import { requestData, evidenceData } from '../../data/mockData';

const BuyerRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showFulfillModal, setShowFulfillModal] = useState(false);
  const [fulfillMethod, setFulfillMethod] = useState('existing');
  const [selectedEvidence, setSelectedEvidence] = useState('');

  const handleFulfill = (requestId) => {
    const request = requestData.find(r => r.id === requestId);
    setSelectedRequest(request);
    setShowFulfillModal(true);
  };

  const submitFulfillment = () => {
    if (fulfillMethod === 'existing' && !selectedEvidence) {
      alert('Please select evidence from vault');
      return;
    }

    console.log('Fulfilling request:', {
      requestId: selectedRequest.id,
      method: fulfillMethod,
      evidenceId: selectedEvidence,
      newEvidence: fulfillMethod === 'new' ? 'new evidence details' : null
    });

    setShowFulfillModal(false);
    setSelectedEvidence('');
    setFulfillMethod('existing');
    alert(`Request ${selectedRequest.id} marked as fulfilled!`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Buyer Requests</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requestData.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{request.id}</td>
                <td className="px-6 py-4 text-gray-700 capitalize">{request.docType.replace('_', ' ')}</td>
                <td className="px-6 py-4 text-gray-700">{request.buyerName}</td>
                <td className="px-6 py-4 text-gray-700">{request.dueDate}</td>
                <td className="px-6 py-4"><StatusChip status={request.status} /></td>
                <td className="px-6 py-4">
                  {request.status === 'pending' && (
                    <button
                      onClick={() => handleFulfill(request.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                    >
                      Fulfill
                    </button>
                  )}
                  {request.status === 'fulfilled' && (
                    <span className="text-green-600 font-medium">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fulfill Modal */}
      <Modal
        isOpen={showFulfillModal}
        onClose={() => {
          setShowFulfillModal(false);
          setSelectedEvidence('');
          setFulfillMethod('existing');
        }}
        title={`Fulfill Request: ${selectedRequest?.id}`}
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded">
              <p className="font-medium">Request Details:</p>
              <p>Document Type: <span className="capitalize">{selectedRequest.docType.replace('_', ' ')}</span></p>
              <p>Buyer: {selectedRequest.buyerName}</p>
              <p>Due Date: {selectedRequest.dueDate}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you like to fulfill this request?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="fulfillMethod"
                    value="existing"
                    checked={fulfillMethod === 'existing'}
                    onChange={(e) => setFulfillMethod(e.target.value)}
                    className="mr-2"
                  />
                  Use existing evidence from vault
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="fulfillMethod"
                    value="new"
                    checked={fulfillMethod === 'new'}
                    onChange={(e) => setFulfillMethod(e.target.value)}
                    className="mr-2"
                  />
                  Upload new evidence
                </label>
              </div>
            </div>

            {fulfillMethod === 'existing' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Evidence
                </label>
                <select
                  value={selectedEvidence}
                  onChange={(e) => setSelectedEvidence(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Choose evidence...</option>
                  {evidenceData
                    .filter(ev => ev.docType === selectedRequest.docType)
                    .map(ev => (
                      <option key={ev.id} value={ev.id}>
                        {ev.docName} ({ev.status})
                      </option>
                    ))}
                </select>
              </div>
            )}

            {fulfillMethod === 'new' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter document name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                    <p className="text-gray-500">Drag & drop or click to upload</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setShowFulfillModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitFulfillment}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Mark as Fulfilled
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BuyerRequests;