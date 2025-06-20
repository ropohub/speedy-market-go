
interface LoginResponse {
  shopify_customer_id: string;
}

interface LoginError {
  error: string;
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
}

// You'll need to replace this with your actual backend URL
const SHOPIFY_API_BASE_URL = process.env.VITE_SHOPIFY_API_URL || 'http://localhost:8080';

export const shopifyClient = new ShopifyApiClient(SHOPIFY_API_BASE_URL);
