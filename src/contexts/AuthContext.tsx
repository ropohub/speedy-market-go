
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { shopifyClient } from "../api/shopifyClient";

interface AuthContextType {
  isAuthenticated: boolean;
  userPhone: string | null;
  shopifyCustomerId: string | null;
  login: (phone: string) => Promise<void>;
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
    console.log('AuthProvider initializing...');
    console.log("Firebase currentUser on mount:", auth.currentUser);
    
    // Get stored auth data
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedPhone = localStorage.getItem('userPhone');
    const storedShopifyId = localStorage.getItem('shopifyCustomerId');
    
    console.log('Stored auth data:', { storedAuth, storedPhone, storedShopifyId });
    
    // If we have stored auth data AND Firebase currentUser exists, re-authenticate with Shopify
    if (storedAuth === 'true' && storedPhone && storedShopifyId && auth.currentUser) {
      console.log('Restoring from localStorage AND Firebase currentUser exists');
      auth.currentUser.getIdToken().then(async (token) => {
        try {
          console.log('Re-authenticating with Shopify using stored data...');
          const shopifyResponse = await shopifyClient.login(token);
          const cleanPhone = storedPhone;
          const newShopifyCustomerId = shopifyResponse.shopify_customer_id;

          console.log('Refreshed Shopify login with token, Customer ID:', newShopifyCustomerId);

          setIsAuthenticated(true);
          setUserPhone(cleanPhone);
          setShopifyCustomerId(newShopifyCustomerId);

          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userPhone', cleanPhone);
          localStorage.setItem('shopifyCustomerId', newShopifyCustomerId);
        } catch (err) {
          console.error('Failed to re-auth Shopify after restoring:', err);
          setIsAuthenticated(false);
          setUserPhone(null);
          setShopifyCustomerId(null);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userPhone');
          localStorage.removeItem('shopifyCustomerId');
        } finally {
          setIsLoading(false);
        }
        return;
      }).catch((err) => {
        console.error('Failed to get Firebase token:', err);
        setIsLoading(false);
      });
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Firebase auth state changed:', user ? 'User authenticated' : 'User not authenticated');
      console.log("Firebase currentUser in onAuthStateChanged:", user);
      
      if (user && user.phoneNumber) {
        console.log('Firebase user found with phone:', user.phoneNumber);
        try {
          // Get Firebase token and call Shopify backend
          const token = await user.getIdToken();
          console.log('Got Firebase token, calling Shopify API...');
          const shopifyResponse = await shopifyClient.login(token);
          
          // Set authenticated state with Shopify customer ID
          const cleanPhone = user.phoneNumber.replace('+91','');
          const newShopifyCustomerId = shopifyResponse.shopify_customer_id;
          
          console.log('Setting authenticated state:', {
            phone: cleanPhone,
            shopifyCustomerId: newShopifyCustomerId
          });
          
          setIsAuthenticated(true);
          setUserPhone(cleanPhone);
          setShopifyCustomerId(newShopifyCustomerId);
          
          // Store in localStorage
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userPhone', cleanPhone);
          localStorage.setItem('shopifyCustomerId', newShopifyCustomerId);
          
          console.log('Successfully authenticated with Shopify. Customer ID:', newShopifyCustomerId);
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
        console.log('No Firebase user - clearing state');
        setIsAuthenticated(false);
        setUserPhone(null);
        setShopifyCustomerId(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('shopifyCustomerId');
      }
      
      setIsLoading(false);
    });
    
    // Fallback timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      console.log('Auth loading timeout reached');
      setIsLoading(false);
    }, 5000);
    
    return () => {
      unsubscribe();
      clearTimeout(loadingTimeout);
    };
  }, []);

  const login = async (phone: string) => {
    console.log('Manual login triggered with phone:', phone);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Firebase user not available yet");

      const token = await user.getIdToken();
      console.log('Got token manually, calling Shopify login...');
      const shopifyResponse = await shopifyClient.login(token);
      const cleanPhone = phone.replace('+91', '');
      const customerId = shopifyResponse.shopify_customer_id;

      setIsAuthenticated(true);
      setUserPhone(cleanPhone);
      setShopifyCustomerId(customerId);

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userPhone', cleanPhone);
      localStorage.setItem('shopifyCustomerId', customerId);

      console.log('Manual login complete with Shopify ID:', customerId);
    } catch (err) {
      console.error("Manual login failed:", err);
      throw err;
    }
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

  console.log('AuthProvider current state:', {
    isAuthenticated,
    userPhone,
    shopifyCustomerId,
    isLoading
  });

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
