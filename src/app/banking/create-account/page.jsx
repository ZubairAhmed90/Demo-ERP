import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUniversity, FaArrowLeft, FaSave, FaTimes, FaBuilding, FaCreditCard } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  
  const [formData, setFormData] = useState({
    accountNumber: '',
    bankName: '',
    accountType: '',
    initialBalance: '',
    currency: 'SAR',
    branchName: '',
    branchAddress: '',
    accountHolder: '',
    iban: '',
    swiftCode: '',
    status: 'Active'
  });
  
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    }
    
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }
    
    if (!formData.accountType.trim()) {
      newErrors.accountType = 'Account type is required';
    }
    
    if (!formData.initialBalance.trim()) {
      newErrors.initialBalance = 'Initial balance is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Creating bank account:', formData);
      alert('Bank account created successfully!');
      navigate('/banking/accounts');
    }
  };

  const handleCancel = () => {
    navigate('/banking/accounts');
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/banking/accounts')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              title="Back to Bank Accounts"
            >
              <FaArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaUniversity className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Create Bank Account</h1>
                <p className="text-gray-600">Add a new bank account to the system</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaUniversity className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.accountNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="ACC-001"
                  />
                  {errors.accountNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.bankName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="ABC Bank"
                  />
                  {errors.bankName && (
                    <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.accountType ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Account Type</option>
                    <option value="Current">Current Account</option>
                    <option value="Savings">Savings Account</option>
                    <option value="Fixed Deposit">Fixed Deposit</option>
                    <option value="Credit">Credit Account</option>
                  </select>
                  {errors.accountType && (
                    <p className="text-red-500 text-sm mt-1">{errors.accountType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial Balance <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="initialBalance"
                    value={formData.initialBalance}
                    onChange={handleInputChange}
                    step="0.01"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.initialBalance ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.initialBalance && (
                    <p className="text-red-500 text-sm mt-1">{errors.initialBalance}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="SAR">SAR (Saudi Riyal)</option>
                    <option value="USD">USD (US Dollar)</option>
                    <option value="EUR">EUR (Euro)</option>
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
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaBuilding className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Bank Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Main Branch"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Holder
                  </label>
                  <input
                    type="text"
                    name="accountHolder"
                    value={formData.accountHolder}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Company Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IBAN
                  </label>
                  <input
                    type="text"
                    name="iban"
                    value={formData.iban}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="SA1234567890123456789012"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SWIFT Code
                  </label>
                  <input
                    type="text"
                    name="swiftCode"
                    value={formData.swiftCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ABCDSAJE"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch Address
                  </label>
                  <textarea
                    name="branchAddress"
                    value={formData.branchAddress}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter branch address"
                  />
                </div>
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
                <span>Create Account</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Page;


