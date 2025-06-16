
import React, { useState } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import { categories } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin, ChevronDown, ShoppingCart } from 'lucide-react';

const Categories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('women');
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products/${selectedCategory}/${categoryId}`);
  };

  // Vertical sidebar categories
  const sidebarCategories = [
    { id: 'women', name: "Women's\nWear", icon: '👗', bgColor: 'bg-pink-100', textColor: 'text-pink-600', borderColor: 'border-pink-200' },
    { id: 'men', name: "Men's\nWear", icon: '👔', bgColor: 'bg-blue-100', textColor: 'text-blue-600', borderColor: 'border-blue-200' },
    { id: 'footwear', name: 'Footwear', icon: '👠', bgColor: 'bg-purple-100', textColor: 'text-purple-600', borderColor: 'border-purple-200' },
    { id: 'accessories', name: 'Beauty &\nGrooming', icon: '💄', bgColor: 'bg-rose-100', textColor: 'text-rose-600', borderColor: 'border-rose-200' },
    { id: 'kids', name: 'Kids\nWear', icon: '👶', bgColor: 'bg-yellow-100', textColor: 'text-yellow-600', borderColor: 'border-yellow-200' },
    { id: 'home', name: 'Home &\nLiving', icon: '🏠', bgColor: 'bg-green-100', textColor: 'text-green-600', borderColor: 'border-green-200' }
  ];

  // Category content data
  const categoryContent = {
    women: {
      banner: {
        title: "Women's Fashion Store",
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=200&fit=crop'
      },
      westernWear: [
        { id: 'dresses', name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=150&h=150&fit=crop' },
        { id: 'tops', name: 'Tops', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=150&fit=crop' },
        { id: 'jeans', name: 'Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=150&h=150&fit=crop' },
        { id: 'trousers', name: 'Trousers', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop' },
        { id: 'tshirts', name: 'T-shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop' },
        { id: 'shirts', name: 'Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=150&h=150&fit=crop' },
        { id: 'coords', name: 'Co-ords', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=150&h=150&fit=crop' },
        { id: 'skirts', name: 'Skirts & Shorts', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d14?w=150&h=150&fit=crop' },
        { id: 'jumpsuits', name: 'Jumpsuits', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=150&h=150&fit=crop' }
      ],
      ethnicWear: [
        { id: 'kurta-sets', name: 'Kurta Sets', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150&h=150&fit=crop' },
        { id: 'kurtas', name: 'Kurtas', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop' },
        { id: 'ethnic-alley', name: 'Ethnic Alley', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150&h=150&fit=crop' }
      ]
    },
    men: {
      banner: {
        title: "Men's Fashion Store",
        image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=300&h=200&fit=crop'
      },
      casualWear: [
        { id: 'tshirts', name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop' },
        { id: 'shirts', name: 'Shirts', image: 'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=150&h=150&fit=crop' },
        { id: 'jeans', name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=150&fit=crop' },
        { id: 'trousers', name: 'Trousers', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=150&h=150&fit=crop' },
        { id: 'shorts', name: 'Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=150&h=150&fit=crop' },
        { id: 'hoodies', name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a9fbc86ecd0?w=150&h=150&fit=crop' }
      ],
      formalWear: [
        { id: 'suits', name: 'Suits', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
        { id: 'blazers', name: 'Blazers', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=150&h=150&fit=crop' },
        { id: 'formal-shirts', name: 'Formal Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=150&h=150&fit=crop' }
      ]
    },
    footwear: {
      banner: {
        title: "Footwear Collection",
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop'
      },
      womensFootwear: [
        { id: 'heels', name: 'Heels', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=150&h=150&fit=crop' },
        { id: 'flats', name: 'Flats', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=150&h=150&fit=crop' },
        { id: 'sneakers', name: 'Sneakers', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop' },
        { id: 'boots', name: 'Boots', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=150&h=150&fit=crop' }
      ],
      mensFootwear: [
        { id: 'formal-shoes', name: 'Formal Shoes', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=150&h=150&fit=crop' },
        { id: 'casual-shoes', name: 'Casual Shoes', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=150&h=150&fit=crop' },
        { id: 'sports-shoes', name: 'Sports Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop' }
      ]
    },
    accessories: {
      banner: {
        title: "Beauty & Grooming",
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop'
      },
      makeup: [
        { id: 'lipstick', name: 'Lipstick', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=150&h=150&fit=crop' },
        { id: 'foundation', name: 'Foundation', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=150&h=150&fit=crop' },
        { id: 'eyeshadow', name: 'Eyeshadow', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=150&h=150&fit=crop' },
        { id: 'mascara', name: 'Mascara', image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=150&h=150&fit=crop' }
      ],
      skincare: [
        { id: 'moisturizer', name: 'Moisturizer', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=150&h=150&fit=crop' },
        { id: 'cleanser', name: 'Cleanser', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=150&h=150&fit=crop' },
        { id: 'serum', name: 'Serum', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=150&h=150&fit=crop' }
      ]
    },
    kids: {
      banner: {
        title: "Kids Fashion",
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=200&fit=crop'
      },
      boysWear: [
        { id: 'boys-tshirts', name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=150&h=150&fit=crop' },
        { id: 'boys-shirts', name: 'Shirts', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop' },
        { id: 'boys-jeans', name: 'Jeans', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=150&fit=crop' },
        { id: 'boys-shorts', name: 'Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=150&h=150&fit=crop' }
      ],
      girlsWear: [
        { id: 'girls-dresses', name: 'Dresses', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=150&h=150&fit=crop' },
        { id: 'girls-tops', name: 'Tops', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=150&fit=crop' },
        { id: 'girls-skirts', name: 'Skirts', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d14?w=150&h=150&fit=crop' }
      ]
    },
    home: {
      banner: {
        title: "Home & Living",
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'
      },
      decor: [
        { id: 'cushions', name: 'Cushions', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop' },
        { id: 'wall-art', name: 'Wall Art', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=150&h=150&fit=crop' },
        { id: 'candles', name: 'Candles', image: 'https://images.unsplash.com/photo-1602874801006-98cc0c840850?w=150&h=150&fit=crop' },
        { id: 'plants', name: 'Plants', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=150&h=150&fit=crop' }
      ],
      bedding: [
        { id: 'bed-sheets', name: 'Bed Sheets', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=150&h=150&fit=crop' },
        { id: 'pillows', name: 'Pillows', image: 'https://images.unsplash.com/photo-1582628502337-d16c554bda95?w=150&h=150&fit=crop' },
        { id: 'blankets', name: 'Blankets', image: 'https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?w=150&h=150&fit=crop' }
      ]
    }
  };

  const handleSidebarCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const renderContent = () => {
    if (selectedCategory === 'women') {
      const content = categoryContent.women;
      return (
        <>
          <div className="px-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Western Wear</h3>
            <div className="grid grid-cols-3 gap-4">
              {content.westernWear.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ethnic Wear</h3>
            <div className="flex gap-6 overflow-x-auto pb-2">
              {content.ethnicWear.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className="flex flex-col items-center cursor-pointer flex-shrink-0"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else if (selectedCategory === 'men') {
      const content = categoryContent.men;
      return (
        <>
          <div className="px-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Casual Wear</h3>
            <div className="grid grid-cols-3 gap-4">
              {content.casualWear.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Formal Wear</h3>
            <div className="flex gap-6 overflow-x-auto pb-2">
              {content.formalWear.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className="flex flex-col items-center cursor-pointer flex-shrink-0"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else if (selectedCategory === 'footwear') {
      const content = categoryContent.footwear;
      return (
        <>
          <div className="px-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Women's Footwear</h3>
            <div className="grid grid-cols-3 gap-4">
              {content.womensFootwear.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Men's Footwear</h3>
            <div className="flex gap-6 overflow-x-auto pb-2">
              {content.mensFootwear.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className="flex flex-col items-center cursor-pointer flex-shrink-0"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else if (selectedCategory === 'accessories') {
      const content = categoryContent.accessories;
      return (
        <>
          <div className="px-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Makeup</h3>
            <div className="grid grid-cols-3 gap-4">
              {content.makeup.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Skincare</h3>
            <div className="flex gap-6 overflow-x-auto pb-2">
              {content.skincare.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className="flex flex-col items-center cursor-pointer flex-shrink-0"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else if (selectedCategory === 'kids') {
      const content = categoryContent.kids;
      return (
        <>
          <div className="px-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Boys Wear</h3>
            <div className="grid grid-cols-3 gap-4">
              {content.boysWear.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Girls Wear</h3>
            <div className="flex gap-6 overflow-x-auto pb-2">
              {content.girlsWear.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className="flex flex-col items-center cursor-pointer flex-shrink-0"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else if (selectedCategory === 'home') {
      const content = categoryContent.home;
      return (
        <>
          <div className="px-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Home Decor</h3>
            <div className="grid grid-cols-3 gap-4">
              {content.decor.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Bedding</h3>
            <div className="flex gap-6 overflow-x-auto pb-2">
              {content.bedding.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className="flex flex-col items-center cursor-pointer flex-shrink-0"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }
    
    return null;
  };

  const currentContent = categoryContent[selectedCategory as keyof typeof categoryContent] || categoryContent.women;

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Top Bar - Matching Home Page Style */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-black" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1 py-0">
                  <span className="text-zinc-950 text-lg font-bold">Home</span>
                  <ChevronDown className="w-4 h-4 text-black" />
                </div>
                <span className="opacity-90 text-zinc-950 font-semibold text-xs">Flat 103, house 288, Medicity, Islam...</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-black" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">B</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar - Using the same SearchBar component as homepage */}
        <SearchBar />

        <div className="flex">
          {/* Vertical Sidebar */}
          <div className="w-20 bg-white border-r border-gray-200 min-h-screen">
            <div className="py-4 space-y-4">
              {sidebarCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleSidebarCategoryChange(category.id)}
                  className={`mx-2 cursor-pointer transition-all ${
                    selectedCategory === category.id 
                      ? `${category.bgColor} ${category.borderColor} border-2 shadow-sm` 
                      : 'hover:bg-gray-50'
                  } rounded-xl p-2`}
                >
                  <div className="flex flex-col items-center">
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <span className={`text-xs font-medium text-center leading-tight ${
                      selectedCategory === category.id 
                        ? category.textColor 
                        : 'text-gray-600'
                    }`} style={{ whiteSpace: 'pre-line' }}>
                      {category.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white">
            {/* Banner */}
            <div className="p-4">
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl p-4 relative overflow-hidden">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-purple-800 mb-1">{currentContent.banner.title}</h2>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={currentContent.banner.image}
                      alt="Fashion"
                      className="w-16 h-16 rounded-lg object-cover mr-2"
                    />
                    <ChevronRight className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Content Based on Selected Category */}
            {renderContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
