
import { useState, useEffect } from 'react';

interface LocationData {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const GOOGLE_MAPS_API_KEY = "AIzaSyAxLcnwB8NW5AIObRuIKMinfNvENzzgRZE";

export const useGeolocation = () => {
  const [locationData, setLocationData] = useState<LocationData>({
    address: "Enable location for delivery",
    coordinates: null,
    isLoading: false,
    error: null,
  });

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setLocationData(prev => ({
        ...prev,
        error: "Geolocation is not supported by this browser",
      }));
      return;
    }

    setLocationData(prev => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Using Google Maps Geocoding API for more precise location
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch address from Google Maps');
          }
          
          const data = await response.json();
          
          if (data.status === 'OK' && data.results && data.results.length > 0) {
            // Get the most accurate address (usually the first result)
            const result = data.results[0];
            const formattedAddress = result.formatted_address;
            
            setLocationData({
              address: formattedAddress,
              coordinates: { latitude, longitude },
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error('No address found for coordinates');
          }
        } catch (error) {
          console.error('Error fetching address from Google Maps:', error);
          // Fallback to coordinates display
          setLocationData({
            address: `Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            coordinates: { latitude, longitude },
            isLoading: false,
            error: null,
          });
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = "Location access denied";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timeout";
            break;
        }
        
        setLocationData(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000, // 1 minute cache
      }
    );
  };

  return {
    ...locationData,
    requestLocation,
  };
};
