import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaSearch, FaCheck } from 'react-icons/fa';

const SapDropDown = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select an option",
  disabled = false,
  required = false,
  error = false,
  errorMessage = "",
  size = "medium", // small, medium, large
  variant = "default", // default, outlined, filled
  searchable = false,
  multiple = false,
  className = "",
  style = {},
  secondaryColor = "#f3f4f6"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(multiple ? (value || []) : []);
  const dropdownRef = useRef(null);

  // Size classes
  const sizeClasses = {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-3 py-2",
    large: "text-base px-4 py-3"
  };

  // Variant classes
  const variantClasses = {
    default: "border-gray-300 bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500",
    outlined: "border-2 border-gray-300 bg-transparent hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500",
    filled: "border-gray-300 bg-gray-50 hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-blue-500"
  };

  // Filter options based on search term
  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.value?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Handle option selection
  const handleOptionSelect = (option) => {
    if (multiple) {
      const isSelected = selectedOptions.some(selected => selected.value === option.value);
      if (isSelected) {
        setSelectedOptions(selectedOptions.filter(selected => selected.value !== option.value));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
      setSearchTerm("");
    }
    
    if (onChange) {
      onChange(multiple ? selectedOptions : option);
    }
  };

  // Handle single value change
  const handleSingleValueChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(option => option.value === selectedValue);
    if (selectedOption) {
      setSelectedOptions([selectedOption]);
      if (onChange) {
        onChange(selectedOption);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get display value
  const getDisplayValue = () => {
    if (multiple) {
      if (selectedOptions.length === 0) return placeholder;
      if (selectedOptions.length === 1) return selectedOptions[0].label;
      return `${selectedOptions.length} items selected`;
    }
    return selectedOptions[0]?.label || placeholder;
  };

  // Get selected values for multiple select
  const getSelectedValues = () => {
    return selectedOptions.map(option => option.value);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef} style={style}>
      {/* Label */}
      {label && (
        <label className={`block text-sm font-medium text-gray-700 mb-1 ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}`}>
          {label}
        </label>
      )}

      {/* Dropdown Container */}
      <div className="relative">
        {multiple ? (
          // Multiple select with custom dropdown
          <div
            className={`
              relative w-full cursor-pointer
              ${sizeClasses[size]}
              ${variantClasses[variant]}
              rounded-md transition-all duration-200
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            `}
            onClick={() => !disabled && setIsOpen(!isOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1 min-h-[20px]">
                {selectedOptions.map((option, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {option.label}
                    <button
                      type="button"
                      className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionSelect(option);
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selectedOptions.length === 0 && (
                  <span className="text-gray-400">{placeholder}</span>
                )}
              </div>
              <FaChevronDown 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
              />
            </div>
          </div>
        ) : (
          // Single select with native dropdown
          <select
            value={selectedOptions[0]?.value || ''}
            onChange={handleSingleValueChange}
            disabled={disabled}
            className={`
              w-full appearance-none cursor-pointer
              ${sizeClasses[size]}
              ${variantClasses[variant]}
              rounded-md transition-all duration-200
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-blue-500' : ''}
            `}
          >
            <option value="">{placeholder}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {/* Custom Dropdown for Multiple Select */}
        {multiple && isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {/* Search Input */}
            {searchable && (
              <div className="sticky top-0 p-2 bg-gray-50 border-b border-gray-200">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="py-1">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = selectedOptions.some(selected => selected.value === option.value);
                  return (
                    <div
                      key={index}
                      className={`
                        flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100
                        ${isSelected ? 'bg-blue-50 text-blue-900' : 'text-gray-900'}
                      `}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {multiple && (
                        <div className={`
                          w-4 h-4 border-2 rounded mr-3 flex items-center justify-center
                          ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
                        `}>
                          {isSelected && <FaCheck className="w-3 h-3 text-white" />}
                        </div>
                      )}
                      <span className={isSelected ? 'font-medium' : ''}>
                        {option.label}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}

      {/* Hidden input for form submission */}
      {multiple && (
        <input
          type="hidden"
          name={label?.toLowerCase().replace(/\s+/g, '_')}
          value={JSON.stringify(getSelectedValues())}
        />
      )}
    </div>
  );
};

export default SapDropDown;
