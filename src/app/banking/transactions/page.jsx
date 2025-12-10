import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExchangeAlt, FaSearch, FaArrowDown, FaArrowUp, FaFilter, FaCalendar } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const transactions = [
  { id: 1, transactionNumber: 'TXN-001', accountNumber: 'ACC-001', type: 'Credit', amount: 50000, description: 'Payment from Customer', date: '2024-01-15', status: 'Completed' },
  { id: 2, transactionNumber: 'TXN-002', accountNumber: 'ACC-002', type: 'Debit', amount: 25000, description: 'Vendor Payment', date: '2024-01-14', status: 'Completed' },
  { id: 3, transactionNumber: 'TXN-003', accountNumber: 'ACC-001', type: 'Credit', amount: 30000, description: 'Sales Revenue', date: '2024-01-13', status: 'Pending' },
  { id: 4, transactionNumber: 'TXN-004', accountNumber: 'ACC-003', type: 'Debit', amount: 15000, description: 'Salary Payment', date: '2024-01-12', status: 'Completed' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const rowsPerPage = 5;

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = 
      txn.transactionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.accountNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || txn.type === selectedType;
    return matchesSearch && matchesType;
  });

  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalCredit = transactions.filter(t => t.type === 'Credit').reduce((sum, t) => sum + t.amount, 0);
  const totalDebit = transactions.filter(t => t.type === 'Debit').reduce((sum, t) => sum + t.amount, 0);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
              <FaExchangeAlt className="w-6 h-6" style={{ color: primaryColor }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Bank Transactions</h1>
              <p className="text-gray-600">View and manage bank transactions</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Credit</p>
                <p className="text-2xl font-bold text-green-600">{totalCredit.toLocaleString()} SAR</p>
              </div>
              <FaArrowDown className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Debit</p>
                <p className="text-2xl font-bold text-red-600">{totalDebit.toLocaleString()} SAR</p>
              </div>
              <FaArrowUp className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Balance</p>
                <p className="text-2xl font-bold text-gray-800">{(totalCredit - totalDebit).toLocaleString()} SAR</p>
              </div>
              <FaExchangeAlt className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-800">{transactions.length}</p>
              </div>
              <FaExchangeAlt className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by transaction number, description, or account..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-40">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>
            </div>
            <div className="lg:w-40">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                placeholder="From Date"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-40">
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                placeholder="To Date"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Transaction #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Account</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{txn.transactionNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.accountNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        txn.type === 'Credit' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {txn.type === 'Credit' ? <FaArrowDown className="w-3 h-3 mr-1" /> : <FaArrowUp className="w-3 h-3 mr-1" />}
                        {txn.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                      txn.type === 'Credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {txn.type === 'Credit' ? '+' : '-'}{txn.amount.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{txn.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                        txn.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredTransactions.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredTransactions.length / rowsPerPage)}
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

