import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilter } from '../contexts/FilterContext';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

interface TrendingCategory {
  id: string;
  name: string;
  image: string;
  tag: string;
  genderTag: 'Men\'s Wear' | 'Women\'s Wear';
}

const TrendingRightNow: React.FC = () => {
  const navigate = useNavigate();
  const { setFilters } = useFilter();
  
  const trendingCategories: TrendingCategory[] = [
    {
      id: '1',
      name: 'Oversized Tees',
      image: 'https://cdn.dripzyy.com/i1.avif',
      tag: 'Oversized Tees',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '2',
      name: 'Crop Tops',
      image: 'https://cdn.dripzyy.com/crop_top.jpg',
      tag: 'Crop Tops',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '3',
      name: 'Dresses',
      image: 'https://cdn.dripzyy.com/dresses_.jpg',
      tag: 'Dresses',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '4',
      name: 'Jeans',
      image: 'https://cdn.dripzyy.com/women_jeans.jpg',
      tag: 'Jeans',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '5',
      name: 'Sports Wear',
      image: 'https://cdn.dripzyy.com/sports1.jpeg',
      tag: 'Sports Wear',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '6',
      name: 'T-Shirts',
      image: 'https://cdn.dripzyy.com/tshirt.png',
      tag: 'T-Shirts',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '7',
      name: 'Shorts',
      image: 'https://cdn.dripzyy.com/women_shorts.jpg',
      tag: 'Shorts',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '8',
      name: 'Jackets',
      image: 'https://cdn.dripzyy.com/women_jacket.webp',
      tag: 'Jackets',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '9',
      name: 'Co-ords',
      image: 'https://cdn.dripzyy.com/coords.webp',
      tag: 'Co-ords',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '10',
      name: 'Mini Skirts',
      image: 'https://cdn.dripzyy.com/skirt_mini.jpeg',
      tag: 'Mini Skirts',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '11',
      name: 'Bras',
      image: 'https://cdn.dripzyy.com/bras.avif',
      tag: 'Bras',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '12',
      name: 'Briefs',
      image: 'https://cdn.dripzyy.com/briefs.jpg',
      tag: 'briefs',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '13',
      name: 'Trousers',
      image: 'https://cdn.dripzyy.com/trouser.jpg',
      tag: 'Trousers',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '14',
      name: 'Cargos',
      image: 'https://cdn.dripzyy.com/cargo.webp',
      tag: 'Cargos',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '15',
      name: 'Tank Tops',
      image: 'https://cdn.dripzyy.com/tank_top.jpg',
      tag: 'Tank Tops',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '16',
      name: 'Casual Wear',
      image: 'https://cdn.dripzyy.com/women1.jpg',
      tag: 'Casual Wear',
      genderTag: 'Women\'s Wear'
    }
  ];

  const handleCategoryClick = (category: TrendingCategory) => {
    // Set both category tag and gender tag in filters
    const tags = [category.tag, category.genderTag];
    setFilters(tags);
    
    // Navigate to products page without URL parameters
    navigate('/products');
  };

  // Split categories into two rows of 8 each
  const firstRowCategories = trendingCategories.slice(0, 8);
  const secondRowCategories = trendingCategories.slice(8, 16);

  return (
    <div 
      className="py-8 px-4 mb-6" 
      style={{
        background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 100%)'
      }}
    >
      <div className="max-w-md mx-auto">
        {/* Hero Section with banner image - no button */}
        <div className="relative rounded-3xl mb-6 overflow-hidden">
          <img 
            src="https://cdn.dripzyy.com/trending_rn.png" 
            alt="Trending Right Now Banner" 
            className="w-full h-auto object-cover" 
          />
        </div>

        {/* Categories Grid - Two Scrollable Rows with hidden scrollbars */}
        <div className="space-y-4">
          {/* First Row */}
          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2">
              {firstRowCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className="flex flex-col items-center cursor-pointer group flex-shrink-0"
                >
                  <div className="w-16 aspect-[3/4] rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 bg-gray-100">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <span className="text-xs text-gray-900 mt-2 text-center font-medium leading-tight w-16">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row */}
          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2">
              {secondRowCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className="flex flex-col items-center cursor-pointer group flex-shrink-0"
                >
                  <div className="w-16 aspect-[3/4] rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 bg-gray-100">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <span className="text-xs text-gray-900 mt-2 text-center font-medium leading-tight w-16">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingRightNow;
