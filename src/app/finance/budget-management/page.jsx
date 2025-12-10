import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDollarSign, FaPlus, FaSearch, FaEdit, FaTrash, FaCalendar, FaChartBar } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const budgets = [
  { id: 1, budgetCode: 'BUD-2024-001', name: '2024 Annual Budget', period: '2024', totalBudget: 5000000, actualSpent: 3200000, remaining: 1800000, status: 'Active' },
  { id: 2, budgetCode: 'BUD-2024-002', name: 'Q1 2024 Budget', period: 'Q1 2024', totalBudget: 1250000, actualSpent: 950000, remaining: 300000, status: 'Active' },
  { id: 3, budgetCode: 'BUD-2024-003', name: 'Marketing Budget 2024', period: '2024', totalBudget: 500000, actualSpent: 250000, remaining: 250000, status: 'Active' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredBudgets = budgets.filter((budget) => {
    return budget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           budget.budgetCode.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const paginatedBudgets = filteredBudgets.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getUtilizationPercent = (actual, budget) => {
    return ((actual / budget) * 100).toFixed(1);
  };

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
                <h1 className="text-2xl font-bold text-gray-800">Budget Management</h1>
                <p className="text-gray-600">Create and manage budgets</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/finance/create-budget')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Create Budget</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-800">
                  {budgets.reduce((sum, b) => sum + b.totalBudget, 0).toLocaleString()} SAR
                </p>
              </div>
              <FaDollarSign className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-red-600">
                  {budgets.reduce((sum, b) => sum + b.actualSpent, 0).toLocaleString()} SAR
                </p>
              </div>
              <FaChartBar className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Remaining</p>
                <p className="text-2xl font-bold text-green-600">
                  {budgets.reduce((sum, b) => sum + b.remaining, 0).toLocaleString()} SAR
                </p>
              </div>
              <FaDollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Budgets</p>
                <p className="text-2xl font-bold text-gray-800">
                  {budgets.filter(b => b.status === 'Active').length}
                </p>
              </div>
              <FaCalendar className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by budget name or code..."
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Budget Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Budget Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Period</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Budget</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actual Spent</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Remaining</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Utilization</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedBudgets.map((budget) => {
                  const utilization = getUtilizationPercent(budget.actualSpent, budget.totalBudget);
                  return (
                    <tr key={budget.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{budget.budgetCode}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{budget.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{budget.period}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {budget.totalBudget.toLocaleString()} SAR
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        {budget.actualSpent.toLocaleString()} SAR
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        {budget.remaining.toLocaleString()} SAR
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-24">
                            <div
                              className={`h-2 rounded-full ${
                                parseFloat(utilization) > 90 ? 'bg-red-500' :
                                parseFloat(utilization) > 70 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(utilization, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-900">{utilization}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredBudgets.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredBudgets.length / rowsPerPage)}
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

