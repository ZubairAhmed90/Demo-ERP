"use client"

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaEye, FaUserTie, FaCheck, FaTimes as FaX } from 'react-icons/fa';
import { useColor } from '../../context/ColorContext.jsx';
import Layout from '../../components/Layout/Layout.jsx';

// Permission categories and their permissions
const permissionCategories = {
  Sales: {
    'Sales Management': [
      'SalesBlanketAgreement',
      'SalesQuotation', 
      'SalesOrder',
      'Delivery',
      'Return',
      'PickAndPackManager',
      'PickList'
    ],
    'Financial': [
      'ARDownPaymentRequest',
      'ARDownPaymentInvoice',
      'ARInvoice',
      'ARInvoiceAndPayment',
      'ARCreditMemo',
      'ARReserveInvoice',
      'IncomingPayment'
    ],
    'Inventory & Transactions': [
      'InventoryTransferRequest',
      'InventoryTransfer',
      'RecurringTransactions',
      'UDO'
    ]
  },
  Inventory: {
    'Core Operations': [
      'InventoryCounting',
      'GoodsReceipt',
      'GoodsIssue',
      'InventoryTransferRequest',
      'InventoryTransfer'
    ],
    'Advanced Features': [
      'UDO',
      'PickList',
      'WarehouseManagement'
    ]
  },
  Procurement: {
    'Purchase Management': [
      'PurchaseBlanketAgreement',
      'PurchaseRequest',
      'PurchaseQuotation',
      'PurchaseOrder',
      'GoodsReceiptPO',
      'GoodsReturn'
    ],
    'Financial': [
      'APDownPaymentRequest',
      'APDownPaymentInvoice',
      'APInvoice',
      'APCreditMemo',
      'APReserveInvoice',
      'OutgoingPayment'
    ],
    'Advanced Features': [
      'LandedCosts',
      'PurchaseQuotationGenerationWizard',
      'UDO',
      'InventoryTransferRequest',
      'InventoryTransfer'
    ]
  },
  Finance: {
    'General Ledger': [
      'ChartOfAccounts',
      'JournalEntries',
      'FinancialReports',
      'BudgetManagement'
    ],
    'Accounts Payable': [
      'VendorManagement',
      'PaymentProcessing',
      'ExpenseManagement'
    ],
    'Accounts Receivable': [
      'CustomerManagement',
      'InvoiceProcessing',
      'CollectionManagement'
    ]
  },
  HR: {
    'Employee Management': [
      'EmployeeRecords',
      'AttendanceTracking',
      'PayrollManagement',
      'PerformanceReviews'
    ],
    'Recruitment': [
      'JobPostings',
      'CandidateManagement',
      'InterviewScheduling'
    ]
  }
};

