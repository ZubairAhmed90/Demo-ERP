import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaPlus, FaSearch, FaEdit, FaEye, FaCalendar, FaCheck, FaTimes } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const rfqs = [
  { id: 1, rfqNumber: 'RFQ-2024-001', title: 'Office Supplies Procurement', category: 'Office Supplies', issueDate: '2024-01-15', dueDate: '2024-01-25', vendorsInvited: 5, quotesReceived: 3, status: 'Open', createdBy: 'Ahmed Ali' },
  { id: 2, rfqNumber: 'RFQ-2024-002', title: 'IT Equipment Purchase', category: 'IT Equipment', issueDate: '2024-01-14', dueDate: '2024-01-24', vendorsInvited: 8, quotesReceived: 6, status: 'Evaluation', createdBy: 'Fatima Hassan' },
  { id: 3, rfqNumber: 'RFQ-2024-003', title: 'Raw Materials Sourcing', category: 'Raw Materials', issueDate: '2024-01-13', dueDate: '2024-01-23', vendorsInvited: 4, quotesReceived: 4, status: 'Closed', createdBy: 'Mohammed Saleh' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredRFQs = rfqs.filter((rfq) => {
    const matchesSearch = 
      rfq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfq.rfqNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || rfq.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedRFQs = filteredRFQs.slice(
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
                <FaFileAlt className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Request for Quotation (RFQ)</h1>
                <p className="text-gray-600">Manage RFQ processes and vendor quotations</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/procurement/create-rfq')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Create RFQ</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total RFQs</p>
                <p className="text-2xl font-bold text-gray-800">{rfqs.length}</p>
              </div>
              <FaFileAlt className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {rfqs.filter(r => r.status === 'Open').length}
                </p>
              </div>
              <FaCalendar className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Evaluation</p>
                <p className="text-2xl font-bold text-blue-600">
                  {rfqs.filter(r => r.status === 'Evaluation').length}
                </p>
              </div>
              <FaCheck className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Quotes</p>
                <p className="text-2xl font-bold text-gray-800">
                  {rfqs.reduce((sum, r) => sum + r.quotesReceived, 0)}
                </p>
              </div>
              <FaFileAlt className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by RFQ number or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Open">Open</option>
                <option value="Evaluation">Evaluation</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">RFQ #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Issue Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Vendors Invited</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Quotes Received</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedRFQs.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{rfq.rfqNumber}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{rfq.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rfq.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rfq.issueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rfq.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rfq.vendorsInvited}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rfq.quotesReceived}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        rfq.status === 'Open' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : rfq.status === 'Evaluation'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rfq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors">
                          <FaEdit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredRFQs.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredRFQs.length / rowsPerPage)}
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


