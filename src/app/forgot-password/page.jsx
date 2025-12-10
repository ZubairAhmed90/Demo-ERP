import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useColor } from '../../context/ColorContext.jsx';

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // In a real application, you would send a reset link to the email
      console.log('Password reset link sent to:', email);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <FaCheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Please check your email and click on the link to reset your password. 
              If you don't see the email, check your spam folder.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                Back to Login
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
                className="w-full px-4 py-3 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Resend Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4" style={{ backgroundColor: `${primaryColor}15` }}>
            <FaLock className="h-8 w-8" style={{ color: primaryColor }} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  error
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: primaryColor }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm font-medium transition-colors"
            style={{ color: primaryColor }}
          >
            <FaArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;

