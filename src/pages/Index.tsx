
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

  // Category squares data with 7 categories for horizontal scroll
  const categorySquares = [
    { name: 'Women', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop&crop=face' },
    { name: 'Men', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&h=150&fit=crop' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=150&h=150&fit=crop' },
    { name: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop' },
    { name: 'Home', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop' },
    { name: 'Kids', image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=150&h=150&fit=crop' }
  ];

  return (
    <Layout cartItems={cartItems} onUpdateCartQuantity={handleUpdateCartQuantity} onRemoveCartItem={handleRemoveCartItem}>
      <div className="bg-white min-h-screen">
        {/* Header Component */}
        <Header />
        
        {/* Main content with reduced top padding to account for smaller fixed header */}
        <div className="pt-20" style={{background: 'linear-gradient(135deg, #FFEFE4 0%, #FFE4CC 50%, #FFDAB9 100%)'}}>
          {/* Hero Section - Directly below search bar with no extra spacing */}
          <div className="px-4 py-2">
            <div className="relative max-w-md mx-auto">
              {/* Equal border container */}
              <div className="relative bg-gradient-to-r from-purple-300 to-pink-300 rounded-xl p-1 shadow-lg">
                <div className="bg-white rounded-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/4632bf3b-7c9b-4a5a-b65f-a5ae71242b6b.png" 
                    alt="Introducing Fashion Delivery" 
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Category Squares Section - Reduced padding */}
          <div className="px-4 py-2">
            <div className="max-w-md mx-auto">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {categorySquares.map((category, index) => (
                  <div key={index} className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm bg-gray-100">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-gray-700 mt-1 text-center font-medium">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
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
      </div>
    </Layout>
  );
};

export default Index;
