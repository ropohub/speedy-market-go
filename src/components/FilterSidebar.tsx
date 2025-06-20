
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface FilterSidebarProps {
  brands: string[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  priceRange: { min: number; max: number };
  onPriceChange: (range: number[]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  brands,
  selectedBrands,
  onBrandChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  onClearFilters,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          <X className="w-4 h-4 mr-1" />
          Clear All
        </Button>
      </div>

      {/* Sort */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Relevance</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            value={[priceRange.min, priceRange.max]}
            onValueChange={onPriceChange}
            max={10000}
            min={0}
            step={100}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange.min}</span>
            <span>₹{priceRange.max}</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Brands</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => onBrandChange(brand)}
                className="mr-2"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
