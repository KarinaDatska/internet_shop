import React from "react";
import Header from "../components/Header";
import OrderHelp from "../components/OrderHelp";

interface PageProps {
  onOpenCart: () => void;
}

const Advice: React.FC<PageProps> = ({ onOpenCart }) => {
  return (
    <div className="bg-[#f6f6f4] min-h-screen">
      {/* Передаємо проп у Header */}
      <Header onOpenCart={onOpenCart} />
      <OrderHelp />
    </div>
  );
};

export default Advice;