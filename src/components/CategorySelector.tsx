import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  const navigate = useNavigate();

  const handlePromoClick = () => {
    navigate('/products/women/all');
  };

  return (
    <div className="bg-black px-4 py-2 my-0">
      <div className="flex justify-between items-center gap-4 my-[3px] mx-[4px]">
        {/* Promotional Button */}
        <div 
          onClick={handlePromoClick}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <div className="text-center">
              <div className="text-white text-xs font-bold leading-tight">Explore</div>
              <div className="text-white text-xs font-bold leading-tight">Trending</div>
              <div className="text-white text-xs font-bold leading-tight">Styles</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ArrowRight className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Existing Categories */}
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-orange-200 transition-all"
              />
              {selectedCategory === category.id && (
                <div className="absolute inset-0 rounded-full ring-2 ring-orange-500"></div>
              )}
            </div>
            <span className={`text-xs font-medium transition-colors ${
              selectedCategory === category.id ? 'text-orange-500' : 'text-white'
            }`}>
              {category.name}
            </span>
            {selectedCategory === category.id && (
              <div className="w-6 h-0.5 bg-orange-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
