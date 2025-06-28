import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { brandService } from '../api/brandClient';
import { Brand } from '../../protogen/api/common/proto/brand';

interface EthnicBrand {
  id: string;
  name: string;
  image: string;
  backgroundColor: string;
  offerText: string;
  description: string;
  brandLogo?: string;
}

const EthnicCollection: React.FC = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<EthnicBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Updated fallback brands with proper images and brand logos
  const fallbackBrands: EthnicBrand[] = [
    {
      id: 'libas',
      name: 'Libas',
      image: '/lovable-uploads/1b68c23f-a105-429f-9612-6354761b88dc.png',
      backgroundColor: 'from-pink-400 to-pink-600',
      offerText: 'MIN. 70% OFF',
      description: 'Festive Edge',
      brandLogo: '/lovable-uploads/0cfc2f94-4aca-4dd4-b34a-6af96f00f0dc.png'
    },
    {
      id: 'decathlon',
      name: 'DECATHLON',
      image: '/lovable-uploads/fed2d75f-54fd-492e-befc-995d89b0e9a0.png',
      backgroundColor: 'from-blue-400 to-blue-600',
      offerText: 'UP TO 70% OFF',
      description: 'Active Essentials',
      brandLogo: '/lovable-uploads/0c28e3f9-0e1e-4129-a491-f0751e26c9f2.png'
    },
    {
      id: 'yellow-chimes',
      name: 'Yellow Chimes',
      image: '/lovable-uploads/f1345680-4375-42e5-b4f1-12c76962ae5c.png',
      backgroundColor: 'from-orange-400 to-orange-600',
      offerText: 'UNDER 999',
      description: 'Neck Pieces',
      brandLogo: '/lovable-uploads/55cac01f-1f21-487e-ab2c-5d1f516f5871.png'
    }
  ];

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const fetchedBrands = await brandService.getBrands();
        
        const mappedBrands: EthnicBrand[] = fetchedBrands.map((brand: Brand, index: number) => ({
          id: brand.primaryKey?.brandId.toString() || `brand-${index}`,
          name: brand.name,
          image: brand.imageUrls[0] || fallbackBrands[index % fallbackBrands.length].image,
          backgroundColor: fallbackBrands[index % fallbackBrands.length].backgroundColor,
          offerText: fallbackBrands[index % fallbackBrands.length].offerText,
          description: fallbackBrands[index % fallbackBrands.length].description,
          brandLogo: fallbackBrands[index % fallbackBrands.length].brandLogo
        }));

        setBrands(mappedBrands.length > 0 ? mappedBrands : fallbackBrands);
      } catch (err) {
        console.error('Failed to fetch brands:', err);
        setError('Failed to load brands');
        setBrands(fallbackBrands);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleShopNow = () => {
    navigate('/products/women/ethnic-wear');
  };

  const handleBrandClick = (brandId: string) => {
    navigate(`/products/women/${brandId}`);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 py-6 px-4 mb-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading brands...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 py-6 px-4 mb-6">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-6 mb-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-orange-300 to-amber-300 rounded-full opacity-20"></div>
          <div className="absolute bottom-4 right-8 w-24 h-24 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full opacity-15"></div>
        </div>
        
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-4">
              <div className="inline-block bg-black text-white px-3 py-1 rounded-full text-xs font-bold mb-3">UPTO 50% OFF</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Featured Brands</h2>
            </div>
            
            <button
              onClick={handleShopNow}
              className="bg-white text-black px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors shadow-md"
            >
              SHOP NOW
            </button>
          </div>
        </div>

        {/* Models - Hidden on mobile for cleaner look */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-orange-100 opacity-30"></div>
          <img 
            src="/lovable-uploads/1b68c23f-a105-429f-9612-6354761b88dc.png" 
            alt="Ethnic Wear Models" 
            className="w-full h-full object-cover opacity-60" 
          />
        </div>
      </div>

      {/* Brands Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Shop by Brand</h3>
          {error && (
            <span className="text-xs text-orange-600">Using fallback data</span>
          )}
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {brands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => handleBrandClick(brand.id)}
              className="flex-shrink-0 w-40 h-56 cursor-pointer group"
            >
              {/* Smaller card - reduced from w-64 h-96 to w-40 h-56 */}
              <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-green-500">
                {/* Background image */}
                <div className="absolute inset-0">
                  <img 
                    src={brand.image} 
                    alt={brand.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>
                
                {/* Content overlay */}
                <div className="relative z-10 p-3 h-full flex flex-col justify-between text-white">
                  {/* Top content - Offer text */}
                  <div className="pt-2">
                    <h3 className="text-lg font-bold mb-1 text-white drop-shadow-lg">{brand.offerText}</h3>
                    <p className="text-sm text-white opacity-90 drop-shadow-md">{brand.description}</p>
                  </div>
                  
                  {/* Bottom content - Brand logos area */}
                  <div className="bg-white rounded-xl p-2 flex items-center justify-center gap-2 min-h-[50px]">
                    {brand.brandLogo ? (
                      <div className="flex items-center justify-center w-full">
                        <img 
                          src={brand.brandLogo} 
                          alt={brand.name}
                          className="max-h-8 max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-900 font-bold text-sm">{brand.name}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EthnicCollection;
