
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface TopSellingItem {
  id: string;
  name: string;
  image: string;
  category: string;
}

const TopSellingRightNow: React.FC = () => {
  const topSellingItems: TopSellingItem[] = [
    {
      id: '1',
      name: "Women's Innerwear",
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop',
      category: 'innerwear'
    },
    {
      id: '2',
      name: "Men's Innerwear",
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=200&h=200&fit=crop',
      category: 'innerwear'
    },
    {
      id: '3',
      name: "Water Bottles",
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop',
      category: 'accessories'
    },
    {
      id: '4',
      name: "Sports Wear",
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
      category: 'sports'
    }
  ];

  const handleItemClick = (item: TopSellingItem) => {
    console.log('Clicked item:', item);
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 py-6 px-4 mb-6">
      <div className="max-w-md mx-auto">
        {/* Single Row Layout - Heading Left, Cards Right */}
        <div className="flex items-center gap-4">
          {/* Left Side - Heading */}
          <div className="flex-shrink-0">
            <h2 className="text-lg font-bold text-gray-900 mb-1 leading-tight">Top-Selling</h2>
            <h2 className="text-lg font-bold text-gray-900 mb-1 leading-tight">Right Now</h2>
            <p className="text-xs text-gray-600 mb-1">Must-Haves</p>
            <p className="text-xs text-gray-600">Coming Your Way</p>
            <ChevronRight className="text-gray-400 w-5 h-5 mt-2" />
          </div>

          {/* Right Side - Horizontally Scrollable Small Cards */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide flex-1">
            {topSellingItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="flex-shrink-0 cursor-pointer group"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 p-2 w-20">
                  <div className="w-full h-16 rounded-lg overflow-hidden mb-2 bg-gray-50">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-900 leading-tight line-clamp-2">
                      {item.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSellingRightNow;
