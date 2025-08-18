import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaCalendar, FaWarehouse, FaBox, FaDollarSign, FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaEye, FaCopy, FaFileAlt, FaSearch, FaFilter } from 'react-icons/fa';
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
  
  const [purchaseOrder, setPurchaseOrder] = useState({
    orderNumber: '',
    vendor: '',
    vendorName: '',
    contactPerson: '',
    vendorRefNo: '',
    status: 'Open',
    postingDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    documentDate: new Date().toISOString().split('T')[0],
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
      taxCode: 'VAT',
      total: 0
    }
  ]);

  const [activeTab, setActiveTab] = useState('content');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
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

  // Sample existing orders for view mode
  const existingOrders = [
    {
      id: 'PO-001',
      orderNumber: 'PO-001',
      vendor: 'ABC Suppliers',
      vendorName: 'ABC Suppliers',
      contactPerson: 'John Smith',
      status: 'Open',
      postingDate: '2024-01-15',
      dueDate: '2024-02-15',
      totalAmount: 2500.00,
      grandTotal: 2875.00,
      items: [
        { description: 'Product A', quantity: 10, unitPrice: 150.00, total: 1500.00 },
        { description: 'Product B', quantity: 5, unitPrice: 200.00, total: 1000.00 }
      ]
    },
    {
      id: 'PO-002',
      orderNumber: 'PO-002',
      vendor: 'XYZ Manufacturing',
      vendorName: 'XYZ Manufacturing',
      contactPerson: 'Jane Doe',
      status: 'Confirmed',
      postingDate: '2024-01-14',
      dueDate: '2024-02-14',
      totalAmount: 1800.00,
      grandTotal: 2070.00,
      items: [
        { description: 'Product C', quantity: 8, unitPrice: 225.00, total: 1800.00 }
      ]
    },
    {
      id: 'PO-003',
      orderNumber: 'PO-003',
      vendor: 'Tech Parts Ltd',
      vendorName: 'Tech Parts Ltd',
      contactPerson: 'Mike Johnson',
      status: 'Received',
      postingDate: '2024-01-13',
      dueDate: '2024-02-13',
      totalAmount: 3200.00,
      grandTotal: 3680.00,
      items: [
        { description: 'Product D', quantity: 4, unitPrice: 800.00, total: 3200.00 }
      ]
    }
  ];

  // Handle input changes
  const handleInputChange = (field, value) => {
    setPurchaseOrder(prev => ({
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
    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = field === 'quantity' ? value : newItems[index].quantity;
      const unitPrice = field === 'unitPrice' ? value : newItems[index].unitPrice;
      newItems[index].total = (parseFloat(quantity) || 0) * (parseFloat(unitPrice) || 0);
    }

    setOrderItems(newItems);
    calculateTotals(newItems);
  };

  // Calculate totals
  const calculateTotals = (items = orderItems) => {
    const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
    const discount = purchaseOrder.discount || 0;
    const freight = purchaseOrder.freight || 0;
    const rounding = purchaseOrder.rounding || 0;
    const tax = purchaseOrder.tax || 0;
    
    const grandTotal = subtotal - discount + freight + rounding + tax;
    
    setPurchaseOrder(prev => ({
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
      taxCode: 'VAT',
      total: 0
    };
    setOrderItems([...orderItems, newItem]);
    addToast('New item added to order', 'success');
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
      addToast('Item removed from order', 'info');
    } else {
      addToast('Cannot remove the last item', 'warning');
    }
  };

  // Handle vendor selection
  const handleVendorSelect = (vendorId) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor) {
      setPurchaseOrder(prev => ({
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
    if (purchaseOrder.vendor && orderItems.some(item => item.description && item.quantity > 0)) {
      // Here you would typically make an API call to save the purchase order
      console.log('Saving purchase order:', { purchaseOrder, orderItems });
      
      if (action === 'addAndClose') {
        addToast('Purchase order created successfully!', 'success');
        setTimeout(() => {
          navigate('/purchase-order');
        }, 1500);
      } else if (action === 'addAndView') {
        addToast('Purchase order created successfully!', 'success');
        // Stay on the page to view the created order
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
    setShowViewModal(false);
    addToast('Switched to view mode - viewing existing orders', 'info');
  };

  // Switch to create mode
  const switchToCreateMode = () => {
    setViewMode('create');
    addToast('Switched to create mode - creating new order', 'info');
  };

  // View order details
  const viewOrderDetails = (order) => {
    addToast(`Viewing order ${order.orderNumber}`, 'info');
    // Here you would typically navigate to a detailed view or open a modal
  };

  // Edit order
  const editOrder = (order) => {
    addToast(`Editing order ${order.orderNumber}`, 'info');
    // Here you would typically populate the form with order data
  };

  // Delete order
  const deleteOrder = (order) => {
    if (confirm(`Are you sure you want to delete order ${order.orderNumber}?`)) {
      addToast(`Order ${order.orderNumber} deleted successfully`, 'success');
      // Here you would typically make an API call to delete the order
    }
  };

  // Render view mode (existing orders)
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
                  <FaShoppingCart className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Purchase Orders</h1>
                  <p className="text-gray-600">View and manage existing purchase orders</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={switchToCreateMode}
                  className="px-3 py-1.5 text-white rounded-md transition-colors duration-200 flex items-center space-x-2 hover:shadow-md transform hover:-translate-y-0.5 text-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <FaPlus className="w-3.5 h-3.5" />
                  <span>New Order</span>
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
                  placeholder="Search orders by number, vendor, or status..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              
              <select className="lg:w-40 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option value="">All Status</option>
                <option value="Open">Open</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Received">Received</option>
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

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Order Number
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
                      Due Date
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
                  {existingOrders.map((order, index) => (
                    <tr 
                      key={order.id} 
                      className={`hover:bg-gray-50 transition-colors duration-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{order.orderNumber}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className="text-sm font-medium text-gray-900">{order.vendor}</span>
                          <p className="text-xs text-gray-500">{order.contactPerson}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                          order.status === 'Open' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          order.status === 'Confirmed' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          order.status === 'Received' ? 'bg-green-100 text-green-800 border-green-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{order.postingDate}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{order.dueDate}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">${order.grandTotal.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => viewOrderDetails(order)}
                            className="p-1.5 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                            title="View Order Details"
                          >
                            <FaEye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => editOrder(order)}
                            className="p-1.5 rounded-md hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                            title="Edit Order"
                          >
                            <FaEdit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteOrder(order)}
                            className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                            title="Delete Order"
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
            {existingOrders.length === 0 && (
              <div className="text-center py-12">
                <FaShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
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

  // Render create mode (new order form)
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
                <FaShoppingCart className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Purchase Order</h1>
                <p className="text-gray-600">Create and manage purchase orders</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={switchToViewMode}
                className="px-3 py-1.5 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2 text-sm"
              >
                <FaEye className="w-3.5 h-3.5" />
                <span>View Orders</span>
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-3 py-1.5 text-white rounded-md transition-colors duration-200 flex items-center space-x-2 hover:shadow-md transform hover:-translate-y-0.5 text-sm"
                style={{ backgroundColor: primaryColor }}
              >
                <FaPlus className="w-3.5 h-3.5" />
                <span>New Order</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Order Header */}
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
                  value={purchaseOrder.vendor}
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
                  value={purchaseOrder.vendorName}
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
                  value={purchaseOrder.contactPerson}
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
                  value={purchaseOrder.vendorRefNo}
                  onChange={(e) => handleInputChange('vendorRefNo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Reference number will auto-fill"
                  readOnly
                />
              </div>
            </div>

            {/* Order Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaFileAlt className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Order Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
                <input
                  type="text"
                  value={purchaseOrder.orderNumber}
                  onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Auto-generated or enter manually"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={purchaseOrder.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                >
                  <option value="Open">Open</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Received">Received</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Posting Date</label>
                  <input
                    type="date"
                    value={purchaseOrder.postingDate}
                    onChange={(e) => handleInputChange('postingDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={purchaseOrder.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Date</label>
                <input
                  type="date"
                  value={purchaseOrder.documentDate}
                  onChange={(e) => handleInputChange('documentDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaBox className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Order Items
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

          {/* Order Footer */}
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
                  value={purchaseOrder.buyer}
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
                  value={purchaseOrder.owner}
                  onChange={(e) => handleInputChange('owner', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter owner name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={purchaseOrder.remarks}
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
                Order Totals
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${purchaseOrder.totalAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <input
                    type="number"
                    value={purchaseOrder.discount}
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
                    value={purchaseOrder.freight}
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
                    value={purchaseOrder.rounding}
                    onChange={(e) => handleInputChange('rounding', parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-right text-sm"
                    step="0.01"
                  />
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <input
                    type="number"
                    value={purchaseOrder.tax}
                    onChange={(e) => handleInputChange('tax', parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-right text-sm"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <hr className="border-gray-300" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Grand Total:</span>
                  <span>${purchaseOrder.grandTotal.toFixed(2)}</span>
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
                  onClick={() => navigate('/purchase-order')}
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
