
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { User, MapPin, Phone, Package, LogOut, Plus, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';
import { addressService } from '../api/addressClient';
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import AddressForm from '../components/AddressForm';
import Auth from './Auth';

interface CustomerAddress {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  name: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { userPhone, isLoading, logout } = useAuth();
  const firebaseUser = auth.currentUser;
  const [orders, setOrders] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  // Fetch orders when component mounts
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const { orderService } = await import('../api/orderClient');
      const orderData = await orderService.getOrders();
      setOrders(orderData.orders || []);
    } catch (error: any) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const addressData = await addressService.getAddresses();
      const addressArray = Array.isArray(addressData) ? addressData : [];
      setAddresses(addressArray);
    } catch (error: any) {
      console.error('Failed to fetch addresses:', error);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    if (firebaseUser) {
      fetchOrders();
      fetchAddresses();
    }
  }, [firebaseUser]);

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await addressService.deleteAddress(addressId);
      toast({
        title: "Address Deleted",
        description: "Address has been removed successfully"
      });
      fetchAddresses(); // Refresh addresses
    } catch (error: any) {
      console.error('Failed to delete address:', error);
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete address",
        variant: "destructive"
      });
    }
  };

  const handleAddressAdded = () => {
    fetchAddresses();
    setIsAddressDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (!firebaseUser) {
    return <Auth />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Welcome Back!</h2>
              <p className="text-orange-100 mt-1">+91 {userPhone}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-orange-100">Premium Member</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                  <p className="text-sm text-gray-600">Total Orders</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{addresses.length}</p>
                  <p className="text-sm text-gray-600">Saved Addresses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                </div>
                {loadingOrders && (
                  <div className="w-5 h-5 border border-gray-300 border-t-orange-500 rounded-full animate-spin" />
                )}
              </div>
            </div>
            
            <div className="p-6">
              {loadingOrders ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading orders...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.order_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-gray-900">Order {order.order_name}</p>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                            {order.status || 'Confirmed'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <p>{new Date(order.created_at).toLocaleDateString()}</p>
                          <p className="font-semibold text-gray-900">
                            {order.currency} {order.total_amount?.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{order.line_items?.length || 0} items</p>
                      </div>
                    </div>
                  ))}
                  {orders.length > 3 && (
                    <button className="w-full text-center text-orange-500 hover:text-orange-600 font-medium py-2">
                      View All Orders
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No orders yet</p>
                  <p className="text-gray-400 text-sm mb-4">Start exploring our amazing products</p>
                  <button
                    onClick={() => navigate('/categories')}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Saved Addresses */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">Saved Addresses</h3>
                </div>
                <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium">
                      <Plus className="w-4 h-4" />
                      Add New
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
            
            <div className="p-6">
              {loadingAddresses ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading addresses...</p>
                </div>
              ) : addresses.length > 0 ? (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-900">{address.name}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
                          <p className="text-sm text-gray-700">{address.address}</p>
                          {(address.latitude !== 0 || address.longitude !== 0) && (
                            <p className="text-xs text-gray-500 mt-2">
                              📍 {address.latitude.toFixed(4)}, {address.longitude.toFixed(4)}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No saved addresses</p>
                  <p className="text-gray-400 text-sm mb-4">Add an address for faster checkout</p>
                  <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                    <DialogTrigger asChild>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        Add Address
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
              )}
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-4">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
