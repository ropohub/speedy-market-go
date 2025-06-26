
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import CategoryHeader from '../components/category/CategoryHeader';
import CategorySection from '../components/category/CategorySection';
import YellowBanner from '../components/YellowBanner';
import { categoryData } from '../data/categoryData';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  const currentCategory = categoryData[categoryName || 'women'] || categoryData.women;

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <CategoryHeader title={currentCategory.title} />
        
        <div style={{background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 100%)'}}>
          {/* Featured Categories Section */}
          <CategorySection 
            title="Featured Categories" 
            items={currentCategory.featuredCategories} 
            isGrid={true}
          />
          
          {/* Top Selling Products Section */}
          <CategorySection 
            title="Top Selling Products" 
            products={currentCategory.topSellingProducts}
          />
          
          {/* Dresses/Suits Section */}
          <CategorySection 
            title={categoryName === 'men' ? 'Formal Wear' : 'Dresses'} 
            products={currentCategory.dresses}
          />
          
          {/* New Arrivals Section */}
          <CategorySection 
            title="New Arrivals" 
            products={currentCategory.newArrivals}
          />
          
          {/* Best Sellers Section */}
          <CategorySection 
            title="Best Sellers" 
            products={currentCategory.bestSellers}
          />
          
          <YellowBanner />
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
