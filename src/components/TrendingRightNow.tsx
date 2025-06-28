
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
        {/* Hero Section with 3D Effects */}
        <div className="relative bg-gradient-to-r from-orange-200 to-amber-200 rounded-3xl p-6 mb-6 overflow-hidden">
          {/* 3D Lines and Effects */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            {/* Spotlight lines for 3D room effect */}
            <div 
              className="absolute top-0 left-1/4 w-px h-full opacity-20"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
              }}
            />
            <div 
              className="absolute top-0 right-1/4 w-px h-full opacity-20"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
              }}
            />
            
            {/* Horizontal lines */}
            <div 
              className="absolute left-0 top-1/4 w-full h-px opacity-15"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)'
              }}
            />
            <div 
              className="absolute left-0 bottom-1/4 w-full h-px opacity-15"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)'
              }}
            />
            
            {/* Darker gradient overlay */}
            <div 
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,165,0,0.1) 0%, rgba(255,140,0,0.2) 50%, rgba(255,69,0,0.1) 100%)'
              }}
            />
          </div>
          
          {/* Models on left side */}
          <div className="absolute left-0 top-0 bottom-0 w-2/5 overflow-hidden rounded-l-3xl">
            <img 
              src="/lovable-uploads/f1345680-4375-42e5-b4f1-12c76962ae5c.png" 
              alt="Fashion Models" 
              className="w-full h-full object-cover opacity-80" 
            />
          </div>
          
          {/* Content on right side */}
          <div className="relative z-10 ml-[40%] pl-4">
            <h2 className="text-2xl font-bold text-orange-600 mb-2 leading-tight">Trending Right Now</h2>
            <p className="text-sm text-gray-700 mb-4 font-medium">Hot Off The Style Scene</p>
            
            <button
              onClick={handleShopNow}
              className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg"
            >
              SHOP NOW
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-4 gap-3">
          {trendingCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 bg-gray-100">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <span className="text-xs text-gray-900 mt-2 text-center font-medium leading-tight">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingRightNow;
