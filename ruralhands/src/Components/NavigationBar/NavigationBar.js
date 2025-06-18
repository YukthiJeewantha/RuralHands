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

          
  );
};

export default Navbar;