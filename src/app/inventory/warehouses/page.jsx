import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWarehouse, FaPlus, FaSearch, FaEdit, FaTrash, FaMapMarkerAlt, FaBox } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const warehouses = [
  { id: 1, warehouseCode: 'WH-001', name: 'Main Warehouse', location: 'Riyadh, Saudi Arabia', manager: 'Ahmed Ali', capacity: 10000, currentStock: 7500, status: 'Active' },
  { id: 2, warehouseCode: 'WH-002', name: 'Jeddah Distribution Center', location: 'Jeddah, Saudi Arabia', manager: 'Fatima Hassan', capacity: 5000, currentStock: 3200, status: 'Active' },
  { id: 3, warehouseCode: 'WH-003', name: 'Dammam Storage', location: 'Dammam, Saudi Arabia', manager: 'Mohammed Saleh', capacity: 3000, currentStock: 1800, status: 'Active' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredWarehouses = warehouses.filter((warehouse) => {
    return warehouse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           warehouse.warehouseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
           warehouse.location.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const paginatedWarehouses = filteredWarehouses.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalCapacity = warehouses.reduce((sum, w) => sum + w.capacity, 0);
  const totalStock = warehouses.reduce((sum, w) => sum + w.currentStock, 0);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaWarehouse className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Warehouses</h1>
                <p className="text-gray-600">Manage warehouse locations and storage facilities</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/inventory/create-warehouse')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Warehouse</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Warehouses</p>
                <p className="text-2xl font-bold text-gray-800">{warehouses.length}</p>
              </div>
              <FaWarehouse className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Capacity</p>
                <p className="text-2xl font-bold text-gray-800">{totalCapacity.toLocaleString()} units</p>
              </div>
              <FaBox className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Stock</p>
                <p className="text-2xl font-bold text-gray-800">{totalStock.toLocaleString()} units</p>
              </div>
              <FaBox className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Utilization</p>
                <p className="text-2xl font-bold text-green-600">
                  {((totalStock / totalCapacity) * 100).toFixed(1)}%
                </p>
              </div>
              <FaWarehouse className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by warehouse name, code, or location..."
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Warehouse Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Warehouse Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Manager</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Capacity</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Current Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Utilization</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedWarehouses.map((warehouse) => {
                  const utilization = (warehouse.currentStock / warehouse.capacity) * 100;
                  return (
                    <tr key={warehouse.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{warehouse.warehouseCode}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{warehouse.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{warehouse.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{warehouse.manager}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {warehouse.capacity.toLocaleString()} units
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {warehouse.currentStock.toLocaleString()} units
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-24">
                            <div
                              className={`h-2 rounded-full ${
                                utilization > 90 ? 'bg-red-500' :
                                utilization > 70 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(utilization, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-900">{utilization.toFixed(1)}%</span>
                        </div>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredWarehouses.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredWarehouses.length / rowsPerPage)}
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


