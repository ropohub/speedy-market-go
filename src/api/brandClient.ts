
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { BrandServiceClient } from "../../protogen/api/common/proto/brandservice/brand_service.client";
import { GetBrandRequest } from "../../protogen/api/common/proto/brandservice/brand_service";

// Create transport with the provided host and port
const transport = new GrpcWebFetchTransport({
  baseUrl: "https://grpcweb-851631422269.asia-south2.run.app:443",
  format: "binary"
});

// Create the brand service client
const brandClient = new BrandServiceClient(transport);

export const brandService = {
  // Fetch all brands
  async getBrands() {
    try {
      const request = GetBrandRequest.create({});
      const response = await brandClient.getBrand(request);
      
      console.log("Brands fetched:", response.response);
      return response.response.brands;
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  }
};
