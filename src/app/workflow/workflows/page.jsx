import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaProjectDiagram, FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaCheck, FaTimes, FaUsers } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const workflows = [
  { id: 1, workflowCode: 'WF-001', name: 'Purchase Order Approval', documentType: 'Purchase Order', steps: 3, approvers: 2, status: 'Active', createdDate: '2024-01-10' },
  { id: 2, workflowCode: 'WF-002', name: 'Invoice Approval', documentType: 'Invoice', steps: 2, approvers: 1, status: 'Active', createdDate: '2024-01-08' },
  { id: 3, workflowCode: 'WF-003', name: 'Leave Request Approval', documentType: 'Leave Request', steps: 2, approvers: 1, status: 'Active', createdDate: '2024-01-05' },
  { id: 4, workflowCode: 'WF-004', name: 'Expense Approval', documentType: 'Expense', steps: 3, approvers: 2, status: 'Inactive', createdDate: '2023-12-20' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch = 
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.workflowCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.documentType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || workflow.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedWorkflows = filteredWorkflows.slice(
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
                <FaProjectDiagram className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Workflows</h1>
                <p className="text-gray-600">Configure approval workflows for documents</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/workflow/create-workflow')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Create Workflow</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Workflows</p>
                <p className="text-2xl font-bold text-gray-800">{workflows.length}</p>
              </div>
              <FaProjectDiagram className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {workflows.filter(w => w.status === 'Active').length}
                </p>
              </div>
              <FaCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-600">
                  {workflows.filter(w => w.status === 'Inactive').length}
                </p>
              </div>
              <FaTimes className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Steps</p>
                <p className="text-2xl font-bold text-gray-800">
                  {workflows.reduce((sum, w) => sum + w.steps, 0)}
                </p>
              </div>
              <FaUsers className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by workflow name, code, or document type..."
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
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Workflow Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Workflow Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Document Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Steps</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Approvers</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Created Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedWorkflows.map((workflow) => (
                  <tr key={workflow.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{workflow.workflowCode}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{workflow.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workflow.documentType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workflow.steps}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workflow.approvers}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        workflow.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {workflow.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workflow.createdDate}</td>
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

        {filteredWorkflows.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredWorkflows.length / rowsPerPage)}
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


