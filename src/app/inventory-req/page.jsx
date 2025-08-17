"use client";
import React, { useState } from 'react';
import { FaWarehouse, FaExchangeAlt, FaUser, FaCalendar, FaPlus, FaTrash, FaSave, FaTimes, FaEye, FaCopy, FaSearch, FaFilter } from 'react-icons/fa';
import { useColor } from '@/context/ColorContext.jsx';
import Layout from '@/components/Layout/Layout.jsx';

const Page = () => {
  const [formData, setFormData] = useState({
    businessPartner: "",
    name: "",
    contactPerson: "",
    shipTo: "",
    no: "",
    status: "Open",
    postingDate: new Date().toISOString().split('T')[0],
    dueDate: "",
    documentDate: new Date().toISOString().split('T')[0],
    fromWarehouse: "",
    toWarehouse: "",
  });

  const [activeTab, setActiveTab] = useState('content');
  const [viewMode, setViewMode] = useState('create'); // 'create' or 'view'
  const [attachments, setAttachments] = useState([
    {
      id: 1,
      fileName: 'transfer_request.pdf',
      type: 'PDF',
      size: '245 KB',
      uploadDate: '2024-01-15',
      description: 'Transfer Request Form'
    }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        // You could add a toast notification here
        console.log('File uploaded successfully:', newAttachment);
      }
    };
    
    fileInput.click();
  };

  // Handle attachment actions
  const handleAttachmentAction = (action, attachmentId) => {
    if (action === 'view') {
      const attachment = attachments.find(att => att.id === attachmentId);
      if (attachment) {
        // For now, we'll show the attachment details in console
        // In a real application, you would open the file in a viewer or download it
        console.log('Viewing attachment:', attachment);
        alert(`Viewing attachment: ${attachment.fileName}`);
      }
    } else if (action === 'delete') {
      setAttachments(prev => prev.filter(att => att.id !== attachmentId));
      console.log('Attachment deleted successfully');
    }
  };

  const [rows, setRows] = useState([
    {
      id: 1,
      itemNo: 1,
      description: "",
      fromWarehouse: "WHS-0001",
      toWarehouse: "WHS-0001",
      quantity: 1,
      uomCode: "PCS",
      uomName: "Pieces",
      moisture: "0.00",
      rejection: "",
      grade: "A",
      value: 0,
    },
  ]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        itemNo: rows.length + 1,
        description: "",
        fromWarehouse: "WHS-0001",
        toWarehouse: "WHS-0001",
        quantity: 1,
        uomCode: "PCS",
        uomName: "Pieces",
        moisture: "0.00",
        rejection: "",
        grade: "A",
        value: 0,
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };
  {
    
  }

  const [rowsA, setRowsA] = useState([
    {
      itemNo: 1,
      targetpath: "",
      filename: "",
      attacheddate: "",
      freetext: "",
      copytotargetdocument: "",
    },
  ]);

  const handleInputChangeA = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rowsA];
    updatedRows[index][name] = value;
    setRowsA(updatedRows);
  };

  const handleAddRowA = () => {
    setRowsA([
      ...rowsA,
      {
        itemNo: rowsA.length + 1,
        targetpath: "",
        filename: "",
        attacheddate: "",
        freetext: "",
        copytotargetdocument: "",
      },
    ]);
  };

  const handleDeleteRowA = (index) => {
    const updatedRows = rowsA.filter((_, rowIndex) => rowIndex !== index);
    setRowsA(updatedRows);
  };
  {
    /* Attachment Section Ends here */
  }

  // Sample data for dropdowns
  const businessPartners = [
    { id: 'BP001', name: 'ABC Corporation', contact: 'John Smith' },
    { id: 'BP002', name: 'XYZ Industries', contact: 'Jane Doe' },
    { id: 'BP003', name: 'Tech Solutions Ltd', contact: 'Mike Johnson' }
  ];

  const warehouses = [
    { id: 'WHS-0001', name: 'Main Warehouse', location: 'New York' },
    { id: 'WHS-0002', name: 'Secondary Warehouse', location: 'Los Angeles' },
    { id: 'WHS-0003', name: 'Distribution Center', location: 'Chicago' }
  ];

  const uomCodes = [
    { code: 'PCS', name: 'Pieces' },
    { code: 'KG', name: 'Kilograms' },
    { code: 'L', name: 'Liters' },
    { code: 'M', name: 'Meters' }
  ];

  const grades = ['A', 'B', 'C', 'D'];

  // Sample existing requests for view mode
  const existingRequests = [
    {
      id: 'ITR-001',
      no: 'ITR-001',
      businessPartner: 'ABC Corporation',
      contactPerson: 'John Smith',
      status: 'Open',
      postingDate: '2024-01-15',
      dueDate: '2024-01-20',
      fromWarehouse: 'Main Warehouse',
      toWarehouse: 'Secondary Warehouse',
      items: [
        { description: 'Product A', quantity: 100, fromWarehouse: 'WHS-0001', toWarehouse: 'WHS-0002' },
        { description: 'Product B', quantity: 50, fromWarehouse: 'WHS-0001', toWarehouse: 'WHS-0002' }
      ]
    }
  ];

  const { primaryColor, secondaryColor } = useColor();

  // Switch to view mode
  const switchToViewMode = () => {
    setViewMode('view');
  };

  // Switch to create mode
  const switchToCreateMode = () => {
    setViewMode('create');
  };

  // Render view mode (existing requests)
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
                  <FaExchangeAlt className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Inventory Transfer Requests</h1>
                  <p className="text-sm text-gray-600">View and manage existing transfer requests</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={switchToCreateMode}
                  className="px-2.5 py-1 text-white rounded-md transition-colors duration-200 flex items-center space-x-2 hover:shadow-md transform hover:-translate-y-0.5 text-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <FaPlus className="w-3 h-3" />
                  <span>New Request</span>
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
                  placeholder="Search requests by number, business partner, or status..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              
              <select className="lg:w-36 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm">
                <option value="">All Status</option>
                <option value="Open">Open</option>
                <option value="Approved">Approved</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <select className="lg:w-36 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm">
                <option value="">All Partners</option>
                {businessPartners.map(partner => (
                  <option key={partner.id} value={partner.id}>{partner.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request #</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Partner</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posting Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From Warehouse</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To Warehouse</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {existingRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{request.no}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{request.businessPartner}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{request.contactPerson}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          request.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                          request.status === 'In Progress' ? 'bg-purple-100 text-purple-800' :
                          request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{request.postingDate}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{request.dueDate}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{request.fromWarehouse}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{request.toWarehouse}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-1">
                          <button className="text-blue-600 hover:text-blue-900">
                            <FaEye className="w-3.5 h-3.5" />
                          </button>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <FaEdit className="w-3.5 h-3.5" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
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
                <FaExchangeAlt className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Create Inventory Transfer Request</h1>
                <p className="text-sm text-gray-600">Create a new inventory transfer request</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={switchToViewMode}
                className="px-2.5 py-1 text-gray-700 bg-gray-100 rounded-md transition-colors duration-200 flex items-center space-x-2 hover:bg-gray-200 text-sm"
              >
                <FaEye className="w-3 h-3" />
                <span>View Requests</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-800">Business Partner Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Partner</label>
                <select
                  name="businessPartner"
                  value={formData.businessPartner}
                  onChange={handleChange}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Select Business Partner</option>
                  {businessPartners.map(partner => (
                    <option key={partner.id} value={partner.id}>{partner.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter contact person"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ship To</label>
                <input
                  type="text"
                  name="shipTo"
                  value={formData.shipTo}
                  onChange={handleChange}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter shipping address"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-800">Request Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Request Number</label>
                <input
                  type="text"
                  name="no"
                  value={formData.no}
                  onChange={handleChange}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Enter request number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="Open">Open</option>
                  <option value="Approved">Approved</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Posting Date</label>
                  <input
                    type="date"
                    name="postingDate"
                    value={formData.postingDate}
                    onChange={handleChange}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-4">
            <nav className="-mb-px flex space-x-6">
              {['content', 'logistics', 'attachments'].map((tab) => (
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
                <h4 className="text-base font-medium text-gray-800">Transfer Items</h4>
                <button
                  onClick={handleAddRow}
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
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">From Warehouse</th>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">To Warehouse</th>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">UOM Code</th>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                      <th className="px-3 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {rows.map((row, index) => (
                      <tr key={row.id}>
                        <td className="px-3 py-1.5 text-sm text-gray-900">{row.itemNo}</td>
                        <td className="px-3 py-1.5 text-sm text-gray-900">{row.itemNo}</td>
                        <td className="px-3 py-1.5">
                          <input
                            type="text"
                            name="description"
                            value={row.description}
                            onChange={(e) => handleInputChange(index, e)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            placeholder="Item description"
                          />
                        </td>
                        <td className="px-3 py-1.5">
                          <select
                            name="fromWarehouse"
                            value={row.fromWarehouse}
                            onChange={(e) => handleInputChange(index, e)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                          >
                            {warehouses.map(warehouse => (
                              <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-1.5">
                          <select
                            name="toWarehouse"
                            value={row.toWarehouse}
                            onChange={(e) => handleInputChange(index, e)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                          >
                            {warehouses.map(warehouse => (
                              <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-1.5">
                          <input
                            type="number"
                            name="quantity"
                            value={row.quantity}
                            onChange={(e) => handleInputChange(index, e)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            min="1"
                          />
                        </td>
                        <td className="px-3 py-1.5">
                          <select
                            name="uomCode"
                            value={row.uomCode}
                            onChange={(e) => handleInputChange(index, e)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                          >
                            {uomCodes.map(uom => (
                              <option key={uom.code} value={uom.code}>{uom.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-1.5">
                          <select
                            name="grade"
                            value={row.grade}
                            onChange={(e) => handleInputChange(index, e)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                          >
                            {grades.map(grade => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-1.5">
                          <button
                            onClick={() => handleDeleteRow(index)}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transport Method</label>
                    <select className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                      <option value="">Select Transport Method</option>
                      <option value="truck">Truck</option>
                      <option value="ship">Ship</option>
                      <option value="air">Air</option>
                      <option value="rail">Rail</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Carrier</label>
                    <select className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                      <option value="">Select Carrier</option>
                      <option value="fedex">FedEx</option>
                      <option value="ups">UPS</option>
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
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery Date</label>
                    <input
                      type="date"
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                    <textarea
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      rows="3"
                      placeholder="Enter special instructions"
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
                  <span className="text-sm text-gray-600">Upload files related to this transfer request</span>
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
                      {attachments.map(attachment => (
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

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-2">
              <FaTimes className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
              <FaSave className="w-3.5 h-3.5" />
              <span>Save Request</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
