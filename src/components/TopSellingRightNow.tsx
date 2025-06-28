
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
        {/* Topic Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Top-Selling Right Now</h2>
          <p className="text-sm text-gray-600">Must-Haves Coming Your Way</p>
        </div>

        {/* Horizontal Cards Layout */}
        <div className="grid grid-cols-2 gap-4">
          {topSellingItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="cursor-pointer group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 p-4">
                <div className="w-full h-32 rounded-xl overflow-hidden mb-3 bg-gray-50">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {item.name}
                  </p>
                  <p className="text-xs text-orange-600 font-medium mt-1">
                    {item.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSellingRightNow;
