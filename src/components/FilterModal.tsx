import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useFilter } from '../contexts/FilterContext';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

const FILTER_OPTIONS = {
  gender: [
    { tag: "Men's Wear", display: "Men" },
    { tag: "Women's Wear", display: "Women" }
  ],
  category: [
    { tag: "Shirts", display: "Shirts" },
    { tag: "T-Shirts", display: "T-Shirts" },
    { tag: "Jeans", display: "Jeans" },
    { tag: "Trousers", display: "Trousers" },
    { tag: "Shorts", display: "Shorts" },
    { tag: "Track Pants", display: "Track Pants" },
    { tag: "Jackets", display: "Jackets" },
    { tag: "Sweatshirts", display: "Sweatshirts" },
    { tag: "Sweaters", display: "Sweaters" },
    { tag: "Dresses", display: "Dresses" },
    { tag: "Tops", display: "Tops" },
    { tag: "Co-ords", display: "Co-ords" },
    { tag: "Skirts & Shorts", display: "Skirts & Shorts" },
    { tag: "Jumpsuits", display: "Jumpsuits" },
    { tag: "Bras", display: "Bras" },
    { tag: "Briefs", display: "Briefs" },
    { tag: "Lounge Pants", display: "Lounge Pants" },
    { tag: "Shapewear", display: "Shapewear" },
    { tag: "Crop Tops", display: "Crop Tops" },
    { tag: "Tank Tops", display: "Tank Tops" },
    { tag: "Mini Skirts", display: "Mini Skirts" },
    { tag: "Cargos", display: "Cargos" }
  ],
  style: [
    { tag: "Casual Wear", display: "Casual" },
    { tag: "Sports Wear", display: "Sports" },
    { tag: "Gen-Z Fashion", display: "Gen-Z" },
    { tag: "Western Wear", display: "Western" },
    { tag: "Lingerie & Loungewear", display: "Lingerie & Loungewear" },
    { tag: "Oversized Tees", display: "Oversized Tees" },
    { tag: "Polo T-Shirts", display: "Polo T-Shirts" },
    { tag: "Oversized Shirts", display: "Oversized Shirts" },
    { tag: "Half Sleeve Shirts", display: "Half Sleeve Shirts" },
    { tag: "Printed Shirts", display: "Printed Shirts" },
    { tag: "Stripes & Checks", display: "Stripes & Checks" },
    { tag: "Casual Trousers", display: "Casual Trousers" },
    { tag: "Casual Shorts", display: "Casual Shorts" },
    { tag: "Printed Dresses", display: "Printed Dresses" },
    { tag: "Flared Dresses", display: "Flared Dresses" },
    { tag: "Bodycon Dresses", display: "Bodycon Dresses" },
    { tag: "Maxi Dresses", display: "Maxi Dresses" },
    { tag: "Floral Tops", display: "Floral Tops" },
    { tag: "Printed Tees", display: "Printed Tees" },
    { tag: "Crop Tees", display: "Crop Tees" },
    { tag: "Slit Skirts", display: "Slit Skirts" },
    { tag: "Relaxed Fit Shorts", display: "Relaxed Fit Shorts" },
    { tag: "Western Avenue", display: "Western Avenue" }
  ]
};

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply }) => {
  const { filterState, setFilters } = useFilter();
  const [localSelectedTags, setLocalSelectedTags] = useState<string[]>([]);

  // Hydrate local state on modal open
  useEffect(() => {
    if (isOpen) {
      setLocalSelectedTags(filterState.selectedTags);
    }
  }, [isOpen]);

  const toggleTag = (tag: string) => {
    setLocalSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleApply = () => {
    setFilters(localSelectedTags);
    onApply(); // triggers query refetch etc.
    onClose();
  };

  const handleClearAll = () => {
    setLocalSelectedTags([]);
  };

  const renderFilterSection = (title: string, options: { tag: string; display: string }[]) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <div className="space-y-3">
        {options.map(({ tag, display }) => (
          <div key={tag} className="flex items-center space-x-3">
            <input
              type="checkbox"
              id={`checkbox-${tag}`}
              checked={localSelectedTags.includes(tag)}
              onChange={() => toggleTag(tag)}
              className="accent-[#b97b4a] w-4 h-4"
            />
            <Label
              htmlFor={`checkbox-${tag}`}
              className="text-sm font-medium cursor-pointer flex-1"
            >
              {display}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto pb-0">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Filters</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-[#d49a6a] hover:text-[#b97b4a]"
            >
              Clear All
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {localSelectedTags.length > 0 && (
            <div className="pb-4 border-b">
              <h3 className="font-semibold mb-2">Selected Filters</h3>
              <div className="flex flex-wrap gap-2">
                {localSelectedTags.map(tag => {
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
                      className="bg-[#d49a6a] text-white"
                    >
                      {displayName}
                      <X
                        className="ml-1 h-3 w-3 cursor-pointer hover:bg-[#b97b4a] rounded-full"
                        onClick={() => toggleTag(tag)}
                      />
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {renderFilterSection("Gender", FILTER_OPTIONS.gender)}
          {renderFilterSection("Category", FILTER_OPTIONS.category)}
          {renderFilterSection("Style", FILTER_OPTIONS.style)}
        </div>

        <div className="sticky bottom-0 left-0 right-0 bg-white z-10 flex gap-3 pt-4 border-t pb-4 -mx-6 px-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleApply} className="flex-1 bg-[#d49a6a] hover:bg-[#b97b4a]">
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
