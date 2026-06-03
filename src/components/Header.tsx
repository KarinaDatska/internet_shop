import { useState, useContext } from "react";
import shopIcon from "../assets/shopping-cart.png";
import profilIcon from "../assets/user.png";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart-context";
import { useAuth } from "../hooks/useAuth";

interface HeaderProps {
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenCart }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { isAuthenticated, isAdmin, user } = useAuth();

  const cartContext = useContext(CartContext);
  const cart = cartContext?.cart;

  const totalCartPrice = cart ? cart.totalCartPrice : 0;
  const totalItems = cart
    ? cart.items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const navItems = [
    { label: "Головна", path: "/" },
    { label: "Як зробити замовлення?", path: "/Advice" },
    { label: "Доставка та оплата", path: "/Delivery" },
    { label: "Контакти", path: "/Contacts" },
    ...(isAdmin ? [{ label: "Адмін", path: "/Admin/Products" }] : []),
  ];

  const handleOpenCart = () => {
    if (!isAuthenticated) {
      navigate("/Login");
      return;
    }

    onOpenCart();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16 md:h-20">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-500 tracking-wide sm:tracking-widest cursor-pointer whitespace-nowrap"
        >
          Safe<span className="font-extrabold text-black">Pack</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-sm xl:text-[17px] font-medium text-gray-600">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="relative hover:text-[#4a6d47] transition after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#4a6d47] after:transition-all hover:after:w-full whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            {/* Cart */}
            <button
              onClick={handleOpenCart}
              className="flex items-center gap-1 sm:gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full shadow-sm transition duration-200 text-[10px] sm:text-xs md:text-sm tracking-wide"
            >
              <span className="whitespace-nowrap">
                {totalCartPrice} ₴
              </span>

              <div className="w-px h-3 sm:h-4 bg-white/30" />

              <div className="flex items-center gap-1">
                <img
                  src={shopIcon}
                  alt="cart"
                  className="w-3 h-3 sm:w-4 sm:h-4 brightness-0 invert"
                />
                <span>{totalItems}</span>
              </div>
            </button>

            {/* Profile */}
            <button
              onClick={() =>
                navigate(isAuthenticated ? "/Profile" : "/Login")
              }
              className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition border border-gray-100"
              title={isAuthenticated ? user?.email : "Увійти"}
            >
              <img
                src={profilIcon}
                alt="profile"
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              />
            </button>
          </div>

          {/* Burger */}
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a6d47]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Open menu</span>

            {menuOpen ? (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Menu */}
      {menuOpen && (
        <div className="lg:hidden w-full bg-white shadow-lg border-t border-gray-100">
          <div className="px-3 sm:px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition text-sm sm:text-base"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;