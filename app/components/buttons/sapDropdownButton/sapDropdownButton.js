import React, { useState } from "react";

const SapDropdownButton = ({
  primaryColor,
  option1,
  option2,
  onOptionSelect,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [value, setValue] = useState("Add and Close");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    setValue(option); // Update the button label with the selected option
    onOptionSelect(option);
    setShowDropdown(false); // Close the dropdown after selecting an option
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <button
        style={{
          padding: "6px 12px",
          backgroundColor: primaryColor,
          color: "#fff",
          border: "2px solid #ccc",
          borderRadius: "4px",
          fontSize: "12px",
          cursor: "pointer",
        }}
        onClick={toggleDropdown}
      >
        {value}
        <span style={{ fontSize: "10px", marginLeft: "5px" }}>▼</span>
      </button>

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            backgroundColor: primaryColor,
            color: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            bottom: "100%",
            left: "0",
            minWidth: "120px",
            zIndex: 1,
            marginBottom: "4px",
          }}
        >
          <button
            style={{
              padding: "6px 12px",
              backgroundColor: primaryColor,
              color: "#fff",
              border: "2px solid #ccc",
              borderRadius: "4px",
              fontSize: "12px",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
            }}
            onClick={() => handleOptionSelect(option1)}
          >
            {option1}
          </button>
          <button
            style={{
              padding: "6px 12px",
              backgroundColor: primaryColor,
              color: "#fff",
              border: "2px solid #ccc",
              borderRadius: "4px",
              fontSize: "12px",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
            }}
            onClick={() => handleOptionSelect(option2)}
          >
            {option2}
          </button>
        </div>
      )}
    </div>
  );
};

export default SapDropdownButton;
