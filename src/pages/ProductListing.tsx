import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';
import FilterBar from '../components/FilterBar';
import ProductGrid from '../components/ProductGrid';

const SHOPIFY_STOREFRONT_ACCESS_TOKEN = '50b756b36c591cc2d86ea31b1eceace5';
const SHOPIFY_API_URL = 'https://dripzyy.com/api/2024-04/graphql.json';

const getProductsQuery = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
          handle
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
  }
`;

interface ShopifyImage {
  url: string;
  altText: string | null;
}

interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

interface ShopifyProductNode {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  priceRange: {
    minVariantPrice: ShopifyPrice;
  };
  images: {
    edges: { node: ShopifyImage }[];
  };
}

interface ShopifyProductEdge {
  cursor: string;
  node: ShopifyProductNode;
}

interface ShopifyResponse {
  data: {
    products: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
      edges: ShopifyProductEdge[];
    };
  };
}

const fetchProductsFromShopify = async ({ pageParam = null }: { pageParam?: string | null }) => {
  const response = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: getProductsQuery,
      variables: {
        first: 10,
        after: pageParam,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Shopify API Error:", errorBody);
    throw new Error('Failed to fetch products from Shopify.');
  }

  const json: ShopifyResponse = await response.json();
  if (json.data?.products) {
      return json.data.products;
  }
  
  console.error("Unexpected Shopify API response structure:", json);
  throw new Error("Unexpected response structure from Shopify");
};

const ProductListPage = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['shopifyProducts'],
    queryFn: fetchProductsFromShopify,
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined;
    },
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '0px', // Trigger fetch only when element is in view
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const products = data?.pages.flatMap(page => page.edges.map(edge => {
    const { node } = edge;
    return {
      id: node.id,
      name: node.title,
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      image: node.images.edges[0]?.node.url || '/placeholder.svg',
      brand: node.vendor,
    };
  })) ?? [];

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NavigationBar />
      <FilterBar />
      <ProductGrid products={products} isLoading={isLoading && products.length === 0} />
      
      {/* This invisible div will trigger loading more products */}
      <div ref={loadMoreRef} />

      <div className="flex justify-center py-8">
        {isFetchingNextPage && (
          <p>Loading more...</p>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
