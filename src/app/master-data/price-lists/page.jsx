import React, { useState } from 'react';
import { FaDollarSign, FaPlus, FaSearch, FaEdit, FaTrash, FaUser, FaBuilding, FaTag } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const priceLists = [
  {
    id: 1,
    name: 'Standard Customer Price List',
    code: 'PL-CUST-STD',
    type: 'Customer',
    customer: 'All Customers',
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    currency: 'SAR',
    status: 'Active',
    items: 25,
    createdAt: '2024-01-01 10:00 AM',
    createdBy: 'Admin User'
  },
  {
    id: 2,
    name: 'VIP Customer Price List',
    code: 'PL-CUST-VIP',
    type: 'Customer',
    customer: 'ABC Corporation',
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    currency: 'SAR',
    status: 'Active',
    items: 15,
    createdAt: '2024-01-05 02:00 PM',
    createdBy: 'Sales Manager'
  },
  {
    id: 3,
    name: 'Vendor Price List',
    code: 'PL-VEND-001',
    type: 'Vendor',
    vendor: 'DEF Suppliers',
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    currency: 'SAR',
    status: 'Active',
    items: 30,
    createdAt: '2024-01-10 09:00 AM',
    createdBy: 'Procurement Manager'
  },
  {
    id: 4,
    name: 'Wholesale Price List',
    code: 'PL-WHOLESALE',
    type: 'Customer',
    customer: 'Wholesale Customers',
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    currency: 'SAR',
    status: 'Active',
    items: 50,
    createdAt: '2024-01-15 11:00 AM',
    createdBy: 'Sales Manager'
  },
];

const Page = () => {
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [priceListsList, setPriceListsList] = useState(priceLists);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const rowsPerPage = 10;

  const filteredPriceLists = priceListsList.filter((list) => {
    const matchesSearch = 
      list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || list.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || list.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const paginatedPriceLists = filteredPriceLists.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const deletePriceList = (id) => {
    if (confirm('Are you sure you want to delete this price list?')) {
      setPriceListsList(prev => prev.filter(list => list.id !== id));
    }
  };

  const activeCount = priceListsList.filter(l => l.status === 'Active').length;
  const customerCount = priceListsList.filter(l => l.type === 'Customer').length;
  const vendorCount = priceListsList.filter(l => l.type === 'Vendor').length;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaDollarSign className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Price Lists</h1>
                <p className="text-gray-600">Manage customer and vendor specific price lists</p>
              </div>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Create Price List</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Price Lists</p>
                <p className="text-2xl font-bold text-gray-800">{priceListsList.length}</p>
              </div>
              <FaDollarSign className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              </div>
              <FaTag className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Customer Lists</p>
                <p className="text-2xl font-bold text-blue-600">{customerCount}</p>
              </div>
              <FaUser className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vendor Lists</p>
                <p className="text-2xl font-bold text-purple-600">{vendorCount}</p>
              </div>
              <FaBuilding className="w-8 h-8 text-purple-500" />
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
                placeholder="Search price lists..."
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
                <option value="Customer">Customer</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Price Lists Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Price List</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Customer/Vendor</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Valid Period</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Currency</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedPriceLists.map((list) => (
                  <tr key={list.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{list.name}</p>
                        <p className="text-xs text-gray-500">{list.code}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        list.type === 'Customer' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {list.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{list.customer || list.vendor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {list.validFrom} to {list.validTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{list.currency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{list.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        list.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {list.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            // View/Edit items
                            alert(`View/Edit items for ${list.name}`);
                          }}
                          className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                          title="View Items"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deletePriceList(list.id)}
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

        {filteredPriceLists.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredPriceLists.length / rowsPerPage)}
              page={page}
              onPageChange={(e, value) => setPage(value)}
            />
          </div>
        )}

        {/* Create Price List Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Create New Price List</h2>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price List Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter price list name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="PL-XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Customer</option>
                      <option>Vendor</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer/Vendor</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select customer/vendor...</option>
                    <option>All Customers</option>
                    <option>ABC Corporation</option>
                    <option>DEF Suppliers</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Valid From</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Valid To</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>SAR</option>
                      <option>USD</option>
                      <option>EUR</option>
                    </select>
                  </div>
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
                    // Create price list logic here
                    setIsCreateModalOpen(false);
                  }}
                  className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  Create Price List
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


