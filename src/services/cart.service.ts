import { apiClient } from '../api/axios';
import type { CartDto } from '../types/cart';

export const cartService = {
  async getCart(userId: string): Promise<CartDto> {
    const response = await apiClient.get<CartDto>('/cart', {
      params: { userId },
    });
    return response.data;
  },

  async addToCart(userId: string, productId: number, quantity: number): Promise<CartDto> {
    const response = await apiClient.post<CartDto>('/cart', { userId, productId, quantity });
    return response.data;
  },

  async updateQuantity(userId: string, productId: number, quantity: number): Promise<CartDto> {
    const response = await apiClient.put<CartDto>('/cart/update-quantity', null, {
      params: { userId, productId, quantity },
    });
    return response.data;
  },

  async removeFromCart(userId: string, productId: number): Promise<CartDto> {
    const response = await apiClient.delete<CartDto>('/cart/remove', {
      params: { userId, productId },
    });
    return response.data;
  }
};
