
import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationIconWithBadgeProps {
  badgeCount?: number;
}

const NotificationIconWithBadge: React.FC<NotificationIconWithBadgeProps> = ({ 
  badgeCount = 2 
}) => {
  return (
    <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
      <Bell className="w-5 h-5 text-gray-700" />
      {badgeCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
          {badgeCount}
        </div>
      )}
    </button>
  );
};

export default NotificationIconWithBadge;
