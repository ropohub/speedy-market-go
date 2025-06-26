
import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import SearchBarWithLogo from './header/SearchBarWithLogo';
import NotificationIconWithBadge from './header/NotificationIconWithBadge';
import WishlistIcon from './header/WishlistIcon';
import CartIcon from './header/CartIcon';

const Header: React.FC = () => {
  const [userLocation, setUserLocation] = useState({
    fullAddress: 'Fetching location...',
    shortAddress: 'Location...'
  });

  useEffect(() => {
    const fetchUserLocation = () => {
      if (!navigator.geolocation) {
        setUserLocation({
          fullAddress: 'Location not supported',
          shortAddress: 'Location not available'
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
            
            if (!apiKey) {
              console.warn('Google Maps API key not found, using coordinates');
              setUserLocation({
                fullAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
                shortAddress: 'Current Location'
              });
              return;
            }

            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            
            if (!response.ok) {
              throw new Error('Failed to fetch address');
            }
            
            const data = await response.json();
            
            if (data.status === 'OK' && data.results && data.results.length > 0) {
              const result = data.results[0];
              const addressComponents = result.address_components;
              
              // Extract area/locality for short address
              const area = addressComponents.find(
                (component: any) => 
                  component.types.includes('sublocality') || 
                  component.types.includes('locality')
              )?.long_name || 'Current Location';
              
              const fullAddress = result.formatted_address;
              
              setUserLocation({
                fullAddress: fullAddress.length > 50 ? fullAddress.substring(0, 50) + '...' : fullAddress,
                shortAddress: area.length > 20 ? area.substring(0, 20) + '...' : area
              });
            } else {
              console.warn('Geocoding failed:', data.status, data.error_message);
              setUserLocation({
                fullAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
                shortAddress: 'Current Location'
              });
            }
          } catch (error) {
            console.error('Geocoding error:', error);
            setUserLocation({
              fullAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
              shortAddress: 'Current Location'
            });
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setUserLocation({
            fullAddress: 'Location access denied',
            shortAddress: 'Location denied'
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    };

    fetchUserLocation();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200" style={{backgroundColor: '#FFEFE4'}}>
      {/* First row: Single line location */}
      <div className="px-4 py-2 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-700" />
        <span className="text-sm font-medium text-gray-900 truncate">
          Deliver to {userLocation.fullAddress}
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
          <WishlistIcon />
          <CartIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
