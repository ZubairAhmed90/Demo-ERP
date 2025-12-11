import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaSearch, FaCheck, FaTimes, FaClock, FaEye, FaFilter } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const approvalRequests = [
  { id: 1, requestNumber: 'APR-001', documentType: 'Purchase Order', documentNumber: 'PO-2024-001', requester: 'Ahmed Ali', amount: 50000, submittedDate: '2024-01-15', status: 'Pending', currentApprover: 'Manager', priority: 'High' },
  { id: 2, requestNumber: 'APR-002', documentType: 'Invoice', documentNumber: 'INV-2024-001', requester: 'Fatima Hassan', amount: 25000, submittedDate: '2024-01-14', status: 'Approved', currentApprover: '-', priority: 'Medium' },
  { id: 3, requestNumber: 'APR-003', documentType: 'Leave Request', documentNumber: 'LR-2024-001', requester: 'Mohammed Saleh', amount: 0, submittedDate: '2024-01-13', status: 'Rejected', currentApprover: '-', priority: 'Low' },
  { id: 4, requestNumber: 'APR-004', documentType: 'Expense', documentNumber: 'EXP-2024-001', requester: 'Sarah Ahmed', amount: 5000, submittedDate: '2024-01-12', status: 'Pending', currentApprover: 'Supervisor', priority: 'Medium' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredRequests = approvalRequests.filter((request) => {
    const matchesSearch = 
      request.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requester.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesType = selectedType === 'all' || request.documentType === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const paginatedRequests = filteredRequests.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const pendingCount = approvalRequests.filter(r => r.status === 'Pending').length;
  const approvedCount = approvalRequests.filter(r => r.status === 'Approved').length;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaCheckCircle className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Approval Requests</h1>
                <p className="text-gray-600">View and manage pending approval requests</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-800">{approvalRequests.length}</p>
              </div>
              <FaCheckCircle className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <FaClock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <FaCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {approvalRequests.filter(r => r.status === 'Rejected').length}
                </p>
              </div>
              <FaTimes className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by document number or requester..."
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
                <option value="Purchase Order">Purchase Order</option>
                <option value="Invoice">Invoice</option>
                <option value="Leave Request">Leave Request</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Request #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Document Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Document #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Requester</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Current Approver</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Priority</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{request.requestNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.documentType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.documentNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.requester}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.amount > 0 ? `${request.amount.toLocaleString()} SAR` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.currentApprover}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        request.status === 'Approved' 
                          ? 'bg-green-100 text-green-800' 
                          : request.status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        request.priority === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : request.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {request.status === 'Pending' && (
                          <>
                            <button className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors" title="Approve">
                              <FaCheck className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors" title="Reject">
                              <FaTimes className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <FaEye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredRequests.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredRequests.length / rowsPerPage)}
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


