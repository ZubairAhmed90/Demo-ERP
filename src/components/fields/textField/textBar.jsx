import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { useColor } from '../../../context/ColorContext.jsx';
import { FaEye, FaEyeSlash, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const TextBar = ({ 
  id, 
  name, 
  label, 
  type = 'text',
  grids, 
  placeholder,
  error,
  success,
  required = false,
  disabled = false,
  icon,
  onFocus,
  onBlur,
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { primaryColor, secondaryColor } = useColor();

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const getInputStyles = () => {
    let baseStyles = {
      flex: 2,
      padding: "12px 16px",
      fontSize: "14px",
      borderRadius: "8px",
      border: "2px solid",
      width: '100%',
      transition: 'all 0.2s ease-in-out',
      backgroundColor: 'white',
      outline: 'none',
    };

    if (error) {
      baseStyles.borderColor = '#ef4444';
      baseStyles.backgroundColor = '#fef2f2';
    } else if (success) {
      baseStyles.borderColor = '#10b981';
      baseStyles.backgroundColor = '#f0fdf4';
    } else if (isFocused) {
      baseStyles.borderColor = primaryColor;
      baseStyles.boxShadow = `0 0 0 3px ${primaryColor}20`;
    } else {
      baseStyles.borderColor = '#d1d5db';
    }

    if (disabled) {
      baseStyles.backgroundColor = '#f9fafb';
      baseStyles.color = '#6b7280';
      baseStyles.cursor = 'not-allowed';
    }

    return baseStyles;
  };

  const getContainerStyles = () => {
    return {
      display: "flex",
      alignItems: "center",
      padding: "8px 12px",
      background: isFocused ? `${secondaryColor}15` : secondaryColor,
      borderRadius: "12px",
      border: "2px solid",
      borderColor: isFocused ? primaryColor : '#d1d5db',
      transition: 'all 0.2s ease-in-out',
      transform: isFocused ? 'scale(1.02)' : 'scale(1)',
    };
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <Grid item xs={grids}>
      <div className={`space-y-2 ${className}`} style={{ width: "500px" }}>
        <div style={getContainerStyles()}>
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
            {icon && <span className="text-gray-500">{icon}</span>}
            <span>{label}</span>
            {required && <span className="text-red-500">*</span>}
          </label>
          
          <div className="relative flex-2 flex items-center">
            <input
              id={id} 
              name={name} 
              type={inputType}
              placeholder={placeholder || `Enter ${label.toLowerCase()} here`}
              style={getInputStyles()}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              {...props} 
            />
            
            {/* Status Icons */}
            <div className="absolute right-3 flex items-center space-x-2">
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              )}
              
              {success && (
                <FaCheck className="text-green-500" size={16} />
              )}
              
              {error && (
                <FaExclamationTriangle className="text-red-500" size={16} />
              )}
            </div>
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

export default TextBar;
