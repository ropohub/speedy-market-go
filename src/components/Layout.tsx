
import React from 'react';
import { User, Grid3X3, House } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  selectedSize?: string;
  quantity: number;
}

interface LayoutProps {
  children: React.ReactNode;
  cartItems?: CartItem[];
  onUpdateCartQuantity?: (id: string, quantity: number) => void;
  onRemoveCartItem?: (id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  cartItems = []
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-40">
        <div className="flex items-center justify-around py-2 max-w-7xl mx-auto">
          <button 
            onClick={() => navigate('/')} 
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
              isActive('/') ? 'text-orange-500' : 'text-gray-300 hover:text-orange-300'
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <House className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button 
            onClick={() => navigate('/categories')} 
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
              isActive('/categories') ? 'text-orange-500' : 'text-gray-300 hover:text-orange-300'
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <Grid3X3 className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Categories</span>
          </button>
          
          <button 
            onClick={() => navigate('/profile')} 
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors ${
              isActive('/profile') ? 'text-orange-500' : 'text-gray-300 hover:text-orange-300'
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
