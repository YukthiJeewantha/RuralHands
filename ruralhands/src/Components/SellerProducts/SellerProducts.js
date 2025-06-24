import { Star } from 'lucide-react';
import { useState } from 'react';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('Pottery');

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const categories = [
    { id: 1, name: 'Pottery', icon: '🏺' },
    { id: 2, name: 'Textiles', icon: '🧵' },
    { id: 3, name: 'Woodwork', icon: '🪵' },
    { id: 4, name: 'Jewelry', icon: '💎' },
    { id: 5, name: 'Statues', icon: '🗿' },
    { id: 6, name: 'Baskets', icon: '🧺' },
    { id: 7, name: 'Kitchen items', icon: '🍽️' },
    { id: 8, name: 'All Crafts', icon: '🎨' }
  ];

  const allProducts = [
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
      category: "Pottery"
    },
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
      category: "Textiles"
    },
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
      category: "Woodwork"
    },
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
      category: "Jewelry"
    },
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
      category: "Statues"
    },
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
      category: "Baskets"
    },
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
      category: "Kitchen items"
    }
  ];

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

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      {/* Categories */}
      <div className="py-5 px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold text-red-700 mb-8">My Products</h1>
        <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={`flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-md ${
                  activeCategory === category.name 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-300' 
                    : 'bg-orange-100 text-orange-800 hover:bg-orange-200 border border-orange-200'
                }`}
              >
                <div className="text-xl sm:text-2xl mb-1">{category.icon}</div>
                <span className="text-xs sm:text-sm font-medium text-center leading-tight">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="py-1 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 relative border border-orange-100"
            >
              <div className="relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.badges.map((badge, index) => (
                    <span
                      key={index}
                      className={`${product.badgeColors[index]} text-white text-xs font-medium px-2 py-1 rounded`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm text-orange-600 mb-1 font-medium">by {product.artist}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-500">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Rs. {product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
