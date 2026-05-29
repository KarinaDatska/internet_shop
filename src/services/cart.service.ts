import axios from 'axios';
import type { CartDto } from '../types/cart';

const API_URL = 'http://localhost:5220/api/cart';

export const cartService = {
  async getCart(userId: string): Promise<CartDto> {
    const response = await axios.get<CartDto>(`${API_URL}?userId=${userId}`);
    return response.data;
  },

  async addToCart(userId: string, productId: number, quantity: number): Promise<CartDto> {
    const response = await axios.post<CartDto>(API_URL, { userId, productId, quantity });
    return response.data;
  },

  async updateQuantity(userId: string, productId: number, quantity: number): Promise<CartDto> {
    const response = await axios.put<CartDto>(`${API_URL}/update-quantity?userId=${userId}&productId=${productId}&quantity=${quantity}`);
    return response.data;
  },

  async removeFromCart(userId: string, productId: number): Promise<CartDto> {
    const response = await axios.delete<CartDto>(`${API_URL}/remove?userId=${userId}&productId=${productId}`);
    return response.data;
  }
};