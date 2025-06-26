import React, { useState } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import YellowBanner from '../components/YellowBanner';
import { useNavigate } from 'react-router-dom';
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
  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName.toLowerCase()}`);
  };

  // Category squares data with 7 categories for horizontal scroll
  const categorySquares = [{
    name: 'Women',
    image: '/lovable-uploads/b95e5ab2-e9a2-4f49-9aa0-8ac2e55fd137.png'
  }, {
    name: 'Men',
    image: '/lovable-uploads/9a9a6676-d328-415f-8f18-d8475bb4a342.png'
  }, {
    name: 'Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&h=150&fit=crop'
  }, {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=150&h=150&fit=crop'
  }, {
    name: 'Footwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop'
  }, {
    name: 'Home',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop'
  }, {
    name: 'Kids',
    image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=150&h=150&fit=crop'
  }];

  // Main category squares data for the promotional section with appropriate images
  const mainCategorySquares = [{
    name: 'Personal Care',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop'
  }, {
    name: 'Wardrobe Basics',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop'
  }, {
    name: 'Home Finds',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop'
  }, {
    name: 'Comfy Footwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop'
  }];
  return <Layout cartItems={cartItems} onUpdateCartQuantity={handleUpdateCartQuantity} onRemoveCartItem={handleRemoveCartItem}>
      <div className="bg-white min-h-screen">
        {/* Header Component */}
        <Header />
        
        {/* Main content with gradient background that matches hero banner */}
        <div className="pt-20" style={{
        background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEDE0 50%, #FFE6D3 100%)'
      }}>
          {/* Hero Section - Directly below search bar with no extra spacing */}
          <div className="px-4 py-2">
            <div className="relative max-w-md mx-auto">
              {/* Ultra-thin transparent border container */}
              <div className="relative bg-gradient-to-r from-orange-100/30 to-pink-100/30 rounded-xl p-0.5 shadow-sm">
                <div className="bg-white rounded-lg overflow-hidden">
                  <img src="/lovable-uploads/d6cc1603-91ea-4759-a968-14623a0024c8.png" alt="Introducing Dripzy Fashion Delivery" className="w-full h-auto object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Category Squares Section - Half the spacing from hero banner */}
          <div className="px-4 py-1">
            <div className="max-w-md mx-auto">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {categorySquares.map((category, index) => <div key={index} className="flex flex-col items-center flex-shrink-0 cursor-pointer" onClick={() => handleCategoryClick(category.name)}>
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm bg-gray-100">
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-gray-700 mt-1 text-center font-medium">
                      {category.name}
                    </span>
                  </div>)}
              </div>
            </div>
          </div>

          {/* Promotional Text Section */}
          <div className="px-4 py-3">
            <div className="max-w-md mx-auto">
              {/* Main promotional content with model images */}
              <div className="flex items-center justify-between mb-2">
                {/* Left model image - removed border styling */}
                <div className="w-20 h-24 overflow-hidden">
                  <img src="/lovable-uploads/f1345680-4375-42e5-b4f1-12c76962ae5c.png" alt="Fashion Model" className="w-full h-full object-contain" />
                </div>
                
                {/* Center text content */}
                <div className="text-center">
                  <h2 className="text-xl font-bold leading-tight mb-1" style={{
                  background: 'linear-gradient(135deg, #C084FC 0%, #E879F9 50%, #F0ABFC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 2px 4px rgba(192, 132, 252, 0.3)'
                }}>
                    <div>Everyday</div>
                    <div>Essentials</div>
                  </h2>
                  <p className="text-gray-700 text-xs mb-1 font-semibold">
                    Top Styles & Delivered More Fast
                  </p>
                  <button className="bg-white px-4 py-1.5 rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-xs text-zinc-950 font-semibold">
                    SHOP NOW
                  </button>
                </div>
                
                {/* Right model image - removed border styling */}
                <div className="w-20 h-24 overflow-hidden">
                  <img src="/lovable-uploads/836e88f1-6dd2-4066-84df-99c47ced081d.png" alt="Fashion Model" className="w-full h-full object-contain" />
                </div>
              </div>
              
              {/* Main Category Squares - Larger size matching reference */}
              <div className="grid grid-cols-4 gap-3">
                {mainCategorySquares.map((category, index) => <div key={index} className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-lg bg-white p-2">
                      <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
                        <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded-2xl" />
                      </div>
                    </div>
                    <span className="text-xs text-gray-700 mt-2 text-center font-medium leading-tight">
                      {category.name}
                    </span>
                  </div>)}
              </div>
            </div>
          </div>

          {/* Yellow Banner */}
          <YellowBanner />
        </div>
      </div>
    </Layout>;
};
export default Index;