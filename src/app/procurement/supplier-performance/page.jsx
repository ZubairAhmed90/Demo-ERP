import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaSearch, FaFilter, FaStar, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const supplierPerformance = [
  { id: 1, vendorCode: 'VND-001', vendorName: 'ABC Suppliers Ltd', onTimeDelivery: 95, qualityScore: 4.5, responseTime: 2, totalOrders: 45, completedOrders: 43, avgOrderValue: 11111, overallRating: 4.6 },
  { id: 2, vendorCode: 'VND-002', vendorName: 'XYZ Manufacturing', onTimeDelivery: 98, qualityScore: 4.8, responseTime: 1, totalOrders: 32, completedOrders: 32, avgOrderValue: 23437, overallRating: 4.9 },
  { id: 3, vendorCode: 'VND-003', vendorName: 'Global Logistics Co', onTimeDelivery: 92, qualityScore: 4.2, responseTime: 3, totalOrders: 28, completedOrders: 26, avgOrderValue: 11538, overallRating: 4.3 },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredSuppliers = supplierPerformance.filter((supplier) => {
    return supplier.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           supplier.vendorCode.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const paginatedSuppliers = filteredSuppliers.slice(
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
                <FaChartLine className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Supplier Performance</h1>
                <p className="text-gray-600">Track and analyze supplier performance metrics</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Suppliers</p>
                <p className="text-2xl font-bold text-gray-800">{supplierPerformance.length}</p>
              </div>
              <FaChartLine className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. On-Time Delivery</p>
                <p className="text-2xl font-bold text-green-600">
                  {(supplierPerformance.reduce((sum, s) => sum + s.onTimeDelivery, 0) / supplierPerformance.length).toFixed(1)}%
                </p>
              </div>
              <FaCheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Quality Score</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(supplierPerformance.reduce((sum, s) => sum + s.qualityScore, 0) / supplierPerformance.length).toFixed(1)}
                </p>
              </div>
              <FaStar className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Response Time</p>
                <p className="text-2xl font-bold text-gray-800">
                  {(supplierPerformance.reduce((sum, s) => sum + s.responseTime, 0) / supplierPerformance.length).toFixed(1)} days
                </p>
              </div>
              <FaClock className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by vendor name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Vendor Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Vendor Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">On-Time Delivery</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Quality Score</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Response Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Orders</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Completion Rate</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Overall Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedSuppliers.map((supplier) => {
                  const completionRate = (supplier.completedOrders / supplier.totalOrders) * 100;
                  return (
                    <tr key={supplier.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{supplier.vendorCode}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{supplier.vendorName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-24">
                            <div
                              className={`h-2 rounded-full ${
                                supplier.onTimeDelivery >= 95 ? 'bg-green-500' :
                                supplier.onTimeDelivery >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${supplier.onTimeDelivery}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-900">{supplier.onTimeDelivery}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <FaStar className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-semibold text-gray-900">{supplier.qualityScore}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{supplier.responseTime} days</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{supplier.totalOrders}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-24">
                            <div
                              className={`h-2 rounded-full ${
                                completionRate >= 95 ? 'bg-green-500' :
                                completionRate >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${completionRate}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-900">{completionRate.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <FaStar className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-semibold text-gray-900">{supplier.overallRating}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredSuppliers.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredSuppliers.length / rowsPerPage)}
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

