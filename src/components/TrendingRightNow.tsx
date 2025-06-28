
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

interface TrendingCategory {
  id: string;
  name: string;
  image: string;
}

const TrendingRightNow: React.FC = () => {
  const navigate = useNavigate();
  
  const trendingCategories: TrendingCategory[] = [
    {
      id: '1',
      name: 'Monochrome Fits',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop'
    },
    {
      id: '2',
      name: 'Oversized Tees',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop'
    },
    {
      id: '3',
      name: 'Crop Tops',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop'
    },
    {
      id: '4',
      name: 'Wide Leg Pants',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop'
    },
    {
      id: '5',
      name: 'Floral Dresses',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop'
    },
    {
      id: '6',
      name: 'Court Sneakers',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop'
    },
    {
      id: '7',
      name: 'Polo T-Shirts',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop'
    },
    {
      id: '8',
      name: 'Floral Tops',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop'
    }
  ];

  const handleShopNow = () => {
    navigate('/categories');
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="bg-gradient-to-br from-orange-100 to-amber-100 py-8 px-4 mb-6">
      <div className="max-w-md mx-auto">
        {/* Hero Section with new banner image */}
        <div className="relative rounded-3xl mb-6 overflow-hidden">
          <img 
            src="/lovable-uploads/cf401a71-106c-4629-a178-b94eefae726c.png" 
            alt="Trending Right Now Banner" 
            className="w-full h-auto object-cover" 
          />
          
          {/* Overlay button if needed */}
          <button
            onClick={handleShopNow}
            className="absolute bottom-4 right-4 bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg"
          >
            SHOP NOW
          </button>
        </div>

        {/* Categories Grid - Horizontally Scrollable */}
        <ScrollArea className="w-full">
          <div className="flex gap-3 pb-4">
            {trendingCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="flex flex-col items-center cursor-pointer group flex-shrink-0"
              >
                <div className="w-16 aspect-[3/4] rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 bg-gray-100">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    style={{ height: '70%' }}
                  />
                </div>
                <span className="text-xs text-gray-900 mt-2 text-center font-medium leading-tight w-16">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default TrendingRightNow;
