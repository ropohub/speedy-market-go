
import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useFilter } from '../contexts/FilterContext';
import FilterModal from './FilterModal';

interface FloatingFilterButtonProps {
  onFilterChange?: () => void;
}

const FloatingFilterButton: React.FC<FloatingFilterButtonProps> = ({ onFilterChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { filterState } = useFilter();

  const handleApplyFilters = () => {
    onFilterChange?.();
  };

  const activeFiltersCount = filterState.selectedTags.length;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg h-14 w-14 p-0 relative"
        >
          <SlidersHorizontal className="h-6 w-6" />
          {activeFiltersCount > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApplyFilters}
      />
    </>
  );
};

export default FloatingFilterButton;
