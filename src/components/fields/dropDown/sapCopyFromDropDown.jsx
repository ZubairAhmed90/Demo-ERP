import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaCopy, FaTimes } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';

const SapCopyFromDropDown = ({ 
  primaryColor, 
  secondaryColor, 
  options = [],
  onOptionSelect,
  placeholder = "Copy from",
  disabled = false,
  size = "medium",
  className = "",
  ...props 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const { primaryColor: contextPrimaryColor, secondaryColor: contextSecondaryColor } = useColor();

  // Use context colors if not provided
  const finalPrimaryColor = primaryColor || contextPrimaryColor;
  const finalSecondaryColor = secondaryColor || contextSecondaryColor;

  // Size classes
  const sizeClasses = {
    small: "text-xs px-3 py-2",
    medium: "text-sm px-4 py-3",
    large: "text-base px-4 py-3"
  };

  // Extract options from props if not provided directly
  const finalOptions = options.length > 0 ? options : Object.values(props).filter(value => typeof value === 'string');

  const toggleDropdown = () => {
    if (!disabled) {
      setShowDropdown(!showDropdown);
      setIsFocused(!showDropdown);
    }
  };

  const handleOptionSelect = (option) => {
    if (onOptionSelect) {
      onOptionSelect(option);
    }
    setShowDropdown(false);
    setIsFocused(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className={`
          inline-flex items-center justify-between w-full
          ${sizeClasses[size]}
          bg-white border-2 border-gray-200 hover:border-gray-300 
          focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
          rounded-xl transition-all duration-300 ease-in-out
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
          ${isFocused ? 'shadow-lg transform scale-[1.02]' : 'shadow-sm'}
          ${showDropdown ? 'border-blue-500 ring-2 ring-blue-500/20' : ''}
        `}
        onClick={toggleDropdown}
        disabled={disabled}
        style={{ 
          '--tw-ring-color': finalPrimaryColor,
          '--tw-border-opacity': showDropdown ? '1' : '0.2'
        }}
      >
        <div className="flex items-center space-x-2">
          <FaCopy className="w-4 h-4" style={{ color: finalPrimaryColor }} />
          <span className="font-medium text-gray-700">{placeholder}</span>
        </div>
        <FaChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} 
        />
      </button>

      {showDropdown && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl overflow-hidden animate-slide-down">
          <div className="py-2 max-h-48 overflow-y-auto">
            {finalOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaCopy className="w-4 h-4 text-gray-400" />
                  </div>
                  <span>No options available</span>
                </div>
              </div>
            ) : (
              finalOptions.map((option, index) => (
                <button
                  key={index}
                  className="
                    w-full text-left px-4 py-3 text-sm cursor-pointer 
                    hover:bg-gray-50 hover:border-r-2 hover:border-gray-200
                    transition-all duration-200 flex items-center space-x-3
                  "
                  onClick={() => handleOptionSelect(option)}
                >
                  <FaCopy className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">{option}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SapCopyFromDropDown;
