
import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const FilterBar = () => {
  const filters = ['Filters', 'Tops', 'Dresses', 'New In', 'On Sale'];
  const [activeFilter, setActiveFilter] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleFilterClick = (index: number) => {
    setActiveFilter(index);
    console.log(`Filter clicked: ${filters[index]}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 shadow-sm transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => handleFilterClick(index)}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-gray-400 text-sm font-medium transition-colors cursor-pointer bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-500`}
          >
            {index === 0 && <SlidersHorizontal size={14} />}
            {filter}
            {index === 0 && <ChevronDown size={14} />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
