import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartBar, FaSearch, FaDownload, FaFilter, FaExclamationTriangle } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const stockLevels = [
  { id: 1, itemCode: 'ITEM-001', itemName: 'Laptop Computer', warehouse: 'Main Warehouse', currentStock: 150, reorderLevel: 50, minStock: 30, maxStock: 500, status: 'In Stock' },
  { id: 2, itemCode: 'ITEM-002', itemName: 'Office Chair', warehouse: 'Main Warehouse', currentStock: 25, reorderLevel: 30, minStock: 20, maxStock: 200, status: 'Low Stock' },
  { id: 3, itemCode: 'ITEM-003', itemName: 'Printer Paper A4', warehouse: 'Jeddah Distribution', currentStock: 200, reorderLevel: 100, minStock: 50, maxStock: 1000, status: 'In Stock' },
  { id: 4, itemCode: 'ITEM-004', itemName: 'Desk Lamp', warehouse: 'Main Warehouse', currentStock: 15, reorderLevel: 20, minStock: 10, maxStock: 100, status: 'Low Stock' },
  { id: 5, itemCode: 'ITEM-005', itemName: 'USB Cable', warehouse: 'Dammam Storage', currentStock: 300, reorderLevel: 100, minStock: 50, maxStock: 500, status: 'In Stock' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const warehouses = ['all', ...new Set(stockLevels.map(item => item.warehouse))];

  const filteredStock = stockLevels.filter((item) => {
    const matchesSearch = 
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWarehouse = selectedWarehouse === 'all' || item.warehouse === selectedWarehouse;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesWarehouse && matchesStatus;
  });

  const paginatedStock = filteredStock.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const lowStockCount = stockLevels.filter(item => item.status === 'Low Stock').length;
  const outOfStockCount = stockLevels.filter(item => item.currentStock === 0).length;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaChartBar className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Stock Levels</h1>
                <p className="text-gray-600">Monitor inventory stock levels across warehouses</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <FaDownload className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-800">{stockLevels.length}</p>
              </div>
              <FaChartBar className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-green-600">
                  {stockLevels.filter(item => item.status === 'In Stock').length}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
              </div>
              <FaExclamationTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
              </div>
              <FaExclamationTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by item name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {warehouses.map(wh => (
                  <option key={wh} value={wh}>
                    {wh === 'all' ? 'All Warehouses' : wh}
                  </option>
                ))}
              </select>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Item Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Item Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Warehouse</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Current Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Reorder Level</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Min Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Max Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedStock.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{item.itemCode}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.itemName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.warehouse}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${
                        item.currentStock <= item.reorderLevel ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {item.currentStock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.reorderLevel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.minStock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.maxStock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        item.status === 'In Stock' 
                          ? 'bg-green-100 text-green-800' 
                          : item.status === 'Low Stock'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredStock.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredStock.length / rowsPerPage)}
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


