import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaPlus, FaSearch, FaEye, FaClock, FaCheckCircle, FaTimes, FaHourglassHalf } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const leaves = [
  { id: 1, leaveNumber: 'LV-2024-001', type: 'Annual Leave', startDate: '2024-01-25', endDate: '2024-01-27', days: 3, status: 'Approved', appliedDate: '2024-01-20', approvedBy: 'HR Manager', approvedDate: '2024-01-21', reason: 'Family vacation' },
  { id: 2, leaveNumber: 'LV-2024-002', type: 'Sick Leave', startDate: '2024-01-15', endDate: '2024-01-15', days: 1, status: 'Pending', appliedDate: '2024-01-14', approvedBy: '-', approvedDate: '-', reason: 'Medical appointment' },
  { id: 3, leaveNumber: 'LV-2023-045', type: 'Personal Leave', startDate: '2024-01-10', endDate: '2024-01-10', days: 1, status: 'Approved', appliedDate: '2024-01-08', approvedBy: 'HR Manager', approvedDate: '2024-01-09', reason: 'Personal matters' },
  { id: 4, leaveNumber: 'LV-2023-044', type: 'Annual Leave', startDate: '2023-12-20', endDate: '2023-12-22', days: 3, status: 'Approved', appliedDate: '2023-12-15', approvedBy: 'HR Manager', approvedDate: '2023-12-16', reason: 'Holiday break' },
];

const leaveTypes = ['Annual Leave', 'Sick Leave', 'Personal Leave', 'Emergency Leave', 'Maternity Leave', 'Paternity Leave'];
const leaveBalances = {
  'Annual Leave': { total: 25, used: 8, balance: 17 },
  'Sick Leave': { total: 10, used: 2, balance: 8 },
  'Personal Leave': { total: 5, used: 1, balance: 4 },
  'Emergency Leave': { total: 3, used: 0, balance: 3 },
};

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch = 
      leave.leaveNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || leave.status === selectedStatus;
    const matchesType = selectedType === 'all' || leave.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const paginatedLeaves = filteredLeaves.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved': return <FaCheckCircle className="w-4 h-4 text-green-600" />;
      case 'Pending': return <FaHourglassHalf className="w-4 h-4 text-yellow-600" />;
      case 'Rejected': return <FaTimes className="w-4 h-4 text-red-600" />;
      default: return <FaClock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaCalendarAlt className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Leave Requests</h1>
                <p className="text-gray-600">View and manage your leave requests</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/hr/create-leave-request')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Request Leave</span>
            </button>
          </div>
        </div>

        {/* Leave Balances */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(leaveBalances).map(([type, balance]) => (
            <div key={type} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">{type}</h3>
                <FaCalendarAlt className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium text-gray-900">{balance.total} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Used:</span>
                  <span className="font-medium text-red-600">{balance.used} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Balance:</span>
                  <span className="font-semibold text-green-600">{balance.balance} days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${(balance.used / balance.total) * 100}%`,
                      backgroundColor: primaryColor
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-800">{leaves.length}</p>
              </div>
              <FaCalendarAlt className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {leaves.filter(l => l.status === 'Approved').length}
                </p>
              </div>
              <FaCheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {leaves.filter(l => l.status === 'Pending').length}
                </p>
              </div>
              <FaHourglassHalf className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Days</p>
                <p className="text-2xl font-bold text-gray-800">
                  {leaves.reduce((sum, l) => sum + l.days, 0)}
                </p>
              </div>
              <FaClock className="w-8 h-8 text-gray-500" />
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
                placeholder="Search by leave number or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {leaveTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leave Requests Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Leave #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Start Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">End Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Days</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Applied Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedLeaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{leave.leaveNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.startDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.endDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.days} day(s)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.appliedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(leave.status)}`}>
                        {getStatusIcon(leave.status)}
                        <span className="ml-1">{leave.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => {
                          // Show leave details modal
                          alert(`Leave Details:\nType: ${leave.type}\nReason: ${leave.reason}\nApproved By: ${leave.approvedBy}\nApproved Date: ${leave.approvedDate}`);
                        }}
                        className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredLeaves.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredLeaves.length / rowsPerPage)}
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


