import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useColor } from '../../context/ColorContext.jsx';

const Page = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { primaryColor } = useColor();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Get token from URL parameters
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      // In a real app, you might want to show an error or redirect
      // For now, we'll allow the form to work without token for demo purposes
    }
  }, [searchParams]);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = 'Password does not meet requirements';
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log('Password reset successful for token:', token);
    }, 1500);
  };

  const passwordValidation = validatePassword(formData.password);

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <FaCheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your password has been successfully reset. You can now login with your new password.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor }}
            >
              Go to Login
            </button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600">
            Enter your new password below. Make sure it's strong and secure.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Enter new password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
            
            {/* Password Requirements */}
            {formData.password && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-700 mb-2">Password Requirements:</p>
                <ul className="space-y-1 text-xs">
                  <li className={`flex items-center ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordValidation.minLength ? <FaCheckCircle className="h-3 w-3 mr-2" /> : <FaTimes className="h-3 w-3 mr-2" />}
                    At least 8 characters
                  </li>
                  <li className={`flex items-center ${passwordValidation.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordValidation.hasUpperCase ? <FaCheckCircle className="h-3 w-3 mr-2" /> : <FaTimes className="h-3 w-3 mr-2" />}
                    One uppercase letter
                  </li>
                  <li className={`flex items-center ${passwordValidation.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordValidation.hasLowerCase ? <FaCheckCircle className="h-3 w-3 mr-2" /> : <FaTimes className="h-3 w-3 mr-2" />}
                    One lowercase letter
                  </li>
                  <li className={`flex items-center ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordValidation.hasNumber ? <FaCheckCircle className="h-3 w-3 mr-2" /> : <FaTimes className="h-3 w-3 mr-2" />}
                    One number
                  </li>
                  <li className={`flex items-center ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordValidation.hasSpecialChar ? <FaCheckCircle className="h-3 w-3 mr-2" /> : <FaTimes className="h-3 w-3 mr-2" />}
                    One special character
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : formData.confirmPassword && formData.password === formData.confirmPassword
                    ? 'border-green-500 focus:ring-green-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Confirm new password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
            {formData.confirmPassword && formData.password === formData.confirmPassword && !errors.confirmPassword && (
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <FaCheckCircle className="h-4 w-4 mr-1" />
                Passwords match
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !passwordValidation.isValid}
            className="w-full px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: primaryColor }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Resetting Password...
              </span>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm font-medium transition-colors"
            style={{ color: primaryColor }}
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;

