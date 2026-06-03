import { apiClient } from '../api/axios';
import type { ProductDto } from '../types/product';

export interface ProductQueryParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  size?: number;
}

export type ProductUpsertDto = Omit<ProductDto, 'id'> & {
  id?: number;
};

export const productService = {
  async getProducts(params?: ProductQueryParams, signal?: AbortSignal) {
    const response = await apiClient.get<ProductDto[]>('/products', {
      params,
      signal
    });

    return response.data;
  },

  async createProduct(payload: ProductUpsertDto) {
    const response = await apiClient.post<ProductDto>('/products', payload);
    return response.data;
  },

  async updateProduct(id: number, payload: ProductUpsertDto) {
    const response = await apiClient.put<ProductDto>(`/products/${id}`, payload);
    return response.data;
  },

  async deleteProduct(id: number) {
    await apiClient.delete(`/products/${id}`);
  }
};
