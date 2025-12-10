import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUniversity, FaPlus, FaSearch, FaTimes, FaEdit, FaTrash, FaRegEye, FaDollarSign, FaCreditCard } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const bankAccounts = [
  { id: 1, accountNumber: 'ACC-001', bankName: 'ABC Bank', accountType: 'Current', balance: 150000.00, currency: 'SAR', status: 'Active' },
  { id: 2, accountNumber: 'ACC-002', bankName: 'XYZ Bank', accountType: 'Savings', balance: 250000.00, currency: 'SAR', status: 'Active' },
  { id: 3, accountNumber: 'ACC-003', bankName: 'DEF Bank', accountType: 'Current', balance: 75000.00, currency: 'SAR', status: 'Active' },
  { id: 4, accountNumber: 'ACC-004', bankName: 'GHI Bank', accountType: 'Fixed Deposit', balance: 500000.00, currency: 'SAR', status: 'Active' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const rowsPerPage = 5;

  const filteredAccounts = bankAccounts.filter((account) => {
    const matchesSearch = 
      account.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.bankName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || account.accountType === selectedType;
    return matchesSearch && matchesType;
  });

  const paginatedAccounts = filteredAccounts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalBalance = bankAccounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaUniversity className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Bank Accounts</h1>
                <p className="text-gray-600">Manage company bank accounts</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/banking/create-account')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Account</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Balance</p>
                <p className="text-2xl font-bold text-gray-800">{totalBalance.toLocaleString()} SAR</p>
              </div>
              <FaDollarSign className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Accounts</p>
                <p className="text-2xl font-bold text-gray-800">{bankAccounts.length}</p>
              </div>
              <FaUniversity className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Accounts</p>
                <p className="text-2xl font-bold text-green-600">
                  {bankAccounts.filter(a => a.status === 'Active').length}
                </p>
              </div>
              <FaCreditCard className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Account Types</p>
                <p className="text-2xl font-bold text-gray-800">
                  {new Set(bankAccounts.map(a => a.accountType)).size}
                </p>
              </div>
              <FaCreditCard className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by account number or bank name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Current">Current</option>
                <option value="Savings">Savings</option>
                <option value="Fixed Deposit">Fixed Deposit</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Account Number</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Bank Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Account Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Balance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Currency</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{account.accountNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: `${primaryColor}15` }}>
                          <FaUniversity className="w-4 h-4" style={{ color: primaryColor }} />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{account.bankName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.accountType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {account.balance.toLocaleString()} {account.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.currency}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                        account.status === 'Active' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {account.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedAccount(account);
                            setShowViewModal(true);
                          }}
                          className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <FaRegEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingAccount({ ...account });
                            setShowEditModal(true);
                          }}
                          className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredAccounts.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredAccounts.length / rowsPerPage)}
              page={page}
              onPageChange={(e, value) => setPage(value)}
            />
          </div>
        )}

        {/* View Modal */}
        {showViewModal && selectedAccount && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Account Details</h2>
                <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedAccount.accountNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedAccount.bankName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedAccount.accountType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Balance</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedAccount.balance.toLocaleString()} {selectedAccount.currency}
                  </p>
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

