
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import NotificationIconWithBadge from '../header/NotificationIconWithBadge';

interface CategoryHeaderProps {
  title: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleSearchClick = () => {
    navigate('/search-page');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50" style={{background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 100%)'}}>
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Back button and logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBack}
            className="p-1"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <img 
            src="/lovable-uploads/5b5065a5-f1ae-4a07-b255-830e99cd26fc.png" 
            alt="Dripzy Logo" 
            className="w-6 h-6 object-contain" 
          />
        </div>
        
        {/* Right side - Icons */}
        <div className="flex items-center gap-2">
          <button onClick={handleSearchClick}>
            <Search className="w-6 h-6 text-gray-900" />
          </button>
          <NotificationIconWithBadge badgeCount={2} />
          <div className="relative">
            <ShoppingBag className="w-6 h-6 text-gray-900" />
            <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
