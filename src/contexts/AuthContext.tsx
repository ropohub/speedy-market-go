
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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // First, try to restore from localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedPhone = localStorage.getItem('userPhone');
    const storedShopifyId = localStorage.getItem('shopifyCustomerId');
    
    console.log('Checking stored auth state:', { storedAuth, storedPhone, storedShopifyId });
    
    if (storedAuth === 'true' && storedPhone && storedShopifyId) {
      setIsAuthenticated(true);
      setUserPhone(storedPhone);
      setShopifyCustomerId(storedShopifyId);
      console.log('Restored authentication state from localStorage');
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Firebase auth state changed:', user ? 'authenticated' : 'not authenticated');
      
      if (user && user.phoneNumber) {
        try {
          // Get Firebase token and call Shopify backend
          const token = await user.getIdToken();
          console.log('Got Firebase token, calling Shopify API...');
          const shopifyResponse = await shopifyClient.login(token);
          
          // Set authenticated state with Shopify customer ID
          const cleanPhone = user.phoneNumber.replace('+91','');
          setIsAuthenticated(true);
          setUserPhone(cleanPhone);
          setShopifyCustomerId(shopifyResponse.shopify_customer_id);
          
          // Store in localStorage
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userPhone', cleanPhone);
          localStorage.setItem('shopifyCustomerId', shopifyResponse.shopify_customer_id);
          
          console.log('Successfully authenticated with Shopify. Customer ID:', shopifyResponse.shopify_customer_id);
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
      } else if (!isInitialized) {
        // Only clear state on initial load if no stored auth and no Firebase user
        const hasStoredAuth = localStorage.getItem('isAuthenticated') === 'true';
        if (!hasStoredAuth) {
          console.log('No Firebase user and no stored auth - clearing state');
          setIsAuthenticated(false);
          setUserPhone(null);
          setShopifyCustomerId(null);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userPhone');
          localStorage.removeItem('shopifyCustomerId');
        }
      }
      
      setIsInitialized(true);
      setIsLoading(false);
    });
    
    // Set loading to false after a timeout to prevent indefinite loading
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      setIsInitialized(true);
    }, 5000);
    
    return () => {
      unsubscribe();
      clearTimeout(loadingTimeout);
    };
  }, [isInitialized]);

  const login = (phone: string) => {
    console.log('Login called with phone:', phone);
    // No-op: handled by Firebase callback
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
