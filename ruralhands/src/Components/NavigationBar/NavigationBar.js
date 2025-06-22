// import { ChevronDown, Search, ShoppingCart, User } from 'lucide-react';
// import { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom'; // React Router imports
// import logo from "../../Assests/logo.png";

// const Navbar = () => {
//   const [isAccountOpen, setIsAccountOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate(); // Hook for programmatic navigation
//   const location = useLocation(); // Hook to get current location

//   // Categories with their routes
//   const categories = [
//     { name: 'Home', path: '/' },
//     { name: 'Products', path: '/products' }, 
//     { name: 'Locator', path: '/ShopLocator' },
//     { name: 'About Us', path: '/AboutUs' },
//     { name: 'Contact Us', path: '/ContactUs' },
//     { name: 'Blog', path: '/Blog' },
//   ];

//   // Handle search submission
//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   // Handle logo click
//   const handleLogoClick = () => {
//     navigate('/');
//   };

//   // Handle cart click
//   const handleCartClick = () => {
//     navigate('/cart');
//   };

//   // Handle account actions
//   const handleSignIn = () => {
//     navigate('/LoginPage');
//     setIsAccountOpen(false);
//   };

//   const handleBecomeSeller = () => {
//     navigate('/become-seller');
//     setIsAccountOpen(false);
//   };

//   return (
//     <nav className="bg-gradient-to-r from-white via-orange-25 to-white shadow-lg border-b border-orange-100">
//       {/* Top Navigation */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <div className="flex items-center flex-shrink-0">
//             <div className="flex items-center space-x-3">
//               <img 
//                 src={logo} 
//                 alt="Logo" 
//                 onClick={handleLogoClick}
//                 className="w-20 h-20 object-contain transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-lg cursor-pointer"
//               />
//             </div>
//           </div>

//           {/* Search Bar - Centered */}
//           <div className="flex-1 flex justify-center mx-8">
//             <div className="relative w-full max-w-2xl">
//               <form onSubmit={handleSearch} className="relative group">
//                 <input
//                   type="text"
//                   placeholder="Search for products, brands, and more..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full px-6 py-4 pl-6 pr-16 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-50 focus:border-orange-400 transition-all duration-300 shadow-sm hover:shadow-md text-gray-700 placeholder-gray-400"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center">
//                   <button 
//                     type="submit"
//                     className="h-full px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-r-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center space-x-2"
//                   >
//                     <Search className="w-5 h-5" />
//                     <span className="font-medium">Search</span>
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Right Side Icons */}
//           <div className="flex items-center space-x-4 flex-shrink-0">
//             {/* Account Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsAccountOpen(!isAccountOpen)}
//                 className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300 group"
//               >
//                 <div className="w-8 h-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300">
//                   <User className="w-4 h-4" />
//                 </div>
//                 <div className="flex flex-col items-start">
//                   <span className="text-xs text-gray-500">Hello</span>
//                   <span className="text-sm font-semibold">Account</span>
//                 </div>
//                 <ChevronDown className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-300" />
//               </button>
              
//               {isAccountOpen && (
//                 <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl py-2 z-20 border border-gray-100 animate-in slide-in-from-top-2 duration-200">
//                   <div className="px-4 py-3 border-b border-gray-100">
//                     <p className="text-sm font-semibold text-gray-900">Welcome to Rural Hands</p>
//                     <p className="text-xs text-gray-500">Access your account</p>
//                   </div>
//                   <button 
//                     onClick={handleSignIn}
//                     className="flex items-center w-full px-4 py-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 text-left"
//                   >
//                     <User className="w-4 h-4 mr-3" />
//                     Sign In
//                   </button>
//                   <button 
//                     onClick={handleBecomeSeller}
//                     className="flex items-center w-full px-4 py-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 text-left"
//                   >
//                     <div className="w-4 h-4 mr-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-xs">$</span>
//                     </div>
//                     Become a seller
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Cart */}
//             <div className="relative">
//               <button 
//                 onClick={handleCartClick}
//                 className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300 group"
//               >
//                 <div className="w-8 h-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300">
//                   <ShoppingCart className="w-4 h-4" />
//                 </div>
//                 <div className="flex flex-col items-start">
//                   <span className="text-xs text-gray-500">Your</span>
//                   <span className="text-sm font-semibold">Cart</span>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Category Navigation */}
//       <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center space-x-1 h-14 overflow-x-auto">
//             {categories.map((category, index) => (
//               <Link
//                 key={index}
//                 to={category.path}
//                 className={`text-sm font-medium transition-all duration-300 whitespace-nowrap px-4 py-2 rounded-lg backdrop-blur-sm border hover:shadow-md transform hover:scale-105 ${
//                   location.pathname === category.path
//                     ? 'text-white bg-white/30 border-white/50' // Active state
//                     : 'text-white hover:text-white hover:bg-white/20 border-white/20 hover:border-white/30'
//                 }`}
//               >
//                 {category.name}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// Components/NavigationBar/NavigationBar.js
import { ChevronDown, Search, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../Assests/logo.png";
import { useCart } from '../../Contexts/CartContext'; // Import cart context
import CartPopup from '../Cart/CartPopup'; // Create CartPopup component in same folder

const NavigationBar = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use cart context
  const { getTotalItems, isCartOpen, toggleCart } = useCart();

  // Categories with their routes - Update to match your routes
  const categories = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' }, 
    { name: 'Locator', path: '/shopLocator' },
    { name: 'Chat With Us', path: '/Chat' },
    { name: 'About Us', path: '/aboutUs' },
    { name: 'Contact Us', path: '/ContactUs' },
    { name: 'Blog', path: '/Blog' },
  ];

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle logo click
  const handleLogoClick = () => {
    navigate('/');
  };

  // Handle account actions
  const handleSignIn = () => {
    navigate('/LoginPage');
    setIsAccountOpen(false);
  };

  const handleBecomeSeller = () => {
    navigate('/SignupPage'); // Updated to your signup route
    setIsAccountOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-white via-orange-25 to-white shadow-lg border-b border-orange-100 relative">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
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
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="Search for products, brands, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-6 pr-16 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-50 focus:border-orange-400 transition-all duration-300 shadow-sm hover:shadow-md text-gray-700 placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button 
                    type="submit"
                    className="h-full px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-r-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center space-x-2"
                  >
                    <Search className="w-5 h-5" />
                    <span className="font-medium">Search</span>
                  </button>
                </div>
              </form>
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
                  <button 
                    onClick={handleSignIn}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 text-left"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Sign In
                  </button>
                  <button 
                    onClick={handleBecomeSeller}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 text-left"
                  >
                    <div className="w-4 h-4 mr-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">$</span>
                    </div>
                    Become a seller
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <button 
                onClick={toggleCart}
                className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300 group relative"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500">Your</span>
                  <span className="text-sm font-semibold">Cart</span>
                </div>
                {/* Cart Badge */}
                {getTotalItems() > 0 && (
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                    {getTotalItems()}
                  </div>
                )}
              </button>

              {/* Cart Popup Component */}
              <CartPopup />
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-1 h-14 overflow-x-auto">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className={`text-sm font-medium transition-all duration-300 whitespace-nowrap px-4 py-2 rounded-lg backdrop-blur-sm border hover:shadow-md transform hover:scale-105 ${
                  location.pathname === category.path
                    ? 'text-white bg-white/30 border-white/50'
                    : 'text-white hover:text-white hover:bg-white/20 border-white/20 hover:border-white/30'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for closing popups */}
      {(isCartOpen || isAccountOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-10"
          onClick={() => {
            if (isCartOpen) toggleCart();
            setIsAccountOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default NavigationBar;