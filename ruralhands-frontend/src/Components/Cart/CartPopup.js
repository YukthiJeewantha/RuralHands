// Components/NavigationBar/CartPopup.js
import { Minus, Package, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Contexts/CartContext';

const CartPopup = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice
  } = useCart();

  // Handle navigation and close popup
  const goToCart = () => {
    setIsCartOpen(false);
    navigate(' ');
  };

  const goToCheckout = () => {
    setIsCartOpen(false);
    navigate('/Payments');
  };

  if (!isCartOpen) return null;

  return (
    <div className="absolute right-0 mt-3 w-[420px] bg-white rounded-2xl shadow-2xl py-0 z-30 border border-gray-100 animate-in slide-in-from-top-2 duration-200 max-h-[600px] overflow-hidden flex flex-col">
      {/* Cart Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Shopping Cart</h3>
            <p className="text-sm text-gray-600">{getTotalItems()} items</p>
          </div>
        </div>
        <button 
          onClick={() => setIsCartOpen(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200 w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0" style={{ maxHeight: '400px' }}>
        {cartItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h4>
            <p className="text-gray-500">Add some products to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-gray-50 to-orange-25 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
                {/* Checkbox */}
                <div className="flex items-center pt-1">
                  <input
                    type="checkbox"
                    id={`item-${item.id}`}
                    defaultChecked
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                  />
                </div>
                
                {/* Product Image */}
                <div className="w-14 h-14 bg-white rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image || "https://via.placeholder.com/56"} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{item.name}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-600 font-bold text-base">Rs. {item.price?.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Unit price</p>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls and Subtotal */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                        >
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                        >
                          <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                      
                      <p className="text-sm font-semibold text-gray-900">
                        <span className="text-orange-600">Rs. {(item.price * item.quantity)?.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Footer */}
      {cartItems.length > 0 && (
        <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-gray-50 to-orange-25 border-t border-orange-100">
          {/* Summary */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium">Items ({getTotalItems()}):</span>
              <span className="text-gray-900 font-semibold">Rs. {getTotalPrice()?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium">Delivery:</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-medium">Tax:</span>
              <span className="text-gray-900 font-semibold">Rs. 0</span>
            </div>
            <div className="border-t border-orange-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                <span className="text-2xl font-bold text-orange-600">Rs. {getTotalPrice()?.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={goToCheckout}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Proceed to Checkout</span>
            </button>
            <button 
              onClick={goToCart}
              className="w-full px-6 py-2 border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-all duration-300 font-semibold"
            >
              View Full Cart
            </button>
          </div>
          
          {/* Additional Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center space-x-2">
              <span>🔒</span>
              <span>Secure checkout</span>
              <span>•</span>
              <span>💰</span>
              <span>Free delivery on orders over Rs. 10000</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPopup;