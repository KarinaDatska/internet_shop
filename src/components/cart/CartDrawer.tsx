import React from 'react';
import { useCart } from '../../hooks/useCart';
import { CartList } from './CartList';
import { CartSummary } from './CartSummary';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 transition-opacity" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-gray-50 flex flex-col shadow-2xl h-full">
          
          <div className="p-6 bg-white border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              У кошику <span className="text-orange-500">{cart.items.length}</span> товарів
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 text-xl font-bold p-1">×</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <CartList />
          </div>

          {cart.items.length > 0 && <CartSummary />}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;