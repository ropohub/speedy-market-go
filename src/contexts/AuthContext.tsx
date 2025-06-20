import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { shopifyClient } from "../api/shopifyClient";

interface AuthContextType {
  isAuthenticated: boolean;
  userPhone: string | null;
  shopifyCustomerId: string | null;
  login: (phone: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [shopifyCustomerId, setShopifyCustomerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore immediately from localStorage for quick UI hydration
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedPhone = localStorage.getItem('userPhone');
    const storedCustomerId = localStorage.getItem('shopifyCustomerId');

    if (storedAuth === 'true' && storedPhone && storedCustomerId) {
      setIsAuthenticated(true);
      setUserPhone(storedPhone);
      setShopifyCustomerId(storedCustomerId);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.phoneNumber) {
        try {
          const token = await user.getIdToken();
          const shopifyResponse = await shopifyClient.login(token);

          setIsAuthenticated(true);
          const phone = user.phoneNumber.replace('+91', '');
          setUserPhone(phone);
          setShopifyCustomerId(shopifyResponse.shopify_customer_id);

          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userPhone', phone);
          localStorage.setItem('shopifyCustomerId', shopifyResponse.shopify_customer_id);
        } catch (error) {
          console.error('Failed to authenticate with Shopify:', error);
          setIsAuthenticated(false);
          setUserPhone(null);
          setShopifyCustomerId(null);
          localStorage.clear();
        }
      } else {
        setIsAuthenticated(false);
        setUserPhone(null);
        setShopifyCustomerId(null);
        localStorage.clear();
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (phone: string) => {
    // No-op: Firebase handles login, we just trigger onAuthStateChanged
  };

  const logout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    setUserPhone(null);
    setShopifyCustomerId(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userPhone,
      shopifyCustomerId,
      login,
      logout,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
