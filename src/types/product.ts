export interface ProductDto {
  id: number;
  name: string;
  description?: string;
  priceRetail: number;      // Роздрібна ціна
  priceOpt: number;         // Оптова ціна
  minOptQuantity: number;   // Мінімальна кількість для оптової ціни
  imageUrl?: string | null; // Посилання на зображення товару
  category?: string;        // Категорія продукту (наприклад: "скотч", "плівка")
}