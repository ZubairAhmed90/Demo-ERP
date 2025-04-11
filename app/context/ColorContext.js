"use client"

import { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

export const useColor = () => useContext(ColorContext);

export const ColorProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState('#0284C7');
  const [secondaryColor, setSecondaryColor] = useState('#F0F8FD');
  const [tertiaryColor, setTertiaryColor] = useState('#0A6089');

  return (
    <ColorContext.Provider value={{ primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor, tertiaryColor, setTertiaryColor }}>
      {children}
    </ColorContext.Provider>
  );
};
