import React from 'react';
import "./globals.css";
import { ColorProvider } from '../context/ColorContext.jsx';

function RootLayout({ children }) {
  return (
    <div className="app-container">
      <ColorProvider>
        {children}
      </ColorProvider>
    </div>
  );
}

export default RootLayout;
