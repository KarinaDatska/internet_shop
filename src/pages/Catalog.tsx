import React, { useEffect, useState } from 'react';
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
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
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const sortOptions = [
  { value: '', label: 'За замовчуванням' },
  { value: 'name:asc', label: 'Назва А-Я' },
  { value: 'name:desc', label: 'Назва Я-А' },
  { value: 'priceretail:asc', label: 'Спочатку дешевші' },
  { value: 'priceretail:desc', label: 'Спочатку дорожчі' },
  { value: 'priceopt:asc', label: 'Оптова ціна зростає' },
  { value: 'priceopt:desc', label: 'Оптова ціна спадає' }
];

const getNumberParam = (value: string | null) => {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const getPageParam = (value: string | null) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
};

const Catalog: React.FC<PageProps> = ({ onOpenCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Головний стейт фільтрації додатку
  const [filters, setFilters] = useState<FiltersState>(() => ({
    category: searchParams.get('category') || undefined,
    minPrice: getNumberParam(searchParams.get('minPrice')),
    maxPrice: getNumberParam(searchParams.get('maxPrice')),
    search: searchParams.get('search') || undefined,
    sortBy: searchParams.get('sortBy') || undefined,
    sortOrder: searchParams.get('sortOrder') === 'desc' ? 'desc' : searchParams.get('sortOrder') === 'asc' ? 'asc' : undefined
  }));
  const [page, setPage] = useState(() => getPageParam(searchParams.get('page')));

  const searchValue = filters.search ?? '';
  const sortValue = filters.sortBy && filters.sortOrder ? `${filters.sortBy}:${filters.sortOrder}` : '';

  useEffect(() => {
    const nextParams = new URLSearchParams();

    if (filters.category) nextParams.set('category', filters.category);
    if (filters.minPrice !== undefined) nextParams.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice !== undefined) nextParams.set('maxPrice', String(filters.maxPrice));
    if (filters.search) nextParams.set('search', filters.search);
    if (filters.sortBy) nextParams.set('sortBy', filters.sortBy);
    if (filters.sortOrder) nextParams.set('sortOrder', filters.sortOrder);
    if (page > 1) nextParams.set('page', String(page));

    setSearchParams(nextParams, { replace: true });
  }, [filters, page, setSearchParams]);

  const updateFilters: React.Dispatch<React.SetStateAction<FiltersState>> = (value) => {
    setPage(1);
    setFilters(value);
  };

  const handleSearchChange = (value: string) => {
    updateFilters((prev) => ({
      ...prev,
      search: value.trim() ? value : undefined
    }));
  };

  const clearSearch = () => {
    updateFilters((prev) => ({
      ...prev,
      search: undefined
    }));
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split(':') as [string, 'asc' | 'desc'];
    setIsSortOpen(false);

    updateFilters((prev) => ({
      ...prev,
      sortBy: sortBy || undefined,
      sortOrder: sortBy ? sortOrder : undefined
    }));
  };

  return (
    <div className="bg-[#f6f6f4] min-h-screen flex flex-col">
      <Header onOpenCart={onOpenCart} />
      
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-6 py-6 sm:py-10">
        
        {/*Sidebar з фільтрами */}
        <aside className="w-full md:w-64 shrink-0">
          <Sidebar filters={filters} setFilters={updateFilters} />
        </aside>

        {/* Основна сітка товарів */}
        <main className="flex-1 w-full">
          <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_260px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Пошук товарів"
                className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-12 pr-12 text-base text-gray-800 shadow-sm outline-none transition focus:border-[#4a6d47] focus:ring-2 focus:ring-[#4a6d47]/15"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Очистити пошук"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSortOpen((current) => !current)}
                className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white py-3.5 pl-4 pr-4 text-left text-base text-gray-800 shadow-sm outline-none transition hover:border-[#678b64] focus:border-[#4a6d47] focus:ring-2 focus:ring-[#4a6d47]/15"
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
              >
                <SlidersHorizontal className="h-5 w-5 shrink-0 text-gray-400" />
                <span className="min-w-0 flex-1 truncate">
                  {sortOptions.find((option) => option.value === sortValue)?.label}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${
                    isSortOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isSortOpen && (
                <div
                  className="absolute right-0 z-20 mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-1.5 shadow-lg"
                  role="listbox"
                >
                  {sortOptions.map((option) => {
                    const isSelected = option.value === sortValue;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSortChange(option.value)}
                        className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                          isSelected
                            ? 'bg-[#4a6d47]/10 text-[#4a6d47] font-semibold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        role="option"
                        aria-selected={isSelected}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <ProductList filters={filters} page={page} onPageChange={setPage} />
        </main>

      </div>
    </div>
  );
};

export default Catalog;
