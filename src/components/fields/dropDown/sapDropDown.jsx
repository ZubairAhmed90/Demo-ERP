import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';

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
  showLabel = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(multiple ? (value || []) : []);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const { primaryColor, secondaryColor } = useColor();

  // Size classes
  const sizeClasses = {
    small: "text-xs px-3 py-2",
    medium: "text-sm px-4 py-3",
    large: "text-base px-4 py-3"
  };

  // Variant classes with modern design
  const variantClasses = {
    default: `border-2 border-gray-200 bg-white hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`,
    outlined: `border-2 border-gray-300 bg-transparent hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`,
    filled: `border-2 border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`
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
        const newSelected = selectedOptions.filter(selected => selected.value !== option.value);
        setSelectedOptions(newSelected);
        if (onChange) onChange(newSelected);
      } else {
        const newSelected = [...selectedOptions, option];
        setSelectedOptions(newSelected);
        if (onChange) onChange(newSelected);
      }
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
      setSearchTerm("");
      if (onChange) onChange(option);
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
        setIsFocused(false);
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

  // Remove selected option in multiple mode
  const removeSelectedOption = (optionToRemove, e) => {
    e.stopPropagation();
    const newSelected = selectedOptions.filter(option => option.value !== optionToRemove.value);
    setSelectedOptions(newSelected);
    if (onChange) onChange(newSelected);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef} style={style}>
      {/* Label */}
      {showLabel && label && (
        <label className={`block text-sm font-semibold text-gray-700 mb-2 ${required ? 'after:content-["*"] after:ml-1 after:text-red-500' : ''}`}>
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
              rounded-xl transition-all duration-300 ease-in-out
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
              ${isFocused ? 'shadow-lg transform scale-[1.02]' : 'shadow-sm'}
            `}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2 min-h-[24px] flex-1">
                {selectedOptions.map((option, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 transition-colors duration-200"
                  >
                    {option.label}
                    <button
                      type="button"
                      className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-500 hover:bg-blue-300 hover:text-blue-700 transition-colors duration-200"
                      onClick={(e) => removeSelectedOption(option, e)}
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedOptions.length === 0 && (
                  <span className="text-gray-400">{placeholder}</span>
                )}
              </div>
              <FaChevronDown 
                className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
              />
            </div>
          </div>
        ) : (
          // Single select with native dropdown
          <select
            value={selectedOptions[0]?.value || ''}
            onChange={handleSingleValueChange}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`
              w-full appearance-none cursor-pointer
              ${sizeClasses[size]}
              ${variantClasses[variant]}
              rounded-xl transition-all duration-300 ease-in-out
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
              ${isFocused ? 'shadow-lg transform scale-[1.02]' : 'shadow-sm'}
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
          <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-hidden animate-slide-down">
            {/* Search Input */}
            {searchable && (
              <div className="sticky top-0 p-3 bg-gray-50 border-b border-gray-200">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="py-2 max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <FaSearch className="w-4 h-4 text-gray-400" />
                    </div>
                    <span>No options found</span>
                  </div>
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = selectedOptions.some(selected => selected.value === option.value);
                  return (
                    <div
                      key={index}
                      className={`
                        flex items-center px-4 py-3 text-sm cursor-pointer transition-all duration-200
                        ${isSelected 
                          ? 'bg-blue-50 text-blue-900 border-r-2 border-blue-500' 
                          : 'text-gray-900 hover:bg-gray-50 hover:border-r-2 hover:border-gray-200'
                        }
                      `}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {multiple && (
                        <div className={`
                          w-5 h-5 border-2 rounded-lg mr-3 flex items-center justify-center transition-all duration-200
                          ${isSelected 
                            ? 'border-blue-500 bg-blue-500 shadow-sm' 
                            : 'border-gray-300 hover:border-gray-400'
                          }
                        `}>
                          {isSelected && <FaCheck className="w-3 h-3 text-white" />}
                        </div>
                      )}
                      <span className={`${isSelected ? 'font-semibold' : 'font-medium'}`}>
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
        <div className="mt-2 flex items-center space-x-2 text-sm text-red-600">
          <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-500 text-xs">!</span>
          </div>
          <span>{errorMessage}</span>
        </div>
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
