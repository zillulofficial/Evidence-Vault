import React from 'react';

const StatusChip = ({ status }) => {
  const statusConfig = {
    valid: { color: 'bg-green-100 text-green-800', label: 'Valid' },
    expired: { color: 'bg-red-100 text-red-800', label: 'Expired' },
    expiring_soon: { color: 'bg-yellow-100 text-yellow-800', label: 'Expiring Soon' },
    pending: { color: 'bg-blue-100 text-blue-800', label: 'Pending' },
    fulfilled: { color: 'bg-purple-100 text-purple-800', label: 'Fulfilled' }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

export default StatusChip;