import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartDto } from '../types/cart';
import { cartService } from '../services/cart.service';

interface CartContextType {
  cart: CartDto;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (productId: number, newQuantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartDto>({ items: [], totalCartPrice: 0, userId: 'user123' });
  const userId = 'user123'; 

  const loadCart = async () => {
    try {
      const data = await cartService.getCart(userId);
      setCart(data);
    } catch (err) {
      console.error('Не вдалося завантажити кошик', err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (productId: number, quantity = 1) => {
    try {
      const data = await cartService.addToCart(userId, productId, quantity);
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const data = await cartService.updateQuantity(userId, productId, newQuantity);
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      const data = await cartService.removeFromCart(userId, productId);
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};