import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRoute, FaPlus, FaSearch, FaEdit, FaEye, FaTruck, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const logistics = [
  { id: 1, shipmentNumber: 'SH-2024-001', origin: 'Main Warehouse', destination: 'Customer Site A', carrier: 'FedEx', status: 'In Transit', pickupDate: '2024-01-15', estimatedDelivery: '2024-01-18', trackingNumber: 'FX123456789', totalWeight: 500, totalValue: 25000 },
  { id: 2, shipmentNumber: 'SH-2024-002', origin: 'Jeddah Distribution', destination: 'Customer Site B', carrier: 'DHL', status: 'Delivered', pickupDate: '2024-01-14', estimatedDelivery: '2024-01-17', trackingNumber: 'DHL987654321', totalWeight: 750, totalValue: 35000 },
  { id: 3, shipmentNumber: 'SH-2024-003', origin: 'Dammam Storage', destination: 'Customer Site C', carrier: 'UPS', status: 'Scheduled', pickupDate: '2024-01-16', estimatedDelivery: '2024-01-19', trackingNumber: '-', totalWeight: 300, totalValue: 15000 },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredLogistics = logistics.filter((shipment) => {
    const matchesSearch = 
      shipment.shipmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || shipment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedLogistics = filteredLogistics.slice(
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
                <FaRoute className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Logistics Management</h1>
                <p className="text-gray-600">Track shipments and manage logistics operations</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/supply-chain/create-shipment')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>New Shipment</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Shipments</p>
                <p className="text-2xl font-bold text-gray-800">{logistics.length}</p>
              </div>
              <FaTruck className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {logistics.filter(l => l.status === 'In Transit').length}
                </p>
              </div>
              <FaTruck className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-green-600">
                  {logistics.filter(l => l.status === 'Delivered').length}
                </p>
              </div>
              <FaTruck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-800">
                  {logistics.reduce((sum, l) => sum + l.totalValue, 0).toLocaleString()} SAR
                </p>
              </div>
              <FaTruck className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by shipment number or tracking number..."
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
                <option value="Scheduled">Scheduled</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Shipment #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Origin</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Destination</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Carrier</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Tracking #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Pickup Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Est. Delivery</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedLogistics.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{shipment.shipmentNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{shipment.origin}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-gray-900">{shipment.destination}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shipment.carrier}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shipment.trackingNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shipment.pickupDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shipment.estimatedDelivery}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        shipment.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : shipment.status === 'In Transit'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {shipment.status}
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredLogistics.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredLogistics.length / rowsPerPage)}
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


