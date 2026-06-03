export interface ProductDto {
  id: number;
  name: string;
  description?: string;
  priceRetail: number;      // Роздрібна ціна
  priceOpt: number;         // Оптова ціна
  minOptQuantity: number;   // Мінімальна кількість для оптової ціни
  wholesaleRule?: string | null;
  imageUrl?: string | null;
  category?: string;        // Категорія продукту (наприклад: "скотч", "плівка")
  unit?: string;
}
