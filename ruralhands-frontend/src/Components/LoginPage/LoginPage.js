import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Assests/logo.png";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState("buyer");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const loginEndpoint =
      userType === "seller"
        ? "http://localhost:5000/api/login/seller"
        : "http://localhost:5000/api/login/buyer";

    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("userRole", userType);
        window.dispatchEvent(new Event("roleChange")); // Optional event for others to catch

        //  Store sellerId or buyerId depending on role
        if (userType === "seller") {
          localStorage.setItem("sellerId", result.seller._id); //  Save sellerId
          navigate("/sellerdashboard");
        } else {
          localStorage.setItem("buyerId", result.buyer._id); // if backend sends buyer object
          navigate("/");
        }
      } else {
        console.log(result.message);
        alert(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99 102 241) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center shadow-lg border-2 border-orange-200">
              <img src={logo} alt="Logo" className="w-40 h-40 object-contain" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome</h1>
          <p className="text-gray-600 text-sm">
            Sign in to your account to continue
          </p>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <label className="text-xl font-medium text-gray-700 mb-3 block">
            I am a:
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setUserType("buyer")}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-md ${
                userType === "buyer"
                  ? "bg-white text-blue-600 shadow-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                  : "text-gray-600 hover:text-blue-600 hover:bg-white/50"
              }`}
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => setUserType("seller")}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-md ${
                userType === "seller"
                  ? "bg-white text-blue-600 shadow-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                  : "text-gray-600 hover:text-blue-600 hover:bg-white/50"
              }`}
            >
              Seller
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-all duration-200 cursor-pointer hover:scale-110 hover:bg-gray-100 rounded-full p-1"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-700 cursor-pointer select-none"
              >
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-all duration-200 cursor-pointer hover:scale-105 hover:underline hover:bg-blue-50 px-2 py-1 rounded"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button with Very Visible Hover Effect */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-500 hover:shadow-2xl hover:rounded-xl active:transform active:scale-90 cursor-pointer"
          >
            <span className="hover:animate-bounce">
              Sign in as {userType === "buyer" ? "Buyer" : "Seller"}
            </span>
          </button>
        </div>

        {/* Sign Up Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-600 text-sm">Don't have an account?</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate("/SignupPage")}
              className="text-blue-600 hover:text-blue-700 font-medium transition-all duration-200 text-sm cursor-pointer hover:scale-105 hover:underline hover:bg-blue-50 px-2 py-1 rounded"
            >
              Sign up as Buyer
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => navigate("/SignupSeller")}
              className="text-blue-600 hover:text-blue-700 font-medium transition-all duration-200 text-sm cursor-pointer hover:scale-105 hover:underline hover:bg-blue-50 px-2 py-1 rounded"
            >
              Sign up as Seller
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © 2024 Your Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
