import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHistory, FaSearch, FaEye, FaFilter, FaCheck, FaTimes, FaClock } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const approvalHistory = [
  { id: 1, requestNumber: 'APR-001', documentType: 'Purchase Order', documentNumber: 'PO-2024-001', requester: 'Ahmed Ali', approver: 'Manager', action: 'Approved', actionDate: '2024-01-15 10:30', comments: 'Approved as per budget' },
  { id: 2, requestNumber: 'APR-002', documentType: 'Invoice', documentNumber: 'INV-2024-001', requester: 'Fatima Hassan', approver: 'Finance Manager', action: 'Approved', actionDate: '2024-01-14 14:20', comments: 'Verified and approved' },
  { id: 3, requestNumber: 'APR-003', documentType: 'Leave Request', documentNumber: 'LR-2024-001', requester: 'Mohammed Saleh', approver: 'HR Manager', action: 'Rejected', actionDate: '2024-01-13 09:15', comments: 'Insufficient leave balance' },
  { id: 4, requestNumber: 'APR-004', documentType: 'Expense', documentNumber: 'EXP-2024-001', requester: 'Sarah Ahmed', approver: 'Supervisor', action: 'Approved', actionDate: '2024-01-12 16:45', comments: 'Expense verified' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredHistory = approvalHistory.filter((item) => {
    const matchesSearch = 
      item.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.approver.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = selectedAction === 'all' || item.action === selectedAction;
    return matchesSearch && matchesAction;
  });

  const paginatedHistory = filteredHistory.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
                <h1 className="text-2xl font-bold text-gray-800">Approval History</h1>
                <p className="text-gray-600">View complete history of all approval actions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Records</p>
                <p className="text-2xl font-bold text-gray-800">{approvalHistory.length}</p>
              </div>
              <FaHistory className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {approvalHistory.filter(h => h.action === 'Approved').length}
                </p>
              </div>
              <FaCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {approvalHistory.filter(h => h.action === 'Rejected').length}
                </p>
              </div>
              <FaTimes className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-800">{approvalHistory.length}</p>
              </div>
              <FaClock className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by document number, requester, or approver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Actions</option>
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Approver</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Action Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Comments</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{item.requestNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.documentType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.documentNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.requester}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.approver}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        item.action === 'Approved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.actionDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{item.comments}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <FaEye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredHistory.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredHistory.length / rowsPerPage)}
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


