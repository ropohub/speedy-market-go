import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { MapPin, Truck, Shield, Trash2, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import AddressForm from '../components/AddressForm';
import { addressService } from '../api/addressClient';
import { orderService } from '../api/orderClient';
import { cartService } from '../api/cartClient';
import { toast } from "@/hooks/use-toast";
import { auth } from '../firebase';
import Auth from './Auth';

const SHOPIFY_STOREFRONT_ACCESS_TOKEN = '50b756b36c591cc2d86ea31b1eceace5';
const SHOPIFY_API_URL = 'https://sycfx9-af.myshopify.com/admin/api/2025-04/graphql.json';

interface CustomerAddress {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  name: string;
}

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

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const firebaseUser = auth.currentUser;
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [placing, setPlacing] = useState(false);

  // Fetch addresses and cart items
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch addresses
      const addressData = await addressService.getAddresses();
      console.log('Addresses fetched:', addressData);
      
      const addressArray = Array.isArray(addressData) ? addressData : [];
      setAddresses(addressArray);
      
      if (addressArray.length > 0 && !selectedAddressId) {
        setSelectedAddressId(addressArray[0].id);
      }

      // Fetch cart items and get real product details
      const cartData = await cartService.getCartItems();
      console.log('Cart data fetched:', cartData);
      
      if (cartData && cartData.status !== 'empty' && Array.isArray(cartData.items)) {
        // Fetch real product details for each cart item
        const mappedItems: CartItem[] = [];
        
        for (const item of cartData.items) {
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
      } else {
        setCartItems([]);
      }

    } catch (error: any) {
      console.error('Failed to fetch data:', error);
      
      setAddresses([]);
      setCartItems([]);
      
      toast({
        title: "Loading Error",
        description: error.message || "Failed to load checkout data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (firebaseUser) {
      fetchData();
    }
  }, [firebaseUser]);

  const handleAddressAdded = () => {
    fetchData();
    setIsAddressDialogOpen(false);
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await addressService.deleteAddress(addressId);
      
      toast({
        title: "Address Deleted",
        description: "Address has been removed successfully"
      });

      await fetchData();
      
      if (selectedAddressId === addressId) {
        setSelectedAddressId('');
      }
    } catch (error: any) {
      console.error('Failed to delete address:', error);
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete address",
        variant: "destructive"
      });
    }
  };

  const subtotal = Array.isArray(cartItems) ? cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0) : 0;
  const originalDeliveryFee = 49;
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast({
        title: "Address Required",
        description: "Please select a delivery address",
        variant: "destructive"
      });
      return;
    }

    try {
      setPlacing(true);
      
      const result = await orderService.placeOrder(selectedAddressId);
      
      if (result.status === 'success') {
        toast({
          title: "Order Placed Successfully!",
          description: `Your order ${result.order_id} has been confirmed`
        });
        navigate('/profile');
      } else {
        throw new Error(result.error || 'Failed to place order');
      }
    } catch (error: any) {
      console.error('Failed to place order:', error);
      toast({
        title: "Order Failed",
        description: error.message || "Failed to place order",
        variant: "destructive"
      });
    } finally {
      setPlacing(false);
    }
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
            <p className="text-gray-600">Loading checkout...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header with Back Button */}
        <div className="bg-white px-4 py-4 border-b">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/cart')}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-bold text-gray-900">Delivery Address</h2>
              </div>
              
              <div className="space-y-3">
                {Array.isArray(addresses) && addresses.length > 0 ? (
                  addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddressId(address.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAddressId === address.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{address.name || 'No Name'}</span>
                          </div>
                          <p className="text-sm text-gray-600">{address.phone || 'No Phone'}</p>
                          <p className="text-sm text-gray-600">{address.address || 'No Address'}</p>
                          {(address.latitude !== 0 || address.longitude !== 0) && (
                            <p className="text-xs text-gray-500 mt-1">
                              Coordinates: {address.latitude}, {address.longitude}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={selectedAddressId === address.id}
                            onChange={() => setSelectedAddressId(address.id)}
                            className="mt-1"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAddress(address.id);
                            }}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No addresses found. Please add an address to continue.</p>
                  </div>
                )}
                
                <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 transition-colors">
                      + Add New Address
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Address</DialogTitle>
                    </DialogHeader>
                    <AddressForm 
                      onClose={() => setIsAddressDialogOpen(false)} 
                      onAddressAdded={handleAddressAdded}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
              </div>
              
              <div className="p-4 border border-orange-500 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-gray-600" />
                    <div>
                      <span className="font-medium">Cash on Delivery</span>
                      <p className="text-sm text-gray-600">Pay when you receive</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    checked={true}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Items Summary */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items</h2>
              
              {Array.isArray(cartItems) && cartItems.length > 0 ? (
                <div className="space-y-3">
                  {cartItems.map((item, index) => (
                    <div key={item.productVariantId || index} className="flex gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        {item.image && item.image !== '/placeholder.svg' ? (
                          <img 
                            src={item.image} 
                            alt={item.name || 'Product'} 
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300 rounded"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item.brand}</p>
                        {item.selectedSize && (
                          <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                        )}
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No items in cart</p>
              )}
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Price Details</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through text-sm">₹{originalDeliveryFee}</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Safe and secure payments</span>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={placing || !selectedAddressId || !Array.isArray(cartItems) || cartItems.length === 0}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {placing ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
