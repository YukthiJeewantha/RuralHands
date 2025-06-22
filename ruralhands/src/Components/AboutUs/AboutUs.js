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

      {/* Values Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-orange-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at RURALHANDS
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Authenticity",
                description: "We celebrate genuine craftsmanship and traditional techniques passed down through generations."
              },
              {
                icon: Users,
                title: "Community Support",
                description: "Empowering rural communities by providing sustainable income opportunities for skilled artisans."
              },
              {
                icon: Award,
                title: "Quality Excellence",
                description: "Each product undergoes careful quality checks to ensure you receive only the finest handicrafts."
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "Connecting local artisans with customers worldwide, breaking geographical barriers."
              },
              {
                icon: Handshake,
                title: "Fair Trade",
                description: "Ensuring fair compensation and ethical practices in all our partnerships with artisans."
              },
              {
                icon: Sparkles,
                title: "Cultural Heritage",
                description: "Preserving and promoting traditional art forms for future generations to appreciate."
              }
            ].map((value, index) => (
              <div key={index} className="group bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Our <span className="text-yellow-200">Mission</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl leading-relaxed mb-8 text-orange-100">
                To create a sustainable ecosystem where rural artisans can thrive by showcasing their incredible talents to a global audience, while preserving traditional craftsmanship for future generations.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl font-bold text-yellow-200 mb-2">500+</div>
                  <div className="text-orange-100">Artisan Partners</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl font-bold text-yellow-200 mb-2">50+</div>
                  <div className="text-orange-100">Countries Served</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-3xl font-bold text-yellow-200 mb-2">10k+</div>
                  <div className="text-orange-100">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      