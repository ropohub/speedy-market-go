
import React, { useState } from 'react';
import { Button } from './ui/button';
import { addressService } from '../api/addressClient';
import { toast } from "@/hooks/use-toast";
import { MapPin, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AddressFormProps {
  onClose: () => void;
  onAddressAdded?: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onClose, onAddressAdded }) => {
  const { userPhone } = useAuth();
  const [formData, setFormData] = useState({
    address: '',
    name: '',
    phone: userPhone ? `+91${userPhone}` : '', // Use authenticated user's phone
    latitude: 0,
    longitude: 0
  });
  const [loading, setLoading] = useState(false);
  const [fetchingLocation, setFetchingLocation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.address.trim() || !formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.latitude === 0 && formData.longitude === 0) {
      toast({
        title: "Location Required",
        description: "Please fetch your location to continue",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      console.log('Sending address data:', {
        address: formData.address,
        name: formData.name,
        phone: formData.phone || `+91${userPhone}` || '+911234567890',
        latitude: formData.latitude,
        longitude: formData.longitude
      });

      await addressService.createAddress({
        address: formData.address,
        name: formData.name,
        phone: formData.phone || `+91${userPhone}` || '+911234567890',
        latitude: formData.latitude,
        longitude: formData.longitude
      });

      toast({
        title: "Address Added",
        description: "Your address has been saved successfully"
      });

      if (onAddressAdded) {
        onAddressAdded();
      }
      
      onClose();
    } catch (error: any) {
      console.error('Failed to create address:', error);
      toast({
        title: "Address Creation Failed",
        description: error.message || "Failed to save address",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support geolocation",
        variant: "destructive"
      });
      return;
    }

    setFetchingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use Google Maps Geocoding API to get address
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch address from coordinates');
          }
          
          const data = await response.json();
          
          if (data.results && data.results.length > 0) {
            const formattedAddress = data.results[0].formatted_address;
            
            setFormData(prev => ({
              ...prev,
              latitude,
              longitude,
              address: formattedAddress
            }));
            
            toast({
              title: "Location Fetched",
              description: "Your current location has been detected"
            });
          } else {
            throw new Error('No address found for this location');
          }
        } catch (error) {
          console.error('Geocoding error:', error);
          // Still set coordinates even if geocoding fails
          setFormData(prev => ({
            ...prev,
            latitude,
            longitude
          }));
          
          toast({
            title: "Location Detected",
            description: "Coordinates saved. Please enter your address manually."
          });
        }
        
        setFetchingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setFetchingLocation(false);
        
        let errorMessage = "Unable to fetch your location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }
        
        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive"
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter recipient's full name"
          required
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Complete Address *
        </label>
        <textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter complete address including house number, area, city, state, pincode"
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Location *
        </label>
        <Button
          type="button"
          onClick={fetchCurrentLocation}
          disabled={fetchingLocation}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          {fetchingLocation ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Fetching Location...
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4 mr-2" />
              Get My Current Location
            </>
          )}
        </Button>
        {formData.latitude !== 0 && formData.longitude !== 0 && (
          <p className="text-xs text-green-600">
            ✓ Location detected: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
          </p>
        )}
      </div>
      
      <div className="flex gap-2 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose} 
          className="flex-1"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-orange-500 hover:bg-orange-600"
          disabled={loading || (formData.latitude === 0 && formData.longitude === 0)}
        >
          {loading ? 'Adding...' : 'Add Address'}
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
