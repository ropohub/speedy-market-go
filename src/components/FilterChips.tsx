
import React from 'react';
import { ChevronDown, ArrowUpDown, X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useFilter } from '../contexts/FilterContext';

interface FilterChipsProps {
  onFilterChange?: () => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ onFilterChange }) => {
  const { 
    filterState, 
    setSortBy,
    addFilter,
    removeFilter
  } = useFilter();

  const handleSortChange = (sort: typeof filterState.sortBy) => {
    setSortBy(sort);
    onFilterChange?.();
  };

  const handleQuickSort = (sortType: 'newest' | 'popularity') => {
    setSortBy(sortType);
    onFilterChange?.();
  };

  const getSortLabel = () => {
    switch (filterState.sortBy) {
      case 'price-low':
        return 'Price: Low to High';
      case 'price-high':
        return 'Price: High to Low';
      case 'newest':
        return 'Newest First';
      case 'popularity':
        return 'Most Popular';
      default:
        return 'Sort by';
    }
  };

  const isQuickSortActive = (sortType: 'newest' | 'popularity') => {
    return filterState.sortBy === sortType;
  };

  return (
    <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className={`flex items-center gap-2 whitespace-nowrap ${
                  filterState.sortBy ? 'bg-orange-50 border-orange-200 text-orange-700' : ''
                }`}
              >
                <ArrowUpDown className="h-4 w-4" />
                {getSortLabel()}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-white border shadow-lg z-50">
              <DropdownMenuItem onClick={() => handleSortChange('price-low')}>
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange('price-high')}>
                Price: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange('newest')}>
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange('popularity')}>
                Most Popular
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* New Arrival Filter Chip */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickSort('newest')}
            className={`whitespace-nowrap ${
              isQuickSortActive('newest') 
                ? 'bg-orange-50 border-orange-200 text-orange-700' 
                : ''
            }`}
          >
            New Arrival
            {isQuickSortActive('newest') && (
              <X className="ml-1 h-3 w-3" />
            )}
          </Button>

          {/* Most Popular Filter Chip */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickSort('popularity')}
            className={`whitespace-nowrap ${
              isQuickSortActive('popularity') 
                ? 'bg-orange-50 border-orange-200 text-orange-700' 
                : ''
            }`}
          >
            Most Popular
            {isQuickSortActive('popularity') && (
              <X className="ml-1 h-3 w-3" />
            )}
          </Button>

          {/* Active Sort Indicator */}
          {filterState.sortBy && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              Sorted by {getSortLabel()}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterChips;
