
import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Badge } from './ui/badge';
import { useFilter } from '../contexts/FilterContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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

  const getSelectedCountForCategory = (categoryOptions: { tag: string; display: string }[]) => {
    return categoryOptions.filter(option => filterState.selectedTags.includes(option.tag)).length;
  };

  const CategoryFilter = ({ 
    title, 
    options, 
    categoryKey 
  }: { 
    title: string; 
    options: { tag: string; display: string }[];
    categoryKey: string;
  }) => {
    const selectedCount = getSelectedCountForCategory(options);
    const isExpanded = expandedCategory === categoryKey;

    return (
      <div className="relative">
        <button
          onClick={() => setExpandedCategory(isExpanded ? null : categoryKey)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
            selectedCount > 0 
              ? 'bg-orange-500 text-white border-orange-500' 
              : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300'
          }`}
        >
          <span className="font-medium text-sm">{title}</span>
          {selectedCount > 0 && (
            <span className="bg-white text-orange-500 rounded-full px-2 py-0.5 text-xs font-bold">
              {selectedCount}
            </span>
          )}
          <ChevronDown 
            className={`h-4 w-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {isExpanded && (
          <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[200px] z-10">
            <div className="grid grid-cols-2 gap-2">
              {options.map(({ tag, display }) => {
                const isSelected = filterState.selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => handleChipClick(tag)}
                    className={`text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                      isSelected 
                        ? 'bg-orange-100 text-orange-700 border border-orange-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {display}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="px-4 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto">
        {/* Selected Filters Summary */}
        {filterState.selectedTags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-gray-600">Active:</span>
              {filterState.selectedTags.map(tag => (
                <Badge
                  key={tag}
                  variant="default"
                  className="bg-orange-500 text-white hover:bg-orange-600"
                >
                  {getDisplayName(tag)}
                  <X 
                    className="ml-1 h-3 w-3 cursor-pointer hover:bg-orange-600 rounded-full p-0.5" 
                    onClick={() => handleRemoveFilter(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Filter Categories Row */}
        <div className="flex flex-wrap gap-3">
          <CategoryFilter 
            title="Gender" 
            options={FILTER_OPTIONS.gender} 
            categoryKey="gender"
          />
          <CategoryFilter 
            title="Category" 
            options={FILTER_OPTIONS.category} 
            categoryKey="category"
          />
          <CategoryFilter 
            title="Style" 
            options={FILTER_OPTIONS.style} 
            categoryKey="style"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterChips;
