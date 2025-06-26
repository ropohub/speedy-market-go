
import React from 'react';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
}

interface CategorySectionProps {
  title: string;
  items: CategoryItem[];
  onItemClick?: (itemId: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, items, onItemClick }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4">{title}</h2>
      <div className="px-4">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-4 gap-3">
            {items.map((item, index) => (
              <div 
                key={item.id} 
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => onItemClick?.(item.id)}
              >
                <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-lg bg-white p-2 group-hover:shadow-xl transition-shadow">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-700 mt-2 text-center font-medium leading-tight">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
