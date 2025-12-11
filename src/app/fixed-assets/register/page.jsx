import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaPlus, FaSearch, FaEdit, FaTrash, FaRegEye, FaCalendar, FaDollarSign } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const assets = [
  { id: 1, assetCode: 'FA-001', name: 'Office Building', category: 'Property', purchaseDate: '2020-01-15', purchaseCost: 5000000, currentValue: 4500000, depreciation: 500000, status: 'Active', location: 'Main Office' },
  { id: 2, assetCode: 'FA-002', name: 'Delivery Truck', category: 'Vehicle', purchaseDate: '2022-06-10', purchaseCost: 150000, currentValue: 90000, depreciation: 60000, status: 'Active', location: 'Warehouse' },
  { id: 3, assetCode: 'FA-003', name: 'Computer Equipment', category: 'IT Equipment', purchaseDate: '2023-03-20', purchaseCost: 50000, currentValue: 35000, depreciation: 15000, status: 'Active', location: 'IT Department' },
  { id: 4, assetCode: 'FA-004', name: 'Manufacturing Machine', category: 'Machinery', purchaseDate: '2021-11-05', purchaseCost: 800000, currentValue: 500000, depreciation: 300000, status: 'Active', location: 'Production Floor' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const rowsPerPage = 5;

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.assetCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const paginatedAssets = filteredAssets.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalDepreciation = assets.reduce((sum, asset) => sum + asset.depreciation, 0);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaBuilding className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Fixed Assets Register</h1>
                <p className="text-gray-600">Manage company fixed assets</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/fixed-assets/create-asset')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Asset</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-800">{assets.length}</p>
              </div>
              <FaBuilding className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-800">{totalValue.toLocaleString()} SAR</p>
              </div>
              <FaDollarSign className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Depreciation</p>
                <p className="text-2xl font-bold text-red-600">{totalDepreciation.toLocaleString()} SAR</p>
              </div>
              <FaDollarSign className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Book Value</p>
                <p className="text-2xl font-bold text-green-600">{(totalValue - totalDepreciation).toLocaleString()} SAR</p>
              </div>
              <FaDollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by asset name or code..."
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
                <option value="Property">Property</option>
                <option value="Vehicle">Vehicle</option>
                <option value="IT Equipment">IT Equipment</option>
                <option value="Machinery">Machinery</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Asset Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Asset Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Purchase Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Purchase Cost</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Current Value</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Depreciation</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{asset.assetCode}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                      <div className="text-xs text-gray-500">{asset.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.purchaseDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset.purchaseCost.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {asset.currentValue.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      {asset.depreciation.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <FaRegEye className="w-4 h-4" />
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


