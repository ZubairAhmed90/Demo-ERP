import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';

const AddButton = ({ 
  primaryColor, 
  label, 
  func, 
  size = 'md',
  variant = 'primary',
  disabled = false,
  loading = false,
  className = ''
}) => {
  const [isHovered, setHovered] = useState(false);

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      case 'xl':
        return 'px-8 py-4 text-xl';
      default:
        return 'px-4 py-2 text-md';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: primaryColor,
          border: `2px solid ${primaryColor}`,
          boxShadow: isHovered ? `0 8px 20px ${primaryColor}40` : '0 4px 12px rgba(0, 0, 0, 0.1)'
        };
      case 'ghost':
        return {
          backgroundColor: isHovered ? `${primaryColor}15` : 'transparent',
          color: primaryColor,
          border: 'none',
          boxShadow: 'none'
        };
      default:
        return {
          backgroundColor: isHovered ? `${primaryColor}dd` : primaryColor,
          color: 'white',
          border: 'none',
          boxShadow: isHovered ? `0 8px 20px ${primaryColor}40` : '0 4px 12px rgba(0, 0, 0, 0.1)'
        };
    }
  };

  const buttonStyles = {
    ...getVariantStyles(),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
  };

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={func}
      disabled={disabled || loading}
      className={`
        ${getSizeStyles()} 
        mr-6 mt-5 ml-4 whitespace-nowrap 
        flex items-center justify-center space-x-2
        font-bold rounded-xl
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={buttonStyles}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
      ) : (
        <div className="relative">
          <IoMdAdd 
            size={24} 
            className="transition-transform duration-300 group-hover:rotate-90"
          />
          <div 
            className="absolute inset-0 rounded-full transition-all duration-300"
            style={{ 
              backgroundColor: variant === 'primary' ? 'rgba(255, 255, 255, 0.2)' : `${primaryColor}20`,
              transform: isHovered ? 'scale(1.2)' : 'scale(1)'
            }}
          />
        </div>
      )}
      <span className="ml-2">{label}</span>
    </button>
  );
};

export default AddButton;
