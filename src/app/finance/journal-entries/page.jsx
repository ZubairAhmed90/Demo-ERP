import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaPlus, FaSearch, FaEdit, FaCheck, FaTimes, FaCalendar, FaFilter } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const journalEntries = [
  { 
    id: 1, 
    entryNumber: 'JE-2024-001', 
    date: '2024-01-15', 
    description: 'Sales Revenue Entry',
    reference: 'SO-001',
    totalDebit: 10000,
    totalCredit: 10000,
    status: 'Posted',
    postedBy: 'Admin',
    postedDate: '2024-01-15'
  },
  { 
    id: 2, 
    entryNumber: 'JE-2024-002', 
    date: '2024-01-14', 
    description: 'Purchase Expense Entry',
    reference: 'PO-001',
    totalDebit: 5000,
    totalCredit: 5000,
    status: 'Posted',
    postedBy: 'Admin',
    postedDate: '2024-01-14'
  },
  { 
    id: 3, 
    entryNumber: 'JE-2024-003', 
    date: '2024-01-13', 
    description: 'Salary Payment Entry',
    reference: 'PAY-001',
    totalDebit: 15000,
    totalCredit: 15000,
    status: 'Draft',
    postedBy: '-',
    postedDate: '-'
  },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const rowsPerPage = 5;

  const filteredEntries = journalEntries.filter((entry) => {
    const matchesSearch = 
      entry.entryNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || entry.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedEntries = filteredEntries.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaFileAlt className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Journal Entries</h1>
                <p className="text-gray-600">Create and manage accounting journal entries</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/finance/create-journal-entry')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>New Entry</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold text-gray-800">{journalEntries.length}</p>
              </div>
              <FaFileAlt className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Posted</p>
                <p className="text-2xl font-bold text-green-600">
                  {journalEntries.filter(e => e.status === 'Posted').length}
                </p>
              </div>
              <FaCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {journalEntries.filter(e => e.status === 'Draft').length}
                </p>
              </div>
              <FaTimes className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-800">
                  {journalEntries.reduce((sum, e) => sum + e.totalDebit, 0).toLocaleString()} SAR
                </p>
              </div>
              <FaFileAlt className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by entry number, description, or reference..."
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
                <option value="Posted">Posted</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Entry #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Reference</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Debit</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Total Credit</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{entry.entryNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{entry.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.reference}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {entry.totalDebit.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {entry.totalCredit.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                        entry.status === 'Posted' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <FaEdit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredEntries.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredEntries.length / rowsPerPage)}
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


