
import React, { useState } from 'react';
import { Button } from './ui/button';
import { addressService } from '../api/addressClient';
import { toast } from "@/hooks/use-toast";

interface AddressFormProps {
  onClose: () => void;
  onAddressAdded?: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onClose, onAddressAdded }) => {
  const [formData, setFormData] = useState({
    address: '',
    name: '',
    phone: '',
    latitude: 0,
    longitude: 0
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.address.trim() || !formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      await addressService.createAddress({
        address: formData.address,
        name: formData.name,
        phone: formData.phone,
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
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter recipient's phone number"
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-2">
            Latitude (Optional)
          </label>
          <input
            type="number"
            id="latitude"
            step="any"
            value={formData.latitude}
            onChange={(e) => handleInputChange('latitude', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="0.0"
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-2">
            Longitude (Optional)
          </label>
          <input
            type="number"
            id="longitude"
            step="any"
            value={formData.longitude}
            onChange={(e) => handleInputChange('longitude', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="0.0"
          />
        </div>
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
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Address'}
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
