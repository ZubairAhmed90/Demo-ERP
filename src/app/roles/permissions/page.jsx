import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaCheck, FaTimes, FaSave, FaEdit, FaEye, FaPlus, FaTrash, FaSearch } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const roles = [
  { id: 1, name: 'Super Admin', description: 'Full system access', userCount: 2 },
  { id: 2, name: 'Admin', description: 'Administrative access', userCount: 5 },
  { id: 3, name: 'Manager', description: 'Management level access', userCount: 12 },
  { id: 4, name: 'Employee', description: 'Standard employee access', userCount: 45 },
  { id: 5, name: 'Viewer', description: 'Read-only access', userCount: 8 },
];

const modules = [
  { id: 'dashboard', name: 'Dashboard', category: 'Main' },
  { id: 'company', name: 'Company Management', category: 'Main' },
  { id: 'users', name: 'User Management', category: 'Main' },
  { id: 'hr', name: 'HR Management', category: 'HR' },
  { id: 'payroll', name: 'Payroll', category: 'HR' },
  { id: 'banking', name: 'Banking', category: 'Finance' },
  { id: 'finance', name: 'Finance & Accounting', category: 'Finance' },
  { id: 'fixed-assets', name: 'Fixed Assets', category: 'Finance' },
  { id: 'inventory', name: 'Inventory', category: 'Operations' },
  { id: 'procurement', name: 'Procurement', category: 'Operations' },
  { id: 'purchase', name: 'Purchase', category: 'Operations' },
  { id: 'sales', name: 'Sales', category: 'Operations' },
  { id: 'crm', name: 'CRM', category: 'Sales' },
  { id: 'manufacturing', name: 'Manufacturing', category: 'Operations' },
  { id: 'supply-chain', name: 'Supply Chain', category: 'Operations' },
  { id: 'workflow', name: 'Workflow & Approval', category: 'System' },
  { id: 'tax', name: 'Tax Management', category: 'Finance' },
  { id: 'reporting', name: 'Reporting', category: 'System' },
  { id: 'reports', name: 'Reports & Analytics', category: 'System' },
  { id: 'settings', name: 'Settings', category: 'System' },
];

const permissions = ['view', 'create', 'edit', 'delete', 'approve'];

