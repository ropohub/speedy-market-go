
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FilterState {
  selectedTags: string[];
  sortBy: 'price-low' | 'price-high' | 'newest' | 'popularity' | null;
}

interface FilterContextType {
  filterState: FilterState;
  addFilter: (tag: string) => void;
  removeFilter: (tag: string) => void;
  setFilters: (tags: string[]) => void;
  clearFilters: () => void;
  setSortBy: (sort: FilterState['sortBy']) => void;
  getQueryString: () => string;
  getSortKey: () => string | null;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

interface FilterProviderProps {
  children: ReactNode;
}

// Updated category mapping with all the new tags
const TAG_CATEGORIES = {
  gender: ["Men's Wear", "Women's Wear"],
  category: [
    "Shirts", "T-Shirts", "Jeans", "Trousers", "Shorts", "Track Pants", 
    "Jackets", "Sweatshirts", "Sweaters", "Dresses", "Tops", "Co-ords", 
    "Skirts & Shorts", "Jumpsuits", "Bras", "Briefs", "Lounge Pants", 
    "Shapewear", "Crop Tops", "Tank Tops", "Mini Skirts", "Cargos"
  ],
  style: [
    "Casual Wear", "Sports Wear", "Gen-Z Fashion", "Western Wear", 
    "Lingerie & Loungewear", "Oversized Tees", "Polo T-Shirts", 
    "Oversized Shirts", "Half Sleeve Shirts", "Printed Shirts", 
    "Stripes & Checks", "Casual Trousers", "Casual Shorts", 
    "Printed Dresses", "Flared Dresses", "Bodycon Dresses", "Maxi Dresses", 
    "Floral Tops", "Printed Tees", "Crop Tees", "Slit Skirts", 
    "Relaxed Fit Shorts", "Western Avenue"
  ]
};

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filterState, setFilterState] = useState<FilterState>({
    selectedTags: [],
    sortBy: null
  });

  const addFilter = (tag: string) => {
    setFilterState(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag) 
        ? prev.selectedTags 
        : [...prev.selectedTags, tag]
    }));
  };

  const removeFilter = (tag: string) => {
    setFilterState(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.filter(t => t !== tag)
    }));
  };

  const setFilters = (tags: string[]) => {
    setFilterState(prev => ({
      ...prev,
      selectedTags: tags
    }));
  };

  const clearFilters = () => {
    setFilterState(prev => ({
      ...prev,
      selectedTags: [],
      sortBy: null
    }));
  };

  const setSortBy = (sort: FilterState['sortBy']) => {
    setFilterState(prev => ({
      ...prev,
      sortBy: sort
    }));
  };

  const getQueryString = () => {
    if (filterState.selectedTags.length === 0) {
      return '';
    }

    // Group tags by category
    const genderTags = filterState.selectedTags.filter(tag => TAG_CATEGORIES.gender.includes(tag));
    const categoryTags = filterState.selectedTags.filter(tag => TAG_CATEGORIES.category.includes(tag));
    const styleTags = filterState.selectedTags.filter(tag => TAG_CATEGORIES.style.includes(tag));

    const queryParts: string[] = [];

    // Create OR groups for each category that has multiple tags
    if (genderTags.length > 0) {
      if (genderTags.length === 1) {
        queryParts.push(`tag:${genderTags[0]}`);
      } else {
        const genderQuery = genderTags.map(tag => `tag:${tag}`).join(' OR ');
        queryParts.push(`(${genderQuery})`);
      }
    }

    if (categoryTags.length > 0) {
      if (categoryTags.length === 1) {
        queryParts.push(`tag:${categoryTags[0]}`);
      } else {
        const categoryQuery = categoryTags.map(tag => `tag:${tag}`).join(' OR ');
        queryParts.push(`(${categoryQuery})`);
      }
    }

    if (styleTags.length > 0) {
      if (styleTags.length === 1) {
        queryParts.push(`tag:${styleTags[0]}`);
      } else {
        const styleQuery = styleTags.map(tag => `tag:${tag}`).join(' OR ');
        queryParts.push(`(${styleQuery})`);
      }
    }

    // Join different categories with AND
    return queryParts.join(' AND ');
  };

  const getSortKey = () => {
    switch (filterState.sortBy) {
      case 'price-low':
        return 'PRICE';
      case 'price-high':
        return 'PRICE';
      case 'newest':
        return 'CREATED_AT';
      case 'popularity':
        return 'BEST_SELLING';
      default:
        return null;
    }
  };

  return (
    <FilterContext.Provider value={{
      filterState,
      addFilter,
      removeFilter,
      setFilters,
      clearFilters,
      setSortBy,
      getQueryString,
      getSortKey
    }}>
      {children}
    </FilterContext.Provider>
  );
};
