import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaComments, FaSearch, FaFilter, FaEnvelope, FaPhone, FaCalendar, FaUser } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const communications = [
  { id: 1, date: '2024-01-20 14:30', customer: 'ABC Corporation', contact: 'John Smith', type: 'Email', subject: 'Product Inquiry', direction: 'Incoming', status: 'Read', notes: 'Customer interested in new product line' },
  { id: 2, date: '2024-01-19 10:15', customer: 'XYZ Industries', contact: 'Jane Doe', type: 'Phone', subject: 'Follow-up Call', direction: 'Outgoing', status: 'Completed', notes: 'Discussed pricing and delivery terms' },
  { id: 3, date: '2024-01-18 16:45', customer: 'Tech Solutions Ltd', contact: 'Mike Johnson', type: 'Meeting', subject: 'Product Demo', direction: 'Outgoing', status: 'Scheduled', notes: 'Scheduled for next week' },
  { id: 4, date: '2024-01-17 09:20', customer: 'ABC Corporation', contact: 'John Smith', type: 'Email', subject: 'Quote Request', direction: 'Incoming', status: 'Read', notes: 'Requested quote for bulk order' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDirection, setSelectedDirection] = useState('all');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredCommunications = communications.filter((comm) => {
    const matchesSearch = 
      comm.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || comm.type === selectedType;
    const matchesDirection = selectedDirection === 'all' || comm.direction === selectedDirection;
    return matchesSearch && matchesType && matchesDirection;
  });

  const paginatedCommunications = filteredCommunications.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Email': return <FaEnvelope className="w-4 h-4" />;
      case 'Phone': return <FaPhone className="w-4 h-4" />;
      case 'Meeting': return <FaCalendar className="w-4 h-4" />;
      default: return <FaComments className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaComments className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Communication History</h1>
                <p className="text-gray-600">Track all customer interactions and communications</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Communications</p>
                <p className="text-2xl font-bold text-gray-800">{communications.length}</p>
              </div>
              <FaComments className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emails</p>
                <p className="text-2xl font-bold text-blue-600">
                  {communications.filter(c => c.type === 'Email').length}
                </p>
              </div>
              <FaEnvelope className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Phone Calls</p>
                <p className="text-2xl font-bold text-green-600">
                  {communications.filter(c => c.type === 'Phone').length}
                </p>
              </div>
              <FaPhone className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Meetings</p>
                <p className="text-2xl font-bold text-purple-600">
                  {communications.filter(c => c.type === 'Meeting').length}
                </p>
              </div>
              <FaCalendar className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by customer or subject..."
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
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Meeting">Meeting</option>
              </select>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedDirection}
                onChange={(e) => setSelectedDirection(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Directions</option>
                <option value="Incoming">Incoming</option>
                <option value="Outgoing">Outgoing</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Direction</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedCommunications.map((comm) => (
                  <tr key={comm.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{comm.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{comm.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{comm.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(comm.type)}
                        <span className="text-sm text-gray-900">{comm.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{comm.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        comm.direction === 'Incoming' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {comm.direction}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        comm.status === 'Read' || comm.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {comm.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{comm.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCommunications.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredCommunications.length / rowsPerPage)}
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

