
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { CartServiceClient } from "../../protogen/api/common/proto/cartservice/cart_service.client";
import { GetCartItemsRequest, MutateCartRequest, ItemWithQuantity } from "../../protogen/api/common/proto/cartservice/cart_service";

// Create transport with base URL (you'll need to configure this for your backend)
const transport = new GrpcWebFetchTransport({
  baseUrl: "http://localhost:8080", // Replace with your actual backend URL
  format: "binary"
});

// Create the cart service client
const cartClient = new CartServiceClient(transport);

// Helper function to get authorization headers
const getAuthHeaders = () => {
  // Using dummy authorization for now
  return {
    "authorization": "Bearer dummy-jwt-token",
    "user-id": "dummy-user-123"
  };
};

export const cartService = {
  // Fetch cart items
  async getCartItems() {
    try {
      const request = GetCartItemsRequest.create({});
      const response = await cartClient.getCartItems(request, {
        meta: getAuthHeaders()
      });
      
      console.log("Cart items fetched:", response.response);
      return response.response;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw error;
    }
  },

  // Add or update cart item
  async mutateCart(productVariantId: bigint, quantity: number) {
    try {
      const item = ItemWithQuantity.create({
        productVariantId,
        quantity
      });
      
      const request = MutateCartRequest.create({ item });
      const response = await cartClient.mutateCart(request, {
        meta: getAuthHeaders()
      });
      
      console.log("Cart mutated:", response.response);
      return response.response;
    } catch (error) {
      console.error("Error mutating cart:", error);
      throw error;
    }
  }
};
