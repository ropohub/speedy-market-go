
import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useGeolocation } from '../../hooks/useGeolocation';

const LocationDisplay: React.FC = () => {
  const { address, isLoading, error, requestLocation } = useGeolocation();

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
    <div className="flex items-center gap-1">
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
  );
};

export default LocationDisplay;
