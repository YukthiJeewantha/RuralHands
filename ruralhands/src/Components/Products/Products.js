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

  