import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSave, FaEdit, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaBriefcase, FaCalendar, FaBuilding } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Ahmed',
    lastName: 'Ali',
    employeeId: 'EMP-001',
    email: 'ahmed.ali@company.com',
    phone: '+966-50-123-4567',
    alternatePhone: '+966-50-987-6543',
    address: '123 Main Street, Riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    dateOfBirth: '1990-05-15',
    nationalId: '1234567890',
    department: 'Sales',
    position: 'Sales Executive',
    manager: 'Mohammed Saleh',
    joinDate: '2023-01-15',
    employmentType: 'Full Time',
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

  const handleSave = () => {
    // Validate and save
    console.log('Saving profile:', formData);
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaUser className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
                <p className="text-gray-600">View and update your personal information</p>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <FaEdit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  <FaSave className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.lastName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaEnvelope className="inline w-4 h-4 mr-1" />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaPhone className="inline w-4 h-4 mr-1" />
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alternate Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.alternatePhone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.dateOfBirth}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaIdCard className="inline w-4 h-4 mr-1" />
                National ID
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.nationalId}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Address Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaMapMarkerAlt className="inline w-4 h-4 mr-1" />
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.address}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.country}</p>
              )}
            </div>
          </div>
        </div>

        {/* Employment Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Employment Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID
              </label>
              <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.employeeId}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaBriefcase className="inline w-4 h-4 mr-1" />
                Department
              </label>
              <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.department}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.position}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manager
              </label>
              <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.manager}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaCalendar className="inline w-4 h-4 mr-1" />
                Join Date
              </label>
              <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.joinDate}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment Type
              </label>
              <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{formData.employmentType}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                {formData.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;


