
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
          
          {/* Tagline */}
          <p className="text-gray-700 text-sm font-medium mb-4">
            Your Favorite Brands, Delivered in 30 Minutes
          </p>
          
          {/* Delivery Rider Illustration */}
          <div className="absolute -top-2 right-4 w-16 h-16">
            <div className="relative">
              {/* Scooter illustration using CSS */}
              <div className="w-12 h-8 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-lg relative">
                {/* Rider */}
                <div className="absolute -top-2 left-2 w-4 h-4 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"></div>
                {/* Delivery box */}
                <div className="absolute -top-1 right-1 w-3 h-3 bg-purple-400 rounded"></div>
                {/* Wheels */}
                <div className="absolute -bottom-1 left-1 w-2 h-2 bg-gray-800 rounded-full"></div>
                <div className="absolute -bottom-1 right-2 w-2 h-2 bg-gray-800 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Tiles Grid */}
        <div className="grid grid-cols-2 gap-3">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm animate-pulse"
              />
            ))
          ) : error ? (
            <div className="col-span-2 text-center py-8">
              <p className="text-gray-500 text-sm">Unable to load brands</p>
            </div>
          ) : brands && brands.length > 0 ? (
            brands.slice(0, 8).map((brand) => (
              <div
                key={brand.primaryKey?.brandId || brand.name}
                className="aspect-square bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group p-4 flex items-center justify-center"
              >
                {brand.imageUrls && brand.imageUrls.length > 0 ? (
                  <img
                    src={brand.imageUrls[0]}
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
                  className="w-full h-full flex items-center justify-center text-gray-800 font-bold text-sm text-center leading-tight"
                  style={{ display: brand.imageUrls && brand.imageUrls.length > 0 ? 'none' : 'flex' }}
                >
                  {brand.name}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8">
              <p className="text-gray-500 text-sm">No brands available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandsOnDemand;
