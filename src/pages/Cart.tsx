
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { auth } from '../firebase';
import Auth from './Auth';
import { cartService } from '../api/cartClient';
import { toast } from "@/hooks/use-toast";

const SHOPIFY_STOREFRONT_ACCESS_TOKEN = '50b756b36c591cc2d86ea31b1eceace5';
const SHOPIFY_API_URL = 'https://dripzyy.com/api/2024-04/graphql.json';

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
  const query = `
    query GetProductVariant($id: ID!) {
      productVariant(id: $id) {
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
  `;

  const response = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: { id: variantId },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch variant details');
  }

  const json = await response.json();
  return json.data?.productVariant;
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
            // Fallback to mock data if variant details not found
            mappedItems.push({
              id: item.product_variant_id,
              name: 'Product Not Found',
              price: 999,
              image: '/placeholder.svg',
              brand: 'Unknown Brand',
              selectedSize: 'M',
              quantity: item.quantity,
              productVariantId: item.product_variant_id
            });
          }
        } catch (variantError) {
          console.error('Failed to fetch variant details:', variantError);
          // Fallback to mock data on error
          mappedItems.push({
            id: item.product_variant_id,
            name: 'Product Error',
            price: 999,
            image: '/placeholder.svg',
            brand: 'Unknown Brand',
            selectedSize: 'M',
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
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" />
            <p className="text-gray-600">Loading cart...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-600 mb-4">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h2 className="text-xl font-bold mb-2">Cart Loading Error</h2>
              <p className="text-sm">{error}</p>
            </div>
            <button
              onClick={fetchCartItems}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors mr-4"
            >
              Retry
            </button>
            <button
              onClick={() => navigate('/categories')}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
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
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white px-4 py-4 border-b">
          <h1 className="text-xl font-bold text-gray-900">Shopping Cart ({cartItems.length} items)</h1>
        </div>

        <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        {item.selectedSize && (
                          <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-semibold text-lg">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">₹{deliveryFee}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg">₹{total}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate('/categories')}
              className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
