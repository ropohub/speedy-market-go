
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

interface CategoryHeaderProps {
  title: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className="px-4 py-4 pt-24" style={{background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 100%)'}}>
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {title}
          </h1>
        </div>
      </div>
    </>
  );
};

export default CategoryHeader;
