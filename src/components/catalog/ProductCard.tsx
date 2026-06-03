import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductDto } from '../../types/product';
import { useCart } from '../../hooks/useCart'; // Імпортуємо наш хук кошика
import { useAuth } from '../../hooks/useAuth';

interface ProductCardProps {
  product: ProductDto;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBuyClick = async () => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }

    await addToCart(product.id, 1);
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between transition-shadow hover:shadow-md">
      <div>
        <div className="relative">
          <img 
            src={product.imageUrl || '/placeholder-package.png'} 
            alt={product.name} 
            className="w-full h-48 object-cover rounded-xl mb-4 bg-gray-50"
          />
          {product.wholesaleRule && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
              Опт {product.wholesaleRule}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-gray-800 text-base line-clamp-1">{product.name}</h3>
        <p className="text-xs text-gray-400 mt-1 line-clamp-2 min-h-8">{product.description}</p>
      </div>

      <div className="mt-5 pt-3 border-t border-gray-50 flex items-end justify-between">
        <div>
          <div className="text-[11px] text-gray-400 leading-none">Роздріб / Опт</div>
          <div className="text-base font-bold text-gray-900 mt-0.5">
            {product.priceRetail} ₴ <span className="text-sm font-medium text-green-600">/ {product.priceOpt} ₴</span>
          </div>
          {product.wholesaleRule && (
            <div className="text-[11px] text-green-700 mt-1">
              Опт {product.wholesaleRule}
            </div>
          )}
        </div>

        <button
          onClick={handleBuyClick}
          className="bg-[#4a6d47] hover:bg-[#3d5a3a] text-white px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
        >
          Купити
        </button>
      </div>
    </div>
  );
};
