import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase';

const CartIcon: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading } = useAuth();
  const firebaseUser = auth.currentUser;
  const [cartItemCount, setCartItemCount] = useState(0);

  // Get actual cart items count from the Index page state
  useEffect(() => {
    // For now, we'll keep it at 0 since there's no global cart state
    // This should be connected to actual cart state management
    setCartItemCount(0);
  }, []);

  const handleCartClick = () => {
    if (isLoading) return;
    if (firebaseUser) navigate('/cart');
    else navigate('/auth');
  };

  return (
    <button 
      onClick={handleCartClick}
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
    >
      <ShoppingBag className="w-5 h-5 text-gray-700" />
      {cartItemCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
          {cartItemCount}
        </div>
      )}
    </button>
  );
};

export default CartIcon;
