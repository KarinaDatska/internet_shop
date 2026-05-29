import React from 'react';
import { useCart } from '../../hooks/useCart';

export const CartSummary: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className="p-6 bg-white border-t border-gray-200 space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-lg">Ітого</span>
        <span className="text-2xl font-bold text-gray-900">{cart.totalCartPrice} ₴</span>
      </div>
      <button 
        onClick={() => alert("Оформлюємо замовлення! 🚀")} 
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 px-6 rounded-2xl shadow-lg transition-all text-center text-base"
      >
        Оформити замовлення →
      </button>
    </div>
  );
};