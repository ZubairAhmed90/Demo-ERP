import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaArrowLeft, FaSave, FaTimes, FaPlus, FaTrash, FaEnvelope } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';

const availableReports = [
  'Monthly Sales Summary',
  'Weekly Inventory Report',
  'Daily Financial Dashboard',
  'Vendor Payment Summary',
  'Customer Aging Report',
  'Production Performance Report'
];

const scheduleTypes = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

const formats = ['PDF', 'Excel', 'CSV', 'HTML'];

const recipients = [
  'admin@company.com',
  'finance@company.com',
  'sales@company.com',
  'procurement@company.com',
  'hr@company.com'
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  
  const [formData, setFormData] = useState({
    reportName: '',
    scheduleType: 'Monthly',
    frequency: '',
    time: '08:00',
    format: 'PDF',
    status: 'Active'
  });

  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [customRecipient, setCustomRecipient] = useState('');

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddRecipient = (email) => {
    if (email && !selectedRecipients.includes(email)) {
      setSelectedRecipients(prev => [...prev, email]);
      setCustomRecipient('');
    }
  };

  const handleRemoveRecipient = (email) => {
    setSelectedRecipients(prev => prev.filter(r => r !== email));
  };

  const getFrequencyOptions = () => {
    switch (formData.scheduleType) {
      case 'Daily':
        return ['Every day', 'Weekdays only', 'Weekends only'];
      case 'Weekly':
        return ['Every Monday', 'Every Tuesday', 'Every Wednesday', 'Every Thursday', 'Every Friday', 'Every Saturday', 'Every Sunday'];
      case 'Monthly':
        return ['1st of month', '15th of month', 'Last day of month'];
      case 'Quarterly':
        return ['1st day of quarter', 'Last day of quarter'];
      case 'Yearly':
        return ['1st of January', 'Last day of December'];
      default:
        return [];
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.reportName.trim()) {
      newErrors.reportName = 'Report name is required';
    }
    
    if (!formData.frequency.trim()) {
      newErrors.frequency = 'Frequency is required';
    }
    
    if (selectedRecipients.length === 0) {
      newErrors.recipients = 'At least one recipient is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Creating scheduled report:', { formData, selectedRecipients });
      alert('Scheduled report created successfully!');
      navigate('/reporting/scheduled-reports');
    }
  };

  const handleCancel = () => {
    navigate('/reporting/scheduled-reports');
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCancel}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Schedule Report</h1>
                <p className="text-gray-600">Configure automated report generation and distribution</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Name <span className="text-red-500">*</span>
                </label>
                <select
                  name="reportName"
                  value={formData.reportName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.reportName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                >
                  <option value="">Select report</option>
                  {availableReports.map(report => (
                    <option key={report} value={report}>{report}</option>
                  ))}
                </select>
                {errors.reportName && (
                  <p className="mt-1 text-sm text-red-500">{errors.reportName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="scheduleType"
                  value={formData.scheduleType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {scheduleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency <span className="text-red-500">*</span>
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.frequency ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                >
                  <option value="">Select frequency</option>
                  {getFrequencyOptions().map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.frequency && (
                  <p className="mt-1 text-sm text-red-500">{errors.frequency}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <select
                  name="format"
                  value={formData.format}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {formats.map(format => (
                    <option key={format} value={format}>{format}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                </select>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Recipients</h3>
                {errors.recipients && (
                  <p className="text-sm text-red-500">{errors.recipients}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Recipients</label>
                  <div className="border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
                    {recipients.map(email => (
                      <button
                        key={email}
                        type="button"
                        onClick={() => handleAddRecipient(email)}
                        disabled={selectedRecipients.includes(email)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedRecipients.includes(email)
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white hover:bg-blue-50 border border-gray-200'
                        }`}
                      >
                        <FaEnvelope className="inline w-4 h-4 mr-2" />
                        {email}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Selected Recipients</label>
                  <div className="border border-gray-300 rounded-lg p-4 min-h-[200px] space-y-2">
                    {selectedRecipients.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-8">No recipients selected</p>
                    ) : (
                      selectedRecipients.map(email => (
                        <div key={email} className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg">
                          <span className="text-sm text-gray-700 flex items-center">
                            <FaEnvelope className="w-4 h-4 mr-2" />
                            {email}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveRecipient(email)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Custom Email</label>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    value={customRecipient}
                    onChange={(e) => setCustomRecipient(e.target.value)}
                    placeholder="Enter email address"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddRecipient(customRecipient)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <FaPlus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaTimes className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                <FaSave className="w-4 h-4" />
                <span>Schedule Report</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

