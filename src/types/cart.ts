export interface CartItemDto {
  productId: number;
  productName: string;
  imageUrl?: string | null;
  priceRetail: number;
  priceOpt: number;
  quantity: number;
  minOptQuantity: number;
  wholesaleRule?: string | null;
  isWholesale: boolean;
  effectivePrice: number;
  totalPrice: number;
}

export interface CartDto {
  userId: string;
  items: CartItemDto[];
  totalCartPrice: number;
}
