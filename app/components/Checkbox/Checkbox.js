"use client"

import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useColor } from '@/app/context/ColorContext';

const CheckboxGroup = ({ groupData, handleChange, checkedColor = 'primary' }) => {

  const { primaryColor } = useColor();

  return (
    <FormGroup>
      {Object.keys(groupData).map((key) => (
        <FormControlLabel
          key={key}
          control={
            <Checkbox
              checked={groupData[key]}
              onChange={handleChange}
              name={key}
              sx={{
                '&.Mui-checked': {
                  color: primaryColor,
                },
              }}
            />
          }
          label={key.replace(/([A-Z])/g, ' $1').trim()}
        />
      ))}
    </FormGroup>
  );
};

export default CheckboxGroup;
