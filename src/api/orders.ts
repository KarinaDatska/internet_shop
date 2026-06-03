import { apiClient } from './axios';
import type { CreateOrderRequest, OrderDto } from '../types/order';

export const orderApi = {
  async createFromCart(payload: CreateOrderRequest) {
    const response = await apiClient.post<OrderDto>('/orders', payload);
    return response.data;
  },

  async getMyOrders() {
    const response = await apiClient.get<OrderDto[]>('/orders/my');
    return response.data;
  },

  async getAllOrders() {
    const response = await apiClient.get<OrderDto[]>('/orders');
    return response.data;
  },
};
