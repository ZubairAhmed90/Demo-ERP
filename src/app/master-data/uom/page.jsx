import React, { useState } from 'react';
import { FaRuler, FaPlus, FaSearch, FaEdit, FaTrash, FaExchangeAlt, FaCalculator } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const uoms = [
  {
    id: 1,
    name: 'Piece',
    code: 'PCS',
    baseUOM: true,
    category: 'Count',
    conversionFactor: 1,
    status: 'Active',
    description: 'Standard unit for counting items'
  },
  {
    id: 2,
    name: 'Box',
    code: 'BOX',
    baseUOM: false,
    category: 'Count',
    conversionFactor: 12,
    baseUOMCode: 'PCS',
    status: 'Active',
    description: '1 Box = 12 Pieces'
  },
  {
    id: 3,
    name: 'Kilogram',
    code: 'KG',
    baseUOM: true,
    category: 'Weight',
    conversionFactor: 1,
    status: 'Active',
    description: 'Standard unit for weight'
  },
  {
    id: 4,
    name: 'Gram',
    code: 'G',
    baseUOM: false,
    category: 'Weight',
    conversionFactor: 0.001,
    baseUOMCode: 'KG',
    status: 'Active',
    description: '1 Gram = 0.001 Kilogram'
  },
  {
    id: 5,
    name: 'Meter',
    code: 'M',
    baseUOM: true,
    category: 'Length',
    conversionFactor: 1,
    status: 'Active',
    description: 'Standard unit for length'
  },
  {
    id: 6,
    name: 'Centimeter',
    code: 'CM',
    baseUOM: false,
    category: 'Length',
    conversionFactor: 0.01,
    baseUOMCode: 'M',
    status: 'Active',
    description: '1 Centimeter = 0.01 Meter'
  },
  {
    id: 7,
    name: 'Liter',
    code: 'L',
    baseUOM: true,
    category: 'Volume',
    conversionFactor: 1,
    status: 'Active',
    description: 'Standard unit for volume'
  },
  {
    id: 8,
    name: 'Milliliter',
    code: 'ML',
    baseUOM: false,
    category: 'Volume',
    conversionFactor: 0.001,
    baseUOMCode: 'L',
    status: 'Active',
    description: '1 Milliliter = 0.001 Liter'
  },
];

const categories = ['All Categories', 'Count', 'Weight', 'Length', 'Volume', 'Area', 'Time'];

const Page = () => {
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [page, setPage] = useState(1);
  const [uomsList, setUomsList] = useState(uoms);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const rowsPerPage = 10;

  const filteredUOMs = uomsList.filter((uom) => {
    const matchesSearch = 
      uom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uom.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || uom.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const paginatedUOMs = filteredUOMs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const deleteUOM = (id) => {
    if (confirm('Are you sure you want to delete this UOM?')) {
      setUomsList(prev => prev.filter(uom => uom.id !== id));
    }
  };

  const baseUOMs = uomsList.filter(u => u.baseUOM);
  const convertedUOMs = uomsList.filter(u => !u.baseUOM);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaRuler className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Units of Measure (UOM)</h1>
                <p className="text-gray-600">Manage units of measure and conversions</p>
              </div>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add UOM</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total UOMs</p>
                <p className="text-2xl font-bold text-gray-800">{uomsList.length}</p>
              </div>
              <FaRuler className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Base UOMs</p>
                <p className="text-2xl font-bold text-blue-600">{baseUOMs.length}</p>
              </div>
              <FaRuler className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Converted UOMs</p>
                <p className="text-2xl font-bold text-green-600">{convertedUOMs.length}</p>
              </div>
              <FaExchangeAlt className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-purple-600">{categories.length - 1}</p>
              </div>
              <FaCalculator className="w-8 h-8 text-purple-500" />
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
                placeholder="Search UOMs..."
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
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* UOMs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">UOM Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Base UOM</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Conversion</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedUOMs.map((uom) => (
                  <tr key={uom.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{uom.name}</p>
                        <p className="text-xs text-gray-500">{uom.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{uom.code}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        {uom.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {uom.baseUOM ? (
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Base
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {uom.baseUOM ? (
                        <span className="text-sm text-gray-500">1 (Base)</span>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <FaExchangeAlt className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            1 {uom.code} = {uom.conversionFactor} {uom.baseUOMCode}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        uom.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {uom.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            // Edit UOM
                            alert(`Edit UOM: ${uom.name}`);
                          }}
                          className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        {!uom.baseUOM && (
                          <button
                            onClick={() => deleteUOM(uom.id)}
                            className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                            title="Delete"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUOMs.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredUOMs.length / rowsPerPage)}
              page={page}
              onPageChange={(e, value) => setPage(value)}
            />
          </div>
        )}

        {/* Create UOM Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Add New UOM</h2>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">UOM Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Kilogram"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., KG"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {categories.filter(c => c !== 'All Categories').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                    <span className="text-sm font-medium text-gray-700">Base UOM</span>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Base UOM</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select base UOM...</option>
                      {baseUOMs.map(uom => (
                        <option key={uom.id} value={uom.code}>{uom.name} ({uom.code})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Factor</label>
                    <input
                      type="number"
                      step="0.001"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 0.001"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Create UOM logic here
                    setIsCreateModalOpen(false);
                  }}
                  className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  Add UOM
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Page;


