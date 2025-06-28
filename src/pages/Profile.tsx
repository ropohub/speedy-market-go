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
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 50%, #FDE8E8 100%)'
      }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
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
      <div className="min-h-screen" style={{
        background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 30%, #FDE8E8 70%, #F3E8FF 100%)'
      }}>
        {/* Compact Profile Header */}
        <div className="px-4 py-4">
          <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">Welcome Back!</h2>
                <p className="text-sm text-gray-600">+91 {userPhone}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-gray-500">Premium Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 space-y-3 pb-6">
          <div className="max-w-md mx-auto space-y-3">
            {/* Compact Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{orders.length}</p>
                    <p className="text-xs text-gray-600">Orders</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{addresses.length}</p>
                    <p className="text-xs text-gray-600">Addresses</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Recent Orders */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-700" />
                    <h3 className="text-sm font-semibold text-gray-900">Recent Orders</h3>
                  </div>
                  {loadingOrders && (
                    <div className="w-4 h-4 border border-gray-300 border-t-orange-500 rounded-full animate-spin" />
                  )}
                </div>
              </div>
              
              <div className="p-4">
                {loadingOrders ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">Loading orders...</p>
                  </div>
                ) : orders.length > 0 ? (
                  <div className="space-y-3">
                    {orders.slice(0, 2).map((order) => (
                      <div key={order.order_id} className="p-3 bg-gray-50/80 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-900">Order {order.order_name}</p>
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                            {order.status || 'Confirmed'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <p>{new Date(order.created_at).toLocaleDateString()}</p>
                          <p className="font-semibold text-gray-900">
                            {order.currency} {order.total_amount?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {orders.length > 2 && (
                      <button className="w-full text-center text-orange-500 hover:text-orange-600 font-medium py-1 text-sm">
                        View All Orders
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm mb-1">No orders yet</p>
                    <p className="text-gray-400 text-xs mb-3">Start exploring our amazing products</p>
                    <button
                      onClick={() => navigate('/categories')}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Compact Saved Addresses */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-700" />
                    <h3 className="text-sm font-semibold text-gray-900">Saved Addresses</h3>
                  </div>
                  <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-1 text-orange-500 hover:text-orange-600 text-sm font-medium">
                        <Plus className="w-3 h-3" />
                        Add
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
              
              <div className="p-4">
                {loadingAddresses ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">Loading addresses...</p>
                  </div>
                ) : addresses.length > 0 ? (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <div key={address.id} className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-gray-900">{address.name}</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">{address.phone}</p>
                            <p className="text-xs text-gray-700">{address.address}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteAddress(address.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm mb-1">No saved addresses</p>
                    <p className="text-gray-400 text-xs mb-3">Add an address for faster checkout</p>
                    <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                      <DialogTrigger asChild>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
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

            {/* Compact Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
