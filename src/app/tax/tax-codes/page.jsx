import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPercent, FaPlus, FaSearch, FaEdit, FaTrash, FaTag } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const taxCodes = [
  { id: 1, taxCode: 'VAT-15', name: 'VAT 15%', rate: 15, type: 'VAT', description: 'Standard VAT rate', status: 'Active', effectiveDate: '2024-01-01' },
  { id: 2, taxCode: 'VAT-0', name: 'VAT 0%', rate: 0, type: 'VAT', description: 'Zero-rated VAT', status: 'Active', effectiveDate: '2024-01-01' },
  { id: 3, taxCode: 'VAT-EX', name: 'VAT Exempt', rate: 0, type: 'VAT', description: 'VAT exempt items', status: 'Active', effectiveDate: '2024-01-01' },
  { id: 4, taxCode: 'WITH-5', name: 'Withholding Tax 5%', rate: 5, type: 'Withholding', description: 'Withholding tax on services', status: 'Active', effectiveDate: '2024-01-01' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredCodes = taxCodes.filter((code) => {
    const matchesSearch = 
      code.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.taxCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || code.type === selectedType;
    return matchesSearch && matchesType;
  });

  const paginatedCodes = filteredCodes.slice(
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
                <FaPercent className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Tax Codes</h1>
                <p className="text-gray-600">Manage tax codes and rates</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/tax/create-tax-code')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Tax Code</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tax Codes</p>
                <p className="text-2xl font-bold text-gray-800">{taxCodes.length}</p>
              </div>
              <FaPercent className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">VAT Codes</p>
                <p className="text-2xl font-bold text-blue-600">
                  {taxCodes.filter(c => c.type === 'VAT').length}
                </p>
              </div>
              <FaTag className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Withholding Tax</p>
                <p className="text-2xl font-bold text-purple-600">
                  {taxCodes.filter(c => c.type === 'Withholding').length}
                </p>
              </div>
              <FaPercent className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Codes</p>
                <p className="text-2xl font-bold text-green-600">
                  {taxCodes.filter(c => c.status === 'Active').length}
                </p>
              </div>
              <FaTag className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by tax code or name..."
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
                <option value="VAT">VAT</option>
                <option value="Withholding">Withholding Tax</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Tax Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Rate (%)</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Effective Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedCodes.map((code) => (
                  <tr key={code.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{code.taxCode}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{code.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {code.rate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        code.type === 'VAT' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {code.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{code.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{code.effectiveDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        code.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {code.status}
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

        {filteredCodes.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredCodes.length / rowsPerPage)}
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


