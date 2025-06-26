
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EverydayEssentials: React.FC = () => {
  const navigate = useNavigate();

  const essentialCategories = [
    {
      id: 'personal-care',
      name: 'Personal Care & Hygiene',
      image: '/lovable-uploads/b99f6ddd-7e0e-4350-8ad7-cf9871803b27.png'
    },
    {
      id: 'wardrobe-basics',
      name: 'Wardrobe Basics',
      image: '/lovable-uploads/830272f8-d80f-4f3c-b69a-08f3b0962cda.png'
    },
    {
      id: 'home-finds',
      name: 'Home Finds',
      image: '/lovable-uploads/81c15fc4-f6d5-4359-8025-f2c3a0a77a8a.png'
    },
    {
      id: 'comfy-footwear',
      name: 'Comfy Footwear',
      image: '/lovable-uploads/ecaaf61b-2105-4c36-8464-0d14580e5913.png'
    }
  ];

  const handleShopNow = () => {
    navigate('/products/women/all');
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products/essentials/${categoryId}`);
  };

  return (
    <div className="mx-4 my-6">
      <div 
        className="rounded-2xl p-6"
        style={{
          background: 'linear-gradient(135deg, #FFEEE6 0%, #FFE4E1 100%)'
        }}
      >
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Everyday Essentials
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            Self-Care & More Delivered Fast
          </p>
          <button
            onClick={handleShopNow}
            className="bg-white text-black font-semibold px-8 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            SHOP NOW
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4">
          {essentialCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-gray-50">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-black text-sm font-medium text-center leading-tight">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EverydayEssentials;
