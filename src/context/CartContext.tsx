import React, { useCallback, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartDto } from '../types/cart';
import { cartService } from '../services/cart.service';
import { useAuth } from '../hooks/useAuth';
import { CartContext } from './cart-context';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState<CartDto>({ items: [], totalCartPrice: 0, userId: '' });
  const userId = user?.id;

  const loadCart = useCallback(async () => {
    if (!userId) {
      setCart({ items: [], totalCartPrice: 0, userId: '' });
      return;
    }

    try {
      const data = await cartService.getCart(userId);
      setCart(data);
    } catch (err) {
      console.error('Не вдалося завантажити кошик', err);
    }
  }, [userId]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = async (productId: number, quantity = 1) => {
    if (!userId) {
      throw new Error('AUTH_REQUIRED');
    }

    try {
      const data = await cartService.addToCart(userId, productId, quantity);
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    if (!userId) {
      throw new Error('AUTH_REQUIRED');
    }

    try {
      const data = await cartService.updateQuantity(userId, productId, newQuantity);
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!userId) {
      throw new Error('AUTH_REQUIRED');
    }

    try {
      const data = await cartService.removeFromCart(userId, productId);
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, isCartAvailable: isAuthenticated, loadCart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
