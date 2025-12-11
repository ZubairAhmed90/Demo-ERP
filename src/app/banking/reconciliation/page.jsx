import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBalanceScale, FaSearch, FaCheckCircle, FaExclamationTriangle, FaCalendar } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const reconciliations = [
  { id: 1, accountNumber: 'ACC-001', bankName: 'ABC Bank', statementDate: '2024-01-31', bankBalance: 150000, systemBalance: 150000, difference: 0, status: 'Reconciled' },
  { id: 2, accountNumber: 'ACC-002', bankName: 'XYZ Bank', statementDate: '2024-01-31', bankBalance: 250000, systemBalance: 248000, difference: 2000, status: 'Pending' },
  { id: 3, accountNumber: 'ACC-003', bankName: 'DEF Bank', statementDate: '2024-01-31', bankBalance: 75000, systemBalance: 75000, difference: 0, status: 'Reconciled' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const rowsPerPage = 5;

  const filteredReconciliations = reconciliations.filter((rec) => {
    const matchesSearch = 
      rec.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.bankName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || rec.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedReconciliations = filteredReconciliations.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
              <FaBalanceScale className="w-6 h-6" style={{ color: primaryColor }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Bank Reconciliation</h1>
              <p className="text-gray-600">Reconcile bank statements with system records</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reconciled</p>
                <p className="text-2xl font-bold text-green-600">
                  {reconciliations.filter(r => r.status === 'Reconciled').length}
                </p>
              </div>
              <FaCheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {reconciliations.filter(r => r.status === 'Pending').length}
                </p>
              </div>
              <FaExclamationTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Accounts</p>
                <p className="text-2xl font-bold text-gray-800">{reconciliations.length}</p>
              </div>
              <FaBalanceScale className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Difference</p>
                <p className="text-2xl font-bold text-red-600">
                  {reconciliations.reduce((sum, r) => sum + Math.abs(r.difference), 0).toLocaleString()} SAR
                </p>
              </div>
              <FaExclamationTriangle className="w-8 h-8 text-red-500" />
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
            <div className="lg:w-40">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Reconciled">Reconciled</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Account</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Bank Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Statement Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Bank Balance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">System Balance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Difference</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedReconciliations.map((rec) => (
                  <tr key={rec.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{rec.accountNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.bankName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.statementDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.bankBalance.toLocaleString()} SAR</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.systemBalance.toLocaleString()} SAR</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                      rec.difference === 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {rec.difference === 0 ? '0' : (rec.difference > 0 ? '+' : '')}{rec.difference.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                        rec.status === 'Reconciled' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      }`}>
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredReconciliations.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredReconciliations.length / rowsPerPage)}
              page={page}
              onPageChange={(e, value) => setPage(value)}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Page;


