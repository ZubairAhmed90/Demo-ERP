import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAddressBook, FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const contacts = [
  { id: 1, contactCode: 'CNT-001', firstName: 'John', lastName: 'Smith', email: 'john.smith@abccorp.com', phone: '+966-50-123-4567', company: 'ABC Corporation', position: 'CEO', department: 'Executive', status: 'Active' },
  { id: 2, contactCode: 'CNT-002', firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@xyz.com', phone: '+966-50-234-5678', company: 'XYZ Industries', position: 'Procurement Manager', department: 'Procurement', status: 'Active' },
  { id: 3, contactCode: 'CNT-003', firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@techsol.com', phone: '+966-50-345-6789', company: 'Tech Solutions Ltd', position: 'IT Director', department: 'IT', status: 'Active' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const companies = ['all', ...new Set(contacts.map(c => c.company))];

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = 
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.contactCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompany = selectedCompany === 'all' || contact.company === selectedCompany;
    return matchesSearch && matchesCompany;
  });

  const paginatedContacts = filteredContacts.slice(
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
                <FaAddressBook className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
                <p className="text-gray-600">Manage customer and vendor contacts</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/crm/create-contact')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Contact</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-800">{contacts.length}</p>
              </div>
              <FaAddressBook className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Contacts</p>
                <p className="text-2xl font-bold text-green-600">
                  {contacts.filter(c => c.status === 'Active').length}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Companies</p>
                <p className="text-2xl font-bold text-gray-800">{companies.length - 1}</p>
              </div>
              <FaBuilding className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-800">
                  {new Set(contacts.map(c => c.department)).size}
                </p>
              </div>
              <FaBuilding className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, code, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {companies.map(comp => (
                  <option key={comp} value={comp}>
                    {comp === 'all' ? 'All Companies' : comp}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Contact Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Position</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{contact.contactCode}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {contact.firstName} {contact.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <FaEnvelope className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-900">{contact.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <FaPhone className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-900">{contact.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        contact.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors">
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
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

        {filteredContacts.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredContacts.length / rowsPerPage)}
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


