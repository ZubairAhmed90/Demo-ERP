import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCogs, FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaBox, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const boms = [
  { 
    id: 1, 
    bomCode: 'BOM-001', 
    productName: 'Laptop Computer', 
    productCode: 'ITEM-001',
    version: '1.0',
    components: [
      { itemCode: 'COMP-001', itemName: 'Processor', quantity: 1, unit: 'PCS' },
      { itemCode: 'COMP-002', itemName: 'Memory 8GB', quantity: 2, unit: 'PCS' },
      { itemCode: 'COMP-003', itemName: 'Hard Drive 500GB', quantity: 1, unit: 'PCS' },
    ],
    totalComponents: 3,
    status: 'Active'
  },
  { 
    id: 2, 
    bomCode: 'BOM-002', 
    productName: 'Office Chair', 
    productCode: 'ITEM-002',
    version: '1.0',
    components: [
      { itemCode: 'COMP-004', itemName: 'Seat Base', quantity: 1, unit: 'PCS' },
      { itemCode: 'COMP-005', itemName: 'Backrest', quantity: 1, unit: 'PCS' },
      { itemCode: 'COMP-006', itemName: 'Wheels Set', quantity: 5, unit: 'PCS' },
    ],
    totalComponents: 3,
    status: 'Active'
  },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBOMs, setExpandedBOMs] = useState(new Set());
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const toggleExpand = (bomId) => {
    const newExpanded = new Set(expandedBOMs);
    if (newExpanded.has(bomId)) {
      newExpanded.delete(bomId);
    } else {
      newExpanded.add(bomId);
    }
    setExpandedBOMs(newExpanded);
  };

  const filteredBOMs = boms.filter((bom) => {
    return bom.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           bom.bomCode.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const paginatedBOMs = filteredBOMs.slice(
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
                <FaCogs className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Bill of Materials (BOM)</h1>
                <p className="text-gray-600">Manage product structures and component lists</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/manufacturing/create-bom')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Create BOM</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total BOMs</p>
                <p className="text-2xl font-bold text-gray-800">{boms.length}</p>
              </div>
              <FaCogs className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active BOMs</p>
                <p className="text-2xl font-bold text-green-600">
                  {boms.filter(b => b.status === 'Active').length}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Components</p>
                <p className="text-2xl font-bold text-gray-800">
                  {boms.reduce((sum, b) => sum + b.totalComponents, 0)}
                </p>
              </div>
              <FaBox className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Products</p>
                <p className="text-2xl font-bold text-gray-800">{boms.length}</p>
              </div>
              <FaBox className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by product name or BOM code..."
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">BOM Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Product Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Product Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Version</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Components</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedBOMs.map((bom) => {
                  const isExpanded = expandedBOMs.has(bom.id);
                  return (
                    <React.Fragment key={bom.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{bom.bomCode}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{bom.productName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bom.productCode}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bom.version}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleExpand(bom.id)}
                            className="flex items-center space-x-2 text-sm text-gray-900 hover:text-blue-600"
                          >
                            {isExpanded ? (
                              <FaChevronDown className="w-4 h-4" />
                            ) : (
                              <FaChevronRight className="w-4 h-4" />
                            )}
                            <span>{bom.totalComponents} components</span>
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            bom.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {bom.status}
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
                            <button className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan="7" className="px-6 py-4 bg-gray-50">
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-gray-800 mb-2">Components:</h4>
                              {bom.components.map((comp, idx) => (
                                <div key={idx} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-gray-200">
                                  <div className="flex items-center space-x-3">
                                    <FaBox className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-900">{comp.itemCode}</span>
                                    <span className="text-sm text-gray-600">- {comp.itemName}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">Qty: {comp.quantity}</span>
                                    <span className="text-sm text-gray-500">({comp.unit})</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredBOMs.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredBOMs.length / rowsPerPage)}
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


