
import React from 'react';
import { Clock } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  image: string;
}

interface HeaderPromoBannerProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const HeaderPromoBanner: React.FC<HeaderPromoBannerProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="mx-4 my-4">
      {/* Promo Banner */}
      <div 
        className="rounded-2xl p-6 mb-4"
        style={{
          background: 'linear-gradient(135deg, #EBD8FF 0%, #F3E8F5 100%)'
        }}
      >
        {/* Header Row */}
        <div className="flex justify-between items-start mb-4">
          {/* Left Side - INTRODUCING + Logo */}
          <div className="flex flex-col">
            <span className="text-black font-bold text-sm mb-1">INTRODUCING</span>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                Mn
              </span>
              <Clock className="w-6 h-6 text-pink-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                w
              </span>
            </div>
          </div>
          
          {/* Right Side - Delivery Message */}
          <div className="text-right">
            <div className="text-black font-bold text-lg leading-tight">
              Fashion Delivery Starting From
            </div>
            <div className="text-black font-bold text-2xl">
              30 MINUTES
            </div>
            <div className="text-gray-600 text-sm mt-1">
              Widest Fashion Range | Easy Returns & Exchange
            </div>
          </div>
        </div>
        
        {/* Category Carousel */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className="flex flex-col items-center gap-2 min-w-[80px] group"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white p-2 shadow-sm">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                {selectedCategory === category.id && (
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-orange-500"></div>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                selectedCategory === category.id ? 'text-orange-500' : 'text-gray-700'
              }`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderPromoBanner;
