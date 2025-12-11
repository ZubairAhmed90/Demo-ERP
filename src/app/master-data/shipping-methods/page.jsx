import React, { useState } from 'react';
import { FaTruck, FaPlus, FaSearch, FaEdit, FaTrash, FaShippingFast, FaDollarSign } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const shippingMethods = [
  {
    id: 1,
    name: 'Standard Shipping',
    code: 'STD',
    carrier: 'Local Courier',
    estimatedDays: 3,
    cost: 25.00,
    currency: 'SAR',
    status: 'Active',
    description: 'Standard ground shipping',
    usageCount: 120
  },
  {
    id: 2,
    name: 'Express Shipping',
    code: 'EXP',
    carrier: 'Express Delivery',
    estimatedDays: 1,
    cost: 50.00,
    currency: 'SAR',
    status: 'Active',
    description: 'Next day delivery',
    usageCount: 45
  },
  {
    id: 3,
    name: 'Overnight Shipping',
    code: 'OVN',
    carrier: 'Fast Track',
    estimatedDays: 1,
    cost: 75.00,
    currency: 'SAR',
    status: 'Active',
    description: 'Overnight delivery service',
    usageCount: 18
  },
  {
    id: 4,
    name: 'Free Shipping',
    code: 'FREE',
    carrier: 'Standard',
    estimatedDays: 5,
    cost: 0.00,
    currency: 'SAR',
    status: 'Active',
    description: 'Free shipping for orders above 500 SAR',
    usageCount: 89
  },
  {
    id: 5,
    name: 'International Shipping',
    code: 'INT',
    carrier: 'Global Express',
    estimatedDays: 7,
    cost: 150.00,
    currency: 'SAR',
    status: 'Active',
    description: 'International shipping service',
    usageCount: 12
  },
];

const Page = () => {
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [shippingMethodsList, setShippingMethodsList] = useState(shippingMethods);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const rowsPerPage = 10;

  const filteredShippingMethods = shippingMethodsList.filter((method) => 
    method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    method.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    method.carrier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedShippingMethods = filteredShippingMethods.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const deleteShippingMethod = (id) => {
    if (confirm('Are you sure you want to delete this shipping method?')) {
      setShippingMethodsList(prev => prev.filter(method => method.id !== id));
    }
  };

  const activeCount = shippingMethodsList.filter(m => m.status === 'Active').length;
  const totalUsage = shippingMethodsList.reduce((sum, method) => sum + method.usageCount, 0);

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
                <h1 className="text-2xl font-bold text-gray-800">Shipping Methods</h1>
                <p className="text-gray-600">Manage shipping carriers and methods</p>
              </div>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Shipping Method</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Methods</p>
                <p className="text-2xl font-bold text-gray-800">{shippingMethodsList.length}</p>
              </div>
              <FaTruck className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Methods</p>
                <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              </div>
              <FaShippingFast className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold text-blue-600">{totalUsage}</p>
              </div>
              <FaTruck className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search shipping methods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Shipping Methods Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Shipping Method</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Carrier</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Estimated Days</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Cost</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Usage</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedShippingMethods.map((method) => (
                  <tr key={method.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{method.name}</p>
                        <p className="text-xs text-gray-500">{method.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{method.code}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{method.carrier}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{method.estimatedDays} days</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <FaDollarSign className="w-3 h-3 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {method.cost.toFixed(2)} {method.currency}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{method.usageCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        method.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {method.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            // Edit shipping method
                            alert(`Edit shipping method: ${method.name}`);
                          }}
                          className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteShippingMethod(method.id)}
                          className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete"
                        >
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

        {filteredShippingMethods.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredShippingMethods.length / rowsPerPage)}
              page={page}
              onPageChange={(e, value) => setPage(value)}
            />
          </div>
        )}

        {/* Create Shipping Method Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Add New Shipping Method</h2>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Standard Shipping"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., STD"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Carrier</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Local Courier"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Days</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cost</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 25.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>SAR</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Create shipping method logic here
                    setIsCreateModalOpen(false);
                  }}
                  className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  Add Shipping Method
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Page;


