
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';
import { Skeleton } from '../components/ui/skeleton';

const SHOPIFY_STOREFRONT_ACCESS_TOKEN = '50b756b36c591cc2d86ea31b1eceace5';
const SHOPIFY_API_URL = 'https://dripzyy.com/api/2024-04/graphql.json';

const searchProductsQuery = `
  query SearchProducts($searchQuery: String!) {
    search(query: $searchQuery, first: 20, types: [PRODUCT]) {
      edges {
        node {
          ... on Product {
            id
            title
            handle
            description
            vendor
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

interface ShopifySearchResponse {
  data: {
    search: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          handle: string;
          description: string;
          vendor: string;
          priceRange: {
            minVariantPrice: {
              amount: string;
              currencyCode: string;
            };
          };
          images: {
            edges: Array<{
              node: {
                url: string;
                altText: string;
              };
            }>;
          };
        };
      }>;
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    };
  };
}

const fetchSearchResults = async (searchQuery: string) => {
  const response = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: searchProductsQuery,
      variables: {
        searchQuery,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }

  const json: ShopifySearchResponse = await response.json();
  return json.data.search;
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('q') || '';

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['searchResults', searchQuery],
    queryFn: () => fetchSearchResults(searchQuery),
    enabled: !!searchQuery,
  });

  const products = searchResults?.edges.map(edge => ({
    id: edge.node.id,
    name: edge.node.title,
    price: parseFloat(edge.node.priceRange.minVariantPrice.amount),
    image: edge.node.images.edges[0]?.node.url || '/placeholder.svg',
    brand: edge.node.vendor,
  })) || [];

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <header className="flex items-center p-4 border-b">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-medium">Search Results</h1>
        </header>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-red-500">Error loading search results. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center p-4 border-b bg-white">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">Search Results</h1>
      </header>

      {/* Search Bar with black background */}
      <div className="bg-black">
        <SearchBar />
      </div>

      {/* Results with white background */}
      <div className="p-4 bg-white">
        {searchQuery && (
          <div className="mb-4">
            <p className="text-gray-600">
              {isLoading ? 'Searching...' : `Results for "${searchQuery}"`}
              {!isLoading && ` (${products.length} items found)`}
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Skeleton className="aspect-[3/4] w-full" />
                <div className="p-3">
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-3 w-32 mb-2" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : searchQuery ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found for "{searchQuery}"</p>
            <p className="text-gray-400 mt-2">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">Enter a search term to find products</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
