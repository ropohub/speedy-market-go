
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase';
import { cartService } from '../api/cartClient';

interface CartContextType {
  cartItemCount: number;
  updateCartCount: () => Promise<void>;
  incrementCartCount: () => void;
  decrementCartCount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const updateCartCount = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setCartItemCount(0);
        return;
      }

      const response = await cartService.getCartItems();
      if (response.status === 'empty' || !response.items) {
        setCartItemCount(0);
      } else {
        const totalItems = response.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartItemCount(totalItems);
      }
    } catch (error) {
      console.error('Failed to fetch cart count:', error);
      setCartItemCount(0);
    }
  };

  const incrementCartCount = () => {
    setCartItemCount(prev => prev + 1);
  };

  const decrementCartCount = () => {
    setCartItemCount(prev => Math.max(0, prev - 1));
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      updateCartCount();
    }
  }, []);

  const value: CartContextType = {
    cartItemCount,
    updateCartCount,
    incrementCartCount,
    decrementCartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
