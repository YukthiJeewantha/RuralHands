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
   
  );
};

export default Navbar;