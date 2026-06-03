import React from 'react';
import type { CartItemDto } from '../../types/cart';
import { useCart } from '../../hooks/useCart';

const API_BASE_URL = 'http://localhost:5220';

interface CartItemProps {
  item: CartItemDto;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const backendPath =
    item.imageUrl ||
    (item as any).productImageUrl ||
    '/images/skotch.jpg';

  const finalImageUrl = backendPath.startsWith('http')
    ? backendPath
    : `${API_BASE_URL}${backendPath.startsWith('/') ? '' : '/'}${backendPath}`;

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-2xl shadow-sm border border-gray-100">

      {/* Фото */}
      <div className="flex justify-center sm:justify-start shrink-0">
        <img
          src={finalImageUrl}
          alt={item.productName}
          className="w-20 h-20 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-xl bg-gray-50"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/100x100?text=No+Image';
          }}
        />
      </div>

      {/* Інформація */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-800 text-sm sm:text-base wrap-break-word">
          {item.productName}
        </h4>

        <div className="text-xs mt-1">
          {item.isWholesale ? (
            <span className="inline-block text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
              Оптова ціна
            </span>
          ) : (
            <span className="text-gray-400 wrap-break-word">
              Роздріб {item.wholesaleRule ? `(опт ${item.wholesaleRule})` : ''}
            </span>
          )}
        </div>

        <div className="flex items-center mt-3">
          <div className="flex items-center border border-gray-200 rounded-full bg-white px-2 py-1 gap-2 sm:gap-3">
            <button
              onClick={() =>
                updateQuantity(item.productId, item.quantity - 1)
              }
              className="text-orange-500 font-bold text-xl w-7 h-7 flex items-center justify-center"
            >
              -
            </button>

            <span className="text-sm font-semibold text-gray-700 min-w-6 text-center">
              {item.quantity}
            </span>

            <button
              onClick={() =>
                updateQuantity(item.productId, item.quantity + 1)
              }
              className="text-orange-500 font-bold text-xl w-7 h-7 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Ціна та видалення */}
      <div className="flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-2 sm:gap-3 min-w-fit">
        <button
          onClick={() => removeFromCart(item.productId)}
          className="text-gray-400 hover:text-red-500 text-xs transition-colors whitespace-nowrap"
        >
          Видалити
        </button>

        <span className="font-semibold text-gray-900 whitespace-nowrap text-base">
          {item.totalPrice} ₴
        </span>
      </div>
    </div>
  );
};