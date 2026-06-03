import React from "react";
import Header from "../components/Header";
import DeliveryHelp from "../components/DeliveryHelp";

interface PageProps {
  onOpenCart: () => void;
}

const Delivery: React.FC<PageProps> = ({ onOpenCart }) => {
  return (
    <div className="bg-[#f6f6f4] min-h-screen">
      <Header onOpenCart={onOpenCart} />
      <DeliveryHelp />
    </div>
  );
};

export default Delivery;