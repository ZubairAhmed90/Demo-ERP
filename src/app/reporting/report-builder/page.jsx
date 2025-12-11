import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaDownload, FaCog } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const customReports = [
  { id: 1, reportName: 'Sales Performance by Region', category: 'Sales', dataSource: 'Sales Orders', createdBy: 'Ahmed Ali', createdDate: '2024-01-15', lastRun: '2024-01-20', status: 'Active' },
  { id: 2, reportName: 'Inventory Aging Analysis', category: 'Inventory', dataSource: 'Stock Levels', createdBy: 'Fatima Hassan', createdDate: '2024-01-14', lastRun: '2024-01-19', status: 'Active' },
  { id: 3, reportName: 'Vendor Payment Summary', category: 'Procurement', dataSource: 'AP Invoices', createdBy: 'Mohammed Saleh', createdDate: '2024-01-13', lastRun: '2024-01-18', status: 'Active' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const categories = ['all', ...new Set(customReports.map(r => r.category))];

  const filteredReports = customReports.filter((report) => {
    const matchesSearch = 
      report.reportName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const paginatedReports = filteredReports.slice(
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
                <FaFileAlt className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Report Builder</h1>
                <p className="text-gray-600">Create and manage custom reports</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/reporting/create-report')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Create Report</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-800">{customReports.length}</p>
              </div>
              <FaFileAlt className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Reports</p>
                <p className="text-2xl font-bold text-green-600">
                  {customReports.filter(r => r.status === 'Active').length}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-800">{categories.length - 1}</p>
              </div>
              <FaFileAlt className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reports Run Today</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
              <FaFileAlt className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by report name..."
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Report Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Data Source</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Created By</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Created Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Last Run</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{report.reportName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {report.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.dataSource}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.createdBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.createdDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.lastRun}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        report.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {report.status}
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
                        <button className="p-2 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors">
                          <FaDownload className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-colors">
                          <FaCog className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredReports.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredReports.length / rowsPerPage)}
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


