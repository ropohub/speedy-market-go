
import { auth } from "../firebase";

interface CreateAddressRequest {
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  name: string;
}

interface CreateAddressResponse {
  status: string;
  msg?: string;
  address_id?: string;
}

interface CustomerAddress {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  name: string;
}

interface DeleteAddressResponse {
  status: string;
  address_id: string;
}

export const addressService = {
  // Create address
  async createAddress(addressData: CreateAddressRequest): Promise<CreateAddressResponse> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log('Creating address for user:', user.phoneNumber, addressData);
      const token = await user.getIdToken();
      
      const response = await fetch(`${import.meta.env.VITE_SHOPIFY_API_URL || 'https://shopifyapi-851631422269.asia-south2.run.app'}/customer/address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addressData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create address');
      }

      const result = await response.json();
      console.log("Address created:", result);
      return result;
    } catch (error) {
      console.error("Error creating address:", error);
      throw error;
    }
  },

  // Get addresses
  async getAddresses(): Promise<CustomerAddress[]> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log('Fetching addresses for user:', user.phoneNumber);
      const token = await user.getIdToken();
      
      const response = await fetch(`${import.meta.env.VITE_SHOPIFY_API_URL || 'https://shopifyapi-851631422269.asia-south2.run.app'}/customer/address`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch addresses');
      }

      const result = await response.json();
      console.log("Addresses fetched:", result);
      return result;
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error;
    }
  },

  // Delete address
  async deleteAddress(addressId: string): Promise<DeleteAddressResponse> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log('Deleting address:', addressId, 'for user:', user.phoneNumber);
      const token = await user.getIdToken();
      
      const response = await fetch(`${import.meta.env.VITE_SHOPIFY_API_URL || 'https://shopifyapi-851631422269.asia-south2.run.app'}/customer/address/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete address');
      }

      const result = await response.json();
      console.log("Address deleted:", result);
      return result;
    } catch (error) {
      console.error("Error deleting address:", error);
      throw error;
    }
  }
};
