import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaPlus, FaSearch, FaEdit, FaEye, FaCheck, FaTimes, FaClipboardCheck } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const qualityChecks = [
  { id: 1, qcNumber: 'QC-2024-001', productionOrder: 'PO-2024-001', productName: 'Laptop Computer', batchNumber: 'BATCH-001', inspectedBy: 'Quality Team A', inspectionDate: '2024-01-20', quantityInspected: 100, passed: 95, failed: 5, status: 'Completed', result: 'Passed' },
  { id: 2, qcNumber: 'QC-2024-002', productionOrder: 'PO-2024-002', productName: 'Office Chair', batchNumber: 'BATCH-002', inspectedBy: 'Quality Team B', inspectionDate: '2024-01-19', quantityInspected: 200, passed: 198, failed: 2, status: 'Completed', result: 'Passed' },
  { id: 3, qcNumber: 'QC-2024-003', productionOrder: 'PO-2024-003', productName: 'Desk Lamp', batchNumber: 'BATCH-003', inspectedBy: 'Quality Team A', inspectionDate: '2024-01-21', quantityInspected: 150, passed: 0, failed: 0, status: 'Pending', result: '-' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredChecks = qualityChecks.filter((check) => {
    const matchesSearch = 
      check.qcNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      check.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || check.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedChecks = filteredChecks.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalInspected = qualityChecks.reduce((sum, c) => sum + c.quantityInspected, 0);
  const totalPassed = qualityChecks.reduce((sum, c) => sum + c.passed, 0);
  const passRate = totalInspected > 0 ? ((totalPassed / totalInspected) * 100).toFixed(1) : 0;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaCheckCircle className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Quality Control</h1>
                <p className="text-gray-600">Manage quality inspections and control processes</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/manufacturing/create-quality-check')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>New Inspection</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inspections</p>
                <p className="text-2xl font-bold text-gray-800">{qualityChecks.length}</p>
              </div>
              <FaCheckCircle className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inspected</p>
                <p className="text-2xl font-bold text-gray-800">{totalInspected}</p>
              </div>
              <FaClipboardCheck className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Passed</p>
                <p className="text-2xl font-bold text-green-600">{totalPassed}</p>
              </div>
              <FaCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                <p className="text-2xl font-bold text-blue-600">{passRate}%</p>
              </div>
              <FaCheckCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by QC number or product name..."
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
                <option value="Pending">Pending</option>
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">QC #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Production Order</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Batch #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Inspected By</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Quantity</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Passed</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Failed</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Result</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedChecks.map((check) => {
                  const passRate = check.quantityInspected > 0 ? ((check.passed / check.quantityInspected) * 100).toFixed(1) : 0;
                  return (
                    <tr key={check.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{check.qcNumber}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{check.productionOrder}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{check.productName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{check.batchNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{check.inspectedBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{check.quantityInspected}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{check.passed}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">{check.failed}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {check.result === 'Passed' ? (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            Passed ({passRate}%)
                          </span>
                        ) : check.result === 'Failed' ? (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                            Failed
                          </span>
                        ) : (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredChecks.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredChecks.length / rowsPerPage)}
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


