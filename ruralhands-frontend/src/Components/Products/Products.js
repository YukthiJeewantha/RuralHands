// Imports
import {
  ArrowLeft,
  Heart,
  RotateCcw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../../Contexts/CartContext"; //

const Products = () => {
  const [favorites, setFavorites] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState("All Crafts");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  const { addToCart } = useCart(); //

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.has(productId)
        ? newFavorites.delete(productId)
        : newFavorites.add(productId);
      return newFavorites;
    });
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    setSelectedProduct(null);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  const categories = [
    {
      id: 8,
      name: "All Crafts",
      icon: "🎨",
      bgColor: "bg-orange-100",
      textColor: "text-orange-800",
    },
    {
      id: 1,
      name: "Pottery",
      icon: "🏺",
      bgColor: "bg-orange-500",
      textColor: "text-white",
    },
    {
      id: 2,
      name: "Textiles",
      icon: "🧵",
      bgColor: "bg-orange-100",
      textColor: "text-orange-800",
    },
    {
      id: 3,
      name: "Woodwork",
      icon: "🪵",
      bgColor: "bg-orange-100",
      textColor: "text-orange-800",
    },
    {
      id: 4,
      name: "Jewelry",
      icon: "💎",
      bgColor: "bg-orange-100",
      textColor: "text-orange-800",
    },
    {
      id: 5,
      name: "Statues",
      icon: "🗿",
      bgColor: "bg-orange-100",
      textColor: "text-orange-800",
    },
    {
      id: 6,
      name: "Baskets",
      icon: "🧺",
      bgColor: "bg-orange-100",
      textColor: "text-orange-800",
    },
    {
      id: 7,
      name: "Kitchen items",
      icon: "🍽️",
      bgColor: "bg-orange-100",
      textColor: "text-orange-800",
    },
  ];

  const getFilteredProducts = () => {
    if (activeCategory === "All Crafts") return allProducts;
    return allProducts.filter((product) => product.category === activeCategory);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < fullStars || (index === fullStars && hasHalfStar)
                ? "text-orange-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const ProductDetails = ({ product }) => (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto p-4">
        <button
          onClick={handleBackToProducts}
          className="flex items-center gap-2 mb-6 text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
            <img
              src={product.imageUrl || "/fallback.jpg"}
              onError={(e) => (e.target.src = "/fallback.jpg")}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="flex gap-2">
              {product.badges?.map((badge, i) => (
                <span
                  key={i}
                  className="bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-lg text-orange-600 font-medium">
              by {product.artist}
            </p>

            <div className="flex items-center gap-2">
              {renderStars(product.rating || 0)}
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews || 0} reviews)
              </span>
            </div>

            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Rs. {product.price?.toLocaleString()}
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.stockCount > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span
                className={`font-medium ${
                  product.stockCount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stockCount > 0
                  ? `In Stock (${product.stockCount})`
                  : "Out of Stock"}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Features</h3>
              <ul className="grid grid-cols-2 gap-2 text-gray-600">
                {(product.features || []).map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => addToCart(product, 1)} // ✅ Step 3: Add to cart action
                disabled={product.stockCount === 0}
                className={`flex-1 py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 ${
                  product.stockCount > 0
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stockCount > 0 ? "Add to Cart" : "Out of Stock"}
              </button>

              <button
                onClick={() => toggleFavorite(product._id)}
                className="p-3 bg-white border-2 border-orange-200 rounded-lg"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.has(product._id)
                      ? "text-red-500 fill-current"
                      : "text-orange-400"
                  }`}
                />
              </button>
            </div>

            <div className="border-t pt-6 space-y-4 text-gray-600">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-orange-500" />
                Free shipping on orders over Rs. 10,000
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-orange-500" />
                Authenticity guaranteed
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-orange-500" />
                30-day return policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (selectedProduct) return <ProductDetails product={selectedProduct} />;

  return (
    <div className="w-full">
      {/* Category section */}
      <div className="py-16 px-4 bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Products <span className="text-orange-600">Category</span>
          </h2>
          <p className="text-gray-700 mt-2">
            Explore categories of our artisan products
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`w-24 h-24 rounded-xl flex flex-col items-center justify-center ${
                activeCategory === cat.name
                  ? "bg-orange-500 text-white"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              <div className="text-2xl">{cat.icon}</div>
              <div className="text-sm mt-1">{cat.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Products section */}
      <div className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {getFilteredProducts().map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product)}
              className="bg-white border border-orange-100 rounded-lg shadow hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="relative group">
                <img
                  src={product.imageUrl || "/fallback.jpg"}
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {(product.badges || []).map((badge, i) => (
                    <span
                      key={i}
                      className="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product._id);
                    }}
                    className="p-2 bg-white border rounded-full shadow hover:bg-orange-50"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.has(product._id)
                          ? "text-red-500 fill-current"
                          : "text-orange-400"
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-orange-600 font-medium mb-1">
                  by {product.artist}
                </p>
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  {renderStars(product.rating || 0)}
                  <span className="text-sm text-gray-500">
                    ({product.reviews || 0})
                  </span>
                </div>
                <div className="text-xl font-bold text-orange-600 mt-2">
                  Rs. {product.price?.toLocaleString()}
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
