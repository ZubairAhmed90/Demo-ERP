// components/Layout/Layout.js

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from './sidebar';
import { useColor } from '../../context/ColorContext';
import CustomButton from '../buttons/customButton/customButton';
import { font } from '../font/poppins';

export default function Layout({ children }) {
  const { primaryColor, secondaryColor } = useColor();
  const [navbar, setNavbar] = useState(true);
  const logout = true;

  return (
    <div className={`${font.className} min-h-screen flex flex-col`}>
      {/* Navbar / Header */}
      <header className="flex items-center justify-between px-6 w-full border border-gray-100"  style={{ background: navbar ? secondaryColor : "bg-blue-50" }}>
        <img src="/dafnia-png.png" className='w-auto h-16 p-2' alt="Dafnia Logo" />
        
        <h1
          className="text-2xl font-semibold"
          style={{ color: primaryColor, filter: 'brightness(70%)' }} 
        >
          Welcome To Dafnia Portal
        </h1>

        <Link href='/'>
          <CustomButton title="Logout" />
        </Link>
      </header>
      <hr className='w-full border-gray-600' />

      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1  bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
