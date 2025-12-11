import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaEnvelope, FaPhone, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const customers = [
  { id: 1, customerCode: 'CUST-001', name: 'ABC Corporation', contactPerson: 'John Smith', email: 'john@abccorp.com', phone: '+966-50-123-4567', creditLimit: 100000, balance: 25000, totalOrders: 45, totalValue: 500000, status: 'Active', segment: 'Enterprise' },
  { id: 2, customerCode: 'CUST-002', name: 'XYZ Industries', contactPerson: 'Jane Doe', email: 'jane@xyz.com', phone: '+966-50-234-5678', creditLimit: 75000, balance: 15000, totalOrders: 32, totalValue: 350000, status: 'Active', segment: 'Corporate' },
  { id: 3, customerCode: 'CUST-003', name: 'Tech Solutions Ltd', contactPerson: 'Mike Johnson', email: 'mike@techsol.com', phone: '+966-50-345-6789', creditLimit: 50000, balance: 5000, totalOrders: 28, totalValue: 200000, status: 'Active', segment: 'SMB' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const segments = ['all', ...new Set(customers.map(c => c.segment))];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.customerCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = selectedSegment === 'all' || customer.segment === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  const paginatedCustomers = filteredCustomers.slice(
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
                <FaUsers className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
                <p className="text-gray-600">Manage customer relationships and information</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/crm/create-customer')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Customer</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-800">{customers.length}</p>
              </div>
              <FaUsers className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  {customers.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString()} SAR
                </p>
              </div>
              <FaDollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding Balance</p>
                <p className="text-2xl font-bold text-red-600">
                  {customers.reduce((sum, c) => sum + c.balance, 0).toLocaleString()} SAR
                </p>
              </div>
              <FaDollarSign className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">
                  {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
                </p>
              </div>
              <FaChartLine className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by customer name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {segments.map(seg => (
                  <option key={seg} value={seg}>
                    {seg === 'all' ? 'All Segments' : seg}
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Customer Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Customer Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Segment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Credit Limit</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Balance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Orders</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Value</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{customer.customerCode}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{customer.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{customer.contactPerson}</div>
                      <div className="text-xs text-gray-500 flex items-center space-x-1">
                        <FaEnvelope className="w-3 h-3" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center space-x-1">
                        <FaPhone className="w-3 h-3" />
                        <span>{customer.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {customer.segment}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.creditLimit.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      {customer.balance.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.totalOrders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.totalValue.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        customer.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.status}
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

        {filteredCustomers.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredCustomers.length / rowsPerPage)}
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


