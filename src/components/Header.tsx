
import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import SearchBarWithLogo from './header/SearchBarWithLogo';
import NotificationIconWithBadge from './header/NotificationIconWithBadge';
import CartIcon from './header/CartIcon';
import { useGeolocation } from '../hooks/useGeolocation';

const Header: React.FC = () => {
  const { address, isLoading, error, requestLocation } = useGeolocation();
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false);

  // Request location on component mount
  useEffect(() => {
    if (!hasRequestedLocation) {
      requestLocation();
      setHasRequestedLocation(true);
    }
  }, [requestLocation, hasRequestedLocation]);

  const handleLocationClick = () => {
    requestLocation();
  };

  const getDisplayAddress = () => {
    if (isLoading) return "Getting location...";
    if (error) return "Tap to enable location";
    
    const truncatedAddress = address.length > 30 
      ? address.substring(0, 30) + "..." 
      : address;
    
    return truncatedAddress;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200" style={{backgroundColor: '#FFEFE4'}}>
      {/* First row: Single line location - reduced bottom padding only */}
      <div className="px-4 pt-2 pb-0.5 flex items-center gap-2">
        <MapPin className={`w-4 h-4 ${isLoading ? 'text-blue-500 animate-pulse' : error ? 'text-red-500' : 'text-gray-700'}`} />
        <button 
          onClick={handleLocationClick}
          className="text-sm text-gray-900 truncate flex-1 text-left"
        >
          <span className="font-normal">Deliver to </span>
          <span className="font-bold">{getDisplayAddress()}</span>
        </button>
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
