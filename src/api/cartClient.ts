
import { shopifyClient } from "./shopifyClient";
import { auth } from "../firebase";

interface CartItem {
  product_variant_id: string;
  quantity: number;
}

interface CartUpdateResponse {
  draft_order_id: string;
  status: string;
}

interface CartGetResponse {
  items: CartItem[];
  status: string;
}

export const cartService = {
  // Fetch cart items
  async getCartItems(): Promise<CartGetResponse> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const token = await user.getIdToken();
      const response = await shopifyClient.getCart(token);
      
      console.log("Cart items fetched:", response);
      return response;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw error;
    }
  },

  // Add or update cart item
  async mutateCart(productVariantId: string, quantity: number): Promise<CartUpdateResponse> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const token = await user.getIdToken();
      const items = [{
        product_variant_id: productVariantId,
        quantity
      }];
      
      const response = await shopifyClient.updateCart(token, items);
      
      console.log("Cart mutated:", response);
      return response;
    } catch (error) {
      console.error("Error mutating cart:", error);
      throw error;
    }
  }
};
