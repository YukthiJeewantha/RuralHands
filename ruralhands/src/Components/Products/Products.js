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

  const allProducts = [
    // Pottery
    {
      id: 1,
      name: "Jaipur Blue Pottery",
      artist: "David Chen",
      price: 4550,
      rating: 4.9,
      reviews: 31,
      image: "https://im.hunt.in/cg/Jaipur/City-Guide/blue-pottery-items.jpg",
      badges: ["New"],
      badgeColors: ["bg-red-600"],
      category: "Pottery",
      description: "Exquisite handcrafted blue pottery from Jaipur, featuring traditional patterns and contemporary designs. Each piece is carefully crafted by skilled artisans using time-honored techniques passed down through generations.",
      features: ["Handcrafted", "Traditional Design", "Premium Quality", "Unique Patterns"],
      inStock: true,
      stockCount: 12
    },

    // Textiles
    {
      id: 2,
      name: "Batiks",
      artist: "Martha Henderson",
      price: 8999,
      rating: 4.8,
      reviews: 24,
      image: "https://media.timeout.com/images/102436777/750/562/image.jpg",
      badges: ["Best Seller"],
      badgeColors: ["bg-red-600"],
      category: "Textiles",
      description: "Beautiful handwoven batik textiles featuring vibrant colors and intricate patterns. These authentic pieces showcase the rich cultural heritage of traditional textile artistry.",
      features: ["Handwoven", "Natural Dyes", "Cultural Heritage", "Vibrant Colors"],
      inStock: true,
      stockCount: 8
    },
    
    // Woodwork
    {
      id: 3,
      name: "Traditional Devils Mask",
      artist: "Wood Masters",
      price: 7500,
      rating: 4.8,
      reviews: 29,
      image: "https://static-01.daraz.lk/p/3d90e1e93d7a531bfd314464222d1759.jpg",
      badges: ["Limited Edition"],
      badgeColors: ["bg-teal-600"],
      category: "Woodwork",
      description: "Authentic traditional devil's mask carved from premium quality wood. This ceremonial mask represents cultural significance and is meticulously handcrafted by master woodworkers.",
      features: ["Hand Carved", "Premium Wood", "Cultural Significance", "Master Crafted"],
      inStock: true,
      stockCount: 5
    },

    // Jewelry
    {
      id: 4,
      name: "Hand Made Jewellery",
      artist: "Silver Smiths",
      price: 25000,
      rating: 4.9,
      reviews: 18,
      image: "https://images.squarespace-cdn.com/content/v1/5f5cb307c43c166c56b16db2/1602237706295-QCXIG1QWULRP7BKIB6MV/Lakshimi_primary.jpg?format=1500w",
      badges: ["Premium"],
      badgeColors: ["bg-teal-600"],
      category: "Jewelry",
      description: "Exquisite handmade jewelry crafted with precious metals and traditional techniques. Each piece is unique and represents the finest craftsmanship in contemporary jewelry design.",
      features: ["Precious Metals", "Handcrafted", "Unique Design", "Premium Quality"],
      inStock: true,
      stockCount: 3
    },

    // Statues
    {
      id: 5,
      name: "Hand Made Statue",
      artist: "Craft Masters",
      price: 4275,
      rating: 4.8,
      reviews: 27,
      image: "https://lakshilpa.com/wp-content/uploads/2021/10/IMG_9717.jpg",
      badges: ["Eco-Friendly"],
      badgeColors: ["bg-orange-600"],
      category: "Statues",
      description: "Beautiful handcrafted statue made from eco-friendly materials. This artistic piece combines traditional sculpting techniques with modern aesthetic appeal.",
      features: ["Eco-Friendly", "Hand Sculpted", "Artistic Design", "Sustainable Materials"],
      inStock: true,
      stockCount: 7
    },

    // Baskets
    {
      id: 6,
      name: "Cane Kuruni Basket",
      artist: "Sound Crafters",
      price: 5899,
      rating: 4.7,
      reviews: 19,
      image: "https://img.drz.lazcdn.com/static/lk/p/a39afe6d59b30d6b2c4e0f9180a255f8.jpg_720x720q80.jpg",
      badges: [],
      badgeColors: [],
      category: "Baskets",
      description: "Traditional cane kuruni basket woven with precision and care. Perfect for storage and decorative purposes, showcasing the timeless art of basket weaving.",
      features: ["Natural Cane", "Traditional Weaving", "Durable", "Multipurpose"],
      inStock: true,
      stockCount: 15
    },

    // Kitchen items
    {
      id: 7,
      name: "Coconut Shell Spoons",
      artist: "Basket Weavers",
      price: 2500,
      rating: 4.5,
      reviews: 45,
      image: "https://i.etsystatic.com/27029681/r/il/ef0a04/3214336440/il_fullxfull.3214336440_aiyb.jpg",
      badges: [],
      badgeColors: [],
      category: "Kitchen items",
      description: "Eco-friendly coconut shell spoons crafted from natural materials. These sustainable kitchen utensils are perfect for daily use and environmentally conscious living.",
      features: ["Eco-Friendly", "Natural Materials", "Sustainable", "Food Safe"],
      inStock: true,
      stockCount: 25
    },
  ];

  