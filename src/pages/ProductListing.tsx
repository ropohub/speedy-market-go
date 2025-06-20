import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import FilterSidebar from '../components/FilterSidebar';
import { shopifyClient } from '../api/shopifyClient';
import { Slider } from "@/components/ui/slider"

interface LegacyProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  originalPrice?: number;
}

interface CartItem extends LegacyProduct {
  selectedSize?: string;
  quantity: number;
}

const PRODUCTS_PER_PAGE = 24;

const ProductListing: React.FC = () => {
  const { category, subcategory, collection } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const page = searchParams.get('page');
    if (page) {
      setCurrentPage(parseInt(page, 10));
    } else {
      setCurrentPage(1);
    }
  }, [searchParams]);

  const handleAddToCart = (product: LegacyProduct) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => item.id === product.id ? {
        ...item,
        quantity: item.quantity + 1
      } : item));
    } else {
      const newCartItem: CartItem = {
        ...product,
        selectedSize: 'M',
        quantity: 1
      };
      setCartItems([...cartItems, newCartItem]);
    }
    console.log('Added to cart:', product);
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map(item => item.id === id ? {
      ...item,
      quantity
    } : item));
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    navigate(`?${newParams.toString()}`, { replace: true });
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
  };

  const handlePriceChange = (newPriceRange: number[]) => {
    setPriceRange({ min: newPriceRange[0], max: newPriceRange[1] });
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedBrands([]);
    setPriceRange({ min: 0, max: 10000 });
    setSortBy('');
    setCurrentPage(1);
    navigate(location.pathname);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products', category, subcategory, collection, currentPage, sortBy, priceRange, selectedBrands],
    queryFn: async () => {
      console.log('Fetching products with params:', { category, subcategory, collection, currentPage, sortBy, priceRange, selectedBrands });
      
      let query = '';
      
      // Handle collection-based queries
      if (collection) {
        query = `collection:${collection}`;
      } else if (category && subcategory) {
        // Handle category-based queries
        if (category === 'women' && subcategory === 'all') {
          query = 'product_type:*';
        } else {
          query = `product_type:${subcategory}`;
        }
      }

      // Add brand filters
      if (selectedBrands.length > 0) {
        const brandQuery = selectedBrands.map(brand => `vendor:${brand}`).join(' OR ');
        query = query ? `${query} AND (${brandQuery})` : `(${brandQuery})`;
      }

      // Add price filters
      if (priceRange.min > 0 || priceRange.max < 10000) {
        const priceQuery = `variants.price:>=${priceRange.min} AND variants.price:<=${priceRange.max}`;
        query = query ? `${query} AND ${priceQuery}` : priceQuery;
      }

      return shopifyClient.getProducts({
        query: query || undefined,
        first: PRODUCTS_PER_PAGE,
        after: currentPage > 1 ? btoa(`arrayconnection:${(currentPage - 1) * PRODUCTS_PER_PAGE - 1}`) : undefined,
        sortKey: sortBy === 'price_asc' ? 'PRICE' : sortBy === 'price_desc' ? 'PRICE' : 'RELEVANCE',
        reverse: sortBy === 'price_desc'
      });
    },
    staleTime: 5 * 60 * 1000,
  });

  const getPageTitle = () => {
    if (collection) {
      return collection.charAt(0).toUpperCase() + collection.slice(1);
    }
    if (category && subcategory) {
      if (subcategory === 'all') {
        return `All ${category.charAt(0).toUpperCase() + category.slice(1)}`;
      }
      return subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
    }
    return 'Products';
  };

  const getBreadcrumbs = () => {
    const crumbs = [{ label: 'Home', path: '/' }];
    
    if (collection) {
      crumbs.push({ label: 'Collections', path: '/categories' });
      crumbs.push({ label: collection.charAt(0).toUpperCase() + collection.slice(1), path: '' });
    } else if (category) {
      crumbs.push({ label: 'Categories', path: '/categories' });
      crumbs.push({ label: category.charAt(0).toUpperCase() + category.slice(1), path: `/products/${category}` });
      if (subcategory) {
        crumbs.push({ label: subcategory.charAt(0).toUpperCase() + subcategory.slice(1), path: '' });
      }
    }
    
    return crumbs;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout cartItems={cartItems} onUpdateCartQuantity={handleUpdateCartQuantity} onRemoveCartItem={handleRemoveCartItem}>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs crumbs={getBreadcrumbs()} />
        <h1 className="text-2xl font-bold mb-4">{getPageTitle()}</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filter Sidebar */}
          <aside className="md:col-span-1">
            <FilterSidebar
              brands={['Addidas', 'Nike', 'Puma', 'Reebok', 'Levis', 'Wrangler']}
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Product Listing */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(products.length / PRODUCTS_PER_PAGE)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListing;
