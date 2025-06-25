
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase';

const CartIcon: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading } = useAuth();
  const firebaseUser = auth.currentUser;

  const handleCartClick = () => {
    if (isLoading) return;
    if (firebaseUser) navigate('/cart');
    else navigate('/auth');
  };

  return (
    <button 
      onClick={handleCartClick}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
    >
      <ShoppingBag className="w-5 h-5 text-gray-700" />
    </button>
  );
};

export default CartIcon;
