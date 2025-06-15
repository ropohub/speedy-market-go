
import React, { useState } from 'react';
import { Button } from './ui/button';

interface AddressFormProps {
  onClose: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onClose }) => {
  const [houseNo, setHouseNo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (houseNo.trim()) {
      // Handle form submission here
      console.log('House No:', houseNo);
      alert(`Address added: House ${houseNo}`);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700 mb-2">
          House Number
        </label>
        <input
          type="text"
          id="houseNo"
          value={houseNo}
          onChange={(e) => setHouseNo(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter house number"
          required
        />
      </div>
      
      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
          Add Address
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
