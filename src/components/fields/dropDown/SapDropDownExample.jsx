import React, { useState } from 'react';
import SapDropDown from './sapDropDown.jsx';
import UserDropdown from './userDropdown.jsx';
import SapCopyFromDropDown from './sapCopyFromDropDown.jsx';
import { useColor } from '../../../context/ColorContext.jsx';

const SapDropDownExample = () => {
  const { primaryColor, secondaryColor } = useColor();
  
  // Sample data for examples
  const sampleOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' }
  ];

  const customerOptions = [
    { value: 'C001', label: 'ABC Corporation' },
    { value: 'C002', label: 'XYZ Industries' },
    { value: 'C003', label: 'Tech Solutions Ltd' },
    { value: 'C004', label: 'Global Enterprises' },
    { value: 'C005', label: 'Innovation Corp' }
  ];

  const vendorOptions = [
    { value: 'V001', label: 'ABC Suppliers' },
    { value: 'V002', label: 'XYZ Manufacturing' },
    { value: 'V003', label: 'Tech Parts Ltd' },
    { value: 'V004', label: 'Quality Materials' },
    { value: 'V005', label: 'Premium Vendors' }
  ];

  // State for examples
  const [singleValue, setSingleValue] = useState('');
  const [multipleValues, setMultipleValues] = useState([]);
  const [userDropdownValue, setUserDropdownValue] = useState('');
  const [copyFromValue, setCopyFromValue] = useState('');

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Modern Dropdown Components</h1>
        <p className="text-gray-600">Showcasing the updated design system for dropdown components</p>
      </div>

      {/* Basic Dropdown Examples */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Single Select Dropdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            Single Select Dropdown
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Default Variant</h3>
              <SapDropDown
                label="Select Customer"
                options={customerOptions}
                value={singleValue}
                onChange={(option) => setSingleValue(option.value)}
                placeholder="Choose a customer"
                required
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Outlined Variant</h3>
              <SapDropDown
                label="Select Vendor"
                options={vendorOptions}
                value={singleValue}
                onChange={(option) => setSingleValue(option.value)}
                placeholder="Choose a vendor"
                variant="outlined"
              />
            </div>
          </div>
        </div>

        {/* Multiple Select Dropdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Multiple Select Dropdown
          </h2>
          
          <div className="space-y-4">
            <SapDropDown
              label="Select Multiple Options"
              options={sampleOptions}
              value={multipleValues}
              onChange={setMultipleValues}
              placeholder="Choose multiple options"
              multiple={true}
              searchable={true}
              required
            />
            
            {multipleValues.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Selected Values:</h4>
                <div className="flex flex-wrap gap-2">
                  {multipleValues.map((option, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm">
                      {option.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Different Sizes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            Different Sizes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Small Size</h3>
              <SapDropDown
                label="Small Dropdown"
                options={sampleOptions}
                value={singleValue}
                onChange={(option) => setSingleValue(option.value)}
                placeholder="Small size"
                size="small"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Medium Size</h3>
              <SapDropDown
                label="Medium Dropdown"
                options={sampleOptions}
                value={singleValue}
                onChange={(option) => setSingleValue(option.value)}
                placeholder="Medium size"
                size="medium"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Large Size</h3>
              <SapDropDown
                label="Large Dropdown"
                options={sampleOptions}
                value={singleValue}
                onChange={(option) => setSingleValue(option.value)}
                placeholder="Large size"
                size="large"
              />
            </div>
          </div>
        </div>

        {/* User Dropdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
            User Dropdown Component
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Default User Dropdown</h3>
              <UserDropdown
                label="Select User"
                dropdownValue={userDropdownValue}
                handleDropdownChange={(e) => setUserDropdownValue(e.target.value)}
                options={customerOptions}
                placeholder="Choose a user"
                searchable={true}
                required
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">With Success State</h3>
              <UserDropdown
                label="User with Success"
                dropdownValue={userDropdownValue}
                handleDropdownChange={(e) => setUserDropdownValue(e.target.value)}
                options={customerOptions}
                placeholder="Choose a user"
                success="User selected successfully!"
              />
            </div>
          </div>
        </div>

        {/* Copy From Dropdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
            Copy From Dropdown Component
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Default Copy From</h3>
              <SapCopyFromDropDown
                options={['Purchase Order', 'Sales Order', 'Invoice', 'Credit Memo']}
                onOptionSelect={(option) => setCopyFromValue(option)}
                placeholder="Copy from document"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Small Size Copy From</h3>
              <SapCopyFromDropDown
                options={['Customer', 'Vendor', 'Product', 'Warehouse']}
                onOptionSelect={(option) => setCopyFromValue(option)}
                placeholder="Copy from entity"
                size="small"
              />
            </div>
          </div>
          
          {copyFromValue && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Selected Copy From:</h4>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm">
                {copyFromValue}
              </span>
            </div>
          )}
        </div>

        {/* Error States */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
            Error States
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">With Error Message</h3>
              <SapDropDown
                label="Required Field"
                options={sampleOptions}
                value={singleValue}
                onChange={(option) => setSingleValue(option.value)}
                placeholder="This field is required"
                error={true}
                errorMessage="Please select an option"
                required
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">User Dropdown with Error</h3>
              <UserDropdown
                label="User with Error"
                dropdownValue={userDropdownValue}
                handleDropdownChange={(e) => setUserDropdownValue(e.target.value)}
                options={customerOptions}
                placeholder="Choose a user"
                error="Please select a valid user"
              />
            </div>
          </div>
        </div>

        {/* Disabled States */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-2 h-2 bg-gray-500 rounded-full mr-3"></div>
            Disabled States
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Disabled Dropdown</h3>
              <SapDropDown
                label="Disabled Field"
                options={sampleOptions}
                value={singleValue}
                onChange={(option) => setSingleValue(option.value)}
                placeholder="This field is disabled"
                disabled={true}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Disabled Copy From</h3>
              <SapCopyFromDropDown
                options={['Option 1', 'Option 2', 'Option 3']}
                onOptionSelect={(option) => setCopyFromValue(option)}
                placeholder="Copy from (disabled)"
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500">
        <p>All dropdown components now feature modern design, smooth animations, and consistent styling</p>
      </div>
    </div>
  );
};

export default SapDropDownExample;
