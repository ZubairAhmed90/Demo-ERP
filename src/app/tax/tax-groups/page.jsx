import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLayerGroup, FaPlus, FaSearch, FaEdit, FaTrash, FaTag } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const taxGroups = [
  { id: 1, groupCode: 'TG-001', name: 'Standard VAT Group', taxCodes: ['VAT-15', 'VAT-0'], description: 'Standard VAT rates for local sales', status: 'Active' },
  { id: 2, groupCode: 'TG-002', name: 'Export Tax Group', taxCodes: ['VAT-0'], description: 'Zero VAT for exports', status: 'Active' },
  { id: 3, groupCode: 'TG-003', name: 'Service Tax Group', taxCodes: ['VAT-15', 'WITH-5'], description: 'VAT and withholding for services', status: 'Active' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredGroups = taxGroups.filter((group) => {
    return group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           group.groupCode.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const paginatedGroups = filteredGroups.slice(
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
                <FaLayerGroup className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Tax Groups</h1>
                <p className="text-gray-600">Manage tax code groups for different scenarios</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/tax/create-tax-group')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Tax Group</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Groups</p>
                <p className="text-2xl font-bold text-gray-800">{taxGroups.length}</p>
              </div>
              <FaLayerGroup className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Groups</p>
                <p className="text-2xl font-bold text-green-600">
                  {taxGroups.filter(g => g.status === 'Active').length}
                </p>
              </div>
              <FaTag className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tax Codes</p>
                <p className="text-2xl font-bold text-gray-800">
                  {new Set(taxGroups.flatMap(g => g.taxCodes)).size}
                </p>
              </div>
              <FaTag className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by group name or code..."
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Group Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Group Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Tax Codes</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{group.groupCode}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{group.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {group.taxCodes.map((code, idx) => (
                          <span key={idx} className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {code}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{group.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        group.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {group.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
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

        {filteredGroups.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredGroups.length / rowsPerPage)}
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


