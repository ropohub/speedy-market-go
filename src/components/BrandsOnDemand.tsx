
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
    <div className="px-4 py-6 bg-gradient-to-br from-pink-100 via-orange-50 to-purple-100 relative">
      {/* Curvy line separator at the top */}
      <div className="absolute -top-4 left-0 w-full h-8 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="white"
            opacity="0.25"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="white"
            opacity="0.5"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="white"
          />
        </svg>
      </div>
      
      <div className="max-w-md mx-auto">
        {/* Header Section - Left aligned text with right aligned image */}
        <div className="flex items-center justify-between mb-6 relative">
          {/* Left side - Text content */}
          <div className="flex-1">
            {/* Dripzy Logo */}
            <div className="mb-1">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                Dripzy
              </h1>
            </div>
            
            {/* Main Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Brands On Demand
            </h2>
            
            {/* Tagline */}
            <p className="text-gray-600 text-sm font-medium">
              Top Faves, Arriving In Record Time
            </p>
          </div>
          
          {/* Right side - Delivery Rider Illustration */}
          <div className="w-24 h-24 flex-shrink-0 ml-4">
            <div className="relative w-full h-full">
              {/* Enhanced scooter illustration matching the reference */}
              <div className="w-20 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg relative shadow-lg">
                {/* Rider */}
                <div className="absolute -top-4 left-4 w-6 h-6 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full shadow-sm"></div>
                {/* Helmet */}
                <div className="absolute -top-5 left-3 w-4 h-3 bg-orange-300 rounded-full"></div>
                {/* Delivery box */}
                <div className="absolute -top-3 right-1 w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded shadow-sm"></div>
                {/* Front wheel */}
                <div className="absolute -bottom-3 left-2 w-4 h-4 bg-gray-800 rounded-full shadow-sm"></div>
                {/* Back wheel */}
                <div className="absolute -bottom-3 right-4 w-4 h-4 bg-gray-800 rounded-full shadow-sm"></div>
                {/* Scooter body details */}
                <div className="absolute top-3 left-8 w-8 h-3 bg-cyan-300 rounded"></div>
                {/* Windshield */}
                <div className="absolute top-1 left-6 w-3 h-4 bg-cyan-200 rounded-t-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Tiles Grid - 2 rows x 4 columns with perfect square aspect ratio and gradients */}
        <div className="grid grid-cols-4 gap-2.5">
          {isLoading ? (
            // Loading skeleton - 8 tiles
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-0 pb-[100%] relative bg-gradient-to-br from-white/90 to-gray-100/80 backdrop-blur-sm rounded-2xl shadow-sm animate-pulse"
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
                className="w-full h-0 pb-[100%] relative bg-gradient-to-br from-white/95 via-pink-50/80 to-purple-50/70 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-white/50"
              >
                <div className="absolute inset-0 p-2.5 flex items-center justify-center">
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
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-8">
              <p className="text-gray-500 text-sm">No brands available</p>
            </div>
          )}
        </div>
      </div>

      {/* Curvy line separator at the bottom */}
      <div className="absolute -bottom-4 left-0 w-full h-8 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,96L40,101.3C80,107,160,117,240,117.3C320,117,400,107,480,96C560,85,640,75,720,74.7C800,75,880,85,960,85.3C1040,85,1120,75,1160,69.3L1200,64V120H1160C1120,120,1040,120,960,120C880,120,800,120,720,120C640,120,560,120,480,120C400,120,320,120,240,120C160,120,80,120,40,120H0V96Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default BrandsOnDemand;
