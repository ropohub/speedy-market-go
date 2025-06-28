
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import CategoryHeader from '../components/category/CategoryHeader';
import { categoryData } from '../data/categoryData';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  const currentCategory = categoryData[categoryName || 'women'] || categoryData.women;

  // Category items for the bottom section
  const categoryItems = [
    { name: 'Night Suits', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=200&fit=crop' },
    { name: 'Innerwear', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=200&fit=crop' },
    { name: 'Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=150&h=200&fit=crop' },
    { name: 'Trousers', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=200&fit=crop' },
    { name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=200&fit=crop' },
    { name: 'Dresses', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=150&h=200&fit=crop' },
  ];

  return (
    <Layout>
      <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 100%)'}}>
        <CategoryHeader title={currentCategory.title} />
        
        {/* Main content with top padding for fixed header */}
        <div className="pt-16">
          {/* Hero Banner Section */}
          <div className="px-4 py-4">
            <div className="max-w-md mx-auto">
              {/* Top promotional text */}
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">INTRODUCING</h1>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img 
                    src="/lovable-uploads/5b5065a5-f1ae-4a07-b255-830e99cd26fc.png" 
                    alt="Dripzy Logo" 
                    className="w-8 h-8 object-contain" 
                  />
                  <span className="text-2xl font-bold text-pink-500">MEOW</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">Delivery Starting From</p>
                  <p className="text-2xl font-bold text-gray-900">30 MINUTES</p>
                </div>
                <p className="text-sm text-gray-700 mt-2">
                  15K Styles | Widest Fashion Range | Easy Returns & Exchange
                </p>
              </div>

              {/* Hero Banner Card */}
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-3xl p-6 mb-6 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  {/* Left side - Model image */}
                  <div className="w-32 h-40 flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=300&fit=crop" 
                      alt="Fashion Model" 
                      className="w-full h-full object-cover rounded-2xl" 
                    />
                  </div>
                  
                  {/* Right side - Text content */}
                  <div className="flex-1 pl-4 text-right">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">NO TIME FOR LAUNDRY?</h2>
                    <h3 className="text-xl font-bold text-blue-600 mb-4">
                      Shop Basics In<br />Just A Click.
                    </h3>
                    <div className="mb-4">
                      <p className="text-lg font-bold text-gray-900">Shop Daily</p>
                      <p className="text-lg font-bold text-gray-900">Essentials</p>
                    </div>
                    <div className="flex justify-end">
                      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">→</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-4">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div 
                      key={index} 
                      className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-gray-800' : 'bg-gray-400'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Category Cards Section */}
          <div className="px-4 pb-6">
            <div className="max-w-md mx-auto">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {categoryItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
                  >
                    <div className="w-20 h-24 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                    <span className="text-xs text-gray-900 mt-2 text-center font-medium leading-tight w-20">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
