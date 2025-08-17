import React, { useState } from 'react';
import { useColor } from "../../context/ColorContext.jsx";
import { FaCheck } from 'react-icons/fa';

const CheckboxGroup = ({ 
  groupData, 
  handleChange, 
  checkedColor = 'primary',
  disabled = false,
  className = '',
  layout = 'vertical' // 'vertical' or 'horizontal'
}) => {
  const { primaryColor } = useColor();
  const [hoveredKey, setHoveredKey] = useState(null);

  const handleCheckboxChange = (key) => (event) => {
    if (disabled) return;
    
    const newGroupData = {
      ...groupData,
      [key]: event.target.checked
    };
    
    handleChange({
      target: {
        name: key,
        checked: event.target.checked
      }
    });
  };

  const getLayoutClasses = () => {
    return layout === 'horizontal' 
      ? 'flex flex-wrap gap-4' 
      : 'flex flex-col space-y-3';
  };

  return (
    <div className={`${getLayoutClasses()} ${className}`}>
      {Object.keys(groupData).map((key) => {
        const isChecked = groupData[key];
        const isHovered = hoveredKey === key;
        
        return (
          <label
            key={key}
            className={`
              flex items-center space-x-3 cursor-pointer transition-all duration-200
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
              ${isHovered ? 'transform scale-105' : ''}
            `}
            onMouseEnter={() => !disabled && setHoveredKey(key)}
            onMouseLeave={() => setHoveredKey(null)}
          >
            {/* Custom Checkbox */}
            <div className="relative">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange(key)}
                disabled={disabled}
                className="sr-only"
              />
              
              <div
                className={`
                  w-5 h-5 border-2 rounded transition-all duration-200 ease-in-out
                  flex items-center justify-center
                  ${isChecked 
                    ? 'border-transparent' 
                    : 'border-gray-300 hover:border-gray-400'
                  }
                  ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
                style={{
                  backgroundColor: isChecked ? primaryColor : 'white',
                  boxShadow: isHovered && !isChecked 
                    ? `0 0 0 3px ${primaryColor}20` 
                    : 'none'
                }}
              >
                {isChecked && (
                  <FaCheck 
                    className="text-white text-xs animate-scaleIn" 
                    style={{ animationDelay: '0.1s' }}
                  />
                )}
              </div>
              
              {/* Ripple effect */}
              {isHovered && !isChecked && (
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-20"
                  style={{ backgroundColor: primaryColor }}
                />
              )}
            </div>
            
            {/* Label */}
            <span 
              className={`
                text-sm font-medium transition-colors duration-200
                ${isChecked ? 'text-gray-900' : 'text-gray-700'}
                ${isHovered && !disabled ? 'text-gray-900' : ''}
              `}
            >
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          </label>
        );
      })}
    </div>
  );
};

// Single Checkbox Component
const SingleCheckbox = ({ 
  checked, 
  onChange, 
  label, 
  disabled = false,
  className = '',
  size = 'md'
}) => {
  const { primaryColor } = useColor();
  const [isHovered, setIsHovered] = useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'lg': return 'w-6 h-6';
      default: return 'w-5 h-5';
    }
  };

  const getLabelSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-sm';
      case 'lg': return 'text-lg';
      default: return 'text-base';
    }
  };

  return (
    <label
      className={`
        flex items-center space-x-3 cursor-pointer transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
        ${className}
      `}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        
        <div
          className={`
            ${getSizeClasses()} border-2 rounded transition-all duration-200 ease-in-out
            flex items-center justify-center
            ${checked 
              ? 'border-transparent' 
              : 'border-gray-300 hover:border-gray-400'
            }
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
          style={{
            backgroundColor: checked ? primaryColor : 'white',
            boxShadow: isHovered && !checked 
              ? `0 0 0 3px ${primaryColor}20` 
              : 'none'
          }}
        >
          {checked && (
            <FaCheck 
              className="text-white animate-scaleIn" 
              size={size === 'sm' ? 10 : size === 'lg' ? 16 : 12}
            />
          )}
        </div>
        
        {/* Ripple effect */}
        {isHovered && !checked && (
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ backgroundColor: primaryColor }}
          />
        )}
      </div>
      
      {label && (
        <span 
          className={`
            ${getLabelSizeClasses()} font-medium transition-colors duration-200
            ${checked ? 'text-gray-900' : 'text-gray-700'}
            ${isHovered && !disabled ? 'text-gray-900' : ''}
          `}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export { CheckboxGroup, SingleCheckbox };
export default CheckboxGroup;
