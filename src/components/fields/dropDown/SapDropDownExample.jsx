import React, { useState } from 'react';
import SapDropDown from './sapDropDown';

const SapDropDownExample = () => {
  const [singleValue, setSingleValue] = useState(null);
  const [multipleValues, setMultipleValues] = useState([]);
  const [searchableValue, setSearchableValue] = useState(null);

  // Sample options
  const sampleOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
    { value: 'option6', label: 'Option 6' },
    { value: 'option7', label: 'Option 7' },
    { value: 'option8', label: 'Option 8' },
  ];

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'cn', label: 'China' },
    { value: 'in', label: 'India' },
    { value: 'br', label: 'Brazil' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Enhanced SAP Dropdown Component</h1>
        <p className="text-gray-600">Modern, feature-rich dropdown component with multiple variants</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Single Select */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Single Select</h3>
          <SapDropDown
            label="Select an option"
            options={sampleOptions}
            value={singleValue}
            onChange={setSingleValue}
            placeholder="Choose an option"
            required
          />
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              <strong>Selected:</strong> {singleValue ? singleValue.label : 'None'}
            </p>
          </div>
        </div>

        {/* Multiple Select */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Multiple Select</h3>
          <SapDropDown
            label="Select multiple options"
            options={sampleOptions}
            value={multipleValues}
            onChange={setMultipleValues}
            placeholder="Choose multiple options"
            multiple
          />
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              <strong>Selected:</strong> {multipleValues.length > 0 ? multipleValues.map(v => v.label).join(', ') : 'None'}
            </p>
          </div>
        </div>

        {/* Searchable Dropdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Searchable Dropdown</h3>
          <SapDropDown
            label="Search countries"
            options={countryOptions}
            value={searchableValue}
            onChange={setSearchableValue}
            placeholder="Search and select a country"
            searchable
          />
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              <strong>Selected:</strong> {searchableValue ? searchableValue.label : 'None'}
            </p>
          </div>
        </div>

        {/* Different Sizes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Different Sizes</h3>
          <div className="space-y-3">
            <SapDropDown
              label="Small size"
              options={sampleOptions.slice(0, 3)}
              size="small"
              placeholder="Small dropdown"
            />
            <SapDropDown
              label="Medium size (default)"
              options={sampleOptions.slice(0, 3)}
              size="medium"
              placeholder="Medium dropdown"
            />
            <SapDropDown
              label="Large size"
              options={sampleOptions.slice(0, 3)}
              size="large"
              placeholder="Large dropdown"
            />
          </div>
        </div>

        {/* Different Variants */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Different Variants</h3>
          <div className="space-y-3">
            <SapDropDown
              label="Default variant"
              options={sampleOptions.slice(0, 3)}
              variant="default"
              placeholder="Default style"
            />
            <SapDropDown
              label="Outlined variant"
              options={sampleOptions.slice(0, 3)}
              variant="outlined"
              placeholder="Outlined style"
            />
            <SapDropDown
              label="Filled variant"
              options={sampleOptions.slice(0, 3)}
              variant="filled"
              placeholder="Filled style"
            />
          </div>
        </div>

        {/* Error State */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Error State</h3>
          <SapDropDown
            label="Required field"
            options={sampleOptions.slice(0, 3)}
            placeholder="This field is required"
            required
            error
            errorMessage="This field is required and cannot be empty"
          />
        </div>

        {/* Disabled State */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Disabled State</h3>
          <SapDropDown
            label="Disabled dropdown"
            options={sampleOptions.slice(0, 3)}
            placeholder="This dropdown is disabled"
            disabled
          />
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Usage Examples</h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
{`// Basic usage
<SapDropDown
  label="Select Country"
  options={countryOptions}
  value={selectedCountry}
  onChange={setSelectedCountry}
  placeholder="Choose a country"
/>

// Multiple select with search
<SapDropDown
  label="Select Categories"
  options={categoryOptions}
  value={selectedCategories}
  onChange={setSelectedCategories}
  multiple
  searchable
  placeholder="Select multiple categories"
/>

// Different size and variant
<SapDropDown
  label="Priority Level"
  options={priorityOptions}
  size="small"
  variant="outlined"
  required
  error={hasError}
  errorMessage="Please select a priority level"
/>`}
          </pre>
        </div>
      </div>

      {/* Props Documentation */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Component Props</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Prop</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Type</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Default</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 font-mono text-blue-600">label</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Label displayed above the dropdown</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-blue-600">options</td>
                <td className="px-4 py-2">Array</td>
                <td className="px-4 py-2">[]</td>
                <td className="px-4 py-2">Array of option objects with value and label properties</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-blue-600">value</td>
                <td className="px-4 py-2">any</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Current selected value(s)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-blue-600">onChange</td>
                <td className="px-4 py-2">function</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">Callback function when selection changes</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-blue-600">placeholder</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">"Select an option"</td>
                <td className="px-4 py-2">Placeholder text when no option is selected</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-blue-600">multiple</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">Enable multiple selection</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-blue-600">searchable</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">Enable search functionality</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-blue-600">size</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">"medium"</td>
                <td className="px-4 py-2">Size variant: "small", "medium", "large"</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-blue-600">variant</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">"default"</td>
                <td className="px-4 py-2">Style variant: "default", "outlined", "filled"</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-blue-600">required</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">Mark field as required</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-blue-600">disabled</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">Disable the dropdown</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-blue-600">error</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">Show error state</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-blue-600">errorMessage</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">""</td>
                <td className="px-4 py-2">Error message to display</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SapDropDownExample;
