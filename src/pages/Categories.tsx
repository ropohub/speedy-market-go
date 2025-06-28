
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { categories } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Categories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('women');
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products/${selectedCategory}/${categoryId}`);
  };

  // Vertical sidebar categories
  const sidebarCategories = [{
    id: 'women',
    name: "Women's\nWear",
    icon: '👗',
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-600',
    borderColor: 'border-pink-200'
  }, {
    id: 'men',
    name: "Men's\nWear",
    icon: '👔',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200'
  }, {
    id: 'footwear',
    name: 'Footwear',
    icon: '👠',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-200'
  }, {
    id: 'accessories',
    name: 'Beauty &\nGrooming',
    icon: '💄',
    bgColor: 'bg-rose-100',
    textColor: 'text-rose-600',
    borderColor: 'border-rose-200'
  }, {
    id: 'kids',
    name: 'Kids\nWear',
    icon: '👶',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-600',
    borderColor: 'border-yellow-200'
  }, {
    id: 'home',
    name: 'Home &\nLiving',
    icon: '🏠',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    borderColor: 'border-green-200'
  }];

  // Spotlight items
  const spotlightItems = [{
    id: 'house-brands',
    name: 'Sale is Live!',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=150&fit=crop',
    type: 'sale'
  }, {
    id: 'spring-summer',
    name: 'Spring Summer',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop',
    type: 'season'
  }, {
    id: 'top-trends',
    name: 'Top Trends Her!',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop',
    type: 'trends'
  }];

  const trendsInFocus = [{
    id: 'tiered-dresses',
    name: '#Tiered Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=150&h=150&fit=crop'
  }, {
    id: 'high-top-shoes',
    name: '#High Top shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop'
  }, {
    id: 'vneck-kurtas',
    name: '#Vneck-Kurtas',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150&h=150&fit=crop'
  }, {
    id: 'textured',
    name: '#Textured',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=150&h=150&fit=crop'
  }, {
    id: 'baguette',
    name: '#Baguette',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop'
  }, {
    id: 'cargo-style',
    name: '#Cargo style',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=150&fit=crop'
  }];

  const handleSidebarCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const getCategoryTitle = (categoryId: string) => {
    const categoryMap: { [key: string]: string } = {
      'women': "Women's Fashion",
      'men': "Men's Fashion",
      'footwear': 'Footwear',
      'accessories': 'Beauty & Grooming',
      'kids': 'Kids Fashion',
      'home': 'Home & Living'
    };
    return categoryMap[categoryId] || 'Fashion';
  };

  return (
    <Layout>
      {/* Unified gradient background throughout the entire page */}
      <div className="min-h-screen" style={{
        background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 30%, #FDE8E8 50%, #FFB3D1 70%, #F3E8FF 100%)'
      }}>
        {/* Header */}
        <Header />
        
        {/* Main content - moved closer to header with minimal gap */}
        <div className="pt-16">
          <div className="flex gap-1">
            {/* Vertical Sidebar - same width */}
            <div className="w-20 min-h-screen">
              <div className="py-2 space-y-4">
                {sidebarCategories.map(category => (
                  <div
                    key={category.id}
                    onClick={() => handleSidebarCategoryChange(category.id)}
                    className={`mx-2 cursor-pointer transition-all ${
                      selectedCategory === category.id 
                        ? `${category.bgColor} ${category.borderColor} border-2 shadow-sm` 
                        : 'hover:bg-white/20 backdrop-blur-sm'
                    } rounded-xl p-2`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="text-2xl mb-1">{category.icon}</div>
                      <span 
                        className={`text-xs font-medium text-center leading-tight ${
                          selectedCategory === category.id ? category.textColor : 'text-gray-600'
                        }`}
                        style={{ whiteSpace: 'pre-line' }}
                      >
                        {category.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content - moved closer to sidebar */}
            <div className="flex-1 overflow-x-hidden">
              {/* Fashion Header with Banner - no padding top */}
              <div className="px-2">
                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 relative overflow-hidden shadow-sm border border-white/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{getCategoryTitle(selectedCategory)}</h2>
                    </div>
                    <div className="flex items-center">
                      <img 
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=120&h=80&fit=crop" 
                        alt="Fashion Banner" 
                        className="w-20 h-12 rounded-lg object-cover mr-2 shadow-sm" 
                      />
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Container - minimal margin */}
              <div className="bg-white/30 backdrop-blur-sm rounded-t-3xl mx-2 mt-1 shadow-sm border border-white/20">
                {/* In the Spotlight Section */}
                <div className="px-4 py-3">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">In the Spotlight</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {spotlightItems.map(item => (
                      <div 
                        key={item.id} 
                        onClick={() => handleCategoryClick(item.id)}
                        className="flex flex-col items-center cursor-pointer flex-shrink-0"
                      >
                        <div className="w-14 h-14 rounded-full overflow-hidden mb-2 bg-white/60 backdrop-blur-sm shadow-sm">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center max-w-16 leading-tight">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Trends Section */}
                <div className="px-4 py-2">
                  <div className="flex gap-4 justify-center">
                    <div className="flex flex-col items-center cursor-pointer">
                      <div className="w-14 h-14 rounded-full overflow-hidden mb-2 bg-white/60 backdrop-blur-sm shadow-sm">
                        <img 
                          src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=150&h=150&fit=crop" 
                          alt="Top Trends Him" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-700 text-center">
                        Top Trends Him!
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trends in Focus Section */}
                <div className="px-4 py-3">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Trends in focus</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {trendsInFocus.map(item => (
                      <div 
                        key={item.id} 
                        onClick={() => handleCategoryClick(item.id)}
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <div className="w-14 h-14 rounded-full overflow-hidden mb-2 bg-white/60 backdrop-blur-sm shadow-sm">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center max-w-16 leading-tight">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
