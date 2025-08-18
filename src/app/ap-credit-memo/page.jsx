import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaCalendar, FaWarehouse, FaBox, FaDollarSign, FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaEye, FaCopy, FaFileAlt, FaSearch, FaFilter, FaCreditCard } from 'react-icons/fa';
import { useColor } from '../../context/ColorContext.jsx';
import Layout from '../../components/Layout/Layout.jsx';

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 
                  type === 'error' ? 'bg-red-500' : 
                  type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500';
  
  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-slide-in`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80">
        <FaTimes className="w-4 h-4" />
      </button>
    </div>
  );
};

// Toast Container
const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor, secondaryColor } = useColor();
  
  // Toast state
  const [toasts, setToasts] = useState([]);
  
  // Add toast function
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };
  
  // Remove toast function
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  const [apCreditMemo, setApCreditMemo] = useState({
    memoNumber: '',
    vendor: '',
    vendorName: '',
    contactPerson: '',
    vendorRefNo: '',
    status: 'Open',
    postingDate: new Date().toISOString().split('T')[0],
    documentDate: new Date().toISOString().split('T')[0],
    referenceDocument: '',
    buyer: '',
    owner: '',
    remarks: '',
    totalAmount: 0,
    discount: 0,
    freight: 0,
    rounding: 0,
    tax: 0,
    grandTotal: 0
  });

  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      itemNo: 1,
      description: '',
      warehouse: '',
      quantity: 1,
      uomCode: 'PCS',
      unitPrice: 0,
      discountPercent: 0,
      taxCode: 'VAT',
      total: 0
    }
  ]);

  const [viewMode, setViewMode] = useState('create'); // 'create' or 'view'

  // Sample data for dropdowns
  const vendors = [
    { id: 'V001', name: 'ABC Suppliers', contact: 'John Smith', ref: 'ABC-REF-001' },
    { id: 'V002', name: 'XYZ Manufacturing', contact: 'Jane Doe', ref: 'XYZ-REF-002' },
    { id: 'V003', name: 'Tech Parts Ltd', contact: 'Mike Johnson', ref: 'TECH-REF-003' }
  ];

  const warehouses = [
    { code: 'WH001', name: 'Main Warehouse' },
    { code: 'WH002', name: 'Secondary Warehouse' },
    { code: 'WH003', name: 'Distribution Center' }
  ];

  const buyers = [
    { id: 'B001', name: 'Sarah Wilson' },
    { id: 'B002', name: 'David Brown' },
    { id: 'B003', name: 'Lisa Garcia' }
  ];

  const uomCodes = [
    { code: 'PCS', name: 'Pieces' },
    { code: 'KG', name: 'Kilograms' },
    { code: 'M', name: 'Meters' },
    { code: 'L', name: 'Liters' }
  ];

  const taxCodes = [
    { code: 'VAT', name: 'VAT 15%', rate: 15 },
    { code: 'EXEMPT', name: 'Exempt', rate: 0 },
    { code: 'ZERO', name: 'Zero Rate', rate: 0 }
  ];

  // Sample existing credit memos for view mode
  const existingCreditMemos = [
    {
      id: 'APCM-001',
      memoNumber: 'APCM-001',
      vendor: 'ABC Suppliers',
      vendorName: 'ABC Suppliers',
      contactPerson: 'John Smith',
      status: 'Open',
      postingDate: '2024-01-15',
      referenceDocument: 'PO-001',
      totalAmount: 1500.00,
      grandTotal: 1725.00,
      items: [
        { description: 'Product A', quantity: 10, unitPrice: 150.00, total: 1500.00 }
      ]
    },
    {
      id: 'APCM-002',
      memoNumber: 'APCM-002',
      vendor: 'XYZ Manufacturing',
      vendorName: 'XYZ Manufacturing',
      contactPerson: 'Jane Doe',
      status: 'Approved',
      postingDate: '2024-01-14',
      referenceDocument: 'PO-002',
      totalAmount: 800.00,
      grandTotal: 920.00,
      items: [
        { description: 'Product B', quantity: 5, unitPrice: 160.00, total: 800.00 }
      ]
    }
  ];

  // Handle input changes
  const handleInputChange = (field, value) => {
    setApCreditMemo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle order item changes
  const handleItemChange = (index, field, value) => {
    const newItems = [...orderItems];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };

    // Calculate total for the item
    if (field === 'quantity' || field === 'unitPrice' || field === 'discountPercent') {
      const quantity = field === 'quantity' ? value : newItems[index].quantity;
      const unitPrice = field === 'unitPrice' ? value : newItems[index].unitPrice;
      const discount = field === 'discountPercent' ? value : newItems[index].discountPercent;
      newItems[index].total = (parseFloat(quantity) || 0) * (parseFloat(unitPrice) || 0) * (1 - (parseFloat(discount) || 0) / 100);
    }

    setOrderItems(newItems);
    calculateTotals(newItems);
  };

  // Calculate totals
  const calculateTotals = (items = orderItems) => {
    const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
    const discount = apCreditMemo.discount || 0;
    const freight = apCreditMemo.freight || 0;
    const rounding = apCreditMemo.rounding || 0;
    const tax = apCreditMemo.tax || 0;
    
    const grandTotal = subtotal - discount + freight + rounding + tax;
    
    setApCreditMemo(prev => ({
      ...prev,
      totalAmount: subtotal,
      grandTotal: grandTotal
    }));
  };

  // Add new order item
  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      itemNo: orderItems.length + 1,
      description: '',
      warehouse: '',
      quantity: 1,
      uomCode: 'PCS',
      unitPrice: 0,
      discountPercent: 0,
      taxCode: 'VAT',
      total: 0
    };
    setOrderItems([...orderItems, newItem]);
    addToast('New item added to credit memo', 'success');
  };

  // Remove order item
  const handleRemoveItem = (index) => {
    if (orderItems.length > 1) {
      const newItems = orderItems.filter((_, i) => i !== index);
      // Renumber items
      newItems.forEach((item, i) => {
        item.itemNo = i + 1;
      });
      setOrderItems(newItems);
      calculateTotals(newItems);
      addToast('Item removed from credit memo', 'info');
    } else {
      addToast('Cannot remove the last item', 'warning');
    }
  };

  // Handle vendor selection
  const handleVendorSelect = (vendorId) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor) {
      setApCreditMemo(prev => ({
        ...prev,
        vendor: vendor.id,
        vendorName: vendor.name,
        contactPerson: vendor.contact,
        vendorRefNo: vendor.ref
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (action) => {
    if (apCreditMemo.vendor && orderItems.some(item => item.description && item.quantity > 0)) {
      // Here you would typically make an API call to save the A/P credit memo
      console.log('Saving A/P credit memo:', { apCreditMemo, orderItems });
      
      if (action === 'addAndClose') {
        addToast('A/P credit memo created successfully!', 'success');
        setTimeout(() => {
          navigate('/ap-credit-memo');
        }, 1500);
      } else if (action === 'addAndView') {
        addToast('A/P credit memo created successfully!', 'success');
        // Stay on the page to view the created credit memo
      }
    } else {
      addToast('Please fill in all required fields and add at least one item.', 'error');
    }
  };

  // Handle copy operations
  const handleCopyFrom = () => {
    addToast('Copy from functionality will be implemented here', 'info');
  };

  const handleCopyTo = () => {
    addToast('Copy to functionality will be implemented here', 'info');
  };

  // Switch to view mode
  const switchToViewMode = () => {
    setViewMode('view');
    addToast('Switched to view mode - viewing existing credit memos', 'info');
  };

  // Switch to create mode
  const switchToCreateMode = () => {
    setViewMode('create');
    addToast('Switched to create mode - creating new credit memo', 'info');
  };

  // Render view mode (existing credit memos)
  if (viewMode === 'view') {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${primaryColor}15` }}
                >
                  <FaCreditCard className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">A/P Credit Memos</h1>
                  <p className="text-gray-600">View and manage existing A/P credit memos</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={switchToCreateMode}
                  className="px-3 py-1.5 text-white rounded-md transition-colors duration-200 flex items-center space-x-2 hover:shadow-md transform hover:-translate-y-0.5 text-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <FaPlus className="w-3.5 h-3.5" />
                  <span>New Credit Memo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search credit memos by number, vendor, or status..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              
              <select className="lg:w-40 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option value="">All Status</option>
                <option value="Open">Open</option>
                <option value="Approved">Approved</option>
                <option value="Closed">Closed</option>
              </select>

              <select className="lg:w-40 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option value="">All Vendors</option>
                {vendors.map(vendor => (
                  <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Credit Memos Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Credit Memo Number
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Posting Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Reference Document
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {existingCreditMemos.map((creditMemo, index) => (
                    <tr 
                      key={creditMemo.id} 
                      className={`hover:bg-gray-50 transition-colors duration-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{creditMemo.memoNumber}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className="text-sm font-medium text-gray-900">{creditMemo.vendor}</span>
                          <p className="text-xs text-gray-500">{creditMemo.contactPerson}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                          creditMemo.status === 'Open' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          creditMemo.status === 'Approved' ? 'bg-green-100 text-green-800 border-green-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }`}>
                          {creditMemo.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{creditMemo.postingDate}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{creditMemo.referenceDocument}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">${creditMemo.grandTotal.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => addToast(`Viewing credit memo ${creditMemo.memoNumber}`, 'info')}
                            className="p-1.5 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                            title="View Credit Memo Details"
                          >
                            <FaEye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => addToast(`Editing credit memo ${creditMemo.memoNumber}`, 'info')}
                            className="p-1.5 rounded-md hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                            title="Edit Credit Memo"
                          >
                            <FaEdit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => addToast(`Credit memo ${creditMemo.memoNumber} deleted successfully`, 'success')}
                            className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                            title="Delete Credit Memo"
                          >
                            <FaTrash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Empty State */}
            {existingCreditMemos.length === 0 && (
              <div className="text-center py-12">
                <FaCreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No credit memos found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Toast Container */}
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </Layout>
    );
  }

  // Render create mode (new credit memo form)
  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div 
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${primaryColor}15` }}
              >
                <FaCreditCard className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">A/P Credit Memo</h1>
                <p className="text-gray-600">Create and manage A/P credit memos</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={switchToViewMode}
                className="px-3 py-1.5 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2 text-sm"
              >
                <FaEye className="w-3.5 h-3.5" />
                <span>View Credit Memos</span>
              </button>
              <button
                onClick={() => addToast('New credit memo functionality', 'info')}
                className="px-3 py-1.5 text-white rounded-md transition-colors duration-200 flex items-center space-x-2 hover:shadow-md transform hover:-translate-y-0.5 text-sm"
                style={{ backgroundColor: primaryColor }}
              >
                <FaPlus className="w-3.5 h-3.5" />
                <span>New Credit Memo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Credit Memo Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            {/* Vendor Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaUser className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Vendor Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vendor <span className="text-red-500">*</span>
                </label>
                <select
                  value={apCreditMemo.vendor}
                  onChange={(e) => handleVendorSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                >
                  <option value="">Select Vendor</option>
                  {vendors.map(vendor => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
                <input
                  type="text"
                  value={apCreditMemo.vendorName}
                  onChange={(e) => handleInputChange('vendorName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Vendor name will auto-fill"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={apCreditMemo.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Contact person will auto-fill"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Reference No</label>
                <input
                  type="text"
                  value={apCreditMemo.vendorRefNo}
                  onChange={(e) => handleInputChange('vendorRefNo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Reference number will auto-fill"
                  readOnly
                />
              </div>
            </div>

            {/* Credit Memo Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaFileAlt className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Credit Memo Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credit Memo Number</label>
                <input
                  type="text"
                  value={apCreditMemo.memoNumber}
                  onChange={(e) => handleInputChange('memoNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Auto-generated or enter manually"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={apCreditMemo.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                >
                  <option value="Open">Open</option>
                  <option value="Approved">Approved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Posting Date</label>
                  <input
                    type="date"
                    value={apCreditMemo.postingDate}
                    onChange={(e) => handleInputChange('postingDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Document Date</label>
                  <input
                    type="date"
                    value={apCreditMemo.documentDate}
                    onChange={(e) => handleInputChange('documentDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference Document</label>
                <input
                  type="text"
                  value={apCreditMemo.referenceDocument}
                  onChange={(e) => handleInputChange('referenceDocument', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter reference document number"
                />
              </div>
            </div>
          </div>

          {/* Credit Memo Items */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaBox className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Credit Memo Items
              </h3>
              <button
                onClick={handleAddItem}
                className="px-3 py-1.5 text-white rounded-md transition-colors duration-200 flex items-center space-x-2 hover:shadow-md transform hover:-translate-y-0.5 text-sm"
                style={{ backgroundColor: primaryColor }}
              >
                <FaPlus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item No</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UoM</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount %</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Code</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderItems.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={item.itemNo}
                          className="w-14 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                          readOnly
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Enter item description"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={item.warehouse}
                          onChange={(e) => handleItemChange(index, 'warehouse', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="">Select Warehouse</option>
                          {warehouses.map(wh => (
                            <option key={wh.code} value={wh.code}>{wh.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          min="1"
                          step="1"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={item.uomCode}
                          onChange={(e) => handleItemChange(index, 'uomCode', e.target.value)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          {uomCodes.map(uom => (
                            <option key={uom.code} value={uom.code}>{uom.code}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={item.discountPercent}
                          onChange={(e) => handleItemChange(index, 'discountPercent', e.target.value)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          min="0"
                          max="100"
                          step="0.01"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={item.taxCode}
                          onChange={(e) => handleItemChange(index, 'taxCode', e.target.value)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          {taxCodes.map(tax => (
                            <option key={tax.code} value={tax.code}>{tax.code}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={item.total.toFixed(2)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded bg-gray-50 text-center text-sm"
                          readOnly
                        />
                      </td>
                      <td className="px-3 py-2">
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                          title="Remove Item"
                          disabled={orderItems.length === 1}
                        >
                          <FaTrash className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Credit Memo Footer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaUser className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Additional Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buyer</label>
                <select
                  value={apCreditMemo.buyer}
                  onChange={(e) => handleInputChange('buyer', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                >
                  <option value="">Select Buyer</option>
                  {buyers.map(buyer => (
                    <option key={buyer.id} value={buyer.id}>{buyer.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                <input
                  type="text"
                  value={apCreditMemo.owner}
                  onChange={(e) => handleInputChange('owner', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter owner name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={apCreditMemo.remarks}
                  onChange={(e) => handleInputChange('remarks', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter any additional remarks"
                />
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaDollarSign className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Credit Memo Totals
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${apCreditMemo.totalAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <input
                    type="number"
                    value={apCreditMemo.discount}
                    onChange={(e) => handleInputChange('discount', parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-right text-sm"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Freight:</span>
                  <input
                    type="number"
                    value={apCreditMemo.freight}
                    onChange={(e) => handleInputChange('freight', parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-right text-sm"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Rounding:</span>
                  <input
                    type="number"
                    value={apCreditMemo.rounding}
                    onChange={(e) => handleInputChange('rounding', parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-right text-sm"
                    step="0.01"
                  />
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <input
                    type="number"
                    value={apCreditMemo.tax}
                    onChange={(e) => handleInputChange('tax', parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-right text-sm"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <hr className="border-gray-300" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Grand Total:</span>
                  <span>${apCreditMemo.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Actions</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleSubmit('addAndClose')}
                  className="w-full px-3 py-2 text-white rounded-md transition-colors duration-200 hover:shadow-md transform hover:-translate-y-0.5 text-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <FaSave className="w-3.5 h-3.5 inline mr-2" />
                  Add and Close
                </button>
                
                <button
                  onClick={() => handleSubmit('addAndView')}
                  className="w-full px-3 py-2 text-white rounded-md transition-colors duration-200 hover:shadow-md transform hover:-translate-y-0.5 text-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <FaEye className="w-3.5 h-3.5 inline mr-2" />
                  Add and View
                </button>
                
                <button
                  onClick={() => navigate('/ap-credit-memo')}
                  className="w-full px-3 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm"
                >
                  <FaTimes className="w-3.5 h-3.5 inline mr-2" />
                  Cancel
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCopyFrom}
                    className="px-2 py-1.5 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 text-xs"
                  >
                    <FaCopy className="w-3 h-3 inline mr-1" />
                    Copy From
                  </button>
                  
                  <button
                    onClick={handleCopyTo}
                    className="px-2 py-1.5 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 text-xs"
                  >
                    <FaCopy className="w-3 h-3 inline mr-1" />
                    Copy To
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </Layout>
  );
};

export default Page;
