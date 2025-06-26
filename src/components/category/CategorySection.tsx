
import React from 'react';
import ProductCard from '../ProductCard';
import { CategoryItem, Product } from '../../data/categoryData';

interface CategorySectionProps {
  title: string;
  items?: CategoryItem[];
  products?: Product[];
  isGrid?: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  title, 
  items, 
  products, 
  isGrid = false 
}) => {
  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
  };

  const handleCategoryClick = (categoryId: string) => {
    console.log('Navigate to category:', categoryId);
  };

  return (
    <div className="px-4 py-6 bg-white">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
        
        {items && (
          <div className={`grid ${isGrid ? 'grid-cols-4' : 'grid-cols-3'} gap-3`}>
            {items.map((item, index) => (
              <div 
                key={item.id} 
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => handleCategoryClick(item.id)}
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
        )}

        {products && (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
