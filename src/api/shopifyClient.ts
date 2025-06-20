
interface LoginResponse {
  shopify_customer_id: string;
}

interface LoginError {
  error: string;
}

interface CartItem {
  product_variant_id: string;
  quantity: number;
}

interface CartUpdateRequest {
  items: CartItem[];
}

interface CartUpdateResponse {
  draft_order_id: string;
  status: string;
}

interface CartGetResponse {
  items: CartItem[];
  status: string;
}

class ShopifyApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async login(firebaseToken: string): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${firebaseToken}`
      }
    });

    if (!response.ok) {
      const errorData: LoginError = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    return response.json();
  }

  async updateCart(firebaseToken: string, items: CartItem[]): Promise<CartUpdateResponse> {
    const response = await fetch(`${this.baseUrl}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${firebaseToken}`
      },
      body: JSON.stringify({ items })
    });

    if (!response.ok) {
      const errorData: LoginError = await response.json();
      throw new Error(errorData.error || 'Cart update failed');
    }

    return response.json();
  }

  async getCart(firebaseToken: string): Promise<CartGetResponse> {
    const response = await fetch(`${this.baseUrl}/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${firebaseToken}`
      }
    });

    if (!response.ok) {
      const errorData: LoginError = await response.json();
      throw new Error(errorData.error || 'Cart fetch failed');
    }

    return response.json();
  }
}

// Updated to use import.meta.env instead of process.env for Vite
const SHOPIFY_API_BASE_URL = import.meta.env.VITE_SHOPIFY_API_URL || 'https://shopifyapi-851631422269.asia-south2.run.app';

export const shopifyClient = new ShopifyApiClient(SHOPIFY_API_BASE_URL);
