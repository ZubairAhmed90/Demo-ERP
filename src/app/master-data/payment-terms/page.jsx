import React, { useState } from 'react';
import { FaFileContract, FaPlus, FaSearch, FaEdit, FaTrash, FaCalendarAlt, FaPercent } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const paymentTerms = [
  {
    id: 1,
    name: 'Net 30',
    code: 'NET30',
    description: 'Payment due within 30 days',
    days: 30,
    discountDays: 10,
    discountPercent: 2,
    status: 'Active',
    usageCount: 45
  },
  {
    id: 2,
    name: 'Net 15',
    code: 'NET15',
    description: 'Payment due within 15 days',
    days: 15,
    discountDays: 7,
    discountPercent: 1.5,
    status: 'Active',
    usageCount: 32
  },
  {
    id: 3,
    name: 'Net 45',
    code: 'NET45',
    description: 'Payment due within 45 days',
    days: 45,
    discountDays: 15,
    discountPercent: 2.5,
    status: 'Active',
    usageCount: 18
  },
  {
    id: 4,
    name: 'Due on Receipt',
    code: 'DUE_ON_RECEIPT',
    description: 'Payment due immediately upon receipt',
    days: 0,
    discountDays: 0,
    discountPercent: 0,
    status: 'Active',
    usageCount: 12
  },
  {
    id: 5,
    name: 'Net 60',
    code: 'NET60',
    description: 'Payment due within 60 days',
    days: 60,
    discountDays: 20,
    discountPercent: 3,
    status: 'Active',
    usageCount: 8
  },
  {
    id: 6,
    name: '2/10 Net 30',
    code: '2_10_NET30',
    description: '2% discount if paid within 10 days, otherwise net 30',
    days: 30,
    discountDays: 10,
    discountPercent: 2,
    status: 'Active',
    usageCount: 25
  },
];

const Page = () => {
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [paymentTermsList, setPaymentTermsList] = useState(paymentTerms);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const rowsPerPage = 10;

  const filteredPaymentTerms = paymentTermsList.filter((term) => 
    term.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedPaymentTerms = filteredPaymentTerms.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const deletePaymentTerm = (id) => {
    if (confirm('Are you sure you want to delete this payment term?')) {
      setPaymentTermsList(prev => prev.filter(term => term.id !== id));
    }
  };

  const activeCount = paymentTermsList.filter(t => t.status === 'Active').length;
  const totalUsage = paymentTermsList.reduce((sum, term) => sum + term.usageCount, 0);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaFileContract className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Payment Terms</h1>
                <p className="text-gray-600">Manage standard payment terms library</p>
              </div>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Payment Term</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Terms</p>
                <p className="text-2xl font-bold text-gray-800">{paymentTermsList.length}</p>
              </div>
              <FaFileContract className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Terms</p>
                <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              </div>
              <FaFileContract className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold text-blue-600">{totalUsage}</p>
              </div>
              <FaCalendarAlt className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search payment terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Payment Terms Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Payment Term</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Payment Days</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Discount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Usage</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedPaymentTerms.map((term) => (
                  <tr key={term.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{term.name}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{term.code}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{term.description}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{term.days} days</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {term.discountPercent > 0 ? (
                        <div className="flex items-center space-x-2">
                          <FaPercent className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {term.discountPercent}% within {term.discountDays} days
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No discount</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{term.usageCount}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        term.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {term.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            // Edit payment term
                            alert(`Edit payment term: ${term.name}`);
                          }}
                          className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deletePaymentTerm(term.id)}
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

        {filteredPaymentTerms.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredPaymentTerms.length / rowsPerPage)}
              page={page}
              onPageChange={(e, value) => setPage(value)}
            />
          </div>
        )}

        {/* Create Payment Term Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Add New Payment Term</h2>
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
                      placeholder="e.g., Net 30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., NET30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Days</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount Days</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount Percent</label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 2"
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
                    // Create payment term logic here
                    setIsCreateModalOpen(false);
                  }}
                  className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  Add Payment Term
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

