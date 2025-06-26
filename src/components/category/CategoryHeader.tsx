
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CategoryHeaderProps {
  title: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="px-4 py-4 pt-6">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={handleBack}
          className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default CategoryHeader;
