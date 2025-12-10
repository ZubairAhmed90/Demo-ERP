import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaArrowLeft, FaSave, FaTimes, FaUser, FaClock } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  
  const [formData, setFormData] = useState({
    employeeCode: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    days: 0
  });
  
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Calculate days if dates are selected
    if ((name === 'startDate' || name === 'endDate') && formData.startDate && formData.endDate) {
      const start = new Date(name === 'startDate' ? value : formData.startDate);
      const end = new Date(name === 'endDate' ? value : formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setFormData(prev => ({ ...prev, days: diffDays > 0 ? diffDays : 0 }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.employeeCode.trim()) {
      newErrors.employeeCode = 'Employee is required';
    }
    
    if (!formData.leaveType.trim()) {
      newErrors.leaveType = 'Leave type is required';
    }
    
    if (!formData.startDate.trim()) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate.trim()) {
      newErrors.endDate = 'End date is required';
    }
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Creating leave request:', formData);
      alert('Leave request created successfully!');
      navigate('/hr/leave-management');
    }
  };

  const handleCancel = () => {
    navigate('/hr/leave-management');
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/hr/leave-management')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              title="Back to Leave Management"
            >
              <FaArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaCalendarAlt className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Create Leave Request</h1>
                <p className="text-gray-600">Submit a new leave request</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaUser className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Employee Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="employeeCode"
                    value={formData.employeeCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.employeeCode ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Employee</option>
                    <option value="EMP-001">EMP-001 - John Doe</option>
                    <option value="EMP-002">EMP-002 - Jane Smith</option>
                    <option value="EMP-003">EMP-003 - Mike Johnson</option>
                    <option value="EMP-004">EMP-004 - Sarah Williams</option>
                  </select>
                  {errors.employeeCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.employeeCode}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaCalendarAlt className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Leave Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leave Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.leaveType ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Personal Leave">Personal Leave</option>
                    <option value="Emergency Leave">Emergency Leave</option>
                    <option value="Maternity Leave">Maternity Leave</option>
                    <option value="Paternity Leave">Paternity Leave</option>
                  </select>
                  {errors.leaveType && (
                    <p className="text-red-500 text-sm mt-1">{errors.leaveType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Days
                  </label>
                  <input
                    type="number"
                    value={formData.days}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.startDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.endDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.endDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaClock className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Additional Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.reason ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Please provide a reason for your leave request..."
                />
                {errors.reason && (
                  <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2"
              >
                <FaTimes className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2 hover:shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                <FaSave className="w-4 h-4" />
                <span>Submit Request</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

