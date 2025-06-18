import { ChevronDown, Search, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import logo from "../../Assests/logo.png";

const Navbar = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Home',
    'Products', 
    'Locator',
    'About Us',
    'Contact Us',
    'Blog',
  ];

  return (
    <nav className="bg-gradient-to-r from-white via-orange-25 to-white shadow-lg border-b border-orange-100">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-20 h-20 object-contain transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Search Bar - Centered */}
          <div className="flex-1 flex justify-center mx-8">
            <div className="relative w-full max-w-2xl">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search for products, brands, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-6 pr-16 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-50 focus:border-orange-400 transition-all duration-300 shadow-sm hover:shadow-md text-gray-700 placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button className="h-full px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-r-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span className="font-medium">Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500">Hello</span>
                  <span className="text-sm font-semibold">Account</span>
                </div>
                <ChevronDown className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              {isAccountOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl py-2 z-20 border border-gray-100 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Welcome to Rural Hands</p>
                    <p className="text-xs text-gray-500">Access your account</p>
                  </div>
                  <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200">
                    <User className="w-4 h-4 mr-3" />
                    Sign In
                  </a>
                  <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200">
                    <div className="w-4 h-4 mr-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">$</span>
                    </div>
                    Become a seller
                  </a>
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <button className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300 group">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500">Your</span>
                  <span className="text-sm font-semibold">Cart</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-1 h-14 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={index}
                className="text-sm font-medium text-white hover:text-white hover:bg-white/20 transition-all duration-300 whitespace-nowrap px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 hover:border-white/30 hover:shadow-md transform hover:scale-105"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;