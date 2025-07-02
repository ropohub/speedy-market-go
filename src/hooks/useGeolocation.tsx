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

async function fetchLocationFromIP() {
  try {
    const response = await fetch('https://ipinfo.io/json');
    if (!response.ok) throw new Error('Failed to fetch IP location');
    const data = await response.json();
    // ipinfo.io returns location as a comma-separated string in 'loc'
    let latitude = null, longitude = null;
    if (data.loc) {
      const [lat, lon] = data.loc.split(',');
      latitude = parseFloat(lat);
      longitude = parseFloat(lon);
    }
    return {
      address: data.city && data.region && data.country
        ? `${data.city}, ${data.region}, ${data.country}`
        : data.city || data.region || data.country || 'Unknown location',
      coordinates: latitude && longitude
        ? { latitude, longitude }
        : null,
    };
  } catch (e) {
    return {
      address: 'Unknown location',
      coordinates: null,
    };
  }
}

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
          });
        }
      },
      async (error) => {
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
        // Immediately set loading to false and show temporary message
        setLocationData(prev => ({
          ...prev,
          isLoading: false,
          address: 'Getting approximate location...'
        }));
        // Fallback to IP-based location if denied or unavailable
        const ipLocation = await fetchLocationFromIP();
        setLocationData(prev => ({
          ...prev,
          address: ipLocation.address,
          coordinates: ipLocation.coordinates,
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
