import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const SHOPIFY_STOREFRONT_ACCESS_TOKEN = '50b756b36c591cc2d86ea31b1eceace5';
const SHOPIFY_API_URL = 'https://sycfx9-af.myshopify.com/api/2025-04/graphql.json';

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

interface ShopifyProductNode {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: { node: ShopifyImage }[];
  };
}

interface ShopifyProductEdge {
  cursor: string;
  node: ShopifyProductNode;
}

interface ShopifyTagSearchResponse {
  data: {
    search: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
      edges: ShopifyProductEdge[];
    };
  };
}

interface ProductYouCantMissProps {
  category: string;
}

const fetchProductsByTag = async (tag: string): Promise<ShopifyProductNode[]> => {
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
        after: null,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products by tag: ' + tag);
  }

  const json: ShopifyTagSearchResponse = await response.json();
  return json.data?.search?.edges?.map(edge => edge.node) || [];
};

const ProductYouCantMiss: React.FC<ProductYouCantMissProps> = () => {
  const [products, setProducts] = useState<ShopifyProductNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetchProductsByTag('women'),
      fetchProductsByTag('dresses')
    ])
      .then(([womenProducts, dressesProducts]) => {
        // Merge and deduplicate by id
        const all = [...womenProducts, ...dressesProducts];
        const unique = Array.from(new Map(all.map(p => [p.id, p])).values());
        setProducts(unique);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-white">Loading products you can't miss...</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div 
      className="relative py-8 overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      {/* Content container */}
      <div className="relative z-10 px-4 max-w-md mx-auto">
        {/* Section heading - above the products */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white leading-tight drop-shadow-lg">
            Products You Can't Miss
          </h2>
        </div>
        {/* Horizontally scrollable products - below the heading */}
        <div className="overflow-hidden">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {products.map((product, index) => (
              <div key={product.id} className="flex-shrink-0 w-32">
                <ProductCard 
                  product={{
                    id: product.id,
                    name: product.title,
                    price: parseFloat(product.priceRange.minVariantPrice.amount),
                    image: product.images.edges[0]?.node.url || '/placeholder.svg',
                    brand: product.vendor
                  }}
                  onAddToCart={() => console.log('Added to cart:', product)}
                  showHeartIcon={false}
                  itemNumber={index + 1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductYouCantMiss;
