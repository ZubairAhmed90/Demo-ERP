import React from 'react';
import { useState } from 'react';
import { useColor } from '../../../context/ColorContext.jsx';

const CustomButton = ({ 
  title, 
  func, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  icon,
  loading = false,
  fullWidth = false,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { primaryColor, secondaryColor } = useColor();

  // Button variants
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: isHovered ? secondaryColor : `${secondaryColor}80`,
          color: 'white',
          border: `2px solid ${secondaryColor}`
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: primaryColor,
          border: `2px solid ${primaryColor}`
        };
      case 'ghost':
        return {
          backgroundColor: isHovered ? `${primaryColor}15` : 'transparent',
          color: primaryColor,
          border: 'none'
        };
      case 'danger':
        return {
          backgroundColor: isHovered ? '#dc2626' : '#ef4444',
          color: 'white',
          border: 'none'
        };
      default:
        return {
          backgroundColor: isHovered ? `${primaryColor}dd` : primaryColor,
          color: 'white',
          border: 'none'
        };
    }
  };

  // Button sizes
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      case 'xl':
        return 'px-8 py-4 text-xl';
      default:
        return 'px-4 py-2 text-md';
    }
  };

  const buttonStyles = {
    ...getVariantStyles(),
    transition: 'all 0.2s ease-in-out',
    transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 10px 25px rgba(0, 0, 0, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  return (
    <button 
      className={`
        ${getSizeStyles()} 
        font-semibold rounded-lg 
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={buttonStyles}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onClick={func}
      disabled={disabled || loading}
    >
      <div className="flex items-center justify-center space-x-2">
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
        )}
        {icon && !loading && <span>{icon}</span>}
        <span>{title}</span>
      </div>
    </button>
  );
};

export default CustomButton;