import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLightbulb, FaPlus, FaSearch, FaEdit, FaEye, FaCheck, FaTimes, FaUser, FaDollarSign } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const leads = [
  { id: 1, leadNumber: 'LEAD-001', companyName: 'New Tech Corp', contactPerson: 'Sarah Williams', email: 'sarah@newtech.com', phone: '+966-50-456-7890', source: 'Website', status: 'Qualified', estimatedValue: 75000, probability: 70, assignedTo: 'Ahmed Ali', createdDate: '2024-01-15' },
  { id: 2, leadNumber: 'LEAD-002', companyName: 'Global Services', contactPerson: 'David Brown', email: 'david@globalserv.com', phone: '+966-50-567-8901', source: 'Referral', status: 'Contacted', estimatedValue: 50000, probability: 50, assignedTo: 'Fatima Hassan', createdDate: '2024-01-14' },
  { id: 3, leadNumber: 'LEAD-003', companyName: 'Innovation Labs', contactPerson: 'Emily Davis', email: 'emily@innolabs.com', phone: '+966-50-678-9012', source: 'Trade Show', status: 'New', estimatedValue: 100000, probability: 30, assignedTo: 'Mohammed Saleh', createdDate: '2024-01-13' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.leadNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedLeads = filteredLeads.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalValue = leads.reduce((sum, l) => sum + l.estimatedValue, 0);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaLightbulb className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Leads</h1>
                <p className="text-gray-600">Manage sales leads and opportunities</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/crm/create-lead')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-800">{leads.length}</p>
              </div>
              <FaLightbulb className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Qualified</p>
                <p className="text-2xl font-bold text-green-600">
                  {leads.filter(l => l.status === 'Qualified').length}
                </p>
              </div>
              <FaCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-800">{totalValue.toLocaleString()} SAR</p>
              </div>
              <FaDollarSign className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Probability</p>
                <p className="text-2xl font-bold text-gray-800">
                  {Math.round(leads.reduce((sum, l) => sum + l.probability, 0) / leads.length)}%
                </p>
              </div>
              <FaUser className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by company name, lead number, or contact..."
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
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Lead #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Contact Person</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Source</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Estimated Value</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Probability</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Assigned To</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{lead.leadNumber}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{lead.companyName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.contactPerson}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {lead.estimatedValue.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-24">
                          <div
                            className={`h-2 rounded-full ${
                              lead.probability >= 70 ? 'bg-green-500' :
                              lead.probability >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${lead.probability}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-900">{lead.probability}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.assignedTo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        lead.status === 'Qualified' 
                          ? 'bg-green-100 text-green-800' 
                          : lead.status === 'Contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors" title="Convert to Customer">
                          <FaCheck className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors">
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

        {filteredLeads.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredLeads.length / rowsPerPage)}
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

