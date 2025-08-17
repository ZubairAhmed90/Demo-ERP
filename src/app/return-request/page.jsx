import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaUser, FaPlus, FaEye, FaEdit, FaTrash, FaSave, FaTimes, FaBox, FaExclamationTriangle, FaClock } from 'react-icons/fa';
import { useColor } from '../../context/ColorContext.jsx';
import Layout from '../../components/Layout/Layout.jsx';

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [viewMode, setViewMode] = useState('create');

  const customers = [
    { id: 'C001', name: 'ABC Corporation', contact: 'John Smith' },
    { id: 'C002', name: 'XYZ Industries', contact: 'Jane Doe' },
    { id: 'C003', name: 'Tech Solutions Ltd', contact: 'Mike Johnson' }
  ];

  const existingReturnRequests = [
    {
      id: 'RR-001',
      requestNumber: 'RR-001',
      customer: 'ABC Corporation',
      originalOrder: 'SO-001',
      status: 'Pending Approval',
      requestDate: '2024-01-15',
      priority: 'High',
      totalItems: 2,
      totalAmount: 500.00,
      reason: 'Defective Product'
    },
    {
      id: 'RR-002',
      requestNumber: 'RR-002',
      customer: 'XYZ Industries',
      originalOrder: 'SO-002',
      status: 'Under Review',
      requestDate: '2024-01-14',
      priority: 'Medium',
      totalItems: 1,
      totalAmount: 200.00,
      reason: 'Wrong Size'
    }
  ];

  const switchToViewMode = () => setViewMode('view');
  const switchToCreateMode = () => setViewMode('create');

  if (viewMode === 'view') {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                  <FaClipboardList className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Return Requests</h1>
                  <p className="text-gray-600">View and manage return requests</p>
                </div>
              </div>
              <button
                onClick={switchToCreateMode}
                className="px-3 py-1.5 text-white rounded-md transition-colors duration-200 flex items-center space-x-2 hover:shadow-md text-sm"
                style={{ backgroundColor: primaryColor }}
              >
                <FaPlus className="w-3.5 h-3.5" />
                <span>New Request</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Request Number</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Original Order</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Priority</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Request Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Items</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {existingReturnRequests.map((request, index) => (
                    <tr key={request.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4"><span className="text-sm font-medium text-gray-900">{request.requestNumber}</span></td>
                      <td className="px-6 py-4"><span className="text-sm text-gray-900">{request.customer}</span></td>
                      <td className="px-6 py-4"><span className="text-sm text-gray-900">{request.originalOrder}</span></td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                          request.status === 'Pending Approval' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          request.status === 'Under Review' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          request.status === 'Approved' ? 'bg-green-100 text-green-800 border-green-200' :
                          request.status === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                          request.priority === 'High' ? 'bg-red-100 text-red-800 border-red-200' :
                          request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          'bg-green-100 text-green-800 border-green-200'
                        }`}>
                          {request.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4"><span className="text-sm text-gray-900">{request.requestDate}</span></td>
                      <td className="px-6 py-4"><span className="text-sm text-gray-900">{request.totalItems}</span></td>
                      <td className="px-6 py-4"><span className="text-sm font-medium text-gray-900">${request.totalAmount.toFixed(2)}</span></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1.5 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200" title="View">
                            <FaEye className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-md hover:bg-green-50 hover:text-green-600 transition-colors duration-200" title="Edit">
                            <FaEdit className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors duration-200" title="Delete">
                            <FaTrash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaClipboardList className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Return Request</h1>
                <p className="text-gray-600">Create and manage return requests</p>
              </div>
            </div>
            <button
              onClick={switchToViewMode}
              className="px-3 py-1.5 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2 text-sm"
            >
              <FaEye className="w-3.5 h-3.5" />
              <span>View Requests</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaUser className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Customer Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option value="">Select Customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" placeholder="Contact person" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaClipboardList className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Request Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Number</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" placeholder="Auto-generated" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Order <span className="text-red-500">*</span></label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" placeholder="Enter original order number" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaExclamationTriangle className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
              Return Reason
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Return <span className="text-red-500">*</span></label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                <option value="">Select Reason</option>
                <option value="Defective Product">Defective Product</option>
                <option value="Wrong Size">Wrong Size</option>
                <option value="Wrong Color">Wrong Color</option>
                <option value="Not as Described">Not as Described</option>
                <option value="Changed Mind">Changed Mind</option>
                <option value="Damaged in Transit">Damaged in Transit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
              <textarea 
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Provide detailed description of the return reason..."
              ></textarea>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaClock className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
              Timeline Information
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Resolution Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaBox className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
              Return Items
            </h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-500 text-center">Return items will be added here</p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200">
              <FaTimes className="w-4 h-4 inline mr-2" />
              Cancel
            </button>
            <button className="px-4 py-2 text-white rounded-md transition-colors duration-200 hover:shadow-md" style={{ backgroundColor: primaryColor }}>
              <FaSave className="w-4 h-4 inline mr-2" />
              Save Request
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