// Sample roles data
const initialRoles = [
  {
    id: 'R-001',
    name: 'Sales Manager',
    description: 'Full access to sales operations and customer management',
    department: 'Sales',
    permissions: {
      Sales: ['SalesBlanketAgreement', 'SalesQuotation', 'SalesOrder', 'Delivery', 'Return'],
      Financial: ['ARInvoice', 'ARCreditMemo'],
      'Inventory & Transactions': ['InventoryTransferRequest']
    },
    userCount: 3,
    status: 'Active',
    createdAt: '2024-01-10'
  },
  {
    id: 'R-002',
    name: 'Inventory Supervisor',
    description: 'Manages inventory operations and stock control',
    department: 'Inventory',
    permissions: {
      'Core Operations': ['InventoryCounting', 'GoodsReceipt', 'GoodsIssue', 'InventoryTransfer'],
      'Advanced Features': ['PickList', 'WarehouseManagement']
    },
    userCount: 5,
    status: 'Active',
    createdAt: '2024-01-12'
  },
  {
    id: 'R-003',
    name: 'Procurement Analyst',
    description: 'Handles purchase requests and vendor management',
    department: 'Procurement',
    permissions: {
      'Purchase Management': ['PurchaseRequest', 'PurchaseQuotation', 'PurchaseOrder'],
      'Financial': ['APInvoice', 'APCreditMemo']
    },
    userCount: 2,
    status: 'Active',
    createdAt: '2024-01-15'
  }
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  
  const [roles, setRoles] = useState(initialRoles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    department: '',
    permissions: {}
  });

  // Handle search and filters
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDepartmentFilter = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Filter roles based on search and filters
  const filteredRoles = roles.filter((role) => {
    const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         role.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || role.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || role.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Handle role creation
  const handleCreateRole = () => {
    if (newRole.name && newRole.department) {
      const role = {
        id: `R-${String(roles.length + 1).padStart(3, '0')}`,
        ...newRole,
        userCount: 0,
        status: 'Active',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setRoles([...roles, role]);
      setNewRole({ name: '', description: '', department: '', permissions: {} });
      setShowCreateModal(false);
    }
  };

  // Handle role editing
  const handleEditRole = (role) => {
    setEditingRole({ ...role });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id ? editingRole : role
      ));
      setShowEditModal(false);
      setEditingRole(null);
    }
  };

  // Handle role deletion
  const handleDeleteRole = (role) => {
    setSelectedRole(role);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRole) {
      setRoles(roles.filter(role => role.id !== selectedRole.id));
      setShowDeleteModal(false);
      setSelectedRole(null);
    }
  };

  // Handle permission changes
  const handlePermissionChange = (role, category, permission, checked) => {
    if (checked) {
      if (!role.permissions[category]) {
        role.permissions[category] = [];
      }
      if (!role.permissions[category].includes(permission)) {
        role.permissions[category].push(permission);
      }
    } else {
      if (role.permissions[category]) {
        role.permissions[category] = role.permissions[category].filter(p => p !== permission);
        if (role.permissions[category].length === 0) {
          delete role.permissions[category];
        }
      }
    }
    setEditingRole({ ...role });
  };

  // Check if permission is granted
  const isPermissionGranted = (role, category, permission) => {
    return role.permissions[category] && role.permissions[category].includes(permission);
  };

  // Close all modals
  const closeModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    setShowDeleteModal(false);
    setEditingRole(null);
    setSelectedRole(null);
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

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
                <FaShieldAlt className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Manage Roles</h1>
                <p className="text-gray-600">Define and manage user roles and permissions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/roles/permissions')}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <FaShieldAlt className="w-4 h-4" />
                <span>Manage Permissions</span>
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                style={{ backgroundColor: primaryColor, color: 'white' }}
              >
                <FaPlus className="w-4 h-4" />
                <span>Create Role</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Roles</p>
                <p className="text-2xl font-bold text-gray-800">{roles.length}</p>
              </div>
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${primaryColor}15` }}
              >
                <FaShieldAlt className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Roles</p>
                <p className="text-2xl font-bold text-green-600">
                  {roles.filter(role => role.status === 'Active').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <FaCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">
                  {roles.reduce((sum, role) => sum + role.userCount, 0)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <FaUserTie className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-800">
                  {new Set(roles.map(role => role.department)).size}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <FaShieldAlt className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search roles by name, ID, or description..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            {/* Department Filter */}
            <div className="lg:w-40">
              <select
                value={selectedDepartment}
                onChange={handleDepartmentFilter}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Departments</option>
                <option value="Sales">Sales</option>
                <option value="Inventory">Inventory</option>
                <option value="Procurement">Procurement</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="lg:w-40">
              <select
                value={selectedStatus}
                onChange={handleStatusFilter}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Roles Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Role ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Role Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRoles.map((role, index) => (
                  <tr 
                    key={role.id} 
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{role.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                          style={{ backgroundColor: `${primaryColor}15` }}
                        >
                          <FaShieldAlt className="w-4 h-4" style={{ color: primaryColor }} />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900">{role.name}</span>
                          <p className="text-xs text-gray-500">{role.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{role.department}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{role.userCount}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                        role.status === 'Active' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {role.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{role.createdAt}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedRole(role);
                            setShowViewModal(true);
                          }}
                          className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                          title="View Role Details"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditRole(role)}
                          className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                          title="Edit Role"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRole(role)}
                          className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                          title="Delete Role"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {filteredRoles.length === 0 && (
            <div className="text-center py-12">
              <FaShieldAlt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Create Role Modal */}
        <Modal isOpen={showCreateModal} onClose={closeModals} title="Create New Role">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter role name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={newRole.department}
                  onChange={(e) => setNewRole({...newRole, department: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Department</option>
                  {Object.keys(permissionCategories).map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newRole.description}
                onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter role description"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRole}
                className="px-4 py-2 text-white rounded-lg transition-colors duration-200"
                style={{ backgroundColor: primaryColor }}
              >
                Create Role
              </button>
            </div>
          </div>
        </Modal>

        {/* Edit Role Modal */}
        <Modal isOpen={showEditModal} onClose={closeModals} title="Edit Role">
          {editingRole && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role ID</label>
                  <input
                    type="text"
                    value={editingRole.id}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                  <input
                    type="text"
                    value={editingRole.name}
                    onChange={(e) => setEditingRole({...editingRole, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={editingRole.department}
                    onChange={(e) => setEditingRole({...editingRole, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(permissionCategories).map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editingRole.status}
                    onChange={(e) => setEditingRole({...editingRole, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingRole.description}
                  onChange={(e) => setEditingRole({...editingRole, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Permissions Section */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">Permissions</h4>
                <div className="space-y-6">
                  {editingRole.department && permissionCategories[editingRole.department] && 
                    Object.entries(permissionCategories[editingRole.department]).map(([category, permissions]) => (
                      <div key={category} className="border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 mb-3">{category}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {permissions.map(permission => (
                            <label key={permission} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={isPermissionGranted(editingRole, category, permission)}
                                onChange={(e) => handlePermissionChange(editingRole, category, permission, e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">{permission}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={closeModals}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 text-white rounded-lg transition-colors duration-200"
                  style={{ backgroundColor: primaryColor }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* View Role Modal */}
        <Modal isOpen={showViewModal} onClose={closeModals} title="Role Details">
          {selectedRole && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role ID</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedRole.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedRole.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedRole.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${
                    selectedRole.status === 'Active' 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : 'bg-red-100 text-red-800 border-red-200'
                  }`}>
                    {selectedRole.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Users Assigned</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedRole.userCount}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Created</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedRole.createdAt}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <p className="text-lg font-semibold text-gray-900">{selectedRole.description}</p>
              </div>

              {/* Permissions Display */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">Permissions</h4>
                <div className="space-y-4">
                  {Object.entries(selectedRole.permissions).map(([category, permissions]) => (
                    <div key={category} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">{category}</h5>
                      <div className="flex flex-wrap gap-2">
                        {permissions.map(permission => (
                          <span key={permission} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={showDeleteModal} onClose={closeModals} title="Delete Role">
          {selectedRole && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <FaTrash className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Role</h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete <span className="font-semibold">{selectedRole.name}</span>? 
                  This action cannot be undone.
                </p>
                {selectedRole.userCount > 0 && (
                  <p className="text-sm text-red-600 mt-2">
                    Warning: This role is assigned to {selectedRole.userCount} user(s).
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeModals}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete Role
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default Page;
