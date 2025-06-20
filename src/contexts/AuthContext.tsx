import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { shopifyClient } from '../api/shopifyClient';

interface AuthContextType {
  userPhone: string | null;
  shopifyCustomerId: string | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [shopifyCustomerId, setShopifyCustomerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);

      if (user && user.phoneNumber) {
        try {
          const token = await user.getIdToken(true); // ⬅ get fresh token
          const response = await shopifyClient.login(token);

          const phone = user.phoneNumber.replace('+91', '');
          setUserPhone(phone);
          setShopifyCustomerId(response.shopify_customer_id);

          localStorage.setItem('userPhone', phone);
          localStorage.setItem('shopifyCustomerId', response.shopify_customer_id);
        } catch (error) {
          console.error('❌ Shopify auth failed:', error);
          setUserPhone(null);
          setShopifyCustomerId(null);
          localStorage.clear();
        }
      } else {
        setUserPhone(null);
        setShopifyCustomerId(null);
        localStorage.clear();
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = () => {
    // no-op: handled by Firebase's observer
  };

  const logout = async () => {
    await signOut(auth);
    setUserPhone(null);
    setShopifyCustomerId(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        userPhone,
        shopifyCustomerId,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
