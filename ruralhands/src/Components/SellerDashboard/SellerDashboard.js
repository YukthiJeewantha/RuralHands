import { Edit, Package, Plus, Settings, ShoppingBag, Store } from 'lucide-react';

const SellerManagementCards = () => {
  // Management functions data
  const managementCards = [
    {
      title: 'Add Products',
      description: 'Add new products to your inventory',
      icon: Plus,
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'hover:from-green-600 hover:to-emerald-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      action: () => alert('Add Products clicked!')
    },
    {
      title: 'Edit Products',
      description: 'Modify existing product details',
      icon: Edit,
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'hover:from-blue-600 hover:to-cyan-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      action: () => alert('Edit Products clicked!')
    },
    {
      title: 'Manage Products',
      description: 'Organize and control your products',
      icon: Package,
      color: 'from-purple-500 to-violet-500',
      hoverColor: 'hover:from-purple-600 hover:to-violet-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      action: () => alert('Manage Products clicked!')
    },
    {
      title: 'Add Shop',
      description: 'Set up a new shop location',
      icon: Store,
      color: 'from-orange-500 to-red-500',
      hoverColor: 'hover:from-orange-600 hover:to-red-600',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      action: () => alert('Add Shop clicked!')
    },
    {
      title: 'Edit Shop',
      description: 'Update shop information and settings',
      icon: Settings,
      color: 'from-yellow-500 to-amber-500',
      hoverColor: 'hover:from-yellow-600 hover:to-amber-600',
      bgColor: 'bg-yellow-50',
      iconBg: 'bg-yellow-100',
      action: () => alert('Edit Shop clicked!')
    },
    {
      title: 'Manage Shop',
      description: 'Control shop operations and inventory',
      icon: ShoppingBag,
      color: 'from-pink-500 to-rose-500',
      hoverColor: 'hover:from-pink-600 hover:to-rose-600',
      bgColor: 'bg-pink-50',
      iconBg: 'bg-pink-100',
      action: () => alert('Manage Shop clicked!')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Seller Management</h2>
        <p className="text-gray-600">Manage your products and shop efficiently</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              className={`${card.bgColor} rounded-3xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-100 group`}
              onClick={card.action}
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="w-8 h-8 text-gray-700" />
              </div>
              
              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-800">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
              
              {/* Action Button */}
              <div className="mt-6">
                <div className={`bg-gradient-to-r ${card.color} ${card.hoverColor} text-white px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 inline-flex items-center space-x-2 shadow-sm hover:shadow-md`}>
                  <span>Get Started</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <IconComponent className="w-12 h-12" />
              </div>
            </div>
          );
        })}
      </div>
      

    </div>
  );
};

export default SellerManagementCards;