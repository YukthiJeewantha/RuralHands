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

  // Filter products based on active category
  const getFilteredProducts = () => {
    if (activeCategory === 'All Crafts') {
      return allProducts.slice(0, 12);
    }
    return allProducts.filter(product => product.category === activeCategory);
  };

  const products = getFilteredProducts();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < fullStars 
                ? 'text-orange-400 fill-current' 
                : index === fullStars && hasHalfStar 
                ? 'text-orange-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // Product Details Component
  const ProductDetails = ({ product }) => (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto p-4">
        {/* Back Button */}
        <button
          onClick={handleBackToProducts}
          className="flex items-center gap-2 mb-6 text-orange-600 hover:text-orange-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {product.badges.map((badge, index) => (
                <span
                  key={index}
                  className={`${product.badgeColors[index]} text-white text-sm font-medium px-3 py-1 rounded-full`}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Title and Artist */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-orange-600 font-medium">by {product.artist}</p>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Rs. {product.price.toLocaleString()}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <button
                  disabled={!product.inStock}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    product.inStock
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="p-3 bg-white border-2 border-orange-200 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(product.id)
                        ? 'text-red-500 fill-current'
                        : 'text-orange-400'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Truck className="w-5 h-5 text-orange-500" />
                <span>Free shipping on orders over Rs. 10,000</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-5 h-5 text-orange-500" />
                <span>Authenticity guaranteed</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <RotateCcw className="w-5 h-5 text-orange-500" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Show product details if a product is selected
  if (selectedProduct) {
    return <ProductDetails product={selectedProduct} />;
  }

  return (
    <div className="w-full">
      {/* Craft Categories Section */}
      <div className="py-16 px-4 bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-orange-200 text-orange-900 text-sm font-medium px-4 py-2 rounded-full">
                Browse Collections
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Products <span className="text-orange-600">Category</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Explore our diverse collection of handcrafted items, each category showcasing the finest 
              <span className="font-semibold text-orange-800"> traditional artistry</span> and 
              <span className="font-semibold text-red-800"> contemporary craftsmanship</span>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={`
                  flex flex-col items-center justify-center
                  w-20 h-20 sm:w-24 sm:h-24
                  rounded-2xl
                  transition-all duration-200
                  hover:scale-105 hover:shadow-md
                  ${activeCategory === category.name 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-300' 
                    : 'bg-orange-100 text-orange-800 hover:bg-orange-200 border border-orange-200'
                  }
                `}
              >
                <div className="text-xl sm:text-2xl mb-1">
                  {category.icon}
                </div>
                <span className="text-xs sm:text-sm font-medium text-center leading-tight">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      