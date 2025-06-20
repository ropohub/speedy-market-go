import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { User, MapPin, Phone, Mail, Package, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';
import Auth from './Auth';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { userPhone, isLoading, logout } = useAuth();
  const firebaseUser = auth.currentUser;
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Fetch orders when component mounts
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const { orderService } = await import('../api/orderClient');
      const orderData = await orderService.getOrders();
      setOrders(orderData.orders || []);
    } catch (error: any) {
      console.error('Failed to fetch orders:', error);
      // Don't show error toast for orders as it's not critical
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (firebaseUser) {
      fetchOrders();
    }
  }, [firebaseUser]);

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
        <div className="bg-white px-4 py-6 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Welcome!</h2>
              <p className="text-gray-600">Premium Member</p>
            </div>
          </div>
        </div>

        <div className="bg-white mx-4 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">+91 {userPhone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">user@email.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">Sector 29, Gurugram, Haryana</span>
            </div>
          </div>
        </div>

        <div className="bg-white mx-4 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-gray-700" />
            <h3 className="font-semibold text-gray-900">Your Orders</h3>
            {loadingOrders && (
              <div className="w-4 h-4 border border-gray-300 border-t-orange-500 rounded-full animate-spin ml-2" />
            )}
          </div>
          
          {loadingOrders ? (
            <div className="text-center py-4">
              <p className="text-gray-500">Loading orders...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.order_id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">Order {order.order_name}</p>
                      <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {order.status || 'Confirmed'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">{order.line_items?.length || 0} items</p>
                    <p className="font-semibold text-gray-900">
                      {order.currency} {order.total_amount?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No orders yet</p>
              <button
                onClick={() => navigate('/categories')}
                className="mt-3 text-orange-500 hover:text-orange-600 font-medium"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

        <div className="mx-4 mb-8">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
