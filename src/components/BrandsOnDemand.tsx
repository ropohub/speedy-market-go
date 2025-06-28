
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { brandService } from '../api/brandClient';

const BrandsOnDemand: React.FC = () => {
  const { data: brands, isLoading, error } = useQuery({
    queryKey: ['brands'],
    queryFn: brandService.getBrands,
  });

  console.log('Brands data:', brands);
  console.log('Loading state:', isLoading);
  console.log('Error:', error);

  // Additional mock brands to fill the grid (6 more brands)
  const additionalBrands = [
    { name: 'PUMA', imageUrl: 'https://logoeps.com/wp-content/uploads/2013/03/puma-vector-logo.png' },
    { name: 'adidas', imageUrl: 'https://logoeps.com/wp-content/uploads/2012/11/adidas-vector-logo.png' },
    { name: 'MARKS & SPENCER', imageUrl: 'https://1000logos.net/wp-content/uploads/2020/09/Marks-Spencer-Logo.png' },
    { name: 'Sangria', imageUrl: 'https://images.meesho.com/images/products/114472076/bvhpv_512.webp' },
    { name: 'HRX', imageUrl: 'https://assets.ajio.com/medias/sys_master/root/20230629/Km4I/649ce26feebac147fc14538a/hrx-by-hrithik-roshan-black-logo-print-slim-fit-t-shirt.jpg' },
    { name: 'TOKYO TALKIES', imageUrl: 'https://assets.ajio.com/medias/sys_master/root/20220916/lhSy/632444f1f997ddfdbd6a1e0f/tokyo-talkies-black-floral-print-regular-fit-shirt.jpg' }
  ];

  // Combine backend brands with additional brands
  const allBrands = [
    ...(brands || []).map(brand => ({
      name: brand.name,
      imageUrl: brand.imageUrls?.[0] || null
    })),
    ...additionalBrands
  ].slice(0, 8); // Ensure we only show 8 brands total

  return (
    <div className="px-4 py-6 bg-gradient-to-br from-pink-100 via-orange-50 to-purple-100">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6 relative">
          {/* Dripzy Fast Logo */}
          <div className="mb-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Dripzy Fast
            </h1>
          </div>
          
          {/* Main Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Brands On Demand
          </h2>
          
          {/* Tagline */}
          <p className="text-gray-600 text-sm font-medium mb-4">
            Top Faves, Arriving In Record Time
          </p>
          
          {/* Delivery Rider Illustration */}
          <div className="absolute -top-2 right-4 w-20 h-20">
            <div className="relative">
              {/* Enhanced scooter illustration */}
              <div className="w-16 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg relative shadow-md">
                {/* Rider */}
                <div className="absolute -top-3 left-3 w-5 h-5 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full shadow-sm"></div>
                {/* Helmet */}
                <div className="absolute -top-4 left-2 w-3 h-2 bg-orange-300 rounded-full"></div>
                {/* Delivery box */}
                <div className="absolute -top-2 right-1 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded shadow-sm"></div>
                {/* Front wheel */}
                <div className="absolute -bottom-2 left-1 w-3 h-3 bg-gray-800 rounded-full shadow-sm"></div>
                {/* Back wheel */}
                <div className="absolute -bottom-2 right-3 w-3 h-3 bg-gray-800 rounded-full shadow-sm"></div>
                {/* Scooter body details */}
                <div className="absolute top-2 left-6 w-6 h-2 bg-cyan-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Tiles Grid - 2 rows x 4 columns */}
        <div className="grid grid-cols-4 gap-3">
          {isLoading ? (
            // Loading skeleton - 8 tiles
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm animate-pulse"
              />
            ))
          ) : error ? (
            <div className="col-span-4 text-center py-8">
              <p className="text-gray-500 text-sm">Unable to load brands</p>
            </div>
          ) : allBrands.length > 0 ? (
            allBrands.map((brand, index) => (
              <div
                key={brand.name + index}
                className="aspect-square bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group p-3 flex items-center justify-center"
              >
                {brand.imageUrl ? (
                  <img
                    src={brand.imageUrl}
                    alt={brand.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextSibling) {
                        (target.nextSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div 
                  className="w-full h-full flex items-center justify-center text-gray-800 font-bold text-xs text-center leading-tight p-1"
                  style={{ display: brand.imageUrl ? 'none' : 'flex' }}
                >
                  {brand.name}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-8">
              <p className="text-gray-500 text-sm">No brands available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandsOnDemand;
