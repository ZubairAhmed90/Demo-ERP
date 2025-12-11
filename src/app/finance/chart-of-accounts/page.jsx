import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSitemap, FaPlus, FaSearch, FaEdit, FaTrash, FaTimes, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';

const accountCategories = [
  {
    id: 1,
    code: '1000',
    name: 'Assets',
    type: 'Asset',
    parentId: null,
    level: 1,
    children: [
      { id: 2, code: '1100', name: 'Current Assets', type: 'Asset', parentId: 1, level: 2, children: [
        { id: 3, code: '1110', name: 'Cash and Cash Equivalents', type: 'Asset', parentId: 2, level: 3, balance: 500000 },
        { id: 4, code: '1120', name: 'Accounts Receivable', type: 'Asset', parentId: 2, level: 3, balance: 250000 },
        { id: 5, code: '1130', name: 'Inventory', type: 'Asset', parentId: 2, level: 3, balance: 150000 },
      ]},
      { id: 6, code: '1200', name: 'Fixed Assets', type: 'Asset', parentId: 1, level: 2, children: [
        { id: 7, code: '1210', name: 'Property, Plant & Equipment', type: 'Asset', parentId: 6, level: 3, balance: 2000000 },
        { id: 8, code: '1220', name: 'Accumulated Depreciation', type: 'Asset', parentId: 6, level: 3, balance: -500000 },
      ]},
    ]
  },
  {
    id: 9,
    code: '2000',
    name: 'Liabilities',
    type: 'Liability',
    parentId: null,
    level: 1,
    children: [
      { id: 10, code: '2100', name: 'Current Liabilities', type: 'Liability', parentId: 9, level: 2, children: [
        { id: 11, code: '2110', name: 'Accounts Payable', type: 'Liability', parentId: 10, level: 3, balance: 180000 },
        { id: 12, code: '2120', name: 'Short-term Loans', type: 'Liability', parentId: 10, level: 3, balance: 100000 },
      ]},
    ]
  },
  {
    id: 13,
    code: '3000',
    name: 'Equity',
    type: 'Equity',
    parentId: null,
    level: 1,
    children: [
      { id: 14, code: '3100', name: 'Share Capital', type: 'Equity', parentId: 13, level: 3, balance: 1000000 },
      { id: 15, code: '3200', name: 'Retained Earnings', type: 'Equity', parentId: 13, level: 3, balance: 500000 },
    ]
  },
  {
    id: 16,
    code: '4000',
    name: 'Revenue',
    type: 'Revenue',
    parentId: null,
    level: 1,
    children: [
      { id: 17, code: '4100', name: 'Sales Revenue', type: 'Revenue', parentId: 16, level: 3, balance: 0 },
      { id: 18, code: '4200', name: 'Other Income', type: 'Revenue', parentId: 16, level: 3, balance: 0 },
    ]
  },
  {
    id: 19,
    code: '5000',
    name: 'Expenses',
    type: 'Expense',
    parentId: null,
    level: 1,
    children: [
      { id: 20, code: '5100', name: 'Cost of Goods Sold', type: 'Expense', parentId: 19, level: 3, balance: 0 },
      { id: 21, code: '5200', name: 'Operating Expenses', type: 'Expense', parentId: 19, level: 3, balance: 0 },
    ]
  },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAccounts, setExpandedAccounts] = useState(new Set([1, 9, 13, 16, 19]));
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleExpand = (accountId) => {
    const newExpanded = new Set(expandedAccounts);
    if (newExpanded.has(accountId)) {
      newExpanded.delete(accountId);
    } else {
      newExpanded.add(accountId);
    }
    setExpandedAccounts(newExpanded);
  };

  const renderAccount = (account, depth = 0) => {
    const hasChildren = account.children && account.children.length > 0;
    const isExpanded = expandedAccounts.has(account.id);
    const matchesSearch = searchQuery === '' || 
      account.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch && !hasChildren) return null;

    return (
      <React.Fragment key={account.id}>
        <tr className="hover:bg-gray-50">
          <td className="px-6 py-4" style={{ paddingLeft: `${20 + depth * 24}px` }}>
            <div className="flex items-center space-x-2">
              {hasChildren ? (
                <button
                  onClick={() => toggleExpand(account.id)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  {isExpanded ? (
                    <FaChevronDown className="w-3 h-3 text-gray-600" />
                  ) : (
                    <FaChevronRight className="w-3 h-3 text-gray-600" />
                  )}
                </button>
              ) : (
                <div className="w-5" />
              )}
              <span className="text-sm font-medium text-gray-900">{account.code}</span>
            </div>
          </td>
          <td className="px-6 py-4">
            <span className="text-sm text-gray-900">{account.name}</span>
          </td>
          <td className="px-6 py-4">
            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
              account.type === 'Asset' ? 'bg-blue-100 text-blue-800' :
              account.type === 'Liability' ? 'bg-red-100 text-red-800' :
              account.type === 'Equity' ? 'bg-purple-100 text-purple-800' :
              account.type === 'Revenue' ? 'bg-green-100 text-green-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {account.type}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {account.balance !== undefined ? `${account.balance.toLocaleString()} SAR` : '-'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setSelectedAccount(account);
                  setShowEditModal(true);
                }}
                className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <FaEdit className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setSelectedAccount(account);
                  setShowDeleteModal(true);
                }}
                className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
        {hasChildren && isExpanded && account.children.map(child => renderAccount(child, depth + 1))}
      </React.Fragment>
    );
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaSitemap className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Chart of Accounts</h1>
                <p className="text-gray-600">Manage your accounting chart structure</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/finance/create-account')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Account</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by account code or name..."
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Account Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Account Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Balance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {accountCategories.map(account => renderAccount(account))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && selectedAccount && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Edit Account</h2>
                <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Code</label>
                  <input
                    type="text"
                    value={selectedAccount.code}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                  <input
                    type="text"
                    defaultValue={selectedAccount.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-white rounded-lg"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Page;


