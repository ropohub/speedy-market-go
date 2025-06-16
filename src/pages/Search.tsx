
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, ArrowLeft, X } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { Input } from '../components/ui/input';
import { useQuery } from '@tanstack/react-query';

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  images: { edges: Array<{ node: { url: string; altText?: string } }> };
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  vendor: string;
  compareAtPriceRange?: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
}

interface ProductForCard {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
}

const searchProducts = async (query: string): Promise<ShopifyProduct[]> => {
  if (!query.trim()) return [];
  
  // Mock Shopify GraphQL query - replace with actual Shopify endpoint
  const shopifyQuery = `
    query searchProducts($query: String!) {
      products(first: 20, query: $query) {
        edges {
          node {
            id
            title
            handle
            vendor
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    // Replace with your actual Shopify store URL and access token
    const response = await fetch('https://your-store.myshopify.com/api/2023-10/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': 'your-access-token',
      },
      body: JSON.stringify({
        query: shopifyQuery,
        variables: { query },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.data.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error('Error searching products:', error);
    // Return mock data for demo purposes
    return [
      {
        id: 'mock-1',
        title: `Search result for "${query}" - Premium T-Shirt`,
        handle: 'premium-tshirt',
        vendor: 'Premium Brand',
        images: { edges: [{ node: { url: '/lovable-uploads/23d4e45a-a048-46a7-ab7c-1d0ab7f2fa4f.png' } }] },
        priceRange: { minVariantPrice: { amount: '29.99', currencyCode: 'USD' } },
        compareAtPriceRange: { minVariantPrice: { amount: '39.99', currencyCode: 'USD' } }
      },
      {
        id: 'mock-2',
        title: `${query} Collection Dress`,
        handle: 'collection-dress',
        vendor: 'Fashion House',
        images: { edges: [{ node: { url: '/lovable-uploads/246f14f4-74b7-411d-b4ac-768990da7c85.png' } }] },
        priceRange: { minVariantPrice: { amount: '59.99', currencyCode: 'USD' } }
      }
    ];
  }
};

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update URL params when search query changes
  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams]);

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['searchProducts', debouncedQuery],
    queryFn: () => searchProducts(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  const transformedProducts: ProductForCard[] = products.map((product: ShopifyProduct) => ({
    id: product.id,
    name: product.title,
    price: parseFloat(product.priceRange.minVariantPrice.amount),
    originalPrice: product.compareAtPriceRange 
      ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
      : undefined,
    image: product.images.edges[0]?.node.url || '/placeholder.svg',
    brand: product.vendor,
  }));

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-2 w-full border-gray-300 focus:border-pink-500 focus:ring-pink-500"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Search Results */}
      <main className="pb-20">
        {!searchQuery && (
          <div className="text-center py-20">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Search for products</h2>
            <p className="text-gray-500">Start typing to see results</p>
          </div>
        )}

        {searchQuery && (
          <div className="px-4 py-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {isLoading ? 'Searching...' : `Results for "${searchQuery}"`}
              </h2>
              {!isLoading && products.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  {products.length} product{products.length !== 1 ? 's' : ''} found
                </p>
              )}
            </div>

            {error && (
              <div className="text-center py-8">
                <p className="text-red-600">Failed to search products. Please try again.</p>
              </div>
            )}

            {!isLoading && !error && products.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try searching with different keywords</p>
              </div>
            )}

            {transformedProducts.length > 0 && (
              <ProductGrid 
                products={transformedProducts}
                isLoading={isLoading}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
