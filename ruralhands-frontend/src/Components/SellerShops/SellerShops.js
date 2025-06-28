import { useState, useEffect } from "react";
import axios from "axios";

const SellerShops = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      const sellerId = localStorage.getItem("sellerId");
      if (!sellerId) {
        console.error("Seller ID not found in localStorage");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/shops/seller/${sellerId}`
        );
        setShops(res.data);
      } catch (error) {
        console.error("Failed to fetch seller shops:", error);
      }
    };

    fetchShops();
  }, []);

  const handleVisitShop = (locationUrl) => {
    window.open(locationUrl, "_blank");
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 4.5);
    const hasHalfStar = (rating || 4.5) % 1 !== 0;
    let stars = "";

    for (let i = 0; i < fullStars; i++) stars += "★";
    if (hasHalfStar) stars += "☆";
    while (stars.length < 5) stars += "☆";

    return stars;
  };

  const handleImageError = (e, fallbackGradient) => {
    e.target.style.display = "none";
    e.target.parentElement.style.background = fallbackGradient;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-8 py-8">
          <h1 className="text-4xl font-bold text-red-700 mb-8">My Shops</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shops.map((shop) => (
            <div
              key={shop._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className="h-48 relative overflow-hidden"
                style={{
                  background:
                    shop.fallbackGradient ||
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <img
                  src={shop.imageUrl} // ✅ FIXED: use direct Cloudinary URL
                  alt={shop.name}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    handleImageError(
                      e,
                      shop.fallbackGradient ||
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    )
                  }
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {shop.name}
                </h3>

                <div className="flex items-center mb-4">
                  <span className="text-yellow-400 text-lg mr-2">
                    {renderStars(shop.rating)}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {(shop.rating || 4.5).toFixed(1)} ({shop.reviews || 100}{" "}
                    reviews)
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600">
                    <span className="text-lg mr-3">📍</span>
                    <span className="text-sm">{shop.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-lg mr-3">📞</span>
                    <span className="text-sm">{shop.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="text-lg mr-3">🕒</span>
                    <span className="text-sm">{shop.hours}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleVisitShop(shop.locationUrl)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105"
                >
                  Visit Shop
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerShops;
