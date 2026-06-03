export interface CreateOrderRequest {
  userId?: string;
  customerName?: string;
  phone?: string;
  deliveryAddress?: string;
  comment?: string;
}

export interface OrderItemDto {
  productId: number;
  productName: string;
  imageUrl?: string | null;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface OrderDto {
  id: number;
  userId: string;
  status: string;
  totalPrice: number;
  customerName: string;
  phone: string;
  deliveryAddress?: string | null;
  comment?: string | null;
  createdAt: string;
  items: OrderItemDto[];
}
