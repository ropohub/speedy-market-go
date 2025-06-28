
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Search, ShoppingBag, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CategoryHeaderProps {
  title: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
    navigate('/');
  };

  const notifications = [
    {
      id: 1,
      title: "Flat 10% off on your first order",
      description: "Use code FIRST10 at checkout"
    },
    {
      id: 2,
      title: "Order clothes at home for ₹0",
      description: "Try before you buy - return on the spot"
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <div className="flex items-center gap-4">
          <Search className="w-6 h-6 text-gray-900" />
          
          {/* Notification Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="relative"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <Bell className="w-6 h-6 text-gray-900" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </div>
            </button>

            {/* Dropdown menu */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                <div className="p-3 border-b">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">
                        {notification.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {notification.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Cart Icon - showing 0 items for now */}
          <div className="relative">
            <ShoppingBag className="w-6 h-6 text-gray-900" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
