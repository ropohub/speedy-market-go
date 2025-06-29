
import React from 'react';
import { X } from 'lucide-react';
import { useFilter, FilterOption } from '../contexts/FilterContext';
import { Badge } from './ui/badge';

const FilterChips: React.FC = () => {
  const { selectedFilters, addFilter, removeFilter } = useFilter();

  const allFilterOptions: FilterOption[] = [
    // Gender filters
    { id: 'women', label: 'Women', tag: "Women's Wear", category: 'gender' },
    { id: 'men', label: 'Men', tag: "Men's Wear", category: 'gender' },
    
    // Category filters
    { id: 'tops', label: 'Tops', tag: 'Tops', category: 'category' },
    { id: 'dresses', label: 'Dresses', tag: 'Dresses', category: 'category' },
    { id: 'jeans', label: 'Jeans', tag: 'Jeans', category: 'category' },
    { id: 'shorts', label: 'Shorts', tag: 'Shorts', category: 'category' },
    { id: 'jackets', label: 'Jackets', tag: 'Jackets', category: 'category' },
    { id: 'trousers', label: 'Trousers', tag: 'Trousers', category: 'category' },
    
    // Style filters
    { id: 'casual-wear', label: 'Casual', tag: 'Casual Wear', category: 'style' },
    { id: 'western-wear', label: 'Western', tag: 'Western Wear', category: 'style' },
    { id: 'sports-wear', label: 'Sports', tag: 'Sports Wear', category: 'style' },
    { id: 'gen-z-fashion', label: 'Gen-Z', tag: 'Gen-Z Fashion', category: 'style' },
    
    // Type filters
    { id: 'crop-tops', label: 'Crop Tops', tag: 'Crop Tops', category: 'type' },
    { id: 'tank-tops', label: 'Tank Tops', tag: 'Tank Tops', category: 'type' },
    { id: 't-shirts', label: 'T-Shirts', tag: 'T-Shirts', category: 'type' },
    { id: 'oversized-tees', label: 'Oversized Tees', tag: 'Oversized Tees', category: 'type' },
    { id: 'co-ords', label: 'Co-ords', tag: 'Co-ords', category: 'type' },
    { id: 'mini-skirts', label: 'Mini Skirts', tag: 'Mini Skirts', category: 'type' },
    { id: 'cargos', label: 'Cargos', tag: 'Cargos', category: 'type' },
    { id: 'sweatshirts', label: 'Sweatshirts', tag: 'Sweatshirts', category: 'type' },
    { id: 'sweaters', label: 'Sweaters', tag: 'Sweaters', category: 'type' },
    { id: 'shirts', label: 'Shirts', tag: 'Shirts', category: 'type' },
    { id: 'oversized-shirts', label: 'Oversized Shirts', tag: 'Oversized Shirts', category: 'type' },
    { id: 'skirts-shorts', label: 'Skirts & Shorts', tag: 'Skirts & Shorts', category: 'type' },
    { id: 'track-pants', label: 'Track Pants', tag: 'Track Pants', category: 'type' },
    { id: 'lounge-pants', label: 'Lounge Pants', tag: 'Lounge Pants', category: 'type' },
    { id: 'lingerie-loungewear', label: 'Lingerie & Loungewear', tag: 'Lingerie & Loungewear', category: 'type' },
    { id: 'bras', label: 'Bras', tag: 'Bras', category: 'type' },
    { id: 'briefs', label: 'Briefs', tag: 'Briefs', category: 'type' },
  ];

  const handleFilterClick = (filter: FilterOption) => {
    const isSelected = selectedFilters.find(f => f.id === filter.id);
    if (isSelected) {
      removeFilter(filter.id);
    } else {
      addFilter(filter);
    }
  };

  const groupedFilters = allFilterOptions.reduce((acc, filter) => {
    if (!acc[filter.category]) {
      acc[filter.category] = [];
    }
    acc[filter.category].push(filter);
    return acc;
  }, {} as Record<string, FilterOption[]>);

  const categoryLabels = {
    gender: 'Gender',
    category: 'Categories',
    style: 'Style',
    type: 'Types'
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-md mx-auto">
        {/* Selected Filters */}
        {selectedFilters.length > 0 && (
          <div className="mb-3">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Applied Filters:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedFilters.map((filter) => (
                <Badge
                  key={filter.id}
                  variant="default"
                  className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 cursor-pointer"
                  onClick={() => removeFilter(filter.id)}
                >
                  {filter.label}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Filter Categories */}
        <div className="space-y-3">
          {Object.entries(groupedFilters).map(([category, filters]) => (
            <div key={category}>
              <h4 className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h4>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => {
                  const isSelected = selectedFilters.find(f => f.id === filter.id);
                  return (
                    <Badge
                      key={filter.id}
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => handleFilterClick(filter)}
                    >
                      {filter.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterChips;
