
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from './ui/badge';
import { useFilter } from '../contexts/FilterContext';

// Available filter options organized by category
const FILTER_OPTIONS = {
  gender: [
    { tag: "Men's Wear", display: "Men" },
    { tag: "Women's Wear", display: "Women" }
  ],
  category: [
    { tag: "T-Shirts", display: "T-Shirts" },
    { tag: "Jeans", display: "Jeans" },
    { tag: "Dresses", display: "Dresses" },
    { tag: "Tank Tops", display: "Tank Tops" },
    { tag: "Crop Tops", display: "Crop Tops" },
    { tag: "Shorts", display: "Shorts" },
    { tag: "Jackets", display: "Jackets" },
    { tag: "Co-ords", display: "Co-ords" },
    { tag: "Mini Skirts", display: "Mini Skirts" },
    { tag: "Cargos", display: "Cargos" },
    { tag: "Trousers", display: "Trousers" },
    { tag: "Sweatshirts", display: "Sweatshirts" }
  ],
  style: [
    { tag: "Casual Wear", display: "Casual" },
    { tag: "Sports Wear", display: "Sports" },
    { tag: "Formal Wear", display: "Formal" },
    { tag: "Gen-Z Fashion", display: "Gen-Z" },
    { tag: "Oversized Tees", display: "Oversized" }
  ]
};

interface FilterChipsProps {
  onFilterChange?: () => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ onFilterChange }) => {
  const { filterState, addFilter, removeFilter } = useFilter();

  const handleChipClick = (tag: string) => {
    if (filterState.selectedTags.includes(tag)) {
      removeFilter(tag);
    } else {
      addFilter(tag);
    }
    onFilterChange?.();
  };

  const handleRemoveFilter = (tag: string) => {
    removeFilter(tag);
    onFilterChange?.();
  };

  const getDisplayName = (tag: string): string => {
    const allOptions = [
      ...FILTER_OPTIONS.gender,
      ...FILTER_OPTIONS.category,
      ...FILTER_OPTIONS.style
    ];
    const option = allOptions.find(opt => opt.tag === tag);
    return option?.display || tag;
  };

  const renderFilterGroup = (title: string, options: { tag: string; display: string }[]) => (
    <div className="mb-3">
      <h4 className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {options.map(({ tag, display }) => {
          const isSelected = filterState.selectedTags.includes(tag);
          return (
            <Badge
              key={tag}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => handleChipClick(tag)}
            >
              {display}
              {isSelected && (
                <X 
                  className="ml-1 h-3 w-3 cursor-pointer hover:bg-orange-600 rounded-full" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFilter(tag);
                  }}
                />
              )}
            </Badge>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="px-4 py-4 bg-white/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        {/* Selected Filters Summary */}
        {filterState.selectedTags.length > 0 && (
          <div className="mb-4 pb-3 border-b border-gray-200">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-gray-700">Active Filters:</span>
              {filterState.selectedTags.map(tag => (
                <Badge
                  key={tag}
                  variant="default"
                  className="bg-orange-500 text-white"
                >
                  {getDisplayName(tag)}
                  <X 
                    className="ml-1 h-3 w-3 cursor-pointer hover:bg-orange-600 rounded-full" 
                    onClick={() => handleRemoveFilter(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Filter Categories */}
        <div className="space-y-4">
          {renderFilterGroup("Gender", FILTER_OPTIONS.gender)}
          {renderFilterGroup("Category", FILTER_OPTIONS.category)}
          {renderFilterGroup("Style", FILTER_OPTIONS.style)}
        </div>
      </div>
    </div>
  );
};

export default FilterChips;
