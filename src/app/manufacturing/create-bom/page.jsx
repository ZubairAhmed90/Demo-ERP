import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCogs, FaArrowLeft, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';

const items = [
  { code: 'ITEM-001', name: 'Processor', unit: 'PCS' },
  { code: 'ITEM-002', name: 'Memory 8GB', unit: 'PCS' },
  { code: 'ITEM-003', name: 'Hard Drive 500GB', unit: 'PCS' },
  { code: 'ITEM-004', name: 'Motherboard', unit: 'PCS' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  
  const [formData, setFormData] = useState({
    bomCode: '',
    productName: '',
    productCode: '',
    version: '1.0',
    status: 'Active'
  });

  const [components, setComponents] = useState([
    { id: 1, itemCode: '', itemName: '', quantity: 1, unit: 'PCS' }
  ]);

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

  const handleComponentChange = (id, field, value) => {
    setComponents(prev => prev.map(comp => {
      if (comp.id === id) {
        const updated = { ...comp, [field]: value };
        if (field === 'itemCode') {
          const item = items.find(i => i.code === value);
          if (item) {
            updated.itemName = item.name;
            updated.unit = item.unit;
          }
        }
        return updated;
      }
      return comp;
    }));
  };

  const addComponent = () => {
    setComponents(prev => [...prev, {
      id: Date.now(),
      itemCode: '',
      itemName: '',
      quantity: 1,
      unit: 'PCS'
    }]);
  };

  const removeComponent = (id) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.bomCode.trim()) {
      newErrors.bomCode = 'BOM code is required';
    }
    
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    
    if (!formData.productCode.trim()) {
      newErrors.productCode = 'Product code is required';
    }
    
    if (components.length === 0) {
      newErrors.components = 'At least one component is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Creating BOM:', { formData, components });
      alert('BOM created successfully!');
      navigate('/manufacturing/bom');
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/manufacturing/bom')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Create Bill of Materials</h1>
                <p className="text-gray-600">Define product structure and components</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BOM Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bomCode"
                  value={formData.bomCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.bomCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="BOM-001"
                />
                {errors.bomCode && (
                  <p className="mt-1 text-sm text-red-500">{errors.bomCode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.productName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.productName && (
                  <p className="mt-1 text-sm text-red-500">{errors.productName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="productCode"
                  value={formData.productCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.productCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.productCode && (
                  <p className="mt-1 text-sm text-red-500">{errors.productCode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Version
                </label>
                <input
                  type="text"
                  name="version"
                  value={formData.version}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Components</h3>
                <button
                  type="button"
                  onClick={addComponent}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                  style={{ backgroundColor: primaryColor }}
                >
                  <FaPlus className="w-4 h-4" />
                  <span>Add Component</span>
                </button>
              </div>
              {errors.components && (
                <p className="mb-2 text-sm text-red-500">{errors.components}</p>
              )}

              <div className="space-y-3">
                {components.map((comp, index) => (
                  <div key={comp.id} className="grid grid-cols-12 gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="col-span-12 md:col-span-4">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Item Code</label>
                      <select
                        value={comp.itemCode}
                        onChange={(e) => handleComponentChange(comp.id, 'itemCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        <option value="">Select item</option>
                        {items.map(item => (
                          <option key={item.code} value={item.code}>{item.code} - {item.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Item Name</label>
                      <input
                        type="text"
                        value={comp.itemName}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-sm"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                      <input
                        type="number"
                        value={comp.quantity}
                        onChange={(e) => handleComponentChange(comp.id, 'quantity', e.target.value)}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Unit</label>
                      <input
                        type="text"
                        value={comp.unit}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-sm"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-1 flex items-end">
                      <button
                        type="button"
                        onClick={() => removeComponent(comp.id)}
                        className="w-full p-2 text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/manufacturing/bom')}
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
                <span>Create BOM</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

