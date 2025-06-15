
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { MapPin, Truck, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import AddressForm from '../components/AddressForm';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    // In real app, check auth state from context/localStorage
    const authStatus = localStorage.getItem('isAuthenticated');
    if (!authStatus) {
      navigate('/auth');
      return;
    }
    setIsAuthenticated(true);
  }, [navigate]);

  // Mock data
  const cartItems = [
    {
      id: 'w1',
      name: 'Floral Summer Dress',
      price: 1299,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop'
    },
    {
      id: 'w2',
      name: 'Cotton White Shirt',
      price: 899,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop'
    }
  ];

  const addresses = [
    {
      id: 1,
      name: 'John Doe',
      phone: '+91 9876543210',
      address: '123 Main Street, Sector 14, Gurugram, Haryana 122001',
      isDefault: true
    },
    {
      id: 2,
      name: 'John Doe',
      phone: '+91 9876543210',
      address: '456 Park Avenue, DLF Phase 2, Gurugram, Haryana 122002',
      isDefault: false
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 99;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    // In real app, process payment and create order
    alert('Order placed successfully!');
    navigate('/');
  };

  if (!isAuthenticated) {
    return null; // Will redirect to auth
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
                {addresses.map((address, index) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(index)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAddress === index
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{address.name}</span>
                          {address.isDefault && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                        <p className="text-sm text-gray-600">{address.address}</p>
                      </div>
                      <input
                        type="radio"
                        checked={selectedAddress === index}
                        onChange={() => setSelectedAddress(index)}
                        className="mt-1"
                      />
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
                    <AddressForm onClose={() => setIsAddressDialogOpen(false)} />
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
              
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
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
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
