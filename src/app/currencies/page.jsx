import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDollarSign, FaPlus, FaSearch, FaEdit, FaTrash, FaExchangeAlt, FaChartLine } from 'react-icons/fa';
import { useColor } from '../../context/ColorContext.jsx';
import Layout from '../../components/Layout/Layout.jsx';
import Pagination from '../../components/pagination/Pagination.jsx';

const currencies = [
  {
    id: 1,
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: 'ر.س',
    exchangeRate: 1.0000,
    isBase: true,
    status: 'Active',
    lastUpdated: '2024-01-22 10:00 AM'
  },
  {
    id: 2,
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    exchangeRate: 3.7500,
    isBase: false,
    status: 'Active',
    lastUpdated: '2024-01-22 10:00 AM'
  },
  {
    id: 3,
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    exchangeRate: 4.1000,
    isBase: false,
    status: 'Active',
    lastUpdated: '2024-01-22 10:00 AM'
  },
  {
    id: 4,
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    exchangeRate: 4.7500,
    isBase: false,
    status: 'Active',
    lastUpdated: '2024-01-22 10:00 AM'
  },
  {
    id: 5,
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'د.إ',
    exchangeRate: 1.0200,
    isBase: false,
    status: 'Active',
    lastUpdated: '2024-01-22 10:00 AM'
  },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [currenciesList, setCurrenciesList] = useState(currencies);

  const rowsPerPage = 10;

  const filteredCurrencies = currenciesList.filter((currency) => {
    const matchesSearch = 
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || currency.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedCurrencies = filteredCurrencies.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleUpdateRate = (id) => {
    const newRate = prompt('Enter new exchange rate:');
    if (newRate && !isNaN(newRate)) {
      setCurrenciesList(prev => prev.map(curr => 
        curr.id === id ? { ...curr, exchangeRate: parseFloat(newRate), lastUpdated: new Date().toLocaleString() } : curr
      ));
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaDollarSign className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Currency Management</h1>
                <p className="text-gray-600">Manage currencies and exchange rates</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  // Update all rates from API
                  alert('Update exchange rates feature - to be implemented');
                }}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaExchangeAlt className="w-4 h-4" />
                <span>Update Rates</span>
              </button>
              <button
                onClick={() => {
                  // Add new currency
                  alert('Add currency feature - to be implemented');
                }}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: primaryColor, color: 'white' }}
              >
                <FaPlus className="w-4 h-4" />
                <span>Add Currency</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Currencies</p>
                <p className="text-2xl font-bold text-gray-800">{currenciesList.length}</p>
              </div>
              <FaDollarSign className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Base Currency</p>
                <p className="text-2xl font-bold text-gray-800">
                  {currenciesList.find(c => c.isBase)?.code || 'N/A'}
                </p>
              </div>
              <FaDollarSign className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Currencies</p>
                <p className="text-2xl font-bold text-green-600">
                  {currenciesList.filter(c => c.status === 'Active').length}
                </p>
              </div>
              <FaChartLine className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last Updated</p>
                <p className="text-sm font-bold text-gray-800">Today 10:00 AM</p>
              </div>
              <FaExchangeAlt className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search currencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Currencies Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Currency Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Currency Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Symbol</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Exchange Rate</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Base Currency</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Last Updated</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedCurrencies.map((currency) => (
                  <tr key={currency.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{currency.code}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currency.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currency.symbol}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{currency.exchangeRate.toFixed(4)}</span>
                        {!currency.isBase && (
                          <button
                            onClick={() => handleUpdateRate(currency.id)}
                            className="p-1 rounded hover:bg-gray-200"
                            title="Update Rate"
                          >
                            <FaEdit className="w-3 h-3 text-gray-500" />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {currency.isBase ? (
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Base
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{currency.lastUpdated}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        currency.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {currency.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {
                            // View exchange rate history
                            alert(`Exchange Rate History for ${currency.code}\nCurrent Rate: ${currency.exchangeRate}\nLast Updated: ${currency.lastUpdated}`);
                          }}
                          className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="View History"
                        >
                          <FaChartLine className="w-4 h-4" />
                        </button>
                        {!currency.isBase && (
                          <button 
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${currency.code}?`)) {
                                setCurrenciesList(prev => prev.filter(c => c.id !== currency.id));
                              }
                            }}
                            className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCurrencies.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredCurrencies.length / rowsPerPage)}
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

