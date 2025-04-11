"use client";

import React from 'react';
import Grid from '@mui/material/Grid'; 

import { useColor } from '@/app/context/ColorContext';

const TextBar = ({ id, name, label, type, grids, ...props }) => {

  const { secondaryColor } = useColor();

  return (
    <Grid item xs={grids}>
      <div className="space-y-2" style={{ width: "500px" }}>
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
          <label style={{ flex: 1, fontWeight: "bold", fontSize: "14px" }}>
            {label}
          </label>
          <input
            id={id} 
            name={name} 
            type={type}
            placeholder="Enter text here"
            style={{
              flex: 2,
              padding: "2px",
              fontSize: "12px",
              borderRadius: "4px",
              border: "2px solid #ccc",
              width: '100%',
            }}
            {...props} 
          />
        </div>
      </div>
      
    </Grid>
  );
};

export default TextBar;