// Sample permission data - in real app, this would come from API
const initialPermissions = {
  1: { // Super Admin - all permissions
    dashboard: { view: true, create: true, edit: true, delete: true, approve: true },
    company: { view: true, create: true, edit: true, delete: true, approve: true },
    users: { view: true, create: true, edit: true, delete: true, approve: true },
    hr: { view: true, create: true, edit: true, delete: true, approve: true },
    payroll: { view: true, create: true, edit: true, delete: true, approve: true },
    banking: { view: true, create: true, edit: true, delete: true, approve: true },
    finance: { view: true, create: true, edit: true, delete: true, approve: true },
    'fixed-assets': { view: true, create: true, edit: true, delete: true, approve: true },
    inventory: { view: true, create: true, edit: true, delete: true, approve: true },
    procurement: { view: true, create: true, edit: true, delete: true, approve: true },
    purchase: { view: true, create: true, edit: true, delete: true, approve: true },
    sales: { view: true, create: true, edit: true, delete: true, approve: true },
    crm: { view: true, create: true, edit: true, delete: true, approve: true },
    manufacturing: { view: true, create: true, edit: true, delete: true, approve: true },
    'supply-chain': { view: true, create: true, edit: true, delete: true, approve: true },
    workflow: { view: true, create: true, edit: true, delete: true, approve: true },
    tax: { view: true, create: true, edit: true, delete: true, approve: true },
    reporting: { view: true, create: true, edit: true, delete: true, approve: true },
    reports: { view: true, create: true, edit: true, delete: true, approve: true },
    settings: { view: true, create: true, edit: true, delete: true, approve: true },
  },
  2: { // Admin - most permissions except some sensitive ones
    dashboard: { view: true, create: true, edit: true, delete: false, approve: true },
    company: { view: true, create: false, edit: false, delete: false, approve: false },
    users: { view: true, create: true, edit: true, delete: false, approve: true },
    hr: { view: true, create: true, edit: true, delete: true, approve: true },
    payroll: { view: true, create: true, edit: true, delete: false, approve: true },
    banking: { view: true, create: true, edit: true, delete: false, approve: true },
    finance: { view: true, create: true, edit: true, delete: false, approve: true },
    'fixed-assets': { view: true, create: true, edit: true, delete: false, approve: true },
    inventory: { view: true, create: true, edit: true, delete: true, approve: true },
    procurement: { view: true, create: true, edit: true, delete: true, approve: true },
    purchase: { view: true, create: true, edit: true, delete: true, approve: true },
    sales: { view: true, create: true, edit: true, delete: true, approve: true },
    crm: { view: true, create: true, edit: true, delete: true, approve: true },
    manufacturing: { view: true, create: true, edit: true, delete: false, approve: true },
    'supply-chain': { view: true, create: true, edit: true, delete: false, approve: true },
    workflow: { view: true, create: true, edit: true, delete: false, approve: true },
    tax: { view: true, create: true, edit: true, delete: false, approve: true },
    reporting: { view: true, create: true, edit: true, delete: true, approve: true },
    reports: { view: true, create: true, edit: true, delete: true, approve: true },
    settings: { view: true, create: false, edit: false, delete: false, approve: false },
  },
  3: { // Manager - view and approve, limited create/edit
    dashboard: { view: true, create: false, edit: false, delete: false, approve: true },
    company: { view: true, create: false, edit: false, delete: false, approve: false },
    users: { view: true, create: false, edit: false, delete: false, approve: false },
    hr: { view: true, create: true, edit: true, delete: false, approve: true },
    payroll: { view: true, create: false, edit: false, delete: false, approve: true },
    banking: { view: true, create: false, edit: false, delete: false, approve: false },
    finance: { view: true, create: false, edit: false, delete: false, approve: true },
    'fixed-assets': { view: true, create: false, edit: false, delete: false, approve: false },
    inventory: { view: true, create: true, edit: true, delete: false, approve: true },
    procurement: { view: true, create: true, edit: true, delete: false, approve: true },
    purchase: { view: true, create: true, edit: true, delete: false, approve: true },
    sales: { view: true, create: true, edit: true, delete: false, approve: true },
    crm: { view: true, create: true, edit: true, delete: false, approve: true },
    manufacturing: { view: true, create: true, edit: true, delete: false, approve: true },
    'supply-chain': { view: true, create: false, edit: false, delete: false, approve: false },
    workflow: { view: true, create: false, edit: false, delete: false, approve: true },
    tax: { view: true, create: false, edit: false, delete: false, approve: false },
    reporting: { view: true, create: true, edit: true, delete: false, approve: false },
    reports: { view: true, create: false, edit: false, delete: false, approve: false },
    settings: { view: false, create: false, edit: false, delete: false, approve: false },
  },
  4: { // Employee - limited access
    dashboard: { view: true, create: false, edit: false, delete: false, approve: false },
    company: { view: false, create: false, edit: false, delete: false, approve: false },
    users: { view: false, create: false, edit: false, delete: false, approve: false },
    hr: { view: true, create: true, edit: true, delete: false, approve: false },
    payroll: { view: true, create: false, edit: false, delete: false, approve: false },
    banking: { view: false, create: false, edit: false, delete: false, approve: false },
    finance: { view: false, create: false, edit: false, delete: false, approve: false },
    'fixed-assets': { view: false, create: false, edit: false, delete: false, approve: false },
    inventory: { view: true, create: true, edit: true, delete: false, approve: false },
    procurement: { view: true, create: true, edit: false, delete: false, approve: false },
    purchase: { view: true, create: true, edit: true, delete: false, approve: false },
    sales: { view: true, create: true, edit: true, delete: false, approve: false },
    crm: { view: true, create: true, edit: true, delete: false, approve: false },
    manufacturing: { view: true, create: false, edit: false, delete: false, approve: false },
    'supply-chain': { view: false, create: false, edit: false, delete: false, approve: false },
    workflow: { view: true, create: true, edit: false, delete: false, approve: false },
    tax: { view: false, create: false, edit: false, delete: false, approve: false },
    reporting: { view: true, create: false, edit: false, delete: false, approve: false },
    reports: { view: true, create: false, edit: false, delete: false, approve: false },
    settings: { view: false, create: false, edit: false, delete: false, approve: false },
  },
  5: { // Viewer - read-only
    dashboard: { view: true, create: false, edit: false, delete: false, approve: false },
    company: { view: true, create: false, edit: false, delete: false, approve: false },
    users: { view: true, create: false, edit: false, delete: false, approve: false },
    hr: { view: true, create: false, edit: false, delete: false, approve: false },
    payroll: { view: true, create: false, edit: false, delete: false, approve: false },
    banking: { view: true, create: false, edit: false, delete: false, approve: false },
    finance: { view: true, create: false, edit: false, delete: false, approve: false },
    'fixed-assets': { view: true, create: false, edit: false, delete: false, approve: false },
    inventory: { view: true, create: false, edit: false, delete: false, approve: false },
    procurement: { view: true, create: false, edit: false, delete: false, approve: false },
    purchase: { view: true, create: false, edit: false, delete: false, approve: false },
    sales: { view: true, create: false, edit: false, delete: false, approve: false },
    crm: { view: true, create: false, edit: false, delete: false, approve: false },
    manufacturing: { view: true, create: false, edit: false, delete: false, approve: false },
    'supply-chain': { view: true, create: false, edit: false, delete: false, approve: false },
    workflow: { view: true, create: false, edit: false, delete: false, approve: false },
    tax: { view: true, create: false, edit: false, delete: false, approve: false },
    reporting: { view: true, create: false, edit: false, delete: false, approve: false },
    reports: { view: true, create: false, edit: false, delete: false, approve: false },
    settings: { view: false, create: false, edit: false, delete: false, approve: false },
  },
};

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [rolePermissions, setRolePermissions] = useState(initialPermissions);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hasChanges, setHasChanges] = useState(false);

  const categories = ['all', ...new Set(modules.map(m => m.category))];

  const filteredModules = modules.filter((module) => {
    const matchesSearch = module.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePermissionToggle = (moduleId, permission) => {
    setRolePermissions(prev => ({
      ...prev,
      [selectedRole.id]: {
        ...prev[selectedRole.id],
        [moduleId]: {
          ...prev[selectedRole.id][moduleId],
          [permission]: !prev[selectedRole.id][moduleId]?.[permission]
        }
      }
    }));
    setHasChanges(true);
  };

  const handleSelectAll = (moduleId) => {
    const currentModule = rolePermissions[selectedRole.id]?.[moduleId] || {};
    const allSelected = permissions.every(perm => currentModule[perm]);
    
    setRolePermissions(prev => ({
      ...prev,
      [selectedRole.id]: {
        ...prev[selectedRole.id],
        [moduleId]: permissions.reduce((acc, perm) => {
          acc[perm] = !allSelected;
          return acc;
        }, {})
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // In real app, this would save to API
    console.log('Saving permissions:', rolePermissions);
    alert('Permissions saved successfully!');
    setHasChanges(false);
  };

  const handleReset = () => {
    setRolePermissions(initialPermissions);
    setHasChanges(false);
  };

  const getPermissionCount = (roleId) => {
    const perms = rolePermissions[roleId] || {};
    let total = 0;
    Object.values(perms).forEach(modulePerms => {
      Object.values(modulePerms).forEach(val => {
        if (val) total++;
      });
    });
    return total;
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaShieldAlt className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Role Permissions</h1>
                <p className="text-gray-600">Manage access permissions for roles and modules</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {hasChanges && (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={!hasChanges}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: primaryColor }}
              >
                <FaSave className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Role Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Role</h3>
              <div className="space-y-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setSelectedRole(role);
                      setHasChanges(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedRole.id === role.id
                        ? 'text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                    style={selectedRole.id === role.id ? { backgroundColor: primaryColor } : {}}
                  >
                    <div className="font-medium">{role.name}</div>
                    <div className={`text-xs mt-1 ${selectedRole.id === role.id ? 'text-white opacity-90' : 'text-gray-500'}`}>
                      {role.userCount} users • {getPermissionCount(role.id)} permissions
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Permissions Table */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Permissions for: <span style={{ color: primaryColor }}>{selectedRole.name}</span>
                </h3>
                <p className="text-sm text-gray-600">{selectedRole.description}</p>
              </div>

              <div className="mb-4 flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search modules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="lg:w-48">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Module</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Category</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">View</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Create</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Edit</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Delete</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Approve</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">All</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredModules.map((module) => {
                      const modulePerms = rolePermissions[selectedRole.id]?.[module.id] || {};
                      const allSelected = permissions.every(perm => modulePerms[perm]);
                      const anySelected = permissions.some(perm => modulePerms[perm]);

                      return (
                        <tr key={module.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{module.name}</div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              {module.category}
                            </span>
                          </td>
                          {permissions.map((perm) => (
                            <td key={perm} className="px-4 py-3 text-center">
                              <button
                                onClick={() => handlePermissionToggle(module.id, perm)}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                  modulePerms[perm]
                                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                }`}
                              >
                                {modulePerms[perm] ? (
                                  <FaCheck className="w-4 h-4" />
                                ) : (
                                  <FaTimes className="w-4 h-4" />
                                )}
                              </button>
                            </td>
                          ))}
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleSelectAll(module.id)}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                allSelected
                                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                  : anySelected
                                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                              }`}
                            >
                              {allSelected ? (
                                <FaCheck className="w-4 h-4" />
                              ) : (
                                <FaPlus className="w-4 h-4" />
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredModules.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No modules found matching your search criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

