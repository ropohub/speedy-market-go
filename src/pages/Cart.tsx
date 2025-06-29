import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { auth } from '../firebase';
import Auth from './Auth';
import { cartService } from '../api/cartClient';
import { toast } from "@/hooks/use-toast";

const SHOPIFY_STOREFRONT_ACCESS_TOKEN = '50b756b36c591cc2d86ea31b1eceace5';
const SHOPIFY_API_URL = 'https://sycfx9-af.myshopify.com/api/2025-04/graphql.json';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  selectedSize?: string;
  quantity: number;
  productVariantId: string;
}

// Function to fetch product variant details from Shopify
const fetchVariantDetails = async (variantId: string) => {
  // Clean up the variant ID - remove the gid prefix if present
  const cleanVariantId = variantId.replace('gid://shopify/ProductVariant/', '');
  const fullVariantId = `gid://shopify/ProductVariant/${cleanVariantId}`;
  
  const query = `
    query GetProductVariant($id: ID!) {
      node(id: $id) {
        ... on ProductVariant {
          id
          title
          price {
            amount
            currencyCode
          }
          image {
            url
            altText
          }
          product {
            title
            vendor
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  `;

  console.log('Fetching variant with ID:', fullVariantId);

  const response = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: { id: fullVariantId },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch variant details');
  }

  const json = await response.json();
  console.log('Shopify API response:', json);
  
  if (json.errors) {
    console.error('Shopify GraphQL errors:', json.errors);
    return null;
  }
  
  return json.data?.node;
};

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const firebaseUser = auth.currentUser;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) {
        console.log('No authenticated user found');
        setError('User not authenticated.');
        return;
      }

      console.log('Fetching cart for authenticated user:', user.phoneNumber);
      const response = await cartService.getCartItems();

      console.log('Cart API response:', response);

      if (response.status === 'empty' || !response.items || response.items.length === 0) {
        console.log('Cart is empty');
        setCartItems([]);
        setError(null);
        return;
      }

      // Fetch real product details for each cart item
      const mappedItems: CartItem[] = [];
      
      for (const item of response.items) {
        try {
          console.log('Fetching details for variant:', item.product_variant_id);
          const variantDetails = await fetchVariantDetails(item.product_variant_id);
          
          if (variantDetails) {
            // Find size from selectedOptions
            const sizeOption = variantDetails.selectedOptions?.find(
              (option: any) => option.name.toLowerCase() === 'size'
            );
            
            mappedItems.push({
              id: item.product_variant_id,
              name: variantDetails.product?.title || 'Unknown Product',
              price: Math.round(parseFloat(variantDetails.price?.amount || '0')),
              image: variantDetails.image?.url || '/placeholder.svg',
              brand: variantDetails.product?.vendor || 'Unknown Brand',
              selectedSize: sizeOption?.value || undefined,
              quantity: item.quantity,
              productVariantId: item.product_variant_id
            });
          } else {
            console.warn('No variant details found for:', item.product_variant_id);
            // Fallback to basic data
            mappedItems.push({
              id: item.product_variant_id,
              name: 'Product Not Found',
              price: 0,
              image: '/placeholder.svg',
              brand: 'Unknown Brand',
              selectedSize: 'Unknown',
              quantity: item.quantity,
              productVariantId: item.product_variant_id
            });
          }
        } catch (variantError) {
          console.error('Failed to fetch variant details:', variantError);
          // Fallback to basic data on error
          mappedItems.push({
            id: item.product_variant_id,
            name: 'Product Error',
            price: 0,
            image: '/placeholder.svg',
            brand: 'Unknown Brand',
            selectedSize: 'Unknown',
            quantity: item.quantity,
            productVariantId: item.product_variant_id
          });
        }
      }

      console.log('Mapped cart items with real data:', mappedItems);
      setCartItems(mappedItems);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch cart items:', err);
      const errorMessage = err.message || 'Failed to load cart items';
      setError(errorMessage);
      setCartItems([]);
      
      toast({
        title: "Cart Loading Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (firebaseUser) {
      console.log('User is authenticated, fetching cart');
      fetchCartItems();
    } else {
      console.log('User not authenticated');
      setLoading(false);
    }
  }, [firebaseUser]);

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }

    try {
      const item = cartItems.find(item => item.id === id);
      if (!item) return;

      console.log('Updating quantity for item:', id, 'to:', newQuantity);
      
      // Optimistically update UI
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));

      await cartService.mutateCart(item.productVariantId, newQuantity);
      
      toast({
        title: "Cart Updated",
        description: "Item quantity updated successfully"
      });
    } catch (error: any) {
      console.error('Failed to update quantity:', error);
      
      // Revert optimistic update
      await fetchCartItems();
      
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update item quantity",
        variant: "destructive"
      });
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      const item = cartItems.find(item => item.id === id);
      if (!item) return;

      console.log('Removing item:', id);
      
      // Optimistically update UI
      setCartItems(cartItems.filter(item => item.id !== id));

      await cartService.mutateCart(item.productVariantId, 0);
      
      toast({
        title: "Item Removed",
        description: "Item removed from cart successfully"
      });
    } catch (error: any) {
      console.error('Failed to remove item:', error);
      
      // Revert optimistic update
      await fetchCartItems();
      
      toast({
        title: "Remove Failed",
        description: error.message || "Failed to remove item",
        variant: "destructive"
      });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 99;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!firebaseUser) {
    return <Auth />;
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 50%, #FDE8E8 100%)'
        }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">Loading cart...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 50%, #FDE8E8 100%)'
        }}>
          <div className="text-center max-w-sm mx-auto p-4">
            <div className="text-red-600 mb-3">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <h2 className="text-lg font-bold mb-2">Cart Loading Error</h2>
              <p className="text-xs">{error}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={fetchCartItems}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                Retry
              </button>
              <button
                onClick={() => navigate('/categories')}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 50%, #FDE8E8 100%)'
        }}>
          <div className="text-center">
            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-4 text-sm">Add some items to get started</p>
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
  }

  return (
    <Layout>
      <div className="min-h-screen" style={{
        background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 30%, #FDE8E8 70%, #F3E8FF 100%)'
      }}>
        {/* Compact Header */}
        <div className="bg-white/90 backdrop-blur-sm px-4 py-3 border-b border-gray-200/50">
          <div className="max-w-md mx-auto flex items-center gap-3">
            <button
              onClick={() => navigate('/categories')}
              className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-700" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Cart ({cartItems.length})</h1>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="max-w-md mx-auto space-y-3">
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm leading-tight">{item.name}</h3>
                          <p className="text-xs text-gray-500">{item.brand}</p>
                          {item.selectedSize && (
                            <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-full ml-2"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-medium text-sm min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-semibold text-sm">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-3">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">₹{deliveryFee}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">₹{total}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate('/categories')}
                  className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
