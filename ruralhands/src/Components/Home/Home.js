import { Award, Heart, Shield, Star, Truck, Users } from 'lucide-react';
import { useEffect, useState } from "react";

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const totalSlides = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

  const images = [
    "https://us.123rf.com/450wm/kampwit/kampwit1708/kampwit170800423/88341725-beautiful-handmade-ceramic-pot-and-vase-in-exotic-patterns-at-night-market.jpg?ver=6",
    "https://lk.lakpura.com/cdn/shop/files/Raksha.jpg?v=1697704607&width=3200",
    "https://i.pinimg.com/736x/12/bd/44/12bd448dd9a92cb883ced7bb9d7c1be8.jpg",
  ];

  const products = [
    {
      id: 1,
      name: "Hand-woven Basket",
      artist: "Kumari Perera",
      rating: 4,
      reviews: 127,
      price: 3500,
      image: "https://i.ebayimg.com/images/g/-3MAAOSwHdli9vBR/s-l1200.jpg"
    },
    {
      id: 2,
      name: "Wooden Mask",
      artist: "Nadeeka Ranasinghe",
      rating: 4,
      reviews: 89,
      price: 8500,
      image: "https://static-01.daraz.lk/p/3d90e1e93d7a531bfd314464222d1759.jpg"
    },
    {
      id: 3,
      name: "Ceramic Pottery Set",
      artist: "Sanjeewa Fernando",
      rating: 5,
      reviews: 203,
      price: 12000,
      image: "https://www.amalfieeceramics.com/cdn/shop/files/Venice-Premium-Ceramic-Dinner-Set-of-28-Pcs-Amalfiee-Ceramics-1683200397.jpg?v=1683200399"
    },
    {
      id: 4,
      name: "Wooden Statue",
      artist: "Ashanthi Seneviratne",
      rating: 4,
      reviews: 156,
      price: 6000,
      image: "https://m.media-amazon.com/images/I/81j5+-eOf2L.jpg"
    }
  ];

  const benefits = [
    {
      id: 1,
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over Rs. 10000"
    },
    {
      id: 2,
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure checkout"
    },
    {
      id: 3,
      icon: Award,
      title: "Quality Guarantee",
      description: "30-day return policy"
    },
    {
      id: 4,
      icon: Users,
      title: "Community Impact",
      description: "Supporting rural families"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full max-w-8xl mx-auto h-56 sm:h-72 md:h-80 lg:h-[22rem] overflow-hidden rounded-lg shadow-lg">
        {/* Overlay for darkening background for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

        {/* Text content */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 text-center px-6 max-w-xl">
          <h1 className="text-white text-2xl sm:text-3xl font-bold drop-shadow-md uppercase">
            Discover Authentic Sri Lankan Crafts
          </h1>
        </div>

        {/* Slideshow images */}
        <div className="w-full h-full relative">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Craft ${i + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Made with Love */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Made with Love
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every product is handcrafted with care by skilled artisans who take pride in their work.
              </p>
            </div>

            {/* Supporting Communities */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Supporting Communities
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your purchases directly support rural families and help preserve traditional crafts.
              </p>
            </div>

            {/* Quality Guaranteed */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Quality Guaranteed
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We stand behind every product with our satisfaction guarantee and authentic quality promise.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Handcrafted Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover unique, authentic products made by talented rural artisans
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {/* Heart Icon */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(product.id)
                          ? 'text-red-500 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    by {product.artist}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-2">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  {/* Price Display */}
                  <div className="text-center">
                    <span className="text-2xl font-bold text-green-600">
                      Rs. {product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Real stories from people who love handcrafted quality
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                rating: 5,
                text: "The quality of handcrafted items here is exceptional. I love supporting rural artisans!",
                name: "Chathurika Jayasinghe",
                location: "Homagama, Sri Lanka"
              },
              {
                id: 2,
                rating: 5,
                text: "Fresh, authentic products that tell a story. Rural Hands connects me to real craftsmanship.",
                name: "Anuruddha Dissanayake",
                location: "Kadawatha, Sri Lanka"
              },
              {
                id: 3,
                rating: 5,
                text: "Every purchase feels meaningful. The artisans' stories make each product special.",
                name: "Shavinda Perera",
                location: "Gampaha, Sri Lanka"
              }
            ].map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Stars */}
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        index < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Customer Info */}
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900 mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      </div>
    </div>
  );
};

export default Homepage;