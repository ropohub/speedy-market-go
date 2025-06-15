
import React from 'react';
import Layout from '../components/Layout';
import { User, MapPin, Phone, Mail, Package, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Auth from './Auth';

const Profile: React.FC = () => {
  const { isAuthenticated, userPhone, logout } = useAuth();
  const navigate = useNavigate();

  // Show login screen if user is not authenticated
  if (!isAuthenticated) {
    return <Auth />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-06-10',
      status: 'Delivered',
      total: 2999,
      items: 2
    },
    {
      id: 'ORD002',
      date: '2024-06-08',
      status: 'Delivered',
      total: 1599,
      items: 1
    },
    {
      id: 'ORD003',
      date: '2024-06-05',
      status: 'Delivered',
      total: 4299,
      items: 3
    }
  ];

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Profile Header */}
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

        {/* User Details */}
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

        {/* Past Orders */}
        <div className="bg-white mx-4 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-gray-700" />
            <h3 className="font-semibold text-gray-900">Past Orders</h3>
          </div>
          <div className="space-y-3">
            {mockOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900">Order {order.id}</p>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">{order.items} items</p>
                  <p className="font-semibold text-gray-900">₹{order.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
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
