import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaBarcode, FaWarehouse } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const items = [
  { id: 1, itemCode: 'ITEM-001', name: 'Laptop Computer', category: 'Electronics', unit: 'PCS', stock: 150, reorderLevel: 50, unitPrice: 2500, status: 'Active' },
  { id: 2, itemCode: 'ITEM-002', name: 'Office Chair', category: 'Furniture', unit: 'PCS', stock: 75, reorderLevel: 30, unitPrice: 450, status: 'Active' },
  { id: 3, itemCode: 'ITEM-003', name: 'Printer Paper A4', category: 'Office Supplies', unit: 'BOX', stock: 200, reorderLevel: 100, unitPrice: 25, status: 'Active' },
  { id: 4, itemCode: 'ITEM-004', name: 'Desk Lamp', category: 'Furniture', unit: 'PCS', stock: 45, reorderLevel: 20, unitPrice: 120, status: 'Active' },
  { id: 5, itemCode: 'ITEM-005', name: 'USB Cable', category: 'Electronics', unit: 'PCS', stock: 300, reorderLevel: 100, unitPrice: 15, status: 'Active' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const categories = ['all', ...new Set(items.map(item => item.category))];

  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const paginatedItems = filteredItems.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalValue = items.reduce((sum, item) => sum + (item.stock * item.unitPrice), 0);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaBox className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Items/Products</h1>
                <p className="text-gray-600">Manage inventory items and products</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/inventory/create-item')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-800">{items.length}</p>
              </div>
              <FaBox className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stock Value</p>
                <p className="text-2xl font-bold text-gray-800">{totalValue.toLocaleString()} SAR</p>
              </div>
              <FaBarcode className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-red-600">
                  {items.filter(item => item.stock <= item.reorderLevel).length}
                </p>
              </div>
              <FaWarehouse className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Items</p>
                <p className="text-2xl font-bold text-green-600">
                  {items.filter(item => item.status === 'Active').length}
                </p>
              </div>
              <FaBox className="w-8 h-8 text-green-500" />
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Unit</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Reorder Level</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Unit Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{item.itemCode}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${
                        item.stock <= item.reorderLevel ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.reorderLevel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.unitPrice.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        item.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredItems.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredItems.length / rowsPerPage)}
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


