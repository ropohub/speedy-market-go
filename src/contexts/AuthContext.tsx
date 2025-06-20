
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
    // Check localStorage for existing authentication state immediately
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedPhone = localStorage.getItem('userPhone');
    const storedShopifyId = localStorage.getItem('shopifyCustomerId');
    
    console.log('Checking stored auth:', { storedAuth, storedPhone, storedShopifyId });
    
    if (storedAuth === 'true' && storedPhone) {
      setIsAuthenticated(true);
      setUserPhone(storedPhone);
      if (storedShopifyId) {
        setShopifyCustomerId(storedShopifyId);
      }
      console.log('Restored authentication state from localStorage');
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Firebase auth state changed:', user ? 'authenticated' : 'not authenticated');
      
      if (user && user.phoneNumber) {
        try {
          const token = await user.getIdToken();
          const shopifyResponse = await shopifyClient.login(token);
          
          const cleanPhone = user.phoneNumber.replace('+91','');
          setIsAuthenticated(true);
          setUserPhone(cleanPhone);
          setShopifyCustomerId(shopifyResponse.shopify_customer_id);
          
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userPhone', cleanPhone);
          localStorage.setItem('shopifyCustomerId', shopifyResponse.shopify_customer_id);
          
          console.log('Successfully authenticated with Shopify. Customer ID:', shopifyResponse.shopify_customer_id);
        } catch (error) {
          console.error('Failed to authenticate with Shopify:', error);
          setIsAuthenticated(false);
          setUserPhone(null);
          setShopifyCustomerId(null);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userPhone');
          localStorage.removeItem('shopifyCustomerId');
        }
      } else {
        console.log('User signed out or no phone number');
        setIsAuthenticated(false);
        setUserPhone(null);
        setShopifyCustomerId(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('shopifyCustomerId');
      }
      
      setIsLoading(false);
    });
    
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => {
      unsubscribe();
      clearTimeout(loadingTimeout);
    };
  }, []);

  const login = (phone: string) => {
    console.log('Login called with phone:', phone);
    // State will be handled by Firebase callback
  };

  const logout = async () => {
    console.log('Logging out...');
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error during logout:', error);
    }
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
