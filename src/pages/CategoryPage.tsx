
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, SlidersHorizontal } from 'lucide-react';
import Layout from '../components/Layout';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const categoryData = {
    women: {
      title: 'Women\'s Fashion',
      subtitle: 'Discover trendy styles for every occasion',
      image: '/lovable-uploads/b95e5ab2-e9a2-4f49-9aa0-8ac2e55fd137.png',
      subcategories: [
        { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop' },
        { name: 'Tops & Shirts', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop' },
        { name: 'Bottoms', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=200&fit=crop' },
        { name: 'Ethnic Wear', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=200&fit=crop' },
        { name: 'Activewear', image: 'https://images.unsplash.com/photo-1506629905853-fb2faec7bb69?w=200&h=200&fit=crop' },
        { name: 'Lingerie', image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=200&h=200&fit=crop' }
      ]
    },
    men: {
      title: 'Men\'s Fashion',
      subtitle: 'Elevate your style with our collection',
      image: '/lovable-uploads/9a9a6676-d328-415f-8f18-d8475bb4a342.png',
      subcategories: [
        { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop' },
        { name: 'Shirts', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=200&h=200&fit=crop' },
        { name: 'Jeans & Pants', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop' },
        { name: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop' },
        { name: 'Activewear', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop' },
        { name: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' }
      ]
    },
    beauty: {
      title: 'Beauty & Care',
      subtitle: 'Enhance your natural beauty',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop',
      subcategories: [
        { name: 'Skincare', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=200&h=200&fit=crop' },
        { name: 'Makeup', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop' },
        { name: 'Hair Care', image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=200&h=200&fit=crop' },
        { name: 'Fragrance', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop' }
      ]
    }
  };

  const currentCategory = categoryData[category as keyof typeof categoryData] || categoryData.women;

  const handleSubcategoryClick = (subcategoryName: string) => {
    navigate(`/products?collection=${subcategoryName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <Layout>
      <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEDE0 50%, #FFE6D3 100%)'}}>
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100">
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-orange-50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <h1 className="font-bold text-gray-900 text-lg">{currentCategory.title}</h1>
            
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-orange-50 rounded-full transition-colors">
                <Search className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-orange-50 rounded-full transition-colors">
                <SlidersHorizontal className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="px-4 pt-6 pb-4">
          <div className="max-w-md mx-auto">
            <div className="relative bg-gradient-to-r from-orange-100/40 to-pink-100/40 rounded-2xl p-1 shadow-lg">
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                  <img 
                    src={currentCategory.image} 
                    alt={currentCategory.title}
                    className="w-32 h-32 object-cover rounded-full shadow-lg"
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-xl font-bold mb-1">{currentCategory.title}</h2>
                    <p className="text-sm opacity-90">{currentCategory.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="px-4 mb-6">
          <div className="max-w-md mx-auto">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {['New Arrivals', 'Best Sellers', 'Sale', 'Premium'].map((filter) => (
                <button 
                  key={filter}
                  className="flex-shrink-0 px-4 py-2 bg-white/70 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-full border border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Subcategories Grid */}
        <div className="px-4 pb-8">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Shop by Category</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {currentCategory.subcategories.map((subcategory, index) => (
                <div
                  key={index}
                  onClick={() => handleSubcategoryClick(subcategory.name)}
                  className="relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer group bg-white shadow-md hover:shadow-lg transition-all"
                >
                  <img
                    src={subcategory.image}
                    alt={subcategory.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Category name */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-bold text-white text-lg mb-1">
                      {subcategory.name}
                    </h4>
                    <p className="text-gray-200 text-sm">
                      Explore collection
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Brands */}
        <div className="bg-white/50 backdrop-blur-sm px-4 py-6">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Featured Brands</h3>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {['Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo', 'Forever 21'].map((brand) => (
                <div 
                  key={brand}
                  className="flex-shrink-0 w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <span className="text-sm font-bold text-gray-700">{brand}</span>
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
