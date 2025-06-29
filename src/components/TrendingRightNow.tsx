
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
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      tag: 'Oversized Tees',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '2',
      name: 'Crop Tops',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
      tag: 'Crop Tops',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '3',
      name: 'Dresses',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop',
      tag: 'Dresses',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '4',
      name: 'Jeans',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      tag: 'Jeans',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '5',
      name: 'Sports Wear',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
      tag: 'Sports Wear',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '6',
      name: 'T-Shirts',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop',
      tag: 'T-Shirts',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '7',
      name: 'Shorts',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      tag: 'Shorts',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '8',
      name: 'Jackets',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      tag: 'Jackets',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '9',
      name: 'Co-ords',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
      tag: 'Co-ords',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '10',
      name: 'Mini Skirts',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop',
      tag: 'Mini Skirts',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '11',
      name: 'Cargos',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      tag: 'Cargos',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '12',
      name: 'Tank Tops',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop',
      tag: 'Tank Tops',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '13',
      name: 'Trousers',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      tag: 'Trousers',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '14',
      name: 'Sweatshirts',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      tag: 'Sweatshirts',
      genderTag: 'Men\'s Wear'
    },
    {
      id: '15',
      name: 'Gen-Z Fashion',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
      tag: 'Gen-Z Fashion',
      genderTag: 'Women\'s Wear'
    },
    {
      id: '16',
      name: 'Casual Wear',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop',
      tag: 'Casual Wear',
      genderTag: 'Women\'s Wear'
    }
  ];

  const handleCategoryClick = (category: TrendingCategory) => {
    // Set both category tag and gender tag in filters
    const tags = [category.tag, category.genderTag];
    setFilters(tags);
    
    // Create search query with AND condition for both category tag and gender tag
    const searchQuery = `tag:${category.tag} AND tag:${category.genderTag}`;
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
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
            src="/lovable-uploads/cf401a71-106c-4629-a178-b94eefae726c.png" 
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
