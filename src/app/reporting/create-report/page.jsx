import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaArrowLeft, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';

const dataSources = [
  'Sales Orders',
  'Purchase Orders',
  'Inventory Items',
  'Stock Levels',
  'AP Invoices',
  'AR Invoices',
  'Journal Entries',
  'Customers',
  'Vendors',
  'Employees'
];

const categories = ['Sales', 'Inventory', 'Procurement', 'Finance', 'HR', 'Manufacturing', 'General'];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  
  const [formData, setFormData] = useState({
    reportName: '',
    category: '',
    dataSource: '',
    description: '',
    status: 'Active'
  });

  const [selectedFields, setSelectedFields] = useState([]);
  const [availableFields, setAvailableFields] = useState([
    'Date', 'Customer Name', 'Product Name', 'Quantity', 'Unit Price', 'Total Amount',
    'Status', 'Order Number', 'Invoice Number', 'Payment Status', 'Warehouse', 'Stock Level'
  ]);

  const [filters, setFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

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

  const handleAddField = (field) => {
    if (!selectedFields.includes(field)) {
      setSelectedFields(prev => [...prev, field]);
    }
  };

  const handleRemoveField = (field) => {
    setSelectedFields(prev => prev.filter(f => f !== field));
  };

  const handleAddFilter = () => {
    setFilters(prev => [...prev, { id: Date.now(), field: '', operator: 'equals', value: '' }]);
  };

  const handleRemoveFilter = (id) => {
    setFilters(prev => prev.filter(f => f.id !== id));
  };

  const handleFilterChange = (id, field, value) => {
    setFilters(prev => prev.map(f => 
      f.id === id ? { ...f, [field]: value } : f
    ));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.reportName.trim()) {
      newErrors.reportName = 'Report name is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.dataSource.trim()) {
      newErrors.dataSource = 'Data source is required';
    }
    
    if (selectedFields.length === 0) {
      newErrors.fields = 'At least one field must be selected';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Creating report:', { formData, selectedFields, filters, sorting });
      alert('Report created successfully!');
      navigate('/reporting/report-builder');
    }
  };

  const handleCancel = () => {
    navigate('/reporting/report-builder');
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
                <h1 className="text-2xl font-bold text-gray-800">Create Report</h1>
                <p className="text-gray-600">Build a custom report with your preferred fields and filters</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="reportName"
                  value={formData.reportName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.reportName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Enter report name"
                />
                {errors.reportName && (
                  <p className="mt-1 text-sm text-red-500">{errors.reportName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Source <span className="text-red-500">*</span>
                </label>
                <select
                  name="dataSource"
                  value={formData.dataSource}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.dataSource ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                >
                  <option value="">Select data source</option>
                  {dataSources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
                {errors.dataSource && (
                  <p className="mt-1 text-sm text-red-500">{errors.dataSource}</p>
                )}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter report description"
              />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Fields</h3>
              {errors.fields && (
                <p className="mb-2 text-sm text-red-500">{errors.fields}</p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Fields</label>
                  <div className="border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
                    {availableFields.map(field => (
                      <button
                        key={field}
                        type="button"
                        onClick={() => handleAddField(field)}
                        disabled={selectedFields.includes(field)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedFields.includes(field)
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white hover:bg-blue-50 border border-gray-200'
                        }`}
                      >
                        {field}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Selected Fields</label>
                  <div className="border border-gray-300 rounded-lg p-4 min-h-[200px] space-y-2">
                    {selectedFields.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-8">No fields selected</p>
                    ) : (
                      selectedFields.map((field, index) => (
                        <div key={field} className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg">
                          <span className="text-sm text-gray-700">{index + 1}. {field}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveField(field)}
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
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                <button
                  type="button"
                  onClick={handleAddFilter}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                  style={{ backgroundColor: primaryColor }}
                >
                  <FaPlus className="w-4 h-4" />
                  <span>Add Filter</span>
                </button>
              </div>

              {filters.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No filters added</p>
              ) : (
                <div className="space-y-3">
                  {filters.map(filter => (
                    <div key={filter.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <select
                        value={filter.field}
                        onChange={(e) => handleFilterChange(filter.id, 'field', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select field</option>
                        {selectedFields.map(field => (
                          <option key={field} value={field}>{field}</option>
                        ))}
                      </select>
                      <select
                        value={filter.operator}
                        onChange={(e) => handleFilterChange(filter.id, 'operator', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="equals">Equals</option>
                        <option value="not_equals">Not Equals</option>
                        <option value="contains">Contains</option>
                        <option value="greater_than">Greater Than</option>
                        <option value="less_than">Less Than</option>
                        <option value="between">Between</option>
                      </select>
                      <input
                        type="text"
                        value={filter.value}
                        onChange={(e) => handleFilterChange(filter.id, 'value', e.target.value)}
                        placeholder="Value"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFilter(filter.id)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                <span>Create Report</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

