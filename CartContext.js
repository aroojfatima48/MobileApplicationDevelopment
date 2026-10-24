import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from storage
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('@naqsh_cart');
        if (storedCart) setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error(e);
      }
    };
    loadCart();
  }, []);

  // Save cart to storage on every change
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('@naqsh_cart', JSON.stringify(cart));
      } catch (e) {
        console.error(e);
      }
    };
    saveCart();
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);