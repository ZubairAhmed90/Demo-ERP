import React from 'react';

const SapDropDown = ({ label, option, option1, option2, option3, secondaryColor }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "4px",
        background: secondaryColor,
        borderRadius: "6px",
        border: "2px solid #ccc",
      }}
    >
      <label style={{ flex: 1, fontWeight: "bold", fontSize: "12px" }}>
        {label}
      </label>
      <select
        style={{
          flex: 2,
          padding: "2px",
          fontSize: "12px",
          borderRadius: "4px",
          border: "2px solid #ccc",
          backgroundColor: "white",
        }}
      >
        <option>{option}</option>
        <option>{option1}</option>
        <option>{option2}</option>
        <option>{option3}</option>
      </select>
    </div>
  );
};

export default SapDropDown;
