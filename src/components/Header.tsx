import { useState } from "react";
import shopIcon from "../assets/shopping-cart.png";
import profilIcon from "../assets/user.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Головна", path: "/" },
    { label: "Як зробити замовлення?", path: "/Advice" },
    { label: "Доставка і оплата", path: "/Delivery" },
    { label: "Контакти", path: "/Contacts" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-500 tracking-widest cursor-pointer"
        >
          Safe<span className="font-extrabold text-black">Pack</span>
        </div>

        {/* Desktop nav ≥1024px */}
        <nav className="hidden lg:flex items-center gap-6 lg:gap-8 text-sm lg:text-[17.5px] font-medium text-gray-600">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="relative hover:text-[#4a6d47] transition after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#4a6d47] after:transition-all hover:after:w-full"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Icons + Search */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Іконки завжди */}
          <div className="flex items-center gap-2 sm:gap-3">
            {[shopIcon, profilIcon].map((icon, index) => (
              <button
                key={index}
                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition"
              >
                <img
                  src={icon}
                  alt="icon"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </button>
            ))}
          </div>

          {/* Бургер-меню для <1024px */}
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

      {/* Mobile / Tablet menu <1024px */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
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
