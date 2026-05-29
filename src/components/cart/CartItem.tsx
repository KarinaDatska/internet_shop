import React from 'react';
import type { CartItemDto } from '../../types/cart';
import { useCart } from '../../hooks/useCart';

interface CartItemProps {
  item: CartItemDto;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 relative group">
      <img 
        src={item.imageUrl || '/placeholder-package.png'} 
        alt={item.productName} 
        className="w-16 h-16 object-cover rounded-xl bg-gray-50"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-800 truncate pr-6">{item.productName}</h4>
        <div className="text-xs mt-0.5">
          {item.quantity >= item.minOptQuantity ? (
            <span className="text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded">🔥 Опт</span>
          ) : (
            <span className="text-gray-400">Роздріб (опт від {item.minOptQuantity} шт)</span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-gray-200 rounded-full bg-white px-2 py-0.5 gap-3">
            <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="text-orange-500 font-bold text-lg px-1">-</button>
            <span className="text-sm font-semibold text-gray-700 w-4确 text-center">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="text-orange-500 font-bold text-lg px-1">+</button>
          </div>
        </div>
      </div>
      <div className="text-right flex flex-col justify-between items-end h-16">
        <button onClick={() => removeFromCart(item.productId)} className="text-gray-300 hover:text-red-500 text-xs transition-colors">Видалити</button>
        <span className="font-semibold text-gray-900 whitespace-nowrap">{item.totalPrice} ₴</span>
      </div>
    </div>
  );
};