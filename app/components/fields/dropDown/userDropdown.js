import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useColor } from '@/app/context/ColorContext';

const UserDropdown = ({ label, dropdownValue, handleDropdownChange, option1, option2, option3, grids, ...props }) => {
  const { secondaryColor } = useColor();

  return (
    <Grid item xs={grids}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "4px",
          background: secondaryColor,
          borderRadius: "6px",
          border: "2px solid #ccc",
          width: "500px",
        }}
      >
        <label style={{ flex: 1, fontWeight: "bold", fontSize: "14px" }}>
          {label}
        </label>
        <FormControl style={{ flex: 2 }}>
          <Select
            value={dropdownValue}
            onChange={handleDropdownChange}
            displayEmpty
            sx={{
              backgroundColor: 'white',
              height: '36px',
              fontSize: '14px',
              borderRadius: '4px',
              border: '2px solid #ccc',
              padding: '0px 8px',
            }}
            {...props}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="option1">{option1}</MenuItem>
            <MenuItem value="option2">{option2}</MenuItem>
            <MenuItem value="option3">{option3}</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Grid>
  );
};

export default UserDropdown;
