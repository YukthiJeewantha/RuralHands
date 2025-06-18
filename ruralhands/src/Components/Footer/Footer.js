import { Facebook, Instagram, Twitter } from 'lucide-react';

const RuralHandsFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                  Rural Hands
                </h3>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Your trusted destination for authentic rural products and traditional crafts at unbeatable prices. Supporting local communities one purchase at a time.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          
        </div>
      </div>
    </footer>
  );
};

export default RuralHandsFooter;