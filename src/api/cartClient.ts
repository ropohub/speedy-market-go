
import { CartServiceClient } from "../../protogen/api/common/proto/cartservice/Cart_serviceServiceClientPb";
import {
  GetCartItemsRequest,
  MutateCartRequest,
  ItemWithQuantity,
  GetCartItemsResponse,
  MutateCartResponse
} from "../../protogen/api/common/proto/cartservice/cart_service_pb";

// The full endpoint for gRPC-Web:
const CART_GRPC_URL = "https://grpcweb-851631422269.asia-south2.run.app";

// Initialize the CartServiceClient
export const cartServiceClient = new CartServiceClient(CART_GRPC_URL, null, null);

// Example: Fetch all items in the cart
export async function getCartItems(): Promise<GetCartItemsResponse.AsObject> {
  const request = new GetCartItemsRequest();
  const response = await cartServiceClient.getCartItems(request, {});
  // Convert protobuf message to plain object for React usage
  return response.toObject();
}

// Example: Mutate (add/update/remove) a cart item
export async function mutateCartItem(productVariantId: number, quantity: number): Promise<MutateCartResponse.AsObject> {
  const request = new MutateCartRequest();
  const item = new ItemWithQuantity();
  item.setProductVariantId(productVariantId);
  item.setQuantity(quantity);
  request.setItem(item);
  const response = await cartServiceClient.mutateCart(request, {});
  return response.toObject();
}

/**
 * Usage:
 *  import { getCartItems, mutateCartItem } from "@/api/cartClient";
 *  const cart = await getCartItems(); // { header, itemsWithQuantityList }
 *  await mutateCartItem(12345, 2); // set variant 12345 to quantity 2
 */
