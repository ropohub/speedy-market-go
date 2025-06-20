
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { MapPin, Truck, Shield, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import AddressForm from '../components/AddressForm';
import { addressService } from '../api/addressClient';
import { orderService } from '../api/orderClient';
import { cartService } from '../api/cartClient';
import { toast } from "@/hooks/use-toast";
import { auth } from '../firebase';
import Auth from './Auth';

interface CustomerAddress {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  name: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const firebaseUser = auth.currentUser;
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [placing, setPlacing] = useState(false);

  // Fetch addresses and cart items
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch addresses
      const addressData = await addressService.getAddresses();
      setAddresses(addressData);
      
      // Set first address as selected if available
      if (addressData.length > 0 && !selectedAddressId) {
        setSelectedAddressId(addressData[0].id);
      }

      // Fetch cart items to show in checkout
      const cartData = await cartService.getCartItems();
      if (cartData.status !== 'empty' && cartData.items) {
        setCartItems(cartData.items);
      }

    } catch (error: any) {
      console.error('Failed to fetch data:', error);
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
    fetchData(); // Refresh addresses
    setIsAddressDialogOpen(false);
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await addressService.deleteAddress(addressId);
      
      toast({
        title: "Address Deleted",
        description: "Address has been removed successfully"
      });

      // Refresh addresses
      await fetchData();
      
      // Clear selection if deleted address was selected
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

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  const deliveryFee = 99;
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
        navigate('/profile'); // Navigate to profile to see orders
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
        {/* Header */}
        <div className="bg-white px-4 py-4 border-b">
          <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
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
                {addresses.map((address) => (
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
                          <span className="font-medium">{address.name}</span>
                        </div>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                        <p className="text-sm text-gray-600">{address.address}</p>
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
                ))}
                
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
              
              {cartItems.length > 0 ? (
                <div className="space-y-3">
                  {cartItems.map((item, index) => (
                    <div key={item.product_variant_id || index} className="flex gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">Cart Item</h3>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium">₹{(item.price || 0) * item.quantity}</span>
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

              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Safe and secure payments</span>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={placing || !selectedAddressId || cartItems.length === 0}
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
