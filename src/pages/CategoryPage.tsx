
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import CategoryHeader from '../components/category/CategoryHeader';
import AutoSlidingBanner from '../components/AutoSlidingBanner';
import FeaturedCategories from '../components/FeaturedCategories';
import BrandsOnDemand from '../components/BrandsOnDemand';
import { categoryData } from '../data/categoryData';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  const currentCategory = categoryData[categoryName || 'women'] || categoryData.women;

  // Category items for the bottom section - added 6 more cards
  const categoryItems = [
    { name: 'Night Suits', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=200&fit=crop' },
    { name: 'Innerwear', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=200&fit=crop' },
    { name: 'Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=150&h=200&fit=crop' },
    { name: 'Trousers', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=200&fit=crop' },
    { name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=200&fit=crop' },
    { name: 'Dresses', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=150&h=200&fit=crop' },
    { name: 'Tops', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=200&fit=crop' },
    { name: 'Skirts', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=200&fit=crop' },
    { name: 'Jackets', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=200&fit=crop' },
    { name: 'Sweaters', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=150&h=200&fit=crop' },
    { name: 'Leggings', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=150&h=200&fit=crop' },
    { name: 'Blazers', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=200&fit=crop' },
    { name: 'Hoodies', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=200&fit=crop' }
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

  // Featured categories data for 4x3 grid (12 items total)
  const featuredCategories = [
    {
      id: 'track-pants',
      name: 'Track Pants',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      collection: 'track-pants'
    },
    {
      id: 'dresses',
      name: 'Dresses',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop',
      collection: 'dresses'
    },
    {
      id: 'womens-tshirts',
      name: "Women's T-Shirts",
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
      collection: 'womens-tshirts'
    },
    {
      id: 'womens-trousers',
      name: "Women's Trousers",
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      collection: 'womens-trousers'
    },
    {
      id: 'tops',
      name: 'Tops',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
      collection: 'tops'
    },
    {
      id: 'mens-tshirts',
      name: "Men's T-Shirts",
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop',
      collection: 'mens-tshirts'
    },
    {
      id: 'casual-shoes',
      name: 'Casual Shoes',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
      collection: 'casual-shoes'
    },
    {
      id: 'flats',
      name: 'Flats',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
      collection: 'flats'
    },
    {
      id: 'jeans',
      name: 'Jeans',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop',
      collection: 'jeans'
    },
    {
      id: 'sneakers',
      name: 'Sneakers',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
      collection: 'sneakers'
    },
    {
      id: 'handbags',
      name: 'Handbags',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
      collection: 'handbags'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
      collection: 'accessories'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 50%, #FFB3BA 100%)'}}>
        <CategoryHeader title={currentCategory.title} />
        
        {/* Main content with top padding for fixed header - reduced padding */}
        <div className="pt-16">
          {/* Hero Banner Section - minimal space above */}
          <div className="px-4 pt-1 pb-2">
            <div className="relative max-w-md mx-auto">
              {/* Ultra-thin transparent border container with 3D effects - matching home page */}
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
                  <img 
                    src="/lovable-uploads/c5b6b6ed-a922-4759-a3c6-5601da94a808.png" 
                    alt="Hero Banner" 
                    className="w-full h-auto object-contain relative z-10" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Auto-sliding Banners Section - reduced height by 10% */}
          <div className="px-4">
            <div className="relative mx-2 mb-4 rounded-xl overflow-hidden h-44 bg-gradient-to-r from-gray-900 to-gray-700">
              <AutoSlidingBanner banners={slidingBanners} autoSlideInterval={3000} />
            </div>
          </div>

          {/* Category Cards Section - smaller square cards */}
          <div className="px-4 pb-4">
            <div className="max-w-md mx-auto">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {categoryItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
                  >
                    <div className="w-12 aspect-square rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                    <span className="text-xs text-gray-900 mt-1 text-center font-medium leading-tight w-12">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Brands On Demand Section */}
          <BrandsOnDemand />

          {/* Featured Categories Section - 4 columns per row */}
          <div className="bg-white px-4 py-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Featured Categories</h2>
            
            <div className="grid grid-cols-4 gap-3">
              {featuredCategories.map((category) => (
                <div
                  key={category.id}
                  className="relative overflow-hidden rounded-xl aspect-[3/4] cursor-pointer group bg-gradient-to-b from-orange-200 to-orange-300"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  
                  {/* Category content */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="text-white">
                      <h3 className="font-bold text-xs text-center text-shadow-sm">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
