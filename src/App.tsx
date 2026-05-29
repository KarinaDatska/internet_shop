import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/cart/CartDrawer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Advice from "./pages/Advice";
import Contacts from "./pages/Contacts";
import Delivery from "./pages/Delivery";

function App() {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home onOpenCart={openCart} />} />
        <Route path="/Catalog" element={<Catalog onOpenCart={openCart} />} />
        <Route path="/Advice" element={<Advice onOpenCart={openCart} />} />
        <Route path="/Delivery" element={<Delivery onOpenCart={openCart} />} />
        <Route path="/Contacts" element={<Contacts onOpenCart={openCart} />} />
      </Routes>

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </CartProvider>
  );
}

export default App;