export const evidenceData = [
  {
    id: '1',
    docName: 'ISO 9001 Certificate',
    docType: 'certificate',
    status: 'valid',
    expiry: '2024-12-31',
    versions: 3,
    lastUpdated: '2024-01-15',
    description: 'Quality Management System Certificate',
    versionsList: [
      { version: 'v1', date: '2022-01-10', uploader: 'John Doe', notes: 'Initial certification', fileSize: '2.4 MB' },
      { version: 'v2', date: '2023-01-15', uploader: 'Jane Smith', notes: 'Annual renewal', fileSize: '2.5 MB' },
      { version: 'v3', date: '2024-01-15', uploader: 'John Doe', notes: 'Updated scope', fileSize: '2.6 MB' }
    ]
  },
  {
    id: '2',
    docName: 'Material Test Report',
    docType: 'test_report',
    status: 'expiring_soon',
    expiry: '2024-03-30',
    versions: 2,
    lastUpdated: '2024-01-10',
    description: 'Batch #12345 Material Analysis',
    versionsList: [
      { version: 'v1', date: '2023-06-15', uploader: 'Alex Johnson', notes: 'Initial test results', fileSize: '1.8 MB' },
      { version: 'v2', date: '2024-01-10', uploader: 'Sam Wilson', notes: 'Updated with new batch data', fileSize: '2.1 MB' }
    ]
  },
  {
    id: '3',
    docName: 'Factory Audit Report',
    docType: 'audit_report',
    status: 'expired',
    expiry: '2023-12-15',
    versions: 1,
    lastUpdated: '2023-06-20',
    description: 'Annual Safety Audit',
    versionsList: [
      { version: 'v1', date: '2023-06-20', uploader: 'Audit Team', notes: 'Annual safety compliance audit', fileSize: '3.2 MB' }
    ]
  },
  {
    id: '4',
    docName: 'Product Specification',
    docType: 'specification',
    status: 'valid',
    expiry: '2025-06-30',
    versions: 4,
    lastUpdated: '2024-01-20',
    description: 'Product XYZ Technical Specifications',
    versionsList: [
      { version: 'v1', date: '2021-03-10', uploader: 'R&D Team', notes: 'Initial spec', fileSize: '1.2 MB' },
      { version: 'v2', date: '2022-04-15', uploader: 'Engineering', notes: 'Updated tolerances', fileSize: '1.3 MB' },
      { version: 'v3', date: '2023-05-20', uploader: 'QA Team', notes: 'Added test methods', fileSize: '1.5 MB' },
      { version: 'v4', date: '2024-01-20', uploader: 'Product Manager', notes: 'Final revisions', fileSize: '1.6 MB' }
    ]
  }
];

export const requestData = [
  {
    id: 'req1',
    docType: 'certificate',
    dueDate: '2024-02-28',
    status: 'pending',
    buyerName: 'Acme Corp'
  },
  {
    id: 'req2',
    docType: 'test_report',
    dueDate: '2024-03-15',
    status: 'pending',
    buyerName: 'Global Goods'
  },
  {
    id: 'req3',
    docType: 'audit_report',
    dueDate: '2024-01-31',
    status: 'fulfilled',
    buyerName: 'Quality First Inc',
    fulfilledEvidenceId: '3'
  }
];