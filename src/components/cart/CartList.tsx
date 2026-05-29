import React from 'react';
import { useCart } from '../../hooks/useCart';
import { CartItem } from './CartItem';

export const CartList: React.FC = () => {
  const { cart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <p>Ваш кошик порожній</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cart.items.map((item) => (
        <CartItem key={item.productId} item={item} />
      ))}
    </div>
  );
};