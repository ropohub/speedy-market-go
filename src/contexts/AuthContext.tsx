
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      
      if (user && user.phoneNumber) {
        try {
          // Get Firebase token and call Shopify backend
          const token = await user.getIdToken();
          const shopifyResponse = await shopifyClient.login(token);
          
          // Set authenticated state with Shopify customer ID
          setIsAuthenticated(true);
          setUserPhone(user.phoneNumber.replace('+91',''));
          setShopifyCustomerId(shopifyResponse.shopify_customer_id);
          
          // Store in localStorage
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userPhone', user.phoneNumber.replace('+91',''));
          localStorage.setItem('shopifyCustomerId', shopifyResponse.shopify_customer_id);
          
          console.log('Shopify customer ID:', shopifyResponse.shopify_customer_id);
        } catch (error) {
          console.error('Failed to authenticate with Shopify:', error);
          // Handle Shopify authentication failure
          setIsAuthenticated(false);
          setUserPhone(null);
          setShopifyCustomerId(null);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userPhone');
          localStorage.removeItem('shopifyCustomerId');
        }
      } else {
        setIsAuthenticated(false);
        setUserPhone(null);
        setShopifyCustomerId(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('shopifyCustomerId');
      }
      
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const login = (phone: string) => {
    // No-op: handled by Firebase callback
  };

  const logout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    setUserPhone(null);
    setShopifyCustomerId(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('shopifyCustomerId');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userPhone, 
      shopifyCustomerId, 
      login, 
      logout, 
      isLoading 
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
