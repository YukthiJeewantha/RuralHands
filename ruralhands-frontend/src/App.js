import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import AboutUs from "./Components/AboutUs/AboutUs";
import AddProduct from "./Components/AddProducts/AddProducts";
import AddLocater from "./Components/AddShop/AddShop";
import Blog from "./Components/Blog/Blog";
import Chat from "./Components/Chat/Chat";
import ContactUs from "./Components/ContactUs/ContactUs";
import EditProduct from "./Components/EditProducts/EditProducts";
import EditShop from "./Components/EditShops/EditShops";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import LoginPage from "./Components/LoginPage/LoginPage";
import ManageProducts from "./Components/ManageProducts/ManageProducts";
import ManageShops from "./Components/ManageShops/ManageShops";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import OrdersPage from "./Components/Orders/Orders";
import Payments from "./Components/Payments/Payments";
import Products from "./Components/Products/Products";
import SellerDashboard from "./Components/SellerDashboard/SellerDashboard";
import SellerNavigation from "./Components/SellerNavBar/SellerNavBar";
import SellerProducts from "./Components/SellerProducts/SellerProducts";
import SellerShop from "./Components/SellerShops/SellerShops";
import ShopLocator from "./Components/ShopLocator/ShopLocator";
import SignupPage from "./Components/SignupPage/SignupPage";
import { default as SellerSignUp, default as SignupSeller } from "./Components/SignupPage/SignUpSeller";
import { CartProvider } from "./Contexts/CartContext";

function AppContent() {
  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem("userRole") || "buyer");

  // Paths where NavigationBar and Footer should be hidden
  const hidePaths = ["/LoginPage", "/SignupPage", "/Signupseller"];
  const shouldHideUI = hidePaths.includes(location.pathname);

  useEffect(() => {
    const updateRole = () => {
      const storedRole = localStorage.getItem("userRole") || "buyer";
      setRole(storedRole);
    };

    window.addEventListener("storage", updateRole);
    window.addEventListener("roleChange", updateRole);
    updateRole();

    return () => {
      window.removeEventListener("storage", updateRole);
      window.removeEventListener("roleChange", updateRole);
    };
  }, []);

  return (
    <>
      {!shouldHideUI && role === "seller" && <SellerNavigation />}
      {!shouldHideUI && role === "buyer" && <NavigationBar />}

      <Routes>
        {role === "buyer" && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/products" element={<Products />} />
            <Route path="/shopLocator" element={<ShopLocator />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/SignupPage" element={<SignupPage />} />
            <Route path="/Signupseller" element={<SellerSignUp />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Payments" element={<Payments />} />
            <Route path="/Chat" element={<Chat />} />
          </>
        )}

        {role === "seller" && (
          <>
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/SignupSeller" element={<SignupSeller />} />
            <Route path="/sellerdashboard" element={<SellerDashboard />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/addlocater" element={<AddLocater />} />
            <Route path="/seller/products" element={<SellerProducts />} />
            <Route path="/editProduct" element={<EditProduct />} />
            <Route path="/editShop" element={<EditShop />} />
            <Route path="/seller/shops" element={<SellerShop />} />
            <Route path="/manageProduct" element={<ManageProducts />} />
            <Route path="/manageShops" element={<ManageShops />} />
            <Route path="/seller/orders" element={<OrdersPage />} />
          </>
        )}
      </Routes>
      {!shouldHideUI && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Router>
          <AppContent />
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
