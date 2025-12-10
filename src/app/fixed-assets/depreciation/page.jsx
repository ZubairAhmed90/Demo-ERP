import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaPlus, FaSearch, FaEdit, FaTrash, FaCalculator, FaFileAlt } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const depreciationMethods = ['Straight Line', 'Declining Balance', 'Sum of Years Digits', 'Units of Production'];

const assets = [
  {
    id: 1,
    assetCode: 'FA-001',
    assetName: 'Office Building',
    category: 'Building',
    purchaseDate: '2020-01-15',
    purchaseCost: 5000000,
    currentValue: 3500000,
    depreciationMethod: 'Straight Line',
    usefulLife: 20,
    annualDepreciation: 250000,
    accumulatedDepreciation: 1000000,
    netBookValue: 4000000,
    status: 'Active'
  },
  {
    id: 2,
    assetCode: 'FA-002',
    assetName: 'Delivery Truck',
    category: 'Vehicle',
    purchaseDate: '2022-06-10',
    purchaseCost: 150000,
    currentValue: 90000,
    depreciationMethod: 'Declining Balance',
    usefulLife: 5,
    annualDepreciation: 30000,
    accumulatedDepreciation: 60000,
    netBookValue: 90000,
    status: 'Active'
  },
  {
    id: 3,
    assetCode: 'FA-003',
    assetName: 'Manufacturing Equipment',
    category: 'Machinery',
    purchaseDate: '2021-03-20',
    purchaseCost: 800000,
    currentValue: 480000,
    depreciationMethod: 'Straight Line',
    usefulLife: 10,
    annualDepreciation: 80000,
    accumulatedDepreciation: 240000,
    netBookValue: 560000,
    status: 'Active'
  },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 10;

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = 
      asset.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.assetCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const paginatedAssets = filteredAssets.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalDepreciation = assets.reduce((sum, asset) => sum + asset.accumulatedDepreciation, 0);
  const totalNetBookValue = assets.reduce((sum, asset) => sum + asset.netBookValue, 0);
  const totalAnnualDepreciation = assets.reduce((sum, asset) => sum + asset.annualDepreciation, 0);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaChartLine className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Asset Depreciation</h1>
                <p className="text-gray-600">Manage and track asset depreciation</p>
              </div>
            </div>
            <button
              onClick={() => {
                // Calculate depreciation for all assets
                alert('Depreciation calculation feature - to be implemented');
              }}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <FaCalculator className="w-4 h-4" />
              <span>Calculate Depreciation</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-800">{assets.length}</p>
              </div>
              <FaChartLine className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accumulated Depreciation</p>
                <p className="text-2xl font-bold text-red-600">{totalDepreciation.toLocaleString()} SAR</p>
              </div>
              <FaChartLine className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Book Value</p>
                <p className="text-2xl font-bold text-green-600">{totalNetBookValue.toLocaleString()} SAR</p>
              </div>
              <FaChartLine className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Annual Depreciation</p>
                <p className="text-2xl font-bold text-blue-600">{totalAnnualDepreciation.toLocaleString()} SAR</p>
              </div>
              <FaChartLine className="w-8 h-8 text-blue-500" />
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
                placeholder="Search assets..."
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
                <option value="all">All Categories</option>
                <option value="Building">Building</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Machinery">Machinery</option>
                <option value="Equipment">Equipment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assets Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Asset Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Asset Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Purchase Cost</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Depreciation Method</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Annual Depreciation</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Accumulated</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Net Book Value</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{asset.assetCode}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.assetName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {asset.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset.purchaseCost.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.depreciationMethod}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">
                      {asset.annualDepreciation.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset.accumulatedDepreciation.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      {asset.netBookValue.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {
                            // View depreciation schedule
                            alert(`Depreciation Schedule for ${asset.assetName}\nAnnual: ${asset.annualDepreciation.toLocaleString()} SAR\nAccumulated: ${asset.accumulatedDepreciation.toLocaleString()} SAR`);
                          }}
                          className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="View Schedule"
                        >
                          <FaFileAlt className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            // Calculate depreciation
                            alert('Calculate depreciation feature - to be implemented');
                          }}
                          className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
                          title="Calculate"
                        >
                          <FaCalculator className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredAssets.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredAssets.length / rowsPerPage)}
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

