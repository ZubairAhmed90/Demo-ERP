import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaPlus, FaSearch, FaEdit, FaTrash, FaPlay, FaPause, FaEnvelope } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const scheduledReports = [
  { id: 1, reportName: 'Monthly Sales Summary', schedule: 'Monthly', frequency: '1st of month', recipients: 5, lastRun: '2024-01-01', nextRun: '2024-02-01', status: 'Active', format: 'PDF' },
  { id: 2, reportName: 'Weekly Inventory Report', schedule: 'Weekly', frequency: 'Every Monday', recipients: 3, lastRun: '2024-01-15', nextRun: '2024-01-22', status: 'Active', format: 'Excel' },
  { id: 3, reportName: 'Daily Financial Dashboard', schedule: 'Daily', frequency: 'Every day at 8 AM', recipients: 8, lastRun: '2024-01-20', nextRun: '2024-01-21', status: 'Active', format: 'PDF' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredReports = scheduledReports.filter((report) => {
    const matchesSearch = 
      report.reportName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    return matchesSearch && matchesStatus;
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
                <FaClock className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Scheduled Reports</h1>
                <p className="text-gray-600">Manage automated report generation and distribution</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/reporting/create-scheduled-report')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Schedule Report</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Scheduled</p>
                <p className="text-2xl font-bold text-gray-800">{scheduledReports.length}</p>
              </div>
              <FaClock className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Schedules</p>
                <p className="text-2xl font-bold text-green-600">
                  {scheduledReports.filter(r => r.status === 'Active').length}
                </p>
              </div>
              <FaPlay className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Recipients</p>
                <p className="text-2xl font-bold text-gray-800">
                  {scheduledReports.reduce((sum, r) => sum + r.recipients, 0)}
                </p>
              </div>
              <FaEnvelope className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reports Today</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
              <FaClock className="w-8 h-8 text-gray-500" />
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Schedule</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Frequency</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Recipients</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Last Run</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Next Run</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Format</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{report.reportName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        report.schedule === 'Daily' ? 'bg-blue-100 text-blue-800' :
                        report.schedule === 'Weekly' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {report.schedule}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.frequency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.recipients}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.lastRun}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{report.nextRun}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.format}</td>
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
                        <button className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors">
                          <FaPlay className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-yellow-50 hover:text-yellow-600 transition-colors">
                          <FaPause className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
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

