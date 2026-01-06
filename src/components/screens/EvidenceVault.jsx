import React, { useState } from 'react';
import Table from '../common/Table';
import StatusChip from '../common/StatusChip';
import { evidenceData } from '../../data/mockData';
import useQueryParams from '../../hooks/useQueryParams';

const EvidenceVault = ({ onViewDetail }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useQueryParams({
    docType: '',
    status: '',
    expiry: '',
    search: ''
  });

  const columns = [
    { key: 'docName', label: 'Doc Name' },
    { key: 'docType', label: 'Doc Type' },
    { key: 'status', label: 'Status' },
    { key: 'expiry', label: 'Expiry' },
    { key: 'versions', label: 'Versions' },
    { key: 'lastUpdated', label: 'Last Updated' },
    { key: 'actions', label: 'Actions' }
  ];

  const filteredData = evidenceData.filter(item => {
    if (filters.docType && item.docType !== filters.docType) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.search && !item.docName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    
    if (filters.expiry) {
      const today = new Date();
      const expiryDate = new Date(item.expiry);
      const daysDiff = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
      
      if (filters.expiry === 'expired' && daysDiff >= 0) return false;
      if (filters.expiry === 'expiring_soon' && (daysDiff > 30 || daysDiff < 0)) return false;
    }
    
    return true;
  });

  const toggleRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(item => item.id));
    }
  };

  const renderRow = (item) => (
    <tr key={item.id} className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={selectedRows.includes(item.id)}
          onChange={() => toggleRow(item.id)}
          className="rounded"
        />
      </td>
      <td className="px-6 py-4 font-medium text-gray-900">{item.docName}</td>
      <td className="px-6 py-4 text-gray-700 capitalize">{item.docType.replace('_', ' ')}</td>
      <td className="px-6 py-4"><StatusChip status={item.status} /></td>
      <td className="px-6 py-4 text-gray-700">{item.expiry}</td>
      <td className="px-6 py-4 text-gray-700">{item.versions}</td>
      <td className="px-6 py-4 text-gray-700">{item.lastUpdated}</td>
      <td className="px-6 py-4">
        <button
          onClick={() => onViewDetail(item.id)}
          className="text-blue-600 hover:text-blue-900 font-medium"
        >
          View Details
        </button>
      </td>
    </tr>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Evidence Vault</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <select 
            value={filters.docType} 
            onChange={(e) => setFilters({ docType: e.target.value })}
            className="border rounded px-3 py-2"
          >
            <option value="">All Doc Types</option>
            <option value="certificate">Certificate</option>
            <option value="test_report">Test Report</option>
            <option value="audit_report">Audit Report</option>
            <option value="specification">Specification</option>
          </select>

          <select 
            value={filters.status} 
            onChange={(e) => setFilters({ status: e.target.value })}
            className="border rounded px-3 py-2"
          >
            <option value="">All Status</option>
            <option value="valid">Valid</option>
            <option value="expired">Expired</option>
            <option value="expiring_soon">Expiring Soon</option>
          </select>

          <select 
            value={filters.expiry} 
            onChange={(e) => setFilters({ expiry: e.target.value })}
            className="border rounded px-3 py-2"
          >
            <option value="">All Expiry</option>
            <option value="expired">Expired</option>
            <option value="expiring_soon">Expiring Soon (30 days)</option>
          </select>

          <input
            type="text"
            placeholder="Search documents..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className="border rounded px-3 py-2 flex-grow"
          />
        </div>

        {/* Bulk Actions */}
        {selectedRows.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-md mb-4 flex justify-between items-center">
            <span className="text-blue-700">
              {selectedRows.length} document(s) selected
            </span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add to Pack ({selectedRows.length})
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredData}
        renderRow={renderRow}
        onSelectAll={toggleAll}
        selectedRows={selectedRows}
      />
    </div>
  );
};

export default EvidenceVault;