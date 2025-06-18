import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import logo from "../../Assests/logo.png";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState('buyer');

  const handleSubmit = () => {
    console.log('Login attempt:', { email, password, rememberMe, userType });
    if (userType === 'seller') {
      console.log('Redirecting to seller dashboard...');
    } else {
      console.log('Redirecting to buyer dashboard...');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99 102 241) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center shadow-lg border-2 border-orange-200">
              <img 
                src={logo}
                alt="Logo" 
                className="w-40 h-40 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome</h1>
          <p className="text-gray-600 text-sm">Sign in to your account to continue</p>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <label className="text-xl font-medium text-gray-700 mb-3 block">I am a:</label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setUserType('buyer')}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-md ${
                userType === 'buyer'
                  ? 'bg-white text-blue-600 shadow-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
              }`}
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => setUserType('seller')}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-md ${
                userType === 'seller'
                  ? 'bg-white text-blue-600 shadow-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
              }`}
            >
              Seller
            </button>
          </div>
        </div>

        
  );
}