import {
  CheckCircle,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  Smartphone,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";
// Corrected import path for CartContext
import { useCart } from "../../Contexts/CartContext";

const PaymentPage = () => {
  const { clearCart, cartItems } = useCart(); // cartItems for backend update
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // Initial state for clearing the form
  const initialFormData = {
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({
      ...formData,
      cardNumber: formatted,
    });
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleExpiryDateChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData({
      ...formData,
      expiryDate: formatted,
    });
  };

  const handleCompletePayment = async () => {
    if (cartItems.length === 0) {
      // Replaced alert with a custom message box for better UX
      // For a real application, consider a dedicated modal component
      const messageBox = document.createElement("div");
      messageBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); z-index: 9999; text-align: center;">
          <p class="text-lg font-semibold text-gray-800 mb-4">Your cart is empty!</p>
          <button onclick="this.parentElement.remove()" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      return;
    }

    setLoading(true);

    // Map cartItems with sellerId included
    const itemsForBackend = cartItems.map((item) => ({
      productId: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      sellerId: item.sellerId,
      image: item.image,
    }));

    const fullAddress = `${formData.streetAddress}, ${formData.city}, ${formData.state}, ${formData.zipCode}`;

    const orderData = {
      customerName: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      email: formData.email,
      address: fullAddress,
      items: itemsForBackend,
      totalPrice: cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      paymentMethod,
    };

    try {
      // Step 1: Update stock
      const stockRes = await fetch(
        "http://localhost:5000/api/orders/update-stock",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: itemsForBackend }),
        }
      );

      if (!stockRes.ok) {
        const stockError = await stockRes.json();
        throw new Error(stockError.message || "Stock update failed");
      }

      // Step 2: Create order
      const orderRes = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!orderRes.ok) {
        const orderError = await orderRes.json();
        throw new Error(orderError.message || "Order creation failed");
      }

      setShowSuccessPopup(true);
      clearCart();
      setFormData(initialFormData); // Clear the form data

      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      // Replaced alert with a custom message box for better UX
      const messageBox = document.createElement("div");
      messageBox.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); z-index: 9999; text-align: center;">
          <p class="text-lg font-semibold text-gray-800 mb-4">Payment failed: ${error.message}</p>
          <button onclick="this.parentElement.remove()" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 font-inter">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h3>
            <p className="text-gray-600 mb-4">
              Your order has been processed successfully.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              {/* Note: The total amount and transaction ID are hardcoded here.
                  In a real application, these should come from the successful backend response. */}
              <p className="text-green-800 font-medium">
                Order Total: Rs{" "}
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toLocaleString()}
              </p>
              <p className="text-green-600 text-sm">
                Transaction ID: #RH{Math.floor(Math.random() * 1000000000)}{" "}
                {/* Placeholder */}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              You will receive a confirmation email shortly.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Complete Your Purchase
          </h1>
          <p className="text-lg text-gray-600">
            Secure payment for your RURALHANDS handicrafts
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Method & Billing */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <CreditCard className="mr-3 text-blue-600" size={24} />
                Payment Method
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center ${
                    paymentMethod === "card"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard className="mr-2" size={20} />
                  Credit/Debit Card
                </button>
                <button
                  onClick={() => setPaymentMethod("wallet")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center ${
                    paymentMethod === "wallet"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Smartphone className="mr-2" size={20} />
                  Digital Wallet
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard
                        className="absolute left-3 top-3 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleExpiryDateChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setFormData({ ...formData, cvv: value });
                        }}
                        placeholder="123"
                        maxLength="4"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "wallet" && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <button className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300">
                      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
                        <Smartphone className="text-white" size={16} />
                      </div>
                      <span className="font-medium text-gray-700">
                        Apple Pay
                      </span>
                    </button>
                    <button className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-300">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">G</span>
                      </div>
                      <span className="font-medium text-gray-700">
                        Google Pay
                      </span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Select your preferred digital wallet to complete payment
                    securely
                  </p>
                </div>
              )}
            </div>

            {/* Billing Address Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="mr-3 text-blue-600" size={24} />
                Billing Address
              </h2>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-3 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-3 text-gray-400"
                        size={20}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john.doe@example.com"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-3 text-gray-400"
                        size={20}
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Street Address
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-3 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Security & Complete Payment */}
          <div className="space-y-6">
            {/* Security & Trust Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Shield className="mr-3 text-green-600" size={24} />
                Security & Trust
              </h2>

              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <Lock className="text-green-600 mr-2" size={20} />
                    <span className="font-semibold text-green-800">
                      SSL Encrypted
                    </span>
                  </div>
                  <p className="text-green-700 text-sm">
                    Your data is protected
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="text-blue-600 mr-2" size={20} />
                    <span className="font-semibold text-blue-800">
                      PCI DSS Compliant
                    </span>
                  </div>
                  <p className="text-blue-700 text-sm">
                    Industry standard security
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <Zap className="text-purple-600 mr-2" size={20} />
                    <span className="font-semibold text-purple-800">
                      Instant Processing
                    </span>
                  </div>
                  <p className="text-purple-700 text-sm">
                    Real-time payment verification
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-3">
                  Accepted Payment Methods
                </p>
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">
                    VISA
                  </div>
                  <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">
                    MASTER
                  </div>
                  <div className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold">
                    BOC
                  </div>
                  <div className="bg-purple-600 text-white px-3 py-1 rounded text-xs font-bold">
                    PEOPLES
                  </div>
                  <div className="bg-orange-600 text-white px-3 py-1 rounded text-xs font-bold">
                    HNB
                  </div>
                  <div className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-bold">
                    SAMPATH
                  </div>
                  <div className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold">
                    COMBANK
                  </div>
                  <span className="text-gray-500 text-sm">& more</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    Rs{" "}
                    {cartItems
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Rs 850</span>{" "}
                  {/* Hardcoded, adjust as needed */}
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">
                    Rs{" "}
                    {(
                      cartItems.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      ) + 850
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Complete Payment Button */}
            <button
              onClick={handleCompletePayment}
              disabled={loading}
              className={`w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-xl
                hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl
                flex items-center justify-center text-lg ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              <Lock className="mr-2" size={20} />
              {loading ? "Processing..." : "Complete Payment"}
            </button>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By completing this purchase, you agree to our Terms of Service and
              Privacy Policy. Your payment information is secure and encrypted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
