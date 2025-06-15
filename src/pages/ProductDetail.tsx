import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ShoppingCart, Heart, Share } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';
import { Button } from '../components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SHOPIFY_STOREFRONT_ACCESS_TOKEN = '50b756b36c591cc2d86ea31b1eceace5';
const SHOPIFY_API_URL = 'https://dripzyy.com/api/2024-04/graphql.json';

const getProductByIdQuery = `
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      title
      descriptionHtml
      vendor
      options {
        id
        name
        values
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

// Interfaces for Shopify data
interface ShopifyImageNode {
  url: string;
  altText: string | null;
}

interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

interface ShopifyVariantNode {
  id: string;
  title: string;
  price: ShopifyPrice;
  image: ShopifyImageNode | null;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

interface ShopifyProduct {
  id: string;
  title: string;
  descriptionHtml: string;
  vendor: string;
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
  images: { edges: { node: ShopifyImageNode }[] };
  variants: { edges: { node: ShopifyVariantNode }[] };
}

const fetchProductFromShopify = async (productId: string): Promise<ShopifyProduct> => {
  const fullProductId = `gid://shopify/Product/${productId}`;
  const response = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: getProductByIdQuery,
      variables: { id: fullProductId },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Shopify API Error:", errorBody);
    throw new Error('Failed to fetch product from Shopify.');
  }

  const json = await response.json();
  if (json.data?.product) {
    return json.data.product;
  }

  console.error("Unexpected Shopify API response structure:", json);
  throw new Error("Unexpected response structure from Shopify.");
};

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: product, isLoading, error } = useQuery<ShopifyProduct, Error>({
    queryKey: ['shopifyProduct', productId],
    queryFn: () => fetchProductFromShopify(productId!),
    enabled: !!productId,
  });

  const colorOption = useMemo(() => product?.options.find(opt => opt.name.toLowerCase() === 'color'), [product]);
  const sizeOption = useMemo(() => product?.options.find(opt => opt.name.toLowerCase() === 'size'), [product]);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [sizeValidationShake, setSizeValidationShake] = useState(false);

  useEffect(() => {
    if (colorOption?.values.length && !selectedColor) {
      setSelectedColor(colorOption.values[0]);
    }
  }, [colorOption, selectedColor]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(''); // Reset size selection when color changes
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setSizeValidationShake(false);
  };

  const handleBack = () => {
    navigate('/products');
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: `Check out this product from ${product?.vendor}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Product link copied to clipboard.",
      });
    }
  };

  const handleAddToBag = () => {
    if (sizeOption && !selectedSize) {
      setSizeValidationShake(true);
      toast({
        title: "Size Required",
        description: "Please select a size before adding to bag",
        variant: "destructive",
      });
      setTimeout(() => setSizeValidationShake(false), 600);
      return;
    }

    toast({
      title: "Added to Bag",
      description: `${product?.title} (Size: ${selectedSize}) added to your bag`,
    });

    console.log('Adding to bag:', {
      productId: product?.id,
      variantId: selectedVariant?.id,
      color: selectedColor,
      size: selectedSize,
    });
  };

  const availableSizes = useMemo(() => {
    if (!sizeOption) return [];
    if (!colorOption || !selectedColor) {
      const allSizes = product?.variants.edges.map(edge =>
        edge.node.selectedOptions.find(opt => opt.name === sizeOption.name)?.value
      );
      return [...new Set(allSizes)].filter(Boolean) as string[];
    }

    const sizesForColor = product?.variants.edges
      .filter(edge =>
        edge.node.selectedOptions.some(opt => opt.name === colorOption.name && opt.value === selectedColor)
      )
      .map(edge =>
        edge.node.selectedOptions.find(opt => opt.name === sizeOption.name)?.value
      );

    return [...new Set(sizesForColor)].filter(Boolean) as string[];
  }, [product, selectedColor, colorOption, sizeOption]);

  const selectedVariant = useMemo(() => {
    if (!product) return null;
    
    return product.variants.edges.find(edge => {
      const { node } = edge;
      const options = node.selectedOptions;

      const colorMatch = !colorOption || options.some(opt => opt.name === colorOption.name && opt.value === selectedColor);
      const sizeMatch = !sizeOption || options.some(opt => opt.name === sizeOption.name && opt.value === selectedSize);

      if (sizeOption && !selectedSize) return false;

      if (colorOption && sizeOption) {
        return options.some(o => o.name === colorOption.name && o.value === selectedColor) &&
               options.some(o => o.name === sizeOption.name && o.value === selectedSize);
      }
      return colorMatch && sizeMatch;

    })?.node;
  }, [product, selectedColor, selectedSize, colorOption, sizeOption]);

  const getColorImage = (colorValue: string) => {
    if (!product || !colorOption) return '/placeholder.svg';
    const variantWithColor = product.variants.edges.find(edge => 
        edge.node.selectedOptions.some(opt => opt.name === colorOption.name && opt.value === colorValue) && edge.node.image
    );
    return variantWithColor?.node.image?.url || product.images.edges[0]?.node.url || '/placeholder.svg';
  }

  const currentImages = useMemo(() => {
    if (!selectedColor || !product) {
      return product?.images.edges.map(e => e.node.url) ?? [];
    }

    const allProductImages = product.images.edges.map(e => e.node);

    // 1. Get images from product.images with alt text matching selectedColor
    const imagesByAltText = allProductImages.filter(
      img => img.altText?.toLowerCase() === selectedColor.toLowerCase()
    );

    // 2. Get images from variants that match the selectedColor
    const variantImages = product.variants.edges
      .filter(edge =>
        edge.node.selectedOptions.some(
          opt =>
            opt.name.toLowerCase() === 'color' &&
            opt.value.toLowerCase() === selectedColor.toLowerCase()
        ) && edge.node.image
      )
      .map(edge => edge.node.image!);

    // Combine and deduplicate
    const combined = [...imagesByAltText, ...variantImages];
    const uniqueImageUrls = [...new Set(combined.map(img => img.url))];

    if (uniqueImageUrls.length > 0) {
      return uniqueImageUrls;
    }

    // Fallback: if no specific images found for the color, show all product images
    return allProductImages.map(img => img.url);
  }, [product, selectedColor]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-500">Error: {error.message}</p>
        </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <Button onClick={handleBack} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  
  const price = selectedVariant?.price.amount || product.variants.edges[0]?.node.price.amount;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium truncate max-w-[60vw]">{product.title}</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/cart')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </header>
  
      {/* Product Image Carousel */}
      <div className="relative">
        <ImageCarousel images={currentImages} autoPlay={true} />
        
        {/* Floating Action Buttons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-3">
          <button
            onClick={toggleWishlist}
            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart
              size={20}
              className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
            />
          </button>
          <button
            onClick={handleShare}
            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            aria-label="Share product"
          >
            <Share size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
  
      {/* Product Information */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {product.vendor}
        </h2>
        
        <p className="text-gray-600 text-sm mb-4">
          {product.title}
        </p>
  
        {product.descriptionHtml && (
          <div 
            className="text-gray-600 text-sm mb-4 prose"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        )}
  
        {/* Color Variants */}
        {colorOption && colorOption.values.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Colors Available</h3>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide p-1">
              {colorOption.values.map((color, index) => (
                <div
                  key={index}
                  className="text-center cursor-pointer flex-shrink-0"
                  onClick={() => handleColorChange(color)}
                >
                  <div className={`w-14 h-18 rounded-lg overflow-hidden border-2 mb-2 transition-all duration-200 ${
                    selectedColor === color ? 'border-black scale-105' : 'border-gray-200 hover:border-gray-400'
                  }`}>
                    <img
                      src={getColorImage(color)}
                      alt={color}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[11px] text-gray-600 max-w-14 truncate">
                    {color}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
  
        {/* Size Selection */}
        {sizeOption && availableSizes.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              {!selectedSize && (
                <span className="text-xs text-orange-600 animate-pulse">
                  Please select a size
                </span>
              )}
            </div>
            <div className={`flex gap-3 overflow-x-auto scrollbar-hide p-1 transition-all duration-300 ${
              sizeValidationShake ? 'animate-bounce' : ''
            }`}>
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-all duration-200 flex-shrink-0 ${
                    selectedSize === size
                      ? 'border-black bg-black text-white scale-105' 
                      : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400 hover:scale-105'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
  
      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-lg font-bold text-gray-900">
              ₹{price}
            </span>
          </div>
          <p className="text-xs text-gray-500">(Incl. Of All Taxes)</p>
        </div>
        <Button 
          onClick={handleAddToBag}
          className={`px-8 py-3 text-base font-medium transition-all duration-200 ${
            (!sizeOption || selectedSize)
              ? 'bg-black text-white hover:bg-gray-800 hover:scale-105' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
          }`}
          size="lg"
          disabled={!!sizeOption && !selectedSize}
        >
          ADD TO BAG
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
