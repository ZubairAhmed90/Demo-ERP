import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaPlus, FaSearch, FaEdit, FaEye, FaChartBar, FaIndustry } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const productionPlans = [
  { id: 1, planNumber: 'PLAN-2024-001', productName: 'Laptop Computer', quantity: 100, startDate: '2024-01-20', endDate: '2024-01-25', workCenter: 'Assembly Line 1', status: 'Scheduled', priority: 'High' },
  { id: 2, planNumber: 'PLAN-2024-002', productName: 'Office Chair', quantity: 200, startDate: '2024-01-18', endDate: '2024-01-22', workCenter: 'Assembly Line 2', status: 'In Progress', priority: 'Medium' },
  { id: 3, planNumber: 'PLAN-2024-003', productName: 'Desk Lamp', quantity: 150, startDate: '2024-01-21', endDate: '2024-01-26', workCenter: 'Assembly Line 1', status: 'Scheduled', priority: 'Low' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredPlans = productionPlans.filter((plan) => {
    const matchesSearch = 
      plan.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.planNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || plan.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedPlans = filteredPlans.slice(
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
                <FaCalendarAlt className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Production Planning</h1>
                <p className="text-gray-600">Schedule and plan manufacturing production</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/manufacturing/create-production-plan')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Create Plan</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Plans</p>
                <p className="text-2xl font-bold text-gray-800">{productionPlans.length}</p>
              </div>
              <FaCalendarAlt className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">
                  {productionPlans.filter(p => p.status === 'Scheduled').length}
                </p>
              </div>
              <FaCalendarAlt className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {productionPlans.filter(p => p.status === 'In Progress').length}
                </p>
              </div>
              <FaIndustry className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Quantity</p>
                <p className="text-2xl font-bold text-gray-800">
                  {productionPlans.reduce((sum, p) => sum + p.quantity, 0)}
                </p>
              </div>
              <FaChartBar className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by product name or plan number..."
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
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Plan #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Quantity</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Start Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">End Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Work Center</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Priority</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{plan.planNumber}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{plan.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.startDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.endDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.workCenter}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        plan.priority === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : plan.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {plan.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        plan.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : plan.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {plan.status}
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

        {filteredPlans.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredPlans.length / rowsPerPage)}
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


