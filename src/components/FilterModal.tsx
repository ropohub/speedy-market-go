
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
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

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply }) => {
  const { filterState, addFilter, removeFilter, clearFilters } = useFilter();

  console.log('FilterModal - Current filter state:', filterState);

  const handleTagToggle = (tag: string) => {
    console.log('FilterModal - Toggling tag:', tag, 'Current selected:', filterState.selectedTags);
    
    if (filterState.selectedTags.includes(tag)) {
      removeFilter(tag);
    } else {
      addFilter(tag);
    }
  };

  const handleApply = () => {
    onApply();
    onClose();
  };

  const handleClearAll = () => {
    clearFilters();
  };

  const isTagSelected = (tag: string) => {
    const selected = filterState.selectedTags.includes(tag);
    console.log(`FilterModal - Tag ${tag} selected:`, selected);
    return selected;
  };

  const renderFilterSection = (title: string, options: { tag: string; display: string }[]) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <div className="space-y-3">
        {options.map(({ tag, display }) => {
          const isChecked = isTagSelected(tag);
          return (
            <div key={tag} className="flex items-center space-x-3">
              <Checkbox
                id={tag}
                checked={isChecked}
                onCheckedChange={() => handleTagToggle(tag)}
              />
              <Label
                htmlFor={tag}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                onClick={() => handleTagToggle(tag)}
              >
                {display}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Filters</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-orange-500 hover:text-orange-600"
            >
              Clear All
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Selected Filters Summary */}
          {filterState.selectedTags.length > 0 && (
            <div className="pb-4 border-b">
              <h3 className="font-semibold mb-2">Selected Filters</h3>
              <div className="flex flex-wrap gap-2">
                {filterState.selectedTags.map(tag => {
                  const allOptions = [
                    ...FILTER_OPTIONS.gender,
                    ...FILTER_OPTIONS.category,
                    ...FILTER_OPTIONS.style
                  ];
                  const option = allOptions.find(opt => opt.tag === tag);
                  const displayName = option?.display || tag;
                  
                  return (
                    <Badge
                      key={tag}
                      variant="default"
                      className="bg-orange-500 text-white"
                    >
                      {displayName}
                      <X 
                        className="ml-1 h-3 w-3 cursor-pointer hover:bg-orange-600 rounded-full" 
                        onClick={() => removeFilter(tag)}
                      />
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Filter Categories */}
          {renderFilterSection("Gender", FILTER_OPTIONS.gender)}
          {renderFilterSection("Category", FILTER_OPTIONS.category)}
          {renderFilterSection("Style", FILTER_OPTIONS.style)}
        </div>

        {/* Apply Button */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 bg-orange-500 hover:bg-orange-600"
          >
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
