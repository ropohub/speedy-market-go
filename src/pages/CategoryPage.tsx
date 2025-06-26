
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import CategoryHeader from '../components/category/CategoryHeader';
import CategorySection from '../components/category/CategorySection';
import { categoryData } from '../data/categoryData';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  const handleItemClick = (itemId: string) => {
    console.log('Navigate to:', itemId);
  };

  const currentCategory = categoryData[categoryName || 'women'] || categoryData.women;

  return (
    <Layout>
      <div className="min-h-screen" style={{
        background: 'linear-gradient(135deg, #FFEFE4 0%, #FFF5F0 25%, #FFEDE0 50%, #FFF8F3 75%, #FFEFE4 100%)'
      }}>
        <CategoryHeader title={currentCategory.title} />
        
        <div className="pb-8">
          {currentCategory.sections.map((section, index) => (
            <CategorySection
              key={index}
              title={section.title}
              items={section.items}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
