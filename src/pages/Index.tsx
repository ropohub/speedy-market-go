import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategorySelector from '../components/CategorySelector';
import GreenBanner from '../components/YellowBanner';
import AutoSlidingBanner from '../components/AutoSlidingBanner';
import MovingBanner from '../components/MovingBanner';
import FeaturedCategories from '../components/FeaturedCategories';
import EthnicCollection from '../components/EthnicCollection';
import TopSellingProducts from '../components/TopSellingProducts';
import ProductYouCantMiss from '../components/ProductYouCantMiss';
import { useNavigate } from 'react-router-dom';
import { categories, banners, featuredCategories, heroImages } from '../data/mockData';

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

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('women');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSearchSticky, setIsSearchSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the header height to determine when to show sticky search
      const headerHeight = 72;
      setIsSearchSticky(window.scrollY >= headerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const currentBanners = banners[selectedCategory as keyof typeof banners];
  const currentFeaturedCategories = featuredCategories[selectedCategory as keyof typeof featuredCategories];
  const currentHeroImages = heroImages[selectedCategory as keyof typeof heroImages];

  return (
    <Layout cartItems={cartItems} onUpdateCartQuantity={handleUpdateCartQuantity} onRemoveCartItem={handleRemoveCartItem}>
      <div className="bg-white min-h-screen">
        {/* New Header Component */}
        <Header />
        
        {/* Hero Section - Background image */}
        <div className="relative" style={{
          height: '55vh',
          backgroundImage: 'url(/lovable-uploads/3d5567e9-bee1-49b1-846c-a831ff5e4325.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          {/* Search Bar - Positioned over background */}
          <div className={`absolute top-4 left-0 right-0 z-10 ${isSearchSticky ? 'invisible' : 'visible'}`}>
            <SearchBar />
          </div>
        </div>

        {/* Sticky Search Bar */}
        <div className={`fixed top-16 left-0 right-0 z-50 bg-black shadow-md transition-transform duration-300 ${isSearchSticky ? 'translate-y-0' : '-translate-y-full'}`}>
          <SearchBar />
        </div>

        {/* Scrollable Content */}
        <div className="bg-gray-50">
          <GreenBanner />
          
          <CategorySelector categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          
          <div className="pt-3">
            <AutoSlidingBanner banners={currentBanners} />
          </div>
          
          <div className="my-4">
            <MovingBanner text="FLAT 10% OFF ON YOUR FIRST ORDER" />
          </div>
          
          <div className="bg-white">
            <FeaturedCategories categories={currentFeaturedCategories} />
            
            <EthnicCollection />
            
            <TopSellingProducts category={selectedCategory} />
            
            <ProductYouCantMiss category={selectedCategory} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
