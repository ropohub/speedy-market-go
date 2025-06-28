
import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';

interface NotificationIconWithBadgeProps {
  badgeCount?: number;
}

const NotificationIconWithBadge: React.FC<NotificationIconWithBadgeProps> = ({ 
  badgeCount = 2 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5 text-gray-700" />
        {badgeCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
            {badgeCount}
          </div>
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
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
  );
};

export default NotificationIconWithBadge;

