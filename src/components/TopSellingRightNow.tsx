import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFilter } from '../contexts/FilterContext';

interface TopSellingItem {
  id: string;
  name: string;
  image: string;
  category: string;
  subcategory?: string;
}

const TopSellingRightNow: React.FC = () => {
  const topSellingItems: TopSellingItem[] = [
    {
      id: '1',
      name: "Women's Innerwear",
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop',
      category: 'women',
      subcategory: 'innerwear'
    },
    {
      id: '2',
      name: "Men's Innerwear",
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=200&h=200&fit=crop',
      category: 'men',
      subcategory: 'innerwear'
    },
    {
      id: '3',
      name: "Trendy Handbags",
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
      category: 'accessories',
      subcategory: 'handbags'
    },
    {
      id: '4',
      name: "Sports Wear",
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
      category: 'sportswear',
      subcategory: ''
    }
  ];

  const navigate = useNavigate();
  const { setFilters } = useFilter();

  const categoryToTagMap: { [key: string]: string } = {
    'women': "Women's Wear",
    'men': "Men's Wear",
    'accessories': 'Accessories',
    'sportswear': 'Sports Wear',
  };
  
  const subcategoryToTagMap: { [key: string]: string } = {
    'innerwear': 'Inner Wear',
    'handbags': 'Handbags',
  };

  const handleItemClick = (item: TopSellingItem & { subcategory?: string }) => {
    const tags: string[] = [];
    if (categoryToTagMap[item.category]) {
      tags.push(categoryToTagMap[item.category]);
    }
    if (item.subcategory && subcategoryToTagMap[item.subcategory]) {
      tags.push(subcategoryToTagMap[item.subcategory]);
    }
    if (tags.length > 0) {
      setFilters(tags);
      navigate('/products');
    } else {
      navigate('/products');
    }
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
