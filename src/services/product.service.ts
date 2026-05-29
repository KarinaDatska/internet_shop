import axios from 'axios';
import type { ProductDto } from '../types/product'; // Переконайся, що в types/product.ts є такий інтерфейс

const API_URL = 'http://localhost:5220/api/products';

export const productService = {
  async getProducts(params?: { category?: string; minPrice?: number; maxPrice?: number; search?: string }) {
    const response = await axios.get<ProductDto[]>(API_URL, { params });
    return response.data;
  }
};