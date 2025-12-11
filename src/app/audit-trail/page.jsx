import React, { useState } from 'react';
import { FaHistory, FaSearch, FaUser, FaFileAlt, FaCalendar, FaFilter } from 'react-icons/fa';
import { useColor } from '../../context/ColorContext.jsx';
import Layout from '../../components/Layout/Layout.jsx';
import Pagination from '../../components/pagination/Pagination.jsx';

const auditLogs = [
  {
    id: 1,
    timestamp: '2024-01-22 10:45:23',
    user: 'Ahmed Ali',
    action: 'Created',
    entity: 'Purchase Order',
    entityId: 'PO-2024-001',
    details: 'Created new purchase order for Vendor ABC',
    ipAddress: '192.168.1.100',
    browser: 'Chrome 120.0',
    status: 'Success'
  },
  {
    id: 2,
    timestamp: '2024-01-22 10:30:15',
    user: 'Fatima Hassan',
    action: 'Updated',
    entity: 'Employee',
    entityId: 'EMP-005',
    details: 'Updated employee profile information',
    ipAddress: '192.168.1.105',
    browser: 'Firefox 121.0',
    status: 'Success'
  },
  {
    id: 3,
    timestamp: '2024-01-22 10:15:42',
    user: 'Mohammed Saleh',
    action: 'Approved',
    entity: 'Sales Order',
    entityId: 'SO-2024-015',
    details: 'Approved sales order SO-2024-015',
    ipAddress: '192.168.1.110',
    browser: 'Chrome 120.0',
    status: 'Success'
  },
  {
    id: 4,
    timestamp: '2024-01-22 09:58:30',
    user: 'Admin User',
    action: 'Deleted',
    entity: 'Document',
    entityId: 'DOC-123',
    details: 'Deleted document: Old_Policy_2023.pdf',
    ipAddress: '192.168.1.50',
    browser: 'Chrome 120.0',
    status: 'Success'
  },
  {
    id: 5,
    timestamp: '2024-01-22 09:42:18',
    user: 'Ahmed Ali',
    action: 'Login',
    entity: 'System',
    entityId: '-',
    details: 'User logged in successfully',
    ipAddress: '192.168.1.100',
    browser: 'Chrome 120.0',
    status: 'Success'
  },
  {
    id: 6,
    timestamp: '2024-01-22 09:30:05',
    user: 'Unknown',
    action: 'Failed Login',
    entity: 'System',
    entityId: '-',
    details: 'Failed login attempt for username: test_user',
    ipAddress: '192.168.1.200',
    browser: 'Chrome 120.0',
    status: 'Failed'
  },
  {
    id: 7,
    timestamp: '2024-01-22 09:15:33',
    user: 'HR Manager',
    action: 'Exported',
    entity: 'Report',
    entityId: 'RPT-2024-001',
    details: 'Exported employee list to Excel',
    ipAddress: '192.168.1.115',
    browser: 'Edge 120.0',
    status: 'Success'
  },
  {
    id: 8,
    timestamp: '2024-01-22 08:55:20',
    user: 'Finance Manager',
    action: 'Created',
    entity: 'Journal Entry',
    entityId: 'JE-2024-045',
    details: 'Created journal entry for month-end closing',
    ipAddress: '192.168.1.120',
    browser: 'Chrome 120.0',
    status: 'Success'
  },
];

const actions = ['All Actions', 'Created', 'Updated', 'Deleted', 'Approved', 'Rejected', 'Login', 'Exported', 'Imported'];
const entities = ['All Entities', 'Purchase Order', 'Sales Order', 'Employee', 'Document', 'System', 'Report', 'Journal Entry'];
const users = ['All Users', ...new Set(auditLogs.map(log => log.user))];

const Page = () => {
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('All Actions');
  const [selectedEntity, setSelectedEntity] = useState('All Entities');
  const [selectedUser, setSelectedUser] = useState('All Users');
  const [selectedDate, setSelectedDate] = useState('');
  const [page, setPage] = useState(1);

  const rowsPerPage = 10;

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = selectedAction === 'All Actions' || log.action === selectedAction;
    const matchesEntity = selectedEntity === 'All Entities' || log.entity === selectedEntity;
    const matchesUser = selectedUser === 'All Users' || log.user === selectedUser;
    const matchesDate = !selectedDate || log.timestamp.startsWith(selectedDate);
    return matchesSearch && matchesAction && matchesEntity && matchesUser && matchesDate;
  });

  const paginatedLogs = filteredLogs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getActionColor = (action) => {
    switch(action.toLowerCase()) {
      case 'created': return 'bg-green-100 text-green-800';
      case 'updated': return 'bg-blue-100 text-blue-800';
      case 'deleted': return 'bg-red-100 text-red-800';
      case 'approved': return 'bg-purple-100 text-purple-800';
      case 'rejected': return 'bg-orange-100 text-orange-800';
      case 'login': return 'bg-gray-100 text-gray-800';
      case 'exported': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Success' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaHistory className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Audit Trail</h1>
                <p className="text-gray-600">Track all system activities and user actions</p>
              </div>
            </div>
            <button
              onClick={() => {
                // Export audit log
                alert('Export feature - to be implemented');
              }}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FaFileAlt className="w-4 h-4" />
              <span>Export Log</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Logs</p>
                <p className="text-2xl font-bold text-gray-800">{auditLogs.length}</p>
              </div>
              <FaHistory className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Activities</p>
                <p className="text-2xl font-bold text-blue-600">
                  {auditLogs.filter(log => log.timestamp.startsWith('2024-01-22')).length}
                </p>
              </div>
              <FaCalendar className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">
                  {new Set(auditLogs.filter(log => log.action === 'Login').map(log => log.user)).size}
                </p>
              </div>
              <FaUser className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Actions</p>
                <p className="text-2xl font-bold text-red-600">
                  {auditLogs.filter(log => log.status === 'Failed').length}
                </p>
              </div>
              <FaHistory className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by user, entity, or details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-40">
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {actions.map(action => (
                  <option key={action} value={action}>{action}</option>
                ))}
              </select>
            </div>
            <div className="lg:w-40">
              <select
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {entities.map(entity => (
                  <option key={entity} value={entity}>{entity}</option>
                ))}
              </select>
            </div>
            <div className="lg:w-40">
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>
            <div className="lg:w-48">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Select Date"
              />
            </div>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Timestamp</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Entity</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Entity ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">IP Address</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <FaCalendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{log.timestamp}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <FaUser className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.entity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.entityId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-md">{log.details}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ipAddress}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredLogs.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredLogs.length / rowsPerPage)}
              page={page}
              onPageChange={(e, value) => setPage(value)}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Page;


