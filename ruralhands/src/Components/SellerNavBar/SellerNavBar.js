import { BarChart3, ChevronDown, Edit, Package, Plus, Search, Settings, User } from 'lucide-react';
import { useState } from 'react';
import logo from "../Assets/logo.png";

const SellerNavigationBar = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('/seller/dashboard');

const handleLogoClick = () => {
};


  

  // Seller menu categories
  const categories = [
    { name: 'Dashboard', path: '/seller/dashboard', icon: BarChart3 },
    { name: 'All Products', path: '/seller/products', icon: Package },
    { name: 'Add Product', path: '/seller/products/add', icon: Plus },
    { name: 'Orders', path: '/seller/orders', icon: Settings },
    { name: 'Analytics', path: '/seller/analytics', icon: BarChart3 },
  ];

  // Product management dropdown items
  const productActions = [
    { name: 'View All Products', path: '/seller/products', icon: Package },
    { name: 'Add New Product', path: '/seller/products/add', icon: Plus },
    { name: 'Edit Products', path: '/seller/products/edit', icon: Edit },
    { name: 'Manage Inventory', path: '/seller/products/inventory', icon: Settings },
  ];

  // Handle search submission
  const handleSearch = () => {
    if (searchQuery.trim()) {
      
    }
  };

  return (
    <nav className="bg-gradient-to-r from-white via-orange-25 to-white shadow-lg border-b border-orange-100 relative">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Seller Badge */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt="Logo" 
                onClick={handleLogoClick}
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
                  placeholder="Search your products, orders, customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full px-6 py-4 pl-6 pr-16 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-50 focus:border-orange-400 transition-all duration-300 shadow-sm hover:shadow-md text-gray-700 placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button 
                    onClick={handleSearch}
                    className="h-full px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-r-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center space-x-2"
                  >
                    <Search className="w-5 h-5" />
                    <span className="font-medium">Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Product Management Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex items-center justify-center group-hover:from-orange-100 group-hover:to-orange-200 transition-all duration-300">
                  <Package className="w-4 h-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500">Product</span>
                  <span className="text-sm font-semibold">Management</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isProductsOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl py-2 z-20 border border-gray-100">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Product Management</p>
                    <p className="text-xs text-gray-500">Manage your inventory</p>
                  </div>
                  {productActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setIsProductsOpen(false);
                          
                        }}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                      >
                        <IconComponent className="w-4 h-4 mr-3" />
                        {action.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

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
                  <span className="text-xs text-gray-500">Seller</span>
                  <span className="text-sm font-semibold">Account</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isAccountOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isAccountOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl py-2 z-20 border border-gray-100">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Seller Dashboard</p>
                    <p className="text-xs text-gray-500">Manage your seller account</p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsAccountOpen(false);
                      
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 text-left"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile Settings
                  </button>
                  <button 
                    onClick={() => {
                      setIsAccountOpen(false);
                      
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 text-left"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Account Settings
                  </button>
                  <hr className="my-2 border-gray-100" />
                  <button 
                    onClick={() => {
                      setIsAccountOpen(false);
                      
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 text-left"
                  >
                    <div className="w-4 h-4 mr-3 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">×</span>
                    </div>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-1 h-14 overflow-x-auto">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTab(category.path);
                    
                  }}
                  className={`flex items-center space-x-2 text-sm font-medium transition-all duration-300 whitespace-nowrap px-4 py-2 rounded-lg backdrop-blur-sm border hover:shadow-md transform hover:scale-105 ${
                    activeTab === category.path
                      ? 'text-white bg-white/30 border-white/50'
                      : 'text-white hover:text-white hover:bg-white/20 border-white/20 hover:border-white/30'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overlay for closing popups */}
      {(isProductsOpen || isAccountOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-10"
          onClick={() => {
            setIsProductsOpen(false);
            setIsAccountOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default SellerNavigationBar;