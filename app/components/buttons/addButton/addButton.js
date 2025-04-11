import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';

const AddButton = ({ primaryColor, label, func }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={func}
      style={{ backgroundColor: primaryColor }}
    className={`p-2 mr-6 mt-5 ml-4 whitespace-nowrap flex text-md w-auto font-bold rounded-md mb-6 text-white shadow-gray-400 shadow-md`}
    >
      <IoMdAdd size={24} className='mt-1 border-2 border-sky-600 p-2 rounded-full'/>
      {label}
    </button>
  );
};

export default AddButton;
