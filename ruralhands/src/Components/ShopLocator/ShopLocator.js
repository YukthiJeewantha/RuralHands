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

  