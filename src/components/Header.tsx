
import React from 'react';
import { ArrowLeft, Search, Heart, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onBackClick?: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ onBackClick, title = 'Products' }) => {
  const navigate = useNavigate();

  const handleBack = onBackClick || (() => navigate(-1));

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <button 
          onClick={handleBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <h1 className="text-lg font-semibold text-gray-900 capitalize">{title}</h1>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Heart className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            onClick={() => navigate('/cart')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
