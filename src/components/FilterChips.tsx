
import React from 'react';
import { ChevronDown, ArrowUpDown } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
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
    setMaxPrice 
  } = useFilter();

  const handleSortChange = (sort: typeof filterState.sortBy) => {
    setSortBy(sort);
    onFilterChange?.();
  };

  const handlePriceChange = (value: number[]) => {
    setMaxPrice(value[0]);
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
            <DropdownMenuContent align="start" className="w-48 bg-white border shadow-lg">
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

          {/* Price Range Filter */}
          <div className="flex items-center gap-3 min-w-[200px]">
            <Label className="text-sm font-medium whitespace-nowrap">
              Max Price: ₹{filterState.maxPrice}
            </Label>
            <Slider
              value={[filterState.maxPrice]}
              onValueChange={handlePriceChange}
              max={10000}
              min={500}
              step={100}
              className="flex-1"
            />
          </div>

          {/* Active Filters Count */}
          {filterState.selectedTags.length > 0 && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              {filterState.selectedTags.length} filter{filterState.selectedTags.length !== 1 ? 's' : ''} active
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterChips;
