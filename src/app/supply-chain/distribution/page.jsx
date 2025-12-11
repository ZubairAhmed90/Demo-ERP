import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTruck, FaPlus, FaSearch, FaEdit, FaEye, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const distributions = [
  { id: 1, distributionNumber: 'DST-2024-001', fromLocation: 'Main Warehouse', toLocation: 'Retail Store A', items: 25, totalValue: 50000, scheduledDate: '2024-01-18', status: 'Scheduled', assignedDriver: 'Ahmed Ali' },
  { id: 2, distributionNumber: 'DST-2024-002', fromLocation: 'Jeddah Distribution', toLocation: 'Retail Store B', items: 30, totalValue: 60000, scheduledDate: '2024-01-17', status: 'In Transit', assignedDriver: 'Mohammed Saleh' },
  { id: 3, distributionNumber: 'DST-2024-003', fromLocation: 'Dammam Storage', toLocation: 'Retail Store C', items: 20, totalValue: 40000, scheduledDate: '2024-01-16', status: 'Delivered', assignedDriver: 'Fatima Hassan' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredDistributions = distributions.filter((dist) => {
    const matchesSearch = 
      dist.distributionNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || dist.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedDistributions = filteredDistributions.slice(
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
                <FaTruck className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Distribution Management</h1>
                <p className="text-gray-600">Manage distribution to retail stores and customers</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/supply-chain/create-distribution')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>New Distribution</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Distributions</p>
                <p className="text-2xl font-bold text-gray-800">{distributions.length}</p>
              </div>
              <FaTruck className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {distributions.filter(d => d.status === 'In Transit').length}
                </p>
              </div>
              <FaTruck className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-green-600">
                  {distributions.filter(d => d.status === 'Delivered').length}
                </p>
              </div>
              <FaTruck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-800">
                  {distributions.reduce((sum, d) => sum + d.totalValue, 0).toLocaleString()} SAR
                </p>
              </div>
              <FaTruck className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by distribution number..."
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
                <option value="Scheduled">Scheduled</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Distribution #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">From Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">To Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Value</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Scheduled Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Driver</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedDistributions.map((dist) => (
                  <tr key={dist.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{dist.distributionNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{dist.fromLocation}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-gray-900">{dist.toLocation}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dist.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dist.totalValue.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dist.scheduledDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dist.assignedDriver}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        dist.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : dist.status === 'In Transit'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {dist.status}
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

        {filteredDistributions.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredDistributions.length / rowsPerPage)}
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


