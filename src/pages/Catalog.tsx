import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar'; // 🔹 Тепер цей імпорт працює ідеально!
import { ProductList } from '../components/catalog/ProductList';

interface PageProps {
  onOpenCart: () => void;
}

interface FiltersState {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

const Catalog: React.FC<PageProps> = ({ onOpenCart }) => {
  // Головний стейт фільтрації додатку
  const [filters, setFilters] = useState<FiltersState>({
    category: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    search: undefined
  });

  return (
    <div className="bg-[#f6f6f4] min-h-screen flex flex-col">
      <Header onOpenCart={onOpenCart} />
      
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-6 py-6 sm:py-10">
        
        {/* Бокова панель з фільтрами */}
        <aside className="w-full md:w-64 shrink-0">
          <Sidebar setFilters={setFilters} />
        </aside>

        {/* Основна сітка товарів */}
        <main className="flex-1 w-full">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight mb-6">
            Каталог продукції SafePack
          </h1>
          
          {/* Передаємо стейт фільтрів у список, який автоматично робить запити до .NET */}
          <ProductList filters={filters} />
        </main>

      </div>
    </div>
  );
};

export default Catalog;