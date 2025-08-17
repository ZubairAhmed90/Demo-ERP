import React, { useState } from 'react';

const SapCopyFromDropDown = ({ primaryColor, secondaryColor, ...props }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Extract options from props
  const options = Object.values(props).filter(value => typeof value === 'string');

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleOptionSelect = (option) => {
    if (props.onOptionSelect) {
      props.onOptionSelect(option);
    }
    setShowDropdown(false); // Close dropdown after selecting an option
  };

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
      <div style={{ position: 'relative' }}>
        <button
          style={{
            padding: '6px 12px',
            backgroundColor: primaryColor,
            color: '#fff',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
          onClick={toggleDropdown}
        >
          Copy from
          <span style={{ fontSize: '10px', marginLeft: '5px' }}>▼</span>
        </button>

        {showDropdown && (
          <div
            style={{
              position: 'absolute',
              backgroundColor: primaryColor,
              color: '#fff',
              borderRadius: '4px',
              bottom: '100%',
              left: '0',
              minWidth: '120px',
              zIndex: 1,
              marginBottom: '4px',
            }}
          >
            {options.map((option, index) => (
              <button
                key={index}
                style={{
                  padding: '6px 12px',
                  backgroundColor: primaryColor,
                  color: '#fff',
                  border: `2px solid #fff`,
                  borderRadius: '4px',
                  fontSize: '12px',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SapCopyFromDropDown;
