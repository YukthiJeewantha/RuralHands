import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All Crafts");
  const [allProducts, setAllProducts] = useState([]);

  const sellerId = localStorage.getItem("sellerId");

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const categories = [
    { id: 1, name: "All Crafts", icon: "🎨" },
    { id: 2, name: "Pottery", icon: "🏺" },
    { id: 3, name: "Textiles", icon: "🧵" },
    { id: 4, name: "Woodwork", icon: "🪵" },
    { id: 5, name: "Jewelry", icon: "💎" },
    { id: 6, name: "Statues", icon: "🗿" },
    { id: 7, name: "Baskets", icon: "🧺" },
    { id: 8, name: "Kitchen items", icon: "🍽️" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/seller/${sellerId}`
        );
        setAllProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, [sellerId]);

  const getFilteredProducts = () => {
    if (activeCategory === "All Crafts") {
      return allProducts;
    }
    return allProducts.filter((product) => product.category === activeCategory);
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
                ? "text-orange-400 fill-current"
                : index === fullStars && hasHalfStar
                ? "text-orange-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 min-h-screen">
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
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-300"
                    : "bg-orange-100 text-orange-800 hover:bg-orange-200 border border-orange-200"
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
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 relative border border-orange-100"
            >
              <div className="relative group">
                <img
                  src={
                    product.imageUrl?.startsWith("http")
                      ? product.imageUrl
                      : `http://localhost:5000/${product.imageUrl}`
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.badges.map((badge, index) => (
                    <span
                      key={index}
                      className={`${
                        product.badgeColors?.[index] || "bg-red-600"
                      } text-white text-xs font-medium px-2 py-1 rounded`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm text-orange-600 mb-1 font-medium">
                  by {product.artist}
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  {renderStars(product.rating || 4.8)}
                  <span className="text-sm text-gray-500">
                    {product.rating || "4.8"} ({product.reviews || "10"})
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
        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
