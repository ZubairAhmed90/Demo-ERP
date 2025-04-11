"use client";

import React, { useState } from "react";
import ParticlesComponent from "../components/particles/particles";
import { font } from "../components/font/poppins";
import { useColor } from "../context/ColorContext"; 

const Login = () => {
  const [selectedCompany, setSelectedCompany] = useState("Select Company");
  const [logoSrc, setLogoSrc] = useState("");
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const {primaryColor} = useColor();


  const handleCompanyChange = (event) => {
    const company = event.target.value;
    setSelectedCompany(company);

    if (company === "Dafnia Electronics") {
      setLogoSrc("/logo-dafnia.png");
    } else if (company === "Sub-Company-2") {
      setLogoSrc("/logo-dafnia.png");
    }
    else {
      setLogoSrc('')
    }
  };

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = () => {
    let hasError = false;

    if (userName === "" || userName !== "admin") {
      setUserNameError(true);
      console.log("Invalid Username !");
      hasError = true;
    } else {
      setUserNameError(false);
    }

    if (password === "") {
      setPasswordError(true);
      console.log("Invalid Password !");
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if(selectedCompany == "Select Company") {
      setCompanyError(true);
      console.log("Invalid Company")
      hasError = true;  
    }
    else {
      setCompanyError(false);
    }

    if (!hasError) {
      window.location.href = '/dashboard';
    }
  };

  const companySize =
    selectedCompany === "Dafnia Electronics"
      ? "h-80 w-auto"
      : "bg-blue-500";

  return (
    <main className={`${font.className} relative min-h-screen flex items-center justify-center`}>
      {/* Full Page Animation */}
      <div className="absolute inset-0 z-0">
        <ParticlesComponent />
      </div>

      {/* Centered Form Container with Two Partitions */}
      <div className="relative z-10 bg-white  rounded-2xl shadow-2xl max-w-6xl w-full flex">
        
        {/* Left Partition - Main Image */}
        <div className="w-1/2 flex items-end mb-12 justify-center">
            <img src={logoSrc}  className="h-80 w-auto" />
        </div>

        {/* Right Partition - Login Form */}
        <div className="w-1/2 h-auto p-8 flex flex-col justify-center">

        {(selectedCompany == "Istanbul Electrical" || selectedCompany == "Select Company") && (
        <div className="absolute top-4 left-4 ml-6">
            <img src='/logo-dafnia.png'  className="h-32 w-auto" />
          </div>
          )}

          {/* Welcome Text */}
          <div className="text-left text-2xl font-bold mb-6">
            {selectedCompany}
          </div>

          {/* Login Form */}
          <form className="space-y-8">
          {companyError && (
                  <p className="p-2 bg-red-200 text-red-500 w-full rounded-md">Choose A Company</p>
                )}
            <div>
              <label
                htmlFor="company"
                className="block text-md font-medium text-gray-700"
                >
                Company
              </label>
              <select
                id="company"
                name="company"
                value={selectedCompany}
                onChange={handleCompanyChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
                <option value="Select Company">Select Company</option>
                <option value="Dafnia Electronics">Dafnia Electronics</option>
                <option value="Sub-Company-2">Sub-Company-2</option>
              </select>
            </div>
                {userNameError && (
                  <p className="p-2 bg-red-200 text-red-500 w-full rounded-md">Invalid User Name or Password</p>
                )}
            <div>
              <label
                htmlFor="username"
                className="block text-md font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={userName}
                onChange={handleChangeUserName}
                className={`mt-1 block w-full px-3 py-2 border ${
                  userNameError ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div>
              <label
                htmlFor="password"
                className="block text-md font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChangePassword}
                className={`mt-1 block mb-4 w-full px-3 py-2 border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                placeholder="Enter your password"
                required
              />
            </div>
           
              <button
                type="button"
                onClick={handleSubmit}
                style={{ backgroundColor: primaryColor }}
                className={`w-full text-white py-2 px-4 rounded-md duration-400 focus:outline-none mt-4`}
              >
                Sign In
              </button>
            
            <p className="text-center text-gray-500 hover:underline">
              Forgot Password?
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;

