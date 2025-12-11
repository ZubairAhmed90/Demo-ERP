import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTruck, FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaStar, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const vendors = [
  { id: 1, vendorCode: 'VND-001', name: 'ABC Suppliers Ltd', contactPerson: 'John Smith', email: 'john@abcsuppliers.com', phone: '+966-50-123-4567', category: 'Electronics', rating: 4.5, totalOrders: 45, totalValue: 500000, status: 'Active' },
  { id: 2, vendorCode: 'VND-002', name: 'XYZ Manufacturing', contactPerson: 'Sarah Johnson', email: 'sarah@xyz.com', phone: '+966-50-234-5678', category: 'Raw Materials', rating: 4.8, totalOrders: 32, totalValue: 750000, status: 'Active' },
  { id: 3, vendorCode: 'VND-003', name: 'Global Logistics Co', contactPerson: 'Mike Brown', email: 'mike@globallog.com', phone: '+966-50-345-6789', category: 'Logistics', rating: 4.2, totalOrders: 28, totalValue: 300000, status: 'Active' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const categories = ['all', ...new Set(vendors.map(v => v.category))];

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.vendorCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const paginatedVendors = filteredVendors.slice(
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
                <h1 className="text-2xl font-bold text-gray-800">Vendors/Suppliers</h1>
                <p className="text-gray-600">Manage vendor relationships and supplier information</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/procurement/create-vendor')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Vendor</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                <p className="text-2xl font-bold text-gray-800">{vendors.length}</p>
              </div>
              <FaTruck className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold text-green-600">
                  {vendors.filter(v => v.status === 'Active').length}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">
                  {vendors.reduce((sum, v) => sum + v.totalOrders, 0)}
                </p>
              </div>
              <FaTruck className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-800">
                  {vendors.reduce((sum, v) => sum + v.totalValue, 0).toLocaleString()} SAR
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
                placeholder="Search by vendor name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Vendor Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Vendor Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Rating</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Orders</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Value</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{vendor.vendorCode}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{vendor.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{vendor.contactPerson}</div>
                      <div className="text-xs text-gray-500 flex items-center space-x-1">
                        <FaEnvelope className="w-3 h-3" />
                        <span>{vendor.email}</span>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center space-x-1">
                        <FaPhone className="w-3 h-3" />
                        <span>{vendor.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <FaStar className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">{vendor.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.totalOrders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vendor.totalValue.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        vendor.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {vendor.status}
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
                        <button className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredVendors.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredVendors.length / rowsPerPage)}
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


