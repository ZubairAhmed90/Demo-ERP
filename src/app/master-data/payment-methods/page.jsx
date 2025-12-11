import React, { useState } from 'react';
import { FaCreditCard, FaPlus, FaSearch, FaEdit, FaTrash, FaMoneyBillWave, FaUniversity } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const paymentMethods = [
  {
    id: 1,
    name: 'Cash',
    code: 'CASH',
    type: 'Cash',
    description: 'Cash payment',
    status: 'Active',
    usageCount: 85
  },
  {
    id: 2,
    name: 'Credit Card',
    code: 'CC',
    type: 'Card',
    description: 'Credit card payment',
    status: 'Active',
    usageCount: 156
  },
  {
    id: 3,
    name: 'Debit Card',
    code: 'DC',
    type: 'Card',
    description: 'Debit card payment',
    status: 'Active',
    usageCount: 92
  },
  {
    id: 4,
    name: 'Bank Transfer',
    code: 'BT',
    type: 'Bank',
    description: 'Bank transfer payment',
    status: 'Active',
    usageCount: 78
  },
  {
    id: 5,
    name: 'Check',
    code: 'CHK',
    type: 'Check',
    description: 'Check payment',
    status: 'Active',
    usageCount: 34
  },
  {
    id: 6,
    name: 'Online Payment',
    code: 'ONLINE',
    type: 'Online',
    description: 'Online payment gateway',
    status: 'Active',
    usageCount: 201
  },
  {
    id: 7,
    name: 'Mobile Payment',
    code: 'MOBILE',
    type: 'Mobile',
    description: 'Mobile payment (Apple Pay, Google Pay)',
    status: 'Active',
    usageCount: 67
  },
];

const types = ['All Types', 'Cash', 'Card', 'Bank', 'Check', 'Online', 'Mobile'];

const Page = () => {
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [page, setPage] = useState(1);
  const [paymentMethodsList, setPaymentMethodsList] = useState(paymentMethods);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const rowsPerPage = 10;

  const filteredPaymentMethods = paymentMethodsList.filter((method) => {
    const matchesSearch = 
      method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All Types' || method.type === selectedType;
    return matchesSearch && matchesType;
  });

  const paginatedPaymentMethods = filteredPaymentMethods.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const deletePaymentMethod = (id) => {
    if (confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethodsList(prev => prev.filter(method => method.id !== id));
    }
  };

  const activeCount = paymentMethodsList.filter(m => m.status === 'Active').length;
  const totalUsage = paymentMethodsList.reduce((sum, method) => sum + method.usageCount, 0);

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Cash': return <FaMoneyBillWave className="w-4 h-4" />;
      case 'Card': return <FaCreditCard className="w-4 h-4" />;
      case 'Bank': return <FaUniversity className="w-4 h-4" />;
      default: return <FaCreditCard className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Cash': return 'bg-green-100 text-green-800';
      case 'Card': return 'bg-blue-100 text-blue-800';
      case 'Bank': return 'bg-purple-100 text-purple-800';
      case 'Check': return 'bg-yellow-100 text-yellow-800';
      case 'Online': return 'bg-indigo-100 text-indigo-800';
      case 'Mobile': return 'bg-pink-100 text-pink-800';
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
                <FaCreditCard className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Payment Methods</h1>
                <p className="text-gray-600">Manage payment method configuration</p>
              </div>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Payment Method</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Methods</p>
                <p className="text-2xl font-bold text-gray-800">{paymentMethodsList.length}</p>
              </div>
              <FaCreditCard className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Methods</p>
                <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              </div>
              <FaCreditCard className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold text-blue-600">{totalUsage}</p>
              </div>
              <FaMoneyBillWave className="w-8 h-8 text-blue-500" />
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
                placeholder="Search payment methods..."
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
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Payment Methods Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Payment Method</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Usage</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedPaymentMethods.map((method) => (
                  <tr key={method.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{method.name}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{method.code}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(method.type)}
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(method.type)}`}>
                          {method.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{method.description}</p>
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
                            // Edit payment method
                            alert(`Edit payment method: ${method.name}`);
                          }}
                          className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deletePaymentMethod(method.id)}
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

        {filteredPaymentMethods.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredPaymentMethods.length / rowsPerPage)}
              page={page}
              onPageChange={(e, value) => setPage(value)}
            />
          </div>
        )}

        {/* Create Payment Method Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Add New Payment Method</h2>
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
                      placeholder="e.g., Credit Card"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., CC"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {types.filter(t => t !== 'All Types').map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
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
                    // Create payment method logic here
                    setIsCreateModalOpen(false);
                  }}
                  className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  Add Payment Method
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


