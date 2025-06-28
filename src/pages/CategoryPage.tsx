
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import CategoryHeader from '../components/category/CategoryHeader';
import AutoSlidingBanner from '../components/AutoSlidingBanner';
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

  // Auto-sliding banners data
  const slidingBanners = [
    {
      title: "NO TIME FOR LAUNDRY?",
      subtitle: "Shop Basics In Just A Click.",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop"
    },
    {
      title: "NEW ARRIVALS",
      subtitle: "Discover Latest Fashion Trends",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    },
    {
      title: "SUMMER COLLECTION",
      subtitle: "Stay Cool & Stylish",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=300&fit=crop"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 100%)'}}>
        <CategoryHeader title={currentCategory.title} />
        
        {/* Main content with top padding for fixed header */}
        <div className="pt-16">
          {/* Hero Banner Section with 3D Effects */}
          <div className="px-4 py-2">
            <div className="relative max-w-md mx-auto">
              {/* Ultra-thin transparent border container with 3D effects */}
              <div 
                className="relative bg-gradient-to-r from-orange-100/30 to-pink-100/30 rounded-3xl p-0.5 shadow-sm"
                style={{
                  background: 'linear-gradient(180deg, #F5E6D3 0%, #E8B882 50%, #D4915A 100%)',
                }}
              >
                {/* Spotlight lines for 3D room effect */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  {/* Top spotlight lines */}
                  <div 
                    className="absolute top-0 left-1/4 w-px h-full opacity-20"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
                    }}
                  />
                  <div 
                    className="absolute top-0 right-1/4 w-px h-full opacity-20"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
                    }}
                  />
                  
                  {/* Side spotlight lines */}
                  <div 
                    className="absolute left-0 top-1/4 w-full h-px opacity-15"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)'
                    }}
                  />
                  <div 
                    className="absolute left-0 bottom-1/4 w-full h-px opacity-15"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)'
                    }}
                  />
                </div>
                
                {/* Radial glow behind the image */}
                <div 
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)'
                  }}
                />
                
                <div className="bg-white rounded-2xl overflow-hidden relative">
                  {/* Hero Banner using the uploaded image */}
                  <div className="relative">
                    <img 
                      src="/lovable-uploads/1cec3785-d3cc-4a5d-a083-90b75fbb7503.png" 
                      alt="Hero Banner" 
                      className="w-full h-auto object-cover" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-sliding Banners Section */}
          <div className="px-4 py-2">
            <AutoSlidingBanner banners={slidingBanners} autoSlideInterval={3000} />
          </div>

          {/* Category Cards Section */}
          <div className="px-4 pb-4">
            <div className="max-w-md mx-auto">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {categoryItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
                  >
                    <div className="w-16 h-20 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                    <span className="text-xs text-gray-900 mt-1 text-center font-medium leading-tight w-16">
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
