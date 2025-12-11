import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import { useColor } from '../../context/ColorContext';
import CustomButton from '../buttons/customButton/customButton';
import { font } from '../font/poppins';

export default function Layout({ children }) {
  const { primaryColor, secondaryColor } = useColor();
  const [navbar, setNavbar] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const logout = true;

  return (
    <div className={`${font.className} h-screen flex flex-col overflow-hidden`}>
      {/* Navbar / Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white shadow-sm z-10" style={{ background: navbar ? secondaryColor : "white" }}>
        <img src="/colored-logo.png" className='w-auto h-8 p-1' alt="cOMPANY Logo" />
        
        <h1
          className="text-lg font-semibold"
          style={{ color: primaryColor, filter: 'brightness(70%)' }} 
        >
          Welcome To tychora Portal
        </h1>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: primaryColor }}
            title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to='/'>
            <CustomButton title="Logout" />
          </Link>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="flex-shrink-0">
          <Sidebar isOpen={sidebarOpen} />
        </div>
        
        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 transition-all duration-300">
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
