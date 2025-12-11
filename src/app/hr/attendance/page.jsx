import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaSearch, FaCalendar, FaUser, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const attendanceData = [
  { id: 1, employeeCode: 'EMP-001', employeeName: 'John Doe', date: '2024-01-15', checkIn: '09:00', checkOut: '18:00', hours: 9, status: 'Present' },
  { id: 2, employeeCode: 'EMP-002', employeeName: 'Jane Smith', date: '2024-01-15', checkIn: '08:45', checkOut: '17:30', hours: 8.75, status: 'Present' },
  { id: 3, employeeCode: 'EMP-003', employeeName: 'Mike Johnson', date: '2024-01-15', checkIn: '-', checkOut: '-', hours: 0, status: 'Absent' },
  { id: 4, employeeCode: 'EMP-004', employeeName: 'Sarah Williams', date: '2024-01-15', checkIn: '09:15', checkOut: '18:30', hours: 9.25, status: 'Late' },
  { id: 5, employeeCode: 'EMP-005', employeeName: 'David Brown', date: '2024-01-15', checkIn: '09:00', checkOut: '16:00', hours: 7, status: 'Early Leave' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const rowsPerPage = 5;

  const filteredData = attendanceData.filter((record) => {
    const matchesSearch = 
      record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employeeCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Absent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Late':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Early Leave':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
              <FaClock className="w-6 h-6" style={{ color: primaryColor }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Attendance Management</h1>
              <p className="text-gray-600">Track and manage employee attendance</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Present Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {attendanceData.filter(r => r.status === 'Present').length}
                </p>
              </div>
              <FaCheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Absent</p>
                <p className="text-2xl font-bold text-red-600">
                  {attendanceData.filter(r => r.status === 'Absent').length}
                </p>
              </div>
              <FaTimesCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Late</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {attendanceData.filter(r => r.status === 'Late').length}
                </p>
              </div>
              <FaExclamationTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-800">{attendanceData.length}</p>
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
                placeholder="Search by employee name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-40">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="Early Leave">Early Leave</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Check In</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Check Out</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Hours</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: `${primaryColor}15` }}>
                          <FaUser className="w-4 h-4" style={{ color: primaryColor }} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                          <div className="text-xs text-gray-500">{record.employeeCode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkIn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkOut}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.hours} hrs</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredData.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredData.length / rowsPerPage)}
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


