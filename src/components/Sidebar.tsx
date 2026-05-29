import React, { useState } from 'react';

// Описуємо структуру фільтрів, яку ми будемо змінювати
interface FiltersState {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

interface SidebarProps {
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setFilters }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Всі');
  const [minPriceInput, setMinPriceInput] = useState<string>('');
  const [maxPriceInput, setMaxPriceInput] = useState<string>('');

  // Наші категорії для SafePack
  const categories = ['Всі', 'Скотч', 'Плівка', 'Коробки', 'Пакети'];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setFilters((prev) => ({
      ...prev,
      // Якщо обрано 'Всі' — скидаємо фільтр категорії, інакше переводимо в нижній регістр для бекенду
      category: category === 'Всі' ? undefined : category.toLowerCase(),
    }));
  };

  const handlePriceApply = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      minPrice: minPriceInput ? Number(minPriceInput) : undefined,
      maxPrice: maxPriceInput ? Number(maxPriceInput) : undefined,
    }));
  };

  const handleResetFilters = () => {
    setActiveCategory('Всі');
    setMinPriceInput('');
    maxPriceInput && setMaxPriceInput('');
    setFilters({
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      search: undefined,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-6 sticky top-24">
      {/* Категорії */}
      <div>
        <h3 className="font-bold text-gray-800 mb-3 tracking-wide uppercase text-xs">
          Категорії
        </h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#4a6d47]/10 text-[#4a6d47] font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Фільтр по ціні */}
      <div>
        <h3 className="font-bold text-gray-800 text-base mb-3 tracking-wide uppercase">
          Ціна (₴)
        </h3>
        <form onSubmit={handlePriceApply} className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Від"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#4a6d47] transition-colors"
            />
            <span className="text-gray-400 text-xs">—</span>
            <input
              type="number"
              placeholder="До"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#4a6d47] transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            Застосувати
          </button>
        </form>
      </div>

      {/* Кнопка скидання */}
      <button
        onClick={handleResetFilters}
        className="w-full border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 font-medium py-2 rounded-xl text-xs transition-colors"
      >
        Скинути все
      </button>
    </div>
  );
};

export default Sidebar;