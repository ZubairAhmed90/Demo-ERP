import React, { useState, useRef, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useColor } from "../../../context/ColorContext.jsx";
import { FaChevronDown, FaSearch, FaCheck } from 'react-icons/fa';

const UserDropdown = ({ 
  label, 
  dropdownValue, 
  handleDropdownChange, 
  options = [],
  grids, 
  placeholder = "Select an option",
  searchable = true,
  required = false,
  disabled = false,
  error,
  success,
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const { primaryColor, secondaryColor } = useColor();

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected option label
  const selectedOption = options.find(option => option.value === dropdownValue);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionSelect = (option) => {
    handleDropdownChange({ target: { value: option.value } });
    setIsOpen(false);
    setSearchTerm('');
  };

  const getContainerStyles = () => {
    let baseStyles = {
      display: "flex",
      alignItems: "center",
      padding: "8px 12px",
      background: isFocused ? `${secondaryColor}15` : secondaryColor,
      borderRadius: "12px",
      border: "2px solid",
      width: "500px",
      transition: 'all 0.2s ease-in-out',
      transform: isFocused ? 'scale(1.02)' : 'scale(1)',
    };

    if (error) {
      baseStyles.borderColor = '#ef4444';
    } else if (success) {
      baseStyles.borderColor = '#10b981';
    } else if (isFocused) {
      baseStyles.borderColor = primaryColor;
    } else {
      baseStyles.borderColor = '#d1d5db';
    }

    if (disabled) {
      baseStyles.opacity = 0.6;
      baseStyles.cursor = 'not-allowed';
    }

    return baseStyles;
  };

  return (
    <Grid item xs={grids}>
      <div className={`space-y-2 ${className}`}>
        <div style={getContainerStyles()} ref={dropdownRef}>
          <label 
            style={{ 
              flex: 1, 
              fontWeight: "600", 
              fontSize: "14px",
              color: isFocused ? primaryColor : '#374151',
              transition: 'color 0.2s ease-in-out'
            }}
            className="flex items-center space-x-2"
          >
            <span>{label}</span>
            {required && <span className="text-red-500">*</span>}
          </label>
          
          <div className="relative flex-2 flex items-center">
            <button
              type="button"
              onClick={() => !disabled && setIsOpen(!isOpen)}
              className={`
                w-full text-left px-3 py-2 bg-white rounded-lg border-2 border-gray-300 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200 ease-in-out
                ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-gray-400'}
                ${isOpen ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20' : ''}
              `}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={disabled}
            >
              <div className="flex items-center justify-between">
                <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
                <FaChevronDown 
                  className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden">
                {/* Search Input */}
                {searchable && (
                  <div className="p-3 border-b border-gray-200">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search options..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        autoFocus
                      />
                    </div>
                  </div>
                )}

                {/* Options List */}
                <div className="max-h-48 overflow-y-auto">
                  {filteredOptions.length === 0 ? (
                    <div className="px-3 py-4 text-center text-gray-500 text-sm">
                      No options found
                    </div>
                  ) : (
                    filteredOptions.map((option, index) => (
                      <button
                        key={option.value || index}
                        type="button"
                        onClick={() => handleOptionSelect(option)}
                        className={`
                          w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors duration-150
                          ${dropdownValue === option.value ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}
                          ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                        disabled={option.disabled}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option.label}</span>
                          {dropdownValue === option.value && (
                            <FaCheck className="text-blue-600" size={14} />
                          )}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm ml-2 animate-fadeIn">
            {error}
          </p>
        )}
        
        {/* Success Message */}
        {success && (
          <p className="text-green-600 text-sm ml-2 animate-fadeIn">
            {success}
          </p>
        )}
      </div>
    </Grid>
  );
};

export default UserDropdown;
