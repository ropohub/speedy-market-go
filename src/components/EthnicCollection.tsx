
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
}

const EthnicCollection: React.FC = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<EthnicBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback brands in case API fails - updated with offer information
  const fallbackBrands: EthnicBrand[] = [
    {
      id: 'hm',
      name: 'H&M',
      image: '/lovable-uploads/0cfc2f94-4aca-4dd4-b34a-6af96f00f0dc.png',
      backgroundColor: 'from-pink-400 to-pink-600',
      offerText: 'MIN. 70% OFF',
      description: 'Festive Edge'
    },
    {
      id: 'jockey',
      name: 'JOCKEY',
      image: '/lovable-uploads/0c28e3f9-0e1e-4129-a491-f0751e26c9f2.png',
      backgroundColor: 'from-blue-400 to-blue-600',
      offerText: 'UP TO 70% OFF',
      description: 'Active Essentials'
    },
    {
      id: 'zara',
      name: 'ZARA',
      image: '/lovable-uploads/55cac01f-1f21-487e-ab2c-5d1f516f5871.png',
      backgroundColor: 'from-orange-400 to-orange-600',
      offerText: 'UNDER 999',
      description: 'Neck Pieces'
    }
  ];

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const fetchedBrands = await brandService.getBrands();
        
        // Map the protobuf Brand objects to our EthnicBrand interface
        const mappedBrands: EthnicBrand[] = fetchedBrands.map((brand: Brand, index: number) => ({
          id: brand.primaryKey?.brandId.toString() || `brand-${index}`,
          name: brand.name,
          image: brand.imageUrls[0] || fallbackBrands[index % fallbackBrands.length].image,
          backgroundColor: fallbackBrands[index % fallbackBrands.length].backgroundColor,
          offerText: fallbackBrands[index % fallbackBrands.length].offerText,
          description: fallbackBrands[index % fallbackBrands.length].description
        }));

        setBrands(mappedBrands.length > 0 ? mappedBrands : fallbackBrands);
      } catch (err) {
        console.error('Failed to fetch brands:', err);
        setError('Failed to load brands');
        setBrands(fallbackBrands); // Use fallback data
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
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {brands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => handleBrandClick(brand.id)}
              className="flex-shrink-0 w-64 h-80 cursor-pointer group"
            >
              {/* Card matching the reference design */}
              <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 border-4 border-green-500">
                {/* Background image */}
                <div className="absolute inset-0">
                  <img 
                    src={brand.image} 
                    alt={brand.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  {/* Overlay for text readability */}
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                </div>
                
                {/* Content overlay */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                  {/* Top content - Offer text */}
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{brand.offerText}</h3>
                    <p className="text-lg opacity-90">{brand.description}</p>
                  </div>
                  
                  {/* Bottom content - Brand logo area */}
                  <div className="bg-white bg-opacity-95 rounded-2xl p-4 flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-lg">{brand.name}</span>
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
