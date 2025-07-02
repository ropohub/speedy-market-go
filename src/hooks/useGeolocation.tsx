
import { useState, useEffect } from 'react';

interface LocationData {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  isLoading: boolean;
  error: string | null;
  permissionBlocked: boolean;
}

const GOOGLE_MAPS_API_KEY = "AIzaSyAxLcnwB8NW5AIObRuIKMinfNvENzzgRZE";

export const useGeolocation = () => {
  const [locationData, setLocationData] = useState<LocationData>({
    address: "Enable location for delivery",
    coordinates: null,
    isLoading: false,
    error: null,
    permissionBlocked: false,
  });

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setLocationData(prev => ({
        ...prev,
        error: "Geolocation is not supported by this browser",
        permissionBlocked: true,
      }));
      return;
    }

    setLocationData(prev => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch address from Google Maps');
          }
          const data = await response.json();
          if (data.status === 'OK' && data.results && data.results.length > 0) {
            const result = data.results[0];
            const formattedAddress = result.formatted_address;
            setLocationData({
              address: formattedAddress,
              coordinates: { latitude, longitude },
              isLoading: false,
              error: null,
              permissionBlocked: false,
            });
          } else {
            throw new Error('No address found for coordinates');
          }
        } catch (error) {
          setLocationData({
            address: `Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            coordinates: { latitude, longitude },
            isLoading: false,
            error: null,
            permissionBlocked: false,
          });
        }
      },
      async (error) => {
        let errorMessage = "Location access denied";
        let shouldBlock = false;
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied";
            shouldBlock = true;
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location unavailable";
            shouldBlock = true;
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timeout";
            shouldBlock = true;
            break;
        }
        
        setLocationData({
          address: "Location permission required",
          coordinates: null,
          isLoading: false,
          error: errorMessage,
          permissionBlocked: shouldBlock,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      }
    );
  };

  // Automatically request location on mount
  useEffect(() => {
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...locationData,
    requestLocation,
  };
};
