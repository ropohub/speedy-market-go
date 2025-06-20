
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface FeaturedCategory {
  id: string;
  name: string;
  subtitle?: string;
  image: string;
  isDeal?: boolean;
  isPriceCategory?: boolean;
}

interface FeaturedCategoriesProps {
  categories: FeaturedCategory[];
}

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: FeaturedCategory) => {
    // Navigate to product listing page
    navigate(`/products/men/${category.id}`);
  };

  // Limit to 9 categories, handling cases where categories might be undefined.
  const displayCategories = (categories || []).slice(0, 9);

  return (
    <div className="px-4 mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Featured Categories</h2>
      
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {displayCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer group"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
            
            {/* Category content */}
            <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
              {category.isDeal && (
                <div className="mb-1 md:mb-2">
                  <div className="inline-block bg-red-600 text-white text-xs font-bold px-1 md:px-2 py-0.5 md:py-1 rounded">
                    SNITCH DEAL OF THE DAY
                  </div>
                </div>
              )}
              
              <div className="text-white">
                <h3 className="font-bold text-xs md:text-sm mb-0.5 md:mb-1 text-shadow-sm">
                  {category.name}
                </h3>
                
                {category.subtitle && (
                  <p className={`text-xs md:text-sm font-bold ${
                    category.isPriceCategory 
                      ? 'text-yellow-400 text-sm md:text-lg' 
                      : category.isDeal 
                        ? 'text-white text-xs' 
                        : 'text-gray-200'
                  }`}>
                    {category.subtitle}
                  </p>
                )}
                
                {category.isDeal && !category.subtitle && (
                  <p className="text-xs text-gray-200">
                    selected products
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
