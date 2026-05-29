import React from "react";
import Header from "../components/Header";
import ContactHelp from "../components/ContactHelp";

interface PageProps {
  onOpenCart: () => void;
}

const Constants: React.FC<PageProps> = ({ onOpenCart }) => {
  return (
    <div className="bg-[#f6f6f4] min-h-screen">
      {/* Передаємо проп у Header */}
      <Header onOpenCart={onOpenCart} />
      <ContactHelp />
    </div>
  );
};

export default Constants;