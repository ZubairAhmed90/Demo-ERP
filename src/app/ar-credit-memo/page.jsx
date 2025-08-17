"use client";
import React, { useState } from 'react';
import { FaFileInvoice, FaUser, FaCalendar, FaWarehouse, FaBox, FaDollarSign, FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaEye, FaCopy, FaFileAlt, FaSearch, FaFilter } from 'react-icons/fa';
import { useColor } from '@/context/ColorContext.jsx';
import Layout from '@/components/Layout/Layout.jsx';

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
  
  const [creditMemo, setCreditMemo] = useState({
    memoNumber: '',
    customer: '',
    customerName: '',
    contactPerson: '',
    customerRefNo: '',
    status: 'Open',
    postingDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    documentDate: new Date().toISOString().split('T')[0],
    salesEmployee: '',
    owner: '',
    remarks: '',
    totalBeforeDiscount: 0,
    discount: 0,
    downPayment: 0,
    freight: 0,
    rounding: 0,
    tax: 0,
    wTaxAmount: 0,
    totalPaymentDue: 0,
    appliedAccount: 0,
    balanceDue: 0
  });

  const [creditMemoItems, setCreditMemoItems] = useState([
    {
      id: 1,
      itemNo: 1,
      description: '',
      quantity: 1,
      unitPrice: 0,
      discountPercent: 0,
      taxCode: 'VAT',
      returnCost: 0,
      total: 0
    }
  ]);

  const [activeTab, setActiveTab] = useState('content');
  const [viewMode, setViewMode] = useState('create'); // 'create' or 'view'
  const [selectedCreditMemo, setSelectedCreditMemo] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [attachments, setAttachments] = useState([
    {
      id: 1,
      fileName: 'return_authorization.pdf',
      type: 'PDF',
      size: '156 KB',
      uploadDate: '2024-01-15',
      description: 'Return Authorization'
    },
    {
      id: 2,
      fileName: 'damage_report.docx',
      type: 'DOCX',
      size: '89 KB',
      uploadDate: '2024-01-14',
      description: 'Damage Report'
    }
  ]);

  // Handle file upload
  const handleFileUpload = () => {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png';
    
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const newAttachment = {
          id: Date.now(),
          fileName: file.name,
          type: file.name.split('.').pop().toUpperCase(),
          size: `${(file.size / 1024).toFixed(0)} KB`,
          uploadDate: new Date().toISOString().split('T')[0],
          description: file.name.split('.')[0]
        };
        setAttachments(prev => [...prev, newAttachment]);
        addToast('File uploaded successfully!', 'success');
      }
    };
    
    fileInput.click();
  };

  // Handle attachment actions
  const handleAttachmentAction = (action, attachmentId) => {
    if (action === 'view') {
      const attachment = attachments.find(att => att.id === attachmentId);
      if (attachment) {
        // For now, we'll show the attachment details in a toast
        // In a real application, you would open the file in a viewer or download it
        addToast(`Viewing attachment: ${attachment.fileName}`, 'info');
        console.log('Viewing attachment:', attachment);
        
        // You could also implement file preview here:
        // - For images: show in a modal
        // - For PDFs: open in PDF viewer
        // - For documents: download or open in appropriate app
      }
    } else if (action === 'delete') {
      setAttachments(prev => prev.filter(att => att.id !== attachmentId));
      addToast('Attachment deleted successfully!', 'success');
    }
  };

  // Sample data for dropdowns
  const customers = [
    { id: 'C001', name: 'ABC Corporation', contact: 'John Smith', ref: 'ABC-REF-001' },
    { id: 'C002', name: 'XYZ Industries', contact: 'Jane Doe', ref: 'XYZ-REF-002' },
    { id: 'C003', name: 'Tech Solutions Ltd', contact: 'Mike Johnson', ref: 'TECH-REF-003' }
  ];

  const salesEmployees = [
    { id: 'E001', name: 'Sarah Wilson' },
    { id: 'E002', name: 'David Brown' },
    { id: 'E003', name: 'Lisa Garcia' }
  ];

  const taxCodes = [
    { code: 'VAT', name: 'VAT 15%', rate: 15 },
    { code: 'EXEMPT', name: 'Exempt', rate: 0 },
    { code: 'ZERO', name: 'Zero Rate', rate: 0 }
  ];

  // Sample existing credit memos for view mode
  const existingCreditMemos = [
    {
      id: 'CM-001',
      memoNumber: 'CM-001',
      customer: 'ABC Corporation',
      customerName: 'ABC Corporation',
      contactPerson: 'John Smith',
      status: 'Open',
      postingDate: '2024-01-15',
      dueDate: '2024-02-15',
      totalPaymentDue: -2875.00,
      balanceDue: -2875.00,
      items: [
        { description: 'Product A Return', quantity: 2, unitPrice: 150.00, total: -300.00 },
        { description: 'Product B Return', quantity: 1, unitPrice: 200.00, total: -200.00 }
      ]
    },
    {
      id: 'CM-002',
      memoNumber: 'CM-002',
      customer: 'XYZ Industries',
      customerName: 'XYZ Industries',
      contactPerson: 'Jane Doe',
      status: 'Processed',
      postingDate: '2024-01-14',
      dueDate: '2024-02-14',
      totalPaymentDue: -2070.00,
      balanceDue: 0.00,
      items: [
        { description: 'Product C Return', quantity: 3, unitPrice: 225.00, total: -675.00 }
      ]
    }
  ];

  // Handle input changes
  const handleInputChange = (field, value) => {
    setCreditMemo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle credit memo item changes
  const handleItemChange = (index, field, value) => {
    const newItems = [...creditMemoItems];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };

    // Calculate totals
    if (field === 'quantity' || field === 'unitPrice' || field === 'discountPercent') {
      const quantity = field === 'quantity' ? parseFloat(value) || 0 : newItems[index].quantity;
      const unitPrice = field === 'unitPrice' ? parseFloat(value) || 0 : newItems[index].unitPrice;
      const discountPercent = field === 'discountPercent' ? parseFloat(value) || 0 : newItems[index].discountPercent;
      
      const subtotal = quantity * unitPrice;
      const discount = subtotal * (discountPercent / 100);
      const total = subtotal - discount;
      
      newItems[index].total = total;
    }

    setCreditMemoItems(newItems);
    calculateTotals(newItems);
  };

  // Calculate totals
  const calculateTotals = (items = creditMemoItems) => {
    const totalBeforeDiscount = items.reduce((sum, item) => sum + (item.total || 0), 0);
    const discount = creditMemo.discount || 0;
    const downPayment = creditMemo.downPayment || 0;
    const freight = creditMemo.freight || 0;
    const rounding = creditMemo.rounding || 0;
    const tax = creditMemo.tax || 0;
    const wTaxAmount = creditMemo.wTaxAmount || 0;

    const totalPaymentDue = totalBeforeDiscount - discount + freight + tax + wTaxAmount + rounding;
    const balanceDue = totalPaymentDue - downPayment;

    setCreditMemo(prev => ({
      ...prev,
      totalBeforeDiscount,
      totalPaymentDue,
      balanceDue
    }));
  };

  // Add new item
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      itemNo: creditMemoItems.length + 1,
      description: '',
      quantity: 1,
      unitPrice: 0,
      discountPercent: 0,
      taxCode: 'VAT',
      returnCost: 0,
      total: 0
    };
    setCreditMemoItems([...creditMemoItems, newItem]);
  };

  // Remove item
  const removeItem = (index) => {
    const newItems = creditMemoItems.filter((_, i) => i !== index);
    setCreditMemoItems(newItems);
    calculateTotals(newItems);
  };

  // Handle form submission
  const handleSubmit = (action) => {
    if (action === 'addAndClose') {
      addToast('Credit memo created successfully!', 'success');
      // Reset form or redirect
    } else if (action === 'addAndView') {
      addToast('Credit memo created successfully!', 'success');
      // Stay on form
    }
  };

  // Handle copy operations
  const handleCopyFrom = () => {
    addToast('Copy from functionality will be implemented here', 'info');
  };

  const handleCopyTo = () => {
    addToast('Copy to functionality will be implemented here', 'info');
  };

  // Handle view operations
  const handleViewCreditMemo = (memoId) => {
    const memo = existingCreditMemos.find(cm => cm.id === memoId);
    if (memo) {
      setSelectedCreditMemo(memo);
      setShowViewModal(true);
    }
  };

  const handleEditCreditMemo = (memoId) => {
    const memo = existingCreditMemos.find(cm => cm.id === memoId);
    if (memo) {
      addToast(`Editing credit memo: ${memo.memoNumber}`, 'info');
      // Here you would typically populate the form with existing data
      console.log('Editing credit memo:', memo);
    }
  };

  const handleDeleteCreditMemo = (memoId) => {
    const memo = existingCreditMemos.find(cm => cm.id === memoId);
    if (memo) {
      if (window.confirm(`Are you sure you want to delete credit memo ${memo.memoNumber}?`)) {
        addToast(`Credit memo ${memo.memoNumber} deleted successfully!`, 'success');
        // Here you would typically remove the credit memo from the database
        console.log('Deleting credit memo:', memo);
      }
    }
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
        <div className="p-4 space-y-4">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center space-x-2">
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${primaryColor}15` }}
                >
                  <FaFileInvoice className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">A/R Credit Memos</h1>
                  <p className="text-sm text-gray-600">View and manage existing credit memos</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={switchToCreateMode}
                  className="px-2.5 py-1 text-white rounded-md transition-colors duration-200 flex items-center space-x-2 hover:shadow-md transform hover:-translate-y-0.5 text-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <FaPlus className="w-3 h-3" />
                  <span>New Credit Memo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search credit memos by number, customer, or status..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              
              <select className="lg:w-36 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm">
                <option value="">All Status</option>
                <option value="Open">Open</option>
                <option value="Processed">Processed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <select className="lg:w-36 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm">
                <option value="">All Customers</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Credit Memos Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memo #</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posting Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {existingCreditMemos.map((memo) => (
                    <tr key={memo.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{memo.memoNumber}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{memo.customer}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{memo.contactPerson}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          memo.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                          memo.status === 'Processed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {memo.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{memo.postingDate}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{memo.dueDate}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${memo.totalPaymentDue.toFixed(2)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${memo.balanceDue.toFixed(2)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-1">
                          <button 
                            onClick={() => handleViewCreditMemo(memo.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEye className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleEditCreditMemo(memo.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <FaEdit className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCreditMemo(memo.id)}
                            className="text-red-600 hover:text-red-900"
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
          </div>
        </div>
      </Layout>
    );
  }

  // Render create mode
  return (
    <Layout>
      <div className="p-4 space-y-4">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-2">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${primaryColor}15` }}
              >
                <FaFileInvoice className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Create A/R Credit Memo</h1>
                <p className="text-sm text-gray-600">Create a new credit memo for your customer</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={switchToViewMode}
                className="px-2.5 py-1 text-gray-700 bg-gray-100 rounded-md transition-colors duration-200 flex items-center space-x-2 hover:bg-gray-200 text-sm"
              >
                <FaEye className="w-3 h-3" />
                <span>View Credit Memos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-800">Customer Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                <select
                  value={creditMemo.customer}
                  onChange={(e) => handleInputChange('customer', e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Select Customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={creditMemo.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter contact person"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Ref. No</label>
                <input
                  type="text"
                  value={creditMemo.customerRefNo}
                  onChange={(e) => handleInputChange('customerRefNo', e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter customer reference number"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-800">Credit Memo Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credit Memo Number</label>
                <input
                  type="text"
                  value={creditMemo.memoNumber}
                  onChange={(e) => handleInputChange('memoNumber', e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter credit memo number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={creditMemo.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="Open">Open</option>
                  <option value="Processed">Processed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Posting Date</label>
                  <input
                    type="date"
                    value={creditMemo.postingDate}
                    onChange={(e) => handleInputChange('postingDate', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={creditMemo.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-4">
            <nav className="-mb-px flex space-x-6">
              {['content', 'logistics', 'accounting', 'attachments'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-1.5 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'content' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-base font-medium text-gray-800">Credit Memo Items</h4>
                <button
                  onClick={addItem}
                  className="px-2.5 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 text-sm"
                >
                  <FaPlus className="w-3.5 h-3.5" />
                  <span>Add Item</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-md">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">S No.</th>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Item No.</th>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Discount %</th>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Tax Code</th>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Return Cost</th>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {creditMemoItems.map((item, index) => (
                      <tr key={item.id}>
                        <td className="px-3 py-1.5 text-sm text-gray-900">{item.itemNo}</td>
                        <td className="px-3 py-1.5 text-sm text-gray-900">{item.itemNo}</td>
                        <td className="px-3 py-1.5">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            placeholder="Item description"
                          />
                        </td>
                        <td className="px-3 py-1.5">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            min="1"
                          />
                        </td>
                        <td className="px-3 py-1.5">
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="px-3 py-1.5">
                          <input
                            type="number"
                            value={item.discountPercent}
                            onChange={(e) => handleItemChange(index, 'discountPercent', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            min="0"
                            max="100"
                            step="0.01"
                          />
                        </td>
                        <td className="px-3 py-1.5">
                          <select
                            value={item.taxCode}
                            onChange={(e) => handleItemChange(index, 'taxCode', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                          >
                            {taxCodes.map(tax => (
                              <option key={tax.code} value={tax.code}>{tax.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-1.5">
                          <input
                            type="number"
                            value={item.returnCost}
                            onChange={(e) => handleItemChange(index, 'returnCost', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="px-3 py-1.5 text-sm text-gray-900">${item.total.toFixed(2)}</td>
                        <td className="px-3 py-1.5">
                          <button
                            onClick={() => removeItem(index)}
                            className="text-red-600 hover:text-red-800"
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
          )}

          {activeTab === 'logistics' && (
            <div className="space-y-3">
              <h4 className="text-base font-medium text-gray-800">Logistics Information</h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Return To Address</label>
                    <textarea
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      rows="3"
                      placeholder="Enter return address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bill From Address</label>
                    <textarea
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      rows="3"
                      placeholder="Enter billing address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Return Method</label>
                    <select className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                      <option value="">Select Return Method</option>
                      <option value="pickup">Pickup</option>
                      <option value="shipping">Shipping</option>
                      <option value="dropoff">Drop-off</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                    <input
                      type="date"
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Carrier</label>
                    <select className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                      <option value="">Select Carrier</option>
                      <option value="fedex">FedEx</option>
                      <option value="ups">UPS</option>
                      <option value="usps">USPS</option>
                      <option value="dhl">DHL</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                    <input
                      type="text"
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Enter tracking number"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accounting' && (
            <div className="space-y-3">
              <h4 className="text-base font-medium text-gray-800">Accounting Information</h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GL Account</label>
                    <select className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                      <option value="">Select GL Account</option>
                      <option value="4000">4000 - Sales Returns</option>
                      <option value="4100">4100 - Service Returns</option>
                      <option value="4200">4200 - Other Returns</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cost Center</label>
                    <select className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                      <option value="">Select Cost Center</option>
                      <option value="CC001">CC001 - Sales Department</option>
                      <option value="CC002">CC002 - Customer Service</option>
                      <option value="CC003">CC003 - Operations</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Code</label>
                    <input
                      type="text"
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Enter project code"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credit Terms</label>
                    <select className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                      <option value="">Select Credit Terms</option>
                      <option value="immediate">Immediate Credit</option>
                      <option value="next_invoice">Next Invoice</option>
                      <option value="30_days">30 Days</option>
                      <option value="60_days">60 Days</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Rate</label>
                    <input
                      type="number"
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="1.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attachments' && (
            <div className="space-y-3">
              <h4 className="text-base font-medium text-gray-800">Attachments</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Upload files related to this credit memo</span>
                  <button 
                    onClick={handleFileUpload}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm flex items-center space-x-2"
                  >
                    <FaPlus className="w-3.5 h-3.5" />
                    <span>Add File</span>
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-md">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">File Name</th>
                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Upload Date</th>
                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {attachments.map((attachment) => (
                        <tr key={attachment.id}>
                          <td className="px-3 py-1.5 text-sm text-gray-900">{attachment.fileName}</td>
                          <td className="px-3 py-1.5 text-sm text-gray-500">{attachment.type}</td>
                          <td className="px-3 py-1.5 text-sm text-gray-500">{attachment.size}</td>
                          <td className="px-3 py-1.5 text-sm text-gray-500">{attachment.uploadDate}</td>
                          <td className="px-3 py-1.5 text-sm text-gray-500">{attachment.description}</td>
                          <td className="px-3 py-1.5">
                            <div className="flex space-x-1">
                              <button 
                                onClick={() => handleAttachmentAction('view', attachment.id)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <FaEye className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleAttachmentAction('delete', attachment.id)}
                                className="text-red-600 hover:text-red-800"
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
              </div>
            </div>
          )}
        </div>

        {/* Summary and Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Sales Employee and Owner */}
            <div className="space-y-3">
              <h4 className="text-base font-medium text-gray-800">Additional Information</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sales Employee</label>
                <select
                  value={creditMemo.salesEmployee}
                  onChange={(e) => handleInputChange('salesEmployee', e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Select Sales Employee</option>
                  {salesEmployees.map(employee => (
                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                <input
                  type="text"
                  value={creditMemo.owner}
                  onChange={(e) => handleInputChange('owner', e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter owner"
                />
              </div>
            </div>

            {/* Financial Summary */}
            <div className="space-y-3">
              <h4 className="text-base font-medium text-gray-800">Financial Summary</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Before Discount</label>
                  <input
                    type="number"
                    value={creditMemo.totalBeforeDiscount}
                    readOnly
                    className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded-md text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                  <input
                    type="number"
                    value={creditMemo.discount}
                    onChange={(e) => handleInputChange('discount', parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
                  <input
                    type="number"
                    value={creditMemo.downPayment}
                    onChange={(e) => handleInputChange('downPayment', parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Freight</label>
                  <input
                    type="number"
                    value={creditMemo.freight}
                    onChange={(e) => handleInputChange('freight', parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax</label>
                  <input
                    type="number"
                    value={creditMemo.tax}
                    onChange={(e) => handleInputChange('tax', parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WTax Amount</label>
                  <input
                    type="number"
                    value={creditMemo.wTaxAmount}
                    onChange={(e) => handleInputChange('wTaxAmount', parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-base font-semibold text-gray-800">Total Payment Due:</span>
                  <span className="text-base font-bold text-gray-900">${creditMemo.totalPaymentDue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-base font-semibold text-gray-800">Balance Due:</span>
                  <span className="text-base font-bold text-gray-900">${creditMemo.balanceDue.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <h4 className="text-base font-medium text-gray-800">Actions</h4>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleSubmit('addAndClose')}
                  className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                >
                  <FaSave className="w-3.5 h-3.5" />
                  <span>Add and Close</span>
                </button>
                
                <button
                  onClick={() => handleSubmit('addAndView')}
                  className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                >
                  <FaEye className="w-3.5 h-3.5" />
                  <span>Add and View</span>
                </button>
                
                <button
                  onClick={handleCopyFrom}
                  className="w-full px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                >
                  <FaCopy className="w-3.5 h-3.5" />
                  <span>Copy From</span>
                </button>
                
                <button
                  onClick={handleCopyTo}
                  className="w-full px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                >
                  <FaCopy className="w-3.5 h-3.5" />
                  <span>Copy To</span>
                </button>
                
                <button className="w-full px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm">
                  <FaTimes className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* View Credit Memo Modal */}
      {showViewModal && selectedCreditMemo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <FaFileInvoice className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Credit Memo Details</h2>
                    <p className="text-gray-600">Credit Memo #{selectedCreditMemo.memoNumber}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Customer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Customer</label>
                      <p className="text-sm text-gray-900">{selectedCreditMemo.customer}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Contact Person</label>
                      <p className="text-sm text-gray-900">{selectedCreditMemo.contactPerson}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Credit Memo Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedCreditMemo.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                        selectedCreditMemo.status === 'Processed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedCreditMemo.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Posting Date</label>
                      <p className="text-sm text-gray-900">{selectedCreditMemo.postingDate}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Due Date</label>
                      <p className="text-sm text-gray-900">{selectedCreditMemo.dueDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Credit Memo Items */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Credit Memo Items</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedCreditMemo.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.description}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">${item.unitPrice.toFixed(2)}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">${item.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Financial Summary */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Financial Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Total Payment Due:</span>
                    <span className="text-lg font-bold text-gray-900">${selectedCreditMemo.totalPaymentDue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Balance Due:</span>
                    <span className="text-lg font-bold text-gray-900">${selectedCreditMemo.balanceDue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditCreditMemo(selectedCreditMemo.id);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Edit Credit Memo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </Layout>
  );
};

export default Page;
