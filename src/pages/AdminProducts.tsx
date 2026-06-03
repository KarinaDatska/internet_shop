import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { productService } from '../services/product.service';
import type { ProductDto } from '../types/product';

interface PageProps {
  onOpenCart: () => void;
}

const emptyProduct = {
  name: '',
  description: '',
  priceRetail: 0,
  priceOpt: 0,
  minOptQuantity: 1,
  wholesaleRule: '',
  imageUrl: '',
  category: '',
  unit: 'шт',
};

const AdminProducts: React.FC<PageProps> = ({ onOpenCart }) => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const selectedProduct = products.find((product) => product.id === selectedId);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts({ page: 1, size: 200 });
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (!selectedProduct) {
      setForm(emptyProduct);
      return;
    }

    setForm({
      name: selectedProduct.name,
      description: selectedProduct.description ?? '',
      priceRetail: selectedProduct.priceRetail,
      priceOpt: selectedProduct.priceOpt,
      minOptQuantity: selectedProduct.minOptQuantity,
      wholesaleRule: selectedProduct.wholesaleRule ?? '',
      imageUrl: selectedProduct.imageUrl ?? '',
      category: selectedProduct.category ?? '',
      unit: selectedProduct.unit ?? 'шт',
    });
  }, [selectedProduct]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: ['priceRetail', 'priceOpt', 'minOptQuantity'].includes(field) ? Number(value) : value,
    }));
  };

  const handleNewProduct = () => {
    setSelectedId(null);
    setForm(emptyProduct);
    setMessage('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');

    setError('');

    const name = form.name.trim();
    const category = form.category.trim();
    const unit = form.unit.trim();
    const description = form.description.trim();

    if (!name) {
      setError('Вкажіть назву товару.');
      return;
    }

    if (name.length < 2 || name.length > 100) {
      setError('Назва має містити від 2 до 100 символів.');
      return;
    }

    if (category.length > 50) {
      setError('Категорія не може бути довшою за 50 символів.');
      return;
    }

    if (!unit) {
      setError('Вкажіть одиницю виміру.');
      return;
    }

    if (unit.length > 20) {
      setError('Одиниця виміру занадто довга.');
      return;
    }

    if (form.priceRetail <= 0) {
      setError('Роздрібна ціна повинна бути більшою за 0.');
      return;
    }

    if (form.priceRetail > 1000000) {
      setError('Роздрібна ціна занадто велика.');
      return;
    }

    if (form.priceOpt <= 0) {
      setError('Оптова ціна повинна бути більшою за 0.');
      return;
    }

    if (form.priceOpt > 1000000) {
      setError('Оптова ціна занадто велика.');
      return;
    }

    if (form.minOptQuantity < 1) {
      setError('Мінімальна кількість для опту повинна бути не меншою за 1.');
      return;
    }

    if (form.minOptQuantity > 100000) {
      setError('Мінімальна кількість для опту занадто велика.');
      return;
    }

    if (description.length > 5000) {
      setError('Опис занадто довгий.');
      return;
    }

    if (form.imageUrl && !/^https?:\/\/.+/i.test(form.imageUrl)) {
      setError('Посилання на фото повинно починатися з http:// або https://');
      return;
    }

    const payload = {
      ...form,
      name,
      category,
      unit,
      description,
      wholesaleRule: form.wholesaleRule.trim() || null,
      imageUrl: form.imageUrl.trim() || null,
    };

    if (selectedId) {
      await productService.updateProduct(selectedId, payload);
      setMessage('Товар оновлено.');
    } else {
      await productService.createProduct(payload);
      setMessage('Товар створено.');
    }

    await loadProducts();
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    await productService.deleteProduct(selectedId);
    setSelectedId(null);
    setForm(emptyProduct);
    setMessage('Товар видалено.');
    await loadProducts();
  };

  return (
    <div className="min-h-screen bg-[#f6f6f4]">
      <Header onOpenCart={onOpenCart} />
      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Товари</h1>
          </div>
          <button onClick={handleNewProduct} className="rounded-xl bg-[#4a6d47] px-5 py-3 font-semibold text-white transition hover:bg-[#3d5a3a]">
            Новий товар
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            {loading ? (
              <div className="py-8 text-center text-sm text-gray-400">Завантаження...</div>
            ) : (
              <div className="max-h-170 space-y-2 overflow-y-auto">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedId(product.id)}
                    className={`w-full rounded-xl px-3 py-3 text-left text-sm transition ${selectedId === product.id ? 'bg-[#4a6d47]/10 text-[#4a6d47]' : 'hover:bg-gray-50'
                      }`}
                  >
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-xs text-gray-400">{product.priceRetail} грн</div>
                  </button>
                ))}
              </div>
            )}
          </aside>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">{selectedId ? 'Редагування товару' : 'Новий товар'}</h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-gray-700">
                Назва
                <input value={form.name} maxLength={100} onChange={(event) => handleChange('name', event.target.value)} required className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#4a6d47]" />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Категорія
                <input value={form.category} maxLength={100} onChange={(event) => handleChange('category', event.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#4a6d47]" />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Одиниця
                <input value={form.unit} maxLength={20} onChange={(event) => handleChange('unit', event.target.value)} required className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#4a6d47]" />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Роздрібна ціна
                <input type="number" value={form.priceRetail} min={1} max={1000000} onChange={(event) => handleChange('priceRetail', event.target.value)} required className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#4a6d47]" />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Оптова ціна
                <input type="number" value={form.priceOpt} min={1} max={1000000} onChange={(event) => handleChange('priceOpt', event.target.value)} required className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#4a6d47]" />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Мінімум для опту
                <input type="number" value={form.minOptQuantity} min={1} max={1000000} onChange={(event) => handleChange('minOptQuantity', event.target.value)} required className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#4a6d47]" />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Правило опту
                <input value={form.wholesaleRule} onChange={(event) => handleChange('wholesaleRule', event.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#4a6d47]" />
              </label>
            </div>

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Посилання на фото
              <input value={form.imageUrl} onChange={(event) => handleChange('imageUrl', event.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#4a6d47]" />
            </label>

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Опис
              <textarea value={form.description} maxLength={5000} onChange={(event) => handleChange('description', event.target.value)} rows={4} className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#4a6d47]" />
            </label>

            {error && (
              <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
            {message && (
              <div className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600">
                Зберегти
              </button>
              {selectedId && (
                <button type="button" onClick={handleDelete} className="rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-500 transition hover:bg-red-50">
                  Видалити
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminProducts;
