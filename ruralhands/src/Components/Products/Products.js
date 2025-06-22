import { ArrowLeft, Heart, RotateCcw, Shield, ShoppingCart, Star, Truck } from 'lucide-react';
import { useState } from 'react';

const Products = () => {
  const [favorites, setFavorites] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('Pottery');
  const [selectedProduct, setSelectedProduct] = useState(null);


  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    setSelectedProduct(null); // Close product details when changing category
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  const categories = [
    {
      id: 1,
      name: 'Pottery',
      icon: '🏺',
      bgColor: 'bg-orange-500',
      textColor: 'text-white'
    },
    {
      id: 2,
      name: 'Textiles',
      icon: '🧵',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800'
    },
    {
      id: 3,
      name: 'Woodwork',
      icon: '🪵',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800'
    },
    {
      id: 4,
      name: 'Jewelry',
      icon: '💎',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800'
    },
    {
      id: 5,
      name: 'Statues',
      icon: '🗿',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800'
    },
    {
      id: 6,
      name: 'Baskets',
      icon: '🧺',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800'
    },
    {
        id: 7,
        name: 'Kitchen items',
        icon: '🍽️',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-800'
    },
    {
      id: 8,
      name: 'All Crafts',
      icon: '🎨',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800'
    }
  ];

  