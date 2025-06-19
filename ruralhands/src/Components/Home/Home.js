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

