import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { ProductServiceClient } from "../../protogen/api/common/proto/productservice/product_service.client";
import { GetCategorySetRequest } from "../../protogen/api/common/proto/productservice/product_service";
import { brandService } from "./brandClient";

// Create transport with the provided host and port
const transport = new GrpcWebFetchTransport({
  baseUrl: "https://grpcweb-851631422269.asia-south2.run.app:443",
  format: "binary"
});

// Create the product service client
const productServiceClient = new ProductServiceClient(transport);

export const tagService = {
  // Fetch all tags (categories and brands)
  async getTags() {
    try {
      // Fetch categories
      const request = GetCategorySetRequest.create({});
      const response = await productServiceClient.getCategorySet(request);
      const categorySet = (await response.response).categorySet;
      const categoryTags: Set<string> = new Set();
      if (categorySet) {
        // Flatten all categories and subcategories into a flat set of unique names
        const collectCategories = (categories) => {
          categories.forEach(cat => {
            categoryTags.add(cat.name);
            if (cat.subcategories) collectCategories(cat.subcategories);
          });
        };
        collectCategories(categorySet.categories);
      }
      // Fetch brands
      const brands = await brandService.getBrands();
      console.log("Brands fetched:", brands);
      const brandTags = brands.map(brand => brand.name);
      console.log("Brand tags:", brandTags);
      // Combine and deduplicate
      return Array.from(new Set([...categoryTags, ...brandTags]));
    } catch (error) {
      console.error("Error fetching tags (categories + brands):", error);
      throw error;
    }
  }
}; 