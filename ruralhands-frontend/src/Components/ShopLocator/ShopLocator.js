import { useEffect, useState } from "react";
import axios from "axios";

const ShopLocator = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleVisitShop = (locationUrl) => {
    window.open(locationUrl, "_blank");
  };

  const handleImageError = (e, fallbackGradient) => {
    e.target.style.display = "none";
    e.target.parentElement.style.background = fallbackGradient;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = "";

    for (let i = 0; i < fullStars; i++) stars += "★";
    if (hasHalfStar) stars += "☆";
    while (stars.length < 5) stars += "☆";

    return stars;
  };

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/shops");
        setShops(response.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-800">Authentic Local</span>
            <span className="text-orange-500"> Shops</span>
          </h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Connect with rural artisans and explore authentic local{" "}
            <span className="text-orange-600 font-semibold">shops</span> powered
            by{" "}
            <span className="text-orange-600 font-semibold">Rural Hands</span>
          </p>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="text-center text-orange-600 text-lg">
            Loading shops...
          </div>
        ) : shops.length === 0 ? (
          <div className="text-center text-red-500 text-lg">
            No shops found.
          </div>
        ) : (
          // Shop Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shops.map((shop) => (
              <div
                key={shop._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image */}
                <div
                  className="h-48 relative overflow-hidden"
                  style={{
                    background: shop.fallbackGradient || "#f5f5f5",
                  }}
                >
                  <img
                    src={shop.imageUrl}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      handleImageError(e, shop.fallbackGradient || "#e0e0e0")
                    }
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {shop.name}
                  </h3>

                  <div className="flex items-center mb-4">
                    <span className="text-yellow-400 text-lg mr-2">
                      {renderStars(shop.rating || 4.5)}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {shop.rating || 4.5} ({shop.reviews || 0} reviews)
                    </span>
                  </div>

                  <div className="space-y-2 mb-6 text-gray-600 text-sm">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">📍</span> {shop.address}
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-3">📞</span> {shop.phone}
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-3">🕒</span> {shop.hours}
                    </div>
                  </div>

                  <button
                    onClick={() => handleVisitShop(shop.locationUrl)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    Visit Shop
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center py-8 border-t border-gray-200">
          <p className="text-gray-600">
            Can't find what you're looking for?
            <button className="text-blue-500 hover:text-blue-600 font-semibold ml-2">
              Contact Us
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopLocator;
