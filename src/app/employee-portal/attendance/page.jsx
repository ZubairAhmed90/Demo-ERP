import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaCalendar, FaCheckCircle, FaTimes, FaChartLine, FaSearch } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';

const attendanceRecords = [
  { date: '2024-01-22', day: 'Monday', checkIn: '08:30', checkOut: '17:45', hours: 9.25, status: 'Present', late: false },
  { date: '2024-01-21', day: 'Sunday', checkIn: '08:15', checkOut: '17:30', hours: 9.25, status: 'Present', late: false },
  { date: '2024-01-20', day: 'Saturday', checkIn: '08:45', checkOut: '18:00', hours: 9.25, status: 'Present', late: true },
  { date: '2024-01-19', day: 'Friday', checkIn: '-', checkOut: '-', hours: 0, status: 'Weekend', late: false },
  { date: '2024-01-18', day: 'Thursday', checkIn: '08:20', checkOut: '17:40', hours: 9.33, status: 'Present', late: false },
  { date: '2024-01-17', day: 'Wednesday', checkIn: '08:25', checkOut: '17:50', hours: 9.42, status: 'Present', late: false },
  { date: '2024-01-16', day: 'Tuesday', checkIn: '08:10', checkOut: '17:35', hours: 9.42, status: 'Present', late: false },
  { date: '2024-01-15', day: 'Monday', checkIn: '-', checkOut: '-', hours: 0, status: 'Absent', late: false },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [selectedView, setSelectedView] = useState('calendar'); // 'calendar' or 'list'

  const currentMonthRecords = attendanceRecords.filter(record => 
    record.date.startsWith(selectedMonth)
  );

  const stats = {
    totalDays: currentMonthRecords.length,
    presentDays: currentMonthRecords.filter(r => r.status === 'Present').length,
    absentDays: currentMonthRecords.filter(r => r.status === 'Absent').length,
    lateDays: currentMonthRecords.filter(r => r.late).length,
    totalHours: currentMonthRecords.reduce((sum, r) => sum + r.hours, 0),
    averageHours: currentMonthRecords.filter(r => r.status === 'Present').length > 0
      ? currentMonthRecords.filter(r => r.status === 'Present').reduce((sum, r) => sum + r.hours, 0) / currentMonthRecords.filter(r => r.status === 'Present').length
      : 0,
    attendanceRate: currentMonthRecords.length > 0
      ? ((currentMonthRecords.filter(r => r.status === 'Present').length / currentMonthRecords.filter(r => r.status !== 'Weekend').length) * 100).toFixed(1)
      : 0
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Weekend': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaClock className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Attendance</h1>
                <p className="text-gray-600">Track your attendance and working hours</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2024-01">January 2024</option>
                <option value="2023-12">December 2023</option>
                <option value="2023-11">November 2023</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-800">{stats.attendanceRate}%</p>
              </div>
              <FaChartLine className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Present Days</p>
                <p className="text-2xl font-bold text-green-600">{stats.presentDays}</p>
              </div>
              <FaCheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalHours.toFixed(1)}</p>
              </div>
              <FaClock className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Late Days</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.lateDays}</p>
              </div>
              <FaClock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Attendance Calendar/List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Attendance Records</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedView('list')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedView === 'list' 
                      ? 'text-white' 
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                  }`}
                  style={selectedView === 'list' ? { backgroundColor: primaryColor } : {}}
                >
                  List View
                </button>
                <button
                  onClick={() => setSelectedView('calendar')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedView === 'calendar' 
                      ? 'text-white' 
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                  }`}
                  style={selectedView === 'calendar' ? { backgroundColor: primaryColor } : {}}
                >
                  Calendar View
                </button>
              </div>
            </div>
          </div>

          {selectedView === 'list' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Day</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Check In</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Check Out</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Hours</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentMonthRecords.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.day}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.checkIn !== '-' ? (
                          <span className={record.late ? 'text-red-600 font-medium' : 'text-gray-900'}>
                            {record.checkIn}
                            {record.late && <span className="ml-1 text-xs">(Late)</span>}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.checkOut !== '-' ? record.checkOut : <span className="text-gray-400">-</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.hours > 0 ? `${record.hours.toFixed(2)} hrs` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {/* Calendar Header */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
                  {day}
                </div>
              ))}
              {/* Calendar Days */}
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const dateStr = `${selectedMonth}-${String(day).padStart(2, '0')}`;
                const record = attendanceRecords.find(r => r.date === dateStr);
                const isWeekend = record?.status === 'Weekend';
                const isPresent = record?.status === 'Present';
                const isAbsent = record?.status === 'Absent';
                
                return (
                  <div
                    key={day}
                    className={`p-2 border border-gray-200 rounded-lg text-center min-h-[60px] flex flex-col items-center justify-center ${
                      isPresent ? 'bg-green-50 border-green-200' :
                      isAbsent ? 'bg-red-50 border-red-200' :
                      isWeekend ? 'bg-gray-50 border-gray-200' :
                      'bg-white'
                    }`}
                  >
                    <span className={`text-sm font-medium ${
                      isPresent ? 'text-green-800' :
                      isAbsent ? 'text-red-800' :
                      'text-gray-600'
                    }`}>
                      {day}
                    </span>
                    {record && (
                      <div className="mt-1">
                        {isPresent && (
                          <div className="text-xs">
                            <div className="text-green-700">{record.checkIn}</div>
                            {record.late && <span className="text-red-600">Late</span>}
                          </div>
                        )}
                        {isAbsent && (
                          <span className="text-xs text-red-600">Absent</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Average Daily Hours</p>
              <p className="text-2xl font-bold text-gray-800">{stats.averageHours.toFixed(2)} hrs</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Working Days</p>
              <p className="text-2xl font-bold text-gray-800">{stats.presentDays} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Absent Days</p>
              <p className="text-2xl font-bold text-red-600">{stats.absentDays} days</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;


