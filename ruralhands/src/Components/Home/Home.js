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

      