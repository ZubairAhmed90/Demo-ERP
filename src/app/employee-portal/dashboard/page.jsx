import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMoneyBillWave, FaCalendarAlt, FaClock, FaChartLine, FaFileAlt, FaCheckCircle, FaHourglassHalf, FaTimes } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();

  // Sample employee data
  const employeeData = {
    name: 'Ahmed Ali',
    employeeId: 'EMP-001',
    department: 'Sales',
    position: 'Sales Executive',
    email: 'ahmed.ali@company.com',
    phone: '+966-50-123-4567',
    joinDate: '2023-01-15',
    status: 'Active'
  };

  const stats = {
    totalLeaves: 25,
    usedLeaves: 8,
    pendingLeaves: 2,
    balanceLeaves: 15,
    attendanceThisMonth: 22,
    totalDays: 23,
    attendanceRate: 95.7,
    lastSalary: 15000,
    nextPayroll: '2024-02-01'
  };

  const recentLeaves = [
    { id: 1, type: 'Annual Leave', startDate: '2024-01-25', endDate: '2024-01-27', days: 3, status: 'Approved', appliedDate: '2024-01-20' },
    { id: 2, type: 'Sick Leave', startDate: '2024-01-15', endDate: '2024-01-15', days: 1, status: 'Pending', appliedDate: '2024-01-14' },
    { id: 3, type: 'Personal Leave', startDate: '2024-01-10', endDate: '2024-01-10', days: 1, status: 'Approved', appliedDate: '2024-01-08' },
  ];

  const recentPayslips = [
    { id: 1, month: 'January 2024', grossSalary: 15000, netSalary: 13500, status: 'Paid', date: '2024-01-31' },
    { id: 2, month: 'December 2023', grossSalary: 15000, netSalary: 13500, status: 'Paid', date: '2023-12-31' },
    { id: 3, month: 'November 2023', grossSalary: 15000, netSalary: 13500, status: 'Paid', date: '2023-11-30' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaUser className="w-8 h-8" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome, {employeeData.name}</h1>
                <p className="text-gray-600">{employeeData.position} • {employeeData.department}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Employee ID</p>
              <p className="text-lg font-semibold text-gray-800">{employeeData.employeeId}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/employee-portal/payslips')}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Last Salary</p>
                <p className="text-2xl font-bold text-gray-800">{stats.lastSalary.toLocaleString()} SAR</p>
              </div>
              <FaMoneyBillWave className="w-8 h-8" style={{ color: primaryColor }} />
            </div>
            <p className="text-xs text-gray-500">Next payroll: {stats.nextPayroll}</p>
          </div>

          <div 
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/employee-portal/leaves')}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Leave Balance</p>
                <p className="text-2xl font-bold text-gray-800">{stats.balanceLeaves} days</p>
              </div>
              <FaCalendarAlt className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-xs text-gray-500">{stats.usedLeaves} used • {stats.pendingLeaves} pending</p>
          </div>

          <div 
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/employee-portal/attendance')}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-800">{stats.attendanceRate}%</p>
              </div>
              <FaClock className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-xs text-gray-500">{stats.attendanceThisMonth}/{stats.totalDays} days this month</p>
          </div>

          <div 
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/employee-portal/profile')}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Profile</p>
                <p className="text-2xl font-bold text-gray-800">Complete</p>
              </div>
              <FaUser className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-xs text-gray-500">View & update profile</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Leave Requests */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Leave Requests</h2>
              <button
                onClick={() => navigate('/employee-portal/leaves')}
                className="text-sm font-medium transition-colors"
                style={{ color: primaryColor }}
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentLeaves.map((leave) => (
                <div key={leave.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{leave.type}</p>
                      <p className="text-sm text-gray-500">
                        {leave.startDate} {leave.startDate !== leave.endDate && `- ${leave.endDate}`}
                      </p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{leave.days} day(s)</span>
                    <span>Applied: {leave.appliedDate}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/hr/create-leave-request')}
              className="w-full mt-4 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              Request New Leave
            </button>
          </div>

          {/* Recent Payslips */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Payslips</h2>
              <button
                onClick={() => navigate('/employee-portal/payslips')}
                className="text-sm font-medium transition-colors"
                style={{ color: primaryColor }}
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentPayslips.map((payslip) => (
                <div 
                  key={payslip.id} 
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/employee-portal/payslips/${payslip.id}`)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{payslip.month}</p>
                      <p className="text-sm text-gray-500">Paid on {payslip.date}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payslip.status)}`}>
                      {payslip.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Gross Salary</p>
                      <p className="text-sm font-semibold text-gray-700">{payslip.grossSalary.toLocaleString()} SAR</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Net Salary</p>
                      <p className="text-sm font-semibold text-green-600">{payslip.netSalary.toLocaleString()} SAR</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/employee-portal/payslips')}
              className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              View All Payslips
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/hr/create-leave-request')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaCalendarAlt className="w-6 h-6 mb-2" style={{ color: primaryColor }} />
              <span className="text-sm font-medium text-gray-700">Request Leave</span>
            </button>
            <button
              onClick={() => navigate('/employee-portal/attendance')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaClock className="w-6 h-6 mb-2" style={{ color: primaryColor }} />
              <span className="text-sm font-medium text-gray-700">View Attendance</span>
            </button>
            <button
              onClick={() => navigate('/employee-portal/payslips')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaFileAlt className="w-6 h-6 mb-2" style={{ color: primaryColor }} />
              <span className="text-sm font-medium text-gray-700">View Payslips</span>
            </button>
            <button
              onClick={() => navigate('/employee-portal/profile')}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaUser className="w-6 h-6 mb-2" style={{ color: primaryColor }} />
              <span className="text-sm font-medium text-gray-700">My Profile</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

