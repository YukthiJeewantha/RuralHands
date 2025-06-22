import { Award, Globe, Handshake, Heart, Sparkles, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 mt-10">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          About Us
        </h2>
        <div className="mt-6 w-32 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            Connecting Rural Artisans with the World Through Authentic Handicrafts
          </p>
        </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Our <span className="text-orange-600">Story</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Born from a passion to preserve traditional craftsmanship, RURALHANDS bridges the gap between talented rural artisans and art lovers worldwide. We believe every handcrafted piece tells a story of heritage, skill, and dedication.
              </p>
              <p>
                Our journey began when we witnessed the incredible talent hidden in remote villages, where generations of artisans create masterpieces with limited market access. We decided to change that narrative.
              </p>
              <p>
                Today, we're proud to be the platform where authentic handicrafts find their deserving audience, ensuring fair compensation for our artisan partners while delivering unique, meaningful pieces to our customers.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 transform rotate-3 shadow-2xl">
              <div className="bg-white rounded-2xl p-8 transform -rotate-6">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Handcrafted Excellence</h3>
                  <p className="text-gray-600">Every piece is a work of art, crafted with love and precision</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      