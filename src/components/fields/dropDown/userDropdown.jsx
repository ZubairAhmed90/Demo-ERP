import React, { useState, useRef, useEffect } from 'react';
import { useColor } from "../../../context/ColorContext.jsx";
import { FaChevronDown, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';

const UserDropdown = ({ 
  label, 
  dropdownValue, 
  handleDropdownChange, 
  options = [],
  placeholder = "Select an option",
  searchable = true,
  required = false,
  disabled = false,
  error,
  success,
  className = '',
  size = "medium",
  variant = "default",
  showLabel = true,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionSelect = (option) => {
    handleDropdownChange({ target: { value: option.value } });
    setIsOpen(false);
    setSearchTerm('');
    setIsFocused(false);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {showLabel && label && (
        <label className={`block text-sm font-semibold text-gray-700 ${required ? 'after:content-["*"] after:ml-1 after:text-red-500' : ''}`}>
          {label}
        </label>
      )}

      {/* Dropdown Container */}
      <div 
        className={`
          relative w-full cursor-pointer
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          rounded-xl transition-all duration-300 ease-in-out
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
          ${success ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20' : ''}
          ${isFocused ? 'shadow-lg transform scale-[1.02]' : 'shadow-sm'}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={dropdownRef}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <span 
              className={`font-medium transition-colors duration-200 ${
                isFocused ? 'text-blue-600' : selectedOption ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <FaChevronDown 
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
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
                  const isSelected = option.value === dropdownValue;
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
                      <div className={`
                        w-5 h-5 border-2 rounded-lg mr-3 flex items-center justify-center transition-all duration-200
                        ${isSelected 
                          ? 'border-blue-500 bg-blue-500 shadow-sm' 
                          : 'border-gray-300 hover:border-gray-400'
                        }
                      `}>
                        {isSelected && <FaCheck className="w-3 h-3 text-white" />}
                      </div>
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
      {error && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-red-600">
          <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-500 text-xs">!</span>
          </div>
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-green-600">
          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-500 text-xs">✓</span>
          </div>
          <span>{success}</span>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
