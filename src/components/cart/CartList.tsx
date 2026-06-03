import React from 'react';
import { useCart } from '../../hooks/useCart';
import { CartItem } from './CartItem';

export const CartList: React.FC = () => {
  const { cart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-62.5 text-gray-400 px-4 text-center">
        <p className="text-sm sm:text-base">
          Ваш кошик порожній
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
      {cart.items.map((item) => (
        <CartItem
          key={item.productId}
          item={item}
        />
      ))}
    </div>
  );
};