import React from 'react'
import { useState } from 'react'
import { useColor } from '@/app/context/ColorContext';

const CustomButton = ({ title, func }) => {

  const [createCompany, setCreateCompany] = useState(false);
  const { primaryColor, secondaryColor } = useColor();

  return (
    <>
        <button 
              className="px-2 py-2 text-white text-md rounded"
              onMouseEnter={() => setCreateCompany(true)} 
              onMouseLeave={() => setCreateCompany(false)}
              onClick={func}
              style={{ backgroundColor: createCompany ? primaryColor : primaryColor }}
            >
              {title}
        </button>
    </>
  )
}

export default CustomButton