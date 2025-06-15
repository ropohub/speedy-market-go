
import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCartItems, mutateCartItem } from '../api/cartClient';
import Auth from './Auth';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import { CartLoadingState, CartErrorState, CartEmptyState } from '../components/cart/CartStates';
import { CartItem as CartItemType } from '../types/cart';

const Cart: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch cart items using React Query
  const { data: cartResponse, isLoading, error } = useQuery({
    queryKey: ['cartItems'],
    queryFn: getCartItems,
    enabled: isAuthenticated,
  });

  // Mutation for updating cart items
  const updateCartMutation = useMutation({
    mutationFn: ({ productVariantId, quantity }: { productVariantId: number; quantity: number }) =>
      mutateCartItem(productVariantId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
  });

  // Show login screen if user is not authenticated
  if (!isAuthenticated) {
    return <Auth />;
  }

  // Loading state
  if (isLoading) {
    return <CartLoadingState />;
  }

  // Error state
  if (error) {
    return <CartErrorState />;
  }

  // Map API response to CartItem format
  const cartItems: CartItemType[] = cartResponse?.itemsWithQuantityList?.map((item, index) => ({
    id: `item-${item.productVariantId}`,
    name: `Product ${item.productVariantId}`, // TODO: Get actual product details
    price: 999, // TODO: Get actual price from product service
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop',
    brand: 'Brand Name', // TODO: Get actual brand
    selectedSize: 'M', // TODO: Get actual size
    quantity: item.quantity,
    productVariantId: item.productVariantId,
  })) || [];

  // Empty cart state
  if (cartItems.length === 0) {
    return <CartEmptyState />;
  }

  const handleUpdateQuantity = (productVariantId: number, newQuantity: number) => {
    updateCartMutation.mutate({ productVariantId, quantity: newQuantity });
  };

  const handleRemoveItem = (productVariantId: number) => {
    updateCartMutation.mutate({ productVariantId, quantity: 0 });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 99;
  const total = subtotal + deliveryFee;

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white px-4 py-4 border-b">
          <h1 className="text-xl font-bold text-gray-900">Shopping Cart ({cartItems.length} items)</h1>
        </div>

        <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                isUpdating={updateCartMutation.isPending}
              />
            ))}
          </div>

          {/* Order Summary */}
          <OrderSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            isUpdating={updateCartMutation.isPending}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
