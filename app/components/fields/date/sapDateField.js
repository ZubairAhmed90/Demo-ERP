import React from 'react';

const SapDateField = ({ label, secondaryColor }) => {
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
        type="date"
        id="dDate"
        name="dDate"
        style={{
          flex: 2,
          padding: "2px",
          fontSize: "12px",
          borderRadius: "4px",
          border: "2px solid #ccc",
          backgroundColor: "white",
        }}
      />
    </div>
  );
};

export default SapDateField;
