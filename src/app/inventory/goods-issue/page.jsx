import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowDown, FaPlus, FaSearch, FaEdit, FaEye, FaCalendar, FaWarehouse } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const goodsIssues = [
  { id: 1, documentNumber: 'GI-2024-001', warehouse: 'Main Warehouse', date: '2024-01-15', reference: 'SO-001', totalItems: 25, status: 'Posted', postedBy: 'Admin' },
  { id: 2, documentNumber: 'GI-2024-002', warehouse: 'Jeddah Distribution', date: '2024-01-14', reference: 'TRF-001', totalItems: 15, status: 'Draft', postedBy: '-' },
  { id: 3, documentNumber: 'GI-2024-003', warehouse: 'Dammam Storage', date: '2024-01-13', reference: 'ADJ-001', totalItems: 5, status: 'Posted', postedBy: 'Admin' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredIssues = goodsIssues.filter((issue) => {
    const matchesSearch = 
      issue.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedIssues = filteredIssues.slice(
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
                <FaArrowDown className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Goods Issue</h1>
                <p className="text-gray-600">Record inventory outbound transactions</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/inventory/create-goods-issue')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>New Issue</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Issues</p>
                <p className="text-2xl font-bold text-gray-800">{goodsIssues.length}</p>
              </div>
              <FaArrowDown className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Posted</p>
                <p className="text-2xl font-bold text-green-600">
                  {goodsIssues.filter(i => i.status === 'Posted').length}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {goodsIssues.filter(i => i.status === 'Draft').length}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-yellow-500"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items Issued</p>
                <p className="text-2xl font-bold text-gray-800">
                  {goodsIssues.reduce((sum, i) => sum + i.totalItems, 0)}
                </p>
              </div>
              <FaWarehouse className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by document number or reference..."
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
                <option value="Posted">Posted</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Document #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Warehouse</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Reference</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Items</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Posted By</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{issue.documentNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.warehouse}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.reference}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.totalItems}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        issue.status === 'Posted' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {issue.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.postedBy}</td>
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

        {filteredIssues.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredIssues.length / rowsPerPage)}
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


