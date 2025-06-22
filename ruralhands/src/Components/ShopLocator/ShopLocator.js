const handleVisitShop = (locationUrl) => {
  window.open(locationUrl, "_blank");
};

const ShopLocator = () => {
  const shops = [
    {
      id: 1,
      name: "Lakpahana",
      rating: 4.8,
      reviews: 156,
      address: "No. 60, York Street, Colombo 01",
      phone: "+94 11 269 8211",
      hours: "9:00 AM - 8:00 PM",
      image:
        "https://www.sacredheartmission.org/wp-content/uploads/2021/11/preston-op-shop-shopfront-600x400.jpg",
      fallbackGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      locationUrl: "https://maps.app.goo.gl/UNBmJeGCScM1V39G7",
    },
    {
      id: 2,
      name: "Laksala",
      rating: 4.9,
      reviews: 203,
      address: "110 Poruthota Road, Negombo",
      phone: "+94 11 258 0579",
      hours: "10:00 AM - 9:00 PM",
      image:
        "https://www.shutterstock.com/image-illustration/store-facade-large-storefronts-wellilluminated-260nw-2301241861.jpg",
      fallbackGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      locationUrl:
        "https://www.google.com/maps?q=456+Digital+Avenue,+Los+Angeles,+CA",
    },
    {
      id: 3,
      name: "Island Craft",
      rating: 4.7,
      reviews: 128,
      address: "14 Reid Avenue, Colombo 07",
      phone: "+94 11 702 1377",
      hours: "8:00 AM - 7:00 PM",
      image:
        "https://antdisplay.com/pub/media/store_display/1-1z521235943.jpg",
      fallbackGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      locationUrl:
        "https://www.google.com/maps?q=789+Artist+Street,+Chicago,+IL",
    },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = "";

    for (let i = 0; i < fullStars; i++) {
      stars += "★";
    }
    if (hasHalfStar) {
      stars += "☆";
    }
    while (stars.length < 5) {
      stars += "☆";
    }

    return stars;
  };

  const handleImageError = (e, fallbackGradient) => {
    e.target.style.display = "none";
    e.target.parentElement.style.background = fallbackGradient;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-7xl mx-auto">
        {/* Shop by Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-800">Authentic Local</span>
            <span className="text-orange-500"> Shops</span>
          </h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Connect with rural artisans and explore authentic local   {" "}
            <span className="text-orange-600 font-semibold">shops</span> powered by{" "}
            <span className="text-orange-600 font-semibold">Rural Hands</span>
          </p>
        </div>

        

        {/* Shops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Shop Image */}
              <div
                className="h-48 relative overflow-hidden"
                style={{ background: shop.fallbackGradient }}
              >
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                  onError={(e) => handleImageError(e, shop.fallbackGradient)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>

              {/* Shop Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {shop.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <span className="text-yellow-400 text-lg mr-2">
                    {renderStars(shop.rating)}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {shop.rating} ({shop.reviews} reviews)
                  </span>
                </div>

                