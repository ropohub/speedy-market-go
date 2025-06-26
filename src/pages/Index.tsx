
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import CategorySelector from '../components/CategorySelector';
import YellowBanner from '../components/YellowBanner';
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

  return (
    <Layout cartItems={cartItems} onUpdateCartQuantity={handleUpdateCartQuantity} onRemoveCartItem={handleRemoveCartItem}>
      <div className="bg-white min-h-screen">
        {/* Header Component */}
        <Header />
        
        {/* Hero Section - Compact mobile-friendly banner */}
        <div className="px-4 py-3" style={{ backgroundColor: '#FFEFE4' }}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden max-w-sm mx-auto">
            <img 
              src="/lovable-uploads/830272f8-d80f-4f3c-b69a-08f3b0962cda.png" 
              alt="Hero Banner" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="bg-gray-50">
          <YellowBanner />
          
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
