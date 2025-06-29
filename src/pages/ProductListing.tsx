import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import CategoryHeader from '../components/category/CategoryHeader';
import NavigationBar from '../components/NavigationBar';
import ProductGrid from '../components/ProductGrid';
import { useFilter } from '../contexts/FilterContext';
import FilterChips from '../components/FilterChips';

const SHOPIFY_STOREFRONT_ACCESS_TOKEN = '50b756b36c591cc2d86ea31b1eceace5';
const SHOPIFY_API_URL = 'https://sycfx9-af.myshopify.com/api/2025-04/graphql.json';

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

const getCollectionProductsQuery = `
  query GetCollectionProducts($handle: String!, $first: Int!, $after: String) {
    collectionByHandle(handle: $handle) {
      id
      title
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
  }
`;

const searchProductsQuery = `
  query SearchProducts($searchQuery: String!, $first: Int!, $after: String) {
    search(query: $searchQuery, first: $first, after: $after, types: [PRODUCT]) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ... on Product {
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
  }
`;

const getProductsByTagQuery = `
  query GetProductsByTag($tagQuery: String!, $first: Int!, $after: String) {
    search(query: $tagQuery, first: $first, after: $after, types: [PRODUCT]) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ... on Product {
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

interface ShopifyCollectionResponse {
  data: {
    collectionByHandle: {
      id: string;
      title: string;
      products: {
        pageInfo: {
          hasNextPage: boolean;
          endCursor: string | null;
        };
        edges: ShopifyProductEdge[];
      };
    } | null;
  };
}

const fetchProductsFromShopify = async ({ pageParam = null }: { pageParam?: string | null }) => {
  console.log('Fetching all products from Shopify...');
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

const fetchCollectionProductsFromShopify = async ({ 
  pageParam = null, 
  collectionHandle 
}: { 
  pageParam?: string | null;
  collectionHandle: string;
}) => {
  console.log(`Fetching products from collection: "${collectionHandle}"`);
  const response = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: getCollectionProductsQuery,
      variables: {
        handle: collectionHandle,
        first: 10,
        after: pageParam,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Shopify Collection API Error:", errorBody);
    throw new Error('Failed to fetch collection products from Shopify.');
  }

  const json: ShopifyCollectionResponse = await response.json();
  console.log('Collection API Response:', json);
  
  if (json.data?.collectionByHandle?.products) {
      console.log(`Found ${json.data.collectionByHandle.products.edges.length} products in collection`);
      return json.data.collectionByHandle.products;
  }
  
  if (json.data?.collectionByHandle === null) {
    console.error(`Collection "${collectionHandle}" not found in Shopify`);
    throw new Error(`Collection "${collectionHandle}" not found`);
  }
  
  console.error("Unexpected Shopify Collection API response structure:", json);
  throw new Error("Unexpected response structure from Shopify");
};

const fetchSearchResults = async ({ 
  pageParam = null, 
  searchQuery 
}: { 
  pageParam?: string | null;
  searchQuery: string;
}) => {
  console.log(`Searching for: "${searchQuery}"`);
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
        first: 10,
        after: pageParam,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Shopify Search API Error:", errorBody);
    throw new Error('Failed to search products from Shopify.');
  }

  const json = await response.json();
  console.log('Search API Response:', json);
  
  if (json.data?.search) {
      console.log(`Found ${json.data.search.edges.length} products for search`);
      return json.data.search;
  }
  
  console.error("Unexpected Shopify Search API response structure:", json);
  throw new Error("Unexpected response structure from Shopify");
};

const fetchProductsByTag = async ({ 
  pageParam = null, 
  tag 
}: { 
  pageParam?: string | null;
  tag: string;
}) => {
  console.log(`Searching for products with tag: "${tag}"`);
  const tagQuery = `tag:${tag}`;
  
  const response = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: getProductsByTagQuery,
      variables: {
        tagQuery,
        first: 10,
        after: pageParam,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Shopify Tag Search API Error:", errorBody);
    throw new Error('Failed to search products by tag from Shopify.');
  }

  const json = await response.json();
  console.log('Tag Search API Response:', json);
  
  if (json.data?.search) {
      console.log(`Found ${json.data.search.edges.length} products for tag "${tag}"`);
      return json.data.search;
  }
  
  console.error("Unexpected Shopify Tag Search API response structure:", json);
  throw new Error("Unexpected response structure from Shopify");
};

const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const { selectedFilters, setFilters, getSearchQuery, clearFilters } = useFilter();
  
  const collection = searchParams.get('collection');
  const searchQuery = searchParams.get('search');
  const tag = searchParams.get('tag');
  
  console.log('ProductListPage - Collection parameter:', collection);
  console.log('ProductListPage - Search parameter:', searchQuery);
  console.log('ProductListPage - Tag parameter:', tag);
  console.log('ProductListPage - Selected filters:', selectedFilters);

  // Initialize filters based on URL parameters
  useEffect(() => {
    if (tag && selectedFilters.length === 0) {
      // Map tag to filter option
      const tagToFilterMap: { [key: string]: any } = {
        "Women's Wear": { id: 'women', label: 'Women', tag: "Women's Wear", category: 'gender' },
        "Men's Wear": { id: 'men', label: 'Men', tag: "Men's Wear", category: 'gender' },
        "Sports Wear": { id: 'sports-wear', label: 'Sports', tag: "Sports Wear", category: 'style' },
        "Tank Tops": { id: 'tank-tops', label: 'Tank Tops', tag: 'Tank Tops', category: 'type' },
        "Crop Tops": { id: 'crop-tops', label: 'Crop Tops', tag: 'Crop Tops', category: 'type' },
        "Dresses": { id: 'dresses', label: 'Dresses', tag: 'Dresses', category: 'category' },
        "T-Shirts": { id: 't-shirts', label: 'T-Shirts', tag: 'T-Shirts', category: 'type' },
        "Jeans": { id: 'jeans', label: 'Jeans', tag: 'Jeans', category: 'category' },
      };
      
      const filterOption = tagToFilterMap[tag];
      if (filterOption) {
        setFilters([filterOption]);
      }
    }
  }, [tag, selectedFilters.length, setFilters]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getQueryFn = () => {
    const filterQuery = getSearchQuery();
    
    if (filterQuery) {
      return ({ pageParam }: { pageParam?: string | null }) => 
        fetchSearchResults({ pageParam, searchQuery: filterQuery });
    } else if (searchQuery) {
      return ({ pageParam }: { pageParam?: string | null }) => 
        fetchSearchResults({ pageParam, searchQuery });
    } else if (tag) {
      return ({ pageParam }: { pageParam?: string | null }) => 
        fetchProductsByTag({ pageParam, tag });
    } else if (collection) {
      return ({ pageParam }: { pageParam?: string | null }) => 
        fetchCollectionProductsFromShopify({ pageParam, collectionHandle: collection });
    } else {
      return fetchProductsFromShopify;
    }
  };

  const getQueryKey = () => {
    const filterQuery = getSearchQuery();
    
    if (filterQuery) {
      return ['shopifyFilteredProducts', filterQuery];
    } else if (searchQuery) {
      return ['shopifySearchResults', searchQuery];
    } else if (tag) {
      return ['shopifyProductsByTag', tag];
    } else if (collection) {
      return ['shopifyCollectionProducts', collection];
    } else {
      return ['shopifyProducts'];
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: getQueryKey(),
    queryFn: getQueryFn(),
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
        rootMargin: '0px',
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

  console.log('ProductListPage - Products count:', products.length);

  // Determine the header title based on filters, search, tag, collection, or default
  const getHeaderTitle = () => {
    if (selectedFilters.length > 0) {
      return selectedFilters.map(f => f.label).join(' + ');
    } else if (searchQuery) {
      return `Search: ${searchQuery}`;
    } else if (tag) {
      return tag.replace("'s Wear", "").replace(" Wear", "");
    } else if (collection) {
      return collection.charAt(0).toUpperCase() + collection.slice(1).replace(/-/g, ' ');
    }
    return 'Products';
  };

  if (error) {
    console.error('ProductListPage - Error:', error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error: {error.message}</p>
          {collection && (
            <p className="text-gray-600">Collection: {collection}</p>
          )}
          {searchQuery && (
            <p className="text-gray-600">Search: {searchQuery}</p>
          )}
          {tag && (
            <p className="text-gray-600">Tag: {tag}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 100%)'}}>
      <CategoryHeader title={getHeaderTitle()} />
      <div className="pt-16">
        <NavigationBar />
        <FilterChips />
        <div className="mt-4">
          {((searchQuery || tag || selectedFilters.length > 0) && products.length === 0 && !isLoading) ? (
            <div className="text-center py-16 px-4">
              <p className="text-gray-500 text-lg">
                No products found for the selected filters
              </p>
              <p className="text-gray-400 mt-2">
                Try adjusting your filters or browse other categories
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <ProductGrid products={products} isLoading={isLoading && products.length === 0} />
          )}
          
          {/* This invisible div will trigger loading more products */}
          <div ref={loadMoreRef} />

          <div className="flex justify-center py-8">
            {isFetchingNextPage && (
              <p>Loading more...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
