
export interface ProductVariant {
  product_variant_id: number;
  name: string;
  description: string;
  image_url: string;
  color_id: number;
  color_name: string;
  size_id: number;
  size_name: string;
  mrp_micros: number;
}

export interface Store {
  primary_key: {
    store_id: number;
  };
  image_urls: string;
  name: string;
  address: {
    full_address: string;
    latitude: number;
    longitude: number;
    postal_code: string;
    city: string;
  };
  distance_in_meters: number;
  time_in_millis: number;
}

export interface ApiProduct {
  primary_key: {
    product_id: number;
  };
  brand_id: number;
  brand_name: string;
  min_discounted_price_product_variant: {
    product_variant: ProductVariant;
    store_with_best_price: Store;
    discounted_price_micros: number;
  };
}

export interface ApiResponse {
  products: ApiProduct[];
}

// Transformed product interface for UI components
export interface Product {
  id: number;
  images: string[];
  colorVariants: ColorVariant[];
  brandName: string;
  productName: string;
  mrp: number;
  discountedPrice: number;
}

export interface ColorVariant {
  color: string;
  image: string;
}
