import React from 'react';

const SapTextField = ({ label, defaultValue, secondaryColor }) => {
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
      <input
        type="text"
        defaultValue={defaultValue}
        style={{
          flex: 2,
          padding: "2px",
          fontSize: "12px",
          borderRadius: "4px",
          border: "2px solid #ccc",
        }}
      />
    </div>
  );
};

export default SapTextField;
