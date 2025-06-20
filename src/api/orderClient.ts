
import { shopifyClient } from "./shopifyClient";
import { auth } from "../firebase";

interface PlaceOrderRequest {
  address_id: string;
}

interface PlaceOrderResponse {
  status: string;
  order_id?: string;
  error?: string;
}

interface OrderLineItem {
  product_variant_id: string;
  quantity: number;
  image_url: string;
}

interface CustomerOrder {
  order_id: string;
  order_name: string;
  total_amount: number;
  currency: string;
  status: string;
  created_at: string;
  line_items: OrderLineItem[];
}

interface PagedOrdersResponse {
  orders: CustomerOrder[];
  next_page_token?: string;
}

export const orderService = {
  // Place order
  async placeOrder(addressId: string): Promise<PlaceOrderResponse> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log('Placing order for user:', user.phoneNumber, 'with address:', addressId);
      const token = await user.getIdToken();
      
      const response = await fetch(`${import.meta.env.VITE_SHOPIFY_API_URL || 'https://shopifyapi-851631422269.asia-south2.run.app'}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          address_id: addressId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to place order');
      }

      const result = await response.json();
      console.log("Order placed:", result);
      return result;
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  },

  // Get customer orders
  async getOrders(after?: string): Promise<PagedOrdersResponse> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log('Fetching orders for user:', user.phoneNumber);
      const token = await user.getIdToken();
      
      let url = `${import.meta.env.VITE_SHOPIFY_API_URL || 'https://shopifyapi-851631422269.asia-south2.run.app'}/orders`;
      if (after) {
        url += `?after=${encodeURIComponent(after)}`;
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch orders');
      }

      const result = await response.json();
      console.log("Orders fetched:", result);
      return result;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }
};
