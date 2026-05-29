import React, { useEffect, useState } from 'react';
import { productService } from '../../services/product.service';
import type { ProductDto } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  };
}

export const ProductList: React.FC<ProductListProps> = ({ filters }) => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getProducts(filters);
        setProducts(data);
      } catch (error) {
        console.error('Помилка завантаження продуктів:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]); // Кожен раз, коли змінюються фільтри, робимо новий запит до бекенду!

  if (loading) {
    return <div className="text-center py-12 text-gray-400 text-sm">Завантаження товарів...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-12 text-gray-400 text-sm">Товарів не знайдено 📦</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};