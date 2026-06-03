import React, { useEffect, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { CartList } from './CartList';
import { CartSummary } from './CartSummary';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const [checkoutMessage, setCheckoutMessage] = useState('');

  useEffect(() => {
    if (cart.items.length > 0) {
      setCheckoutMessage('');
    }
  }, [cart.items.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 flex justify-end w-full">
        <div className="w-full sm:w-screen sm:max-w-md bg-gray-50 flex flex-col shadow-2xl h-full">

          {/* Header */}
          <div className="p-4 sm:p-6 bg-white border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              У кошику{' '}
              <span className="text-orange-500">
                {cart.items.length}
              </span>{' '}
              товарів
            </h2>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 text-2xl font-bold p-1"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            {checkoutMessage && (
              <div className="mb-4 rounded-2xl bg-green-50 p-4 sm:p-5 text-sm font-medium text-green-700 wrap-break-word">
                {checkoutMessage}
              </div>
            )}

            {isAuthenticated ? (
              <CartList />
            ) : (
              <div className="rounded-2xl bg-white p-4 sm:p-5 text-sm text-gray-500">
                Увійди в акаунт, щоб користуватися кошиком.
              </div>
            )}
          </div>

          {/* Footer */}
          {isAuthenticated && cart.items.length > 0 && (
            <CartSummary
              onCheckoutSuccess={setCheckoutMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;