
import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import SearchBarWithLogo from './header/SearchBarWithLogo';
import NotificationIconWithBadge from './header/NotificationIconWithBadge';
import CartIcon from './header/CartIcon';

const Header: React.FC = () => {
  const hardcodedAddress = "288, Sector 38, Medicity, Gurgaon..";
  const truncatedAddress = hardcodedAddress.length > 29 
    ? hardcodedAddress.substring(0, 29) + "..." 
    : hardcodedAddress;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200" style={{backgroundColor: '#FFEFE4'}}>
      {/* First row: Single line location - reduced bottom padding only */}
      <div className="px-4 pt-2 pb-0.5 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-700" />
        <span className="text-sm text-gray-900 truncate">
          <span className="font-normal">Deliver to </span>
          <span className="font-bold">{truncatedAddress}</span>
        </span>
        <ChevronDown className="w-4 h-4 text-gray-600 flex-shrink-0" />
      </div>
      
      {/* Second row: Search and icons */}
      <div className="px-4 py-1 flex items-center gap-2">
        {/* Search bar takes most space */}
        <div className="flex-1">
          <SearchBarWithLogo />
        </div>
        
        {/* Right side icons */}
        <div className="flex items-center gap-1">
          <NotificationIconWithBadge badgeCount={2} />
          <CartIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
