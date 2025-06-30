
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
    const queries = [];
    
    // Handle regular tag filters (category, gender, style, etc.)
    const regularTags = filterState.selectedTags.filter(tag => 
      !tag.startsWith('price_under_')
    );
    
    if (regularTags.length > 0) {
      queries.push(regularTags.map(tag => `tag:${tag}`).join(' AND '));
    }
    
    // Handle price filters - try different syntax
    const priceFilters = filterState.selectedTags.filter(tag => 
      tag.startsWith('price_under_')
    );
    
    priceFilters.forEach(filter => {
      switch (filter) {
        case 'price_under_999':
          // Try multiple price query formats that Shopify might accept
          queries.push('(price:<999 OR variants.price:<999 OR price:<=999 OR variants.price:<=999)');
          break;
      }
    });
    
    return queries.join(' AND ');
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
