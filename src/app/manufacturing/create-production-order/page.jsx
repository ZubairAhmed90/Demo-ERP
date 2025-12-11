import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaIndustry, FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';

const products = [
  { code: 'ITEM-001', name: 'Laptop Computer', bomCode: 'BOM-001' },
  { code: 'ITEM-002', name: 'Office Chair', bomCode: 'BOM-002' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  
  const [formData, setFormData] = useState({
    orderNumber: '',
    productCode: '',
    productName: '',
    bomCode: '',
    quantity: '',
    startDate: '',
    endDate: '',
    assignedTo: '',
    status: 'Planned'
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'productCode') {
        const product = products.find(p => p.code === value);
        if (product) {
          updated.productName = product.name;
          updated.bomCode = product.bomCode;
        }
      }
      return updated;
    });
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.productCode.trim()) {
      newErrors.productCode = 'Product is required';
    }
    
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Valid quantity is required';
    }
    
    if (!formData.startDate.trim()) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate.trim()) {
      newErrors.endDate = 'End date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Creating production order:', formData);
      alert('Production order created successfully!');
      navigate('/manufacturing/production-orders');
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/manufacturing/production-orders')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Create Production Order</h1>
                <p className="text-gray-600">Create a new manufacturing production order</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product <span className="text-red-500">*</span>
                </label>
                <select
                  name="productCode"
                  value={formData.productCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.productCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                >
                  <option value="">Select product</option>
                  {products.map(product => (
                    <option key={product.code} value={product.code}>
                      {product.code} - {product.name}
                    </option>
                  ))}
                </select>
                {errors.productCode && (
                  <p className="mt-1 text-sm text-red-500">{errors.productCode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BOM Code
                </label>
                <input
                  type="text"
                  value={formData.bomCode}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.quantity ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>
                )}
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
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.startDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
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
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.endDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned To
                </label>
                <input
                  type="text"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter team or person name"
                />
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
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/manufacturing/production-orders')}
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
                <span>Create Order</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Page;


