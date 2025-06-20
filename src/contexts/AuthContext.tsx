
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
      console.log('Auth state changed:', user ? 'User logged in' : 'User logged out');
      setIsLoading(true);

      if (user && user.phoneNumber) {
        try {
          console.log('Getting Firebase token for Shopify auth...');
          const token = await user.getIdToken(true);
          const response = await shopifyClient.login(token);

          const phone = user.phoneNumber.replace('+91', '');
          setUserPhone(phone);
          setShopifyCustomerId(response.shopify_customer_id);

          localStorage.setItem('userPhone', phone);
          localStorage.setItem('shopifyCustomerId', response.shopify_customer_id);
          
          console.log('✅ Authentication complete:', {
            phone,
            shopifyCustomerId: response.shopify_customer_id
          });
        } catch (error) {
          console.error('❌ Shopify auth failed:', error);
          setUserPhone(null);
          setShopifyCustomerId(null);
          localStorage.clear();
        }
      } else {
        console.log('No user or phone number, clearing auth state');
        setUserPhone(null);
        setShopifyCustomerId(null);
        localStorage.clear();
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = () => {
    // This is handled automatically by the Firebase auth state observer
    console.log('Login called - auth state will be handled by observer');
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserPhone(null);
      setShopifyCustomerId(null);
      localStorage.clear();
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout failed:', error);
    }
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
