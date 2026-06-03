import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { productService } from '../../services/product.service';
import type { ProductDto } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  };
  page: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

const PAGE_SIZE = 12;

export const ProductList: React.FC<ProductListProps> = ({ filters, page, onPageChange }) => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      setProducts([]);

      try {
        const data = await productService.getProducts(
          {
            ...filters,
            page,
            size: PAGE_SIZE
          },
          controller.signal
        );

        setProducts(data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        console.error('Помилка завантаження продуктів:', error);
        setProducts([]);
        setError('Не вдалося завантажити товари. Перевір, чи запущений бекенд на http://localhost:5220.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, [filters, page]);

  if (loading) {
    return <div className="text-center py-12 text-gray-400 text-sm">Завантаження товарів...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500 text-sm">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-12 text-gray-400 text-sm">Товарів не знайдено</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange((current) => Math.max(1, current - 1))}
          className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#3d5a3a]"
        >
          ←
        </button>

        <span className="text-sm text-gray-500">Сторінка {page}</span>

        <button
          type="button"
          disabled={products.length < PAGE_SIZE}
          onClick={() => onPageChange((current) => current + 1)}
          className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#3d5a3a]"
        >
          →
        </button>
      </div>
    </div>
  );
};
