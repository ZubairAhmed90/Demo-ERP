"use client";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaUser, FaPlus, FaEye, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
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

  const existingQuotations = [
    {
      id: 'SQ-001',
      quotationNumber: 'SQ-001',
      customer: 'ABC Corporation',
      status: 'Draft',
      validFrom: '2024-01-15',
      validTo: '2024-02-15',
      totalAmount: 2500.00
    },
    {
      id: 'SQ-002',
      quotationNumber: 'SQ-002',
      customer: 'XYZ Industries',
      status: 'Sent',
      validFrom: '2024-01-14',
      validTo: '2024-02-14',
      totalAmount: 1800.00
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
                  <FaFileAlt className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Sales Quotations</h1>
                  <p className="text-gray-600">View and manage existing sales quotations</p>
                </div>
              </div>
              <button
                onClick={switchToCreateMode}
                className="px-3 py-1.5 text-white rounded-md transition-colors duration-200 flex items-center space-x-2 hover:shadow-md text-sm"
                style={{ backgroundColor: primaryColor }}
              >
                <FaPlus className="w-3.5 h-3.5" />
                <span>New Quotation</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Quotation Number</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Valid From</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Valid To</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {existingQuotations.map((quotation, index) => (
                    <tr key={quotation.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4"><span className="text-sm font-medium text-gray-900">{quotation.quotationNumber}</span></td>
                      <td className="px-6 py-4"><span className="text-sm text-gray-900">{quotation.customer}</span></td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                          quotation.status === 'Draft' ? 'bg-gray-100 text-gray-800 border-gray-200' :
                          quotation.status === 'Sent' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          'bg-green-100 text-green-800 border-green-200'
                        }`}>
                          {quotation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4"><span className="text-sm text-gray-900">{quotation.validFrom}</span></td>
                      <td className="px-6 py-4"><span className="text-sm text-gray-900">{quotation.validTo}</span></td>
                      <td className="px-6 py-4"><span className="text-sm font-medium text-gray-900">${quotation.totalAmount.toFixed(2)}</span></td>
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
                <FaFileAlt className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Sales Quotation</h1>
                <p className="text-gray-600">Create and manage sales quotations</p>
              </div>
            </div>
            <button
              onClick={switchToViewMode}
              className="px-3 py-1.5 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2 text-sm"
            >
              <FaEye className="w-3.5 h-3.5" />
              <span>View Quotations</span>
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
                <FaFileAlt className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Quotation Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quotation Number</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" placeholder="Auto-generated" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid To</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Quotation Items</h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-500 text-center">Quotation items will be added here</p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200">
              <FaTimes className="w-4 h-4 inline mr-2" />
              Cancel
            </button>
            <button className="px-4 py-2 text-white rounded-md transition-colors duration-200 hover:shadow-md" style={{ backgroundColor: primaryColor }}>
              <FaSave className="w-4 h-4 inline mr-2" />
              Save Quotation
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
