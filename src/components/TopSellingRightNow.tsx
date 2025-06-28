
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
    <div className="bg-gradient-to-br from-pink-50 to-orange-50 py-6 px-4 mb-6">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Top-Selling</h2>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Right Now</h2>
            <p className="text-sm text-gray-600">Must-Haves</p>
            <p className="text-sm text-gray-600">Coming Your Way</p>
          </div>
          <ChevronRight className="text-gray-400 w-8 h-8" />
        </div>

        {/* Horizontally Scrollable Items */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {topSellingItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="flex-shrink-0 cursor-pointer group"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow bg-white p-2">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <p className="text-xs text-gray-700 mt-2 text-center font-medium leading-tight max-w-24">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSellingRightNow;
