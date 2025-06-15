
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ShoppingBag, Loader2 } from 'lucide-react';
import Layout from '../Layout';

export const CartLoadingState: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    </Layout>
  );
};

export const CartErrorState: React.FC = () => {
  const queryClient = useQueryClient();

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load cart items</p>
          <button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ['cartItems'] })}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    </Layout>
  );
};

export const CartEmptyState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to get started</p>
          <button 
            onClick={() => navigate('/categories')}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </Layout>
  );
};
