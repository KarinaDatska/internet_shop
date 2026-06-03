import { createContext } from 'react';
import type { CartDto } from '../types/cart';

export interface CartContextType {
  cart: CartDto;
  isCartAvailable: boolean;
  loadCart: () => Promise<void>;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (productId: number, newQuantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
