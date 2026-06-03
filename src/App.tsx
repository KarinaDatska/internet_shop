import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/cart/CartDrawer";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Advice from "./pages/Advice";
import Contacts from "./pages/Contacts";
import Delivery from "./pages/Delivery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminProducts from "./pages/AdminProducts";
import AdminLogin from "./pages/AdminLogin";

function App() {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home onOpenCart={openCart} />} />
          <Route path="/Catalog" element={<Catalog onOpenCart={openCart} />} />
          <Route path="/Advice" element={<Advice onOpenCart={openCart} />} />
          <Route path="/Delivery" element={<Delivery onOpenCart={openCart} />} />
          <Route path="/Contacts" element={<Contacts onOpenCart={openCart} />} />
          <Route path="/Login" element={<Login onOpenCart={openCart} />} />
          <Route path="/Admin/Login" element={<AdminLogin onOpenCart={openCart} />} />
          <Route path="/Register" element={<Register onOpenCart={openCart} />} />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <Profile onOpenCart={openCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Admin/Products"
            element={
              <ProtectedRoute adminOnly>
                <AdminProducts onOpenCart={openCart} />
              </ProtectedRoute>
            }
          />
        </Routes>

        <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
