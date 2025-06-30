
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FilterState {
  selectedTags: string[];
  sortBy: 'price-low' | 'price-high' | 'newest' | 'popularity' | null;
  maxPrice: number;
}

interface FilterContextType {
  filterState: FilterState;
  addFilter: (tag: string) => void;
  removeFilter: (tag: string) => void;
  setFilters: (tags: string[]) => void;
  clearFilters: () => void;
  setSortBy: (sort: FilterState['sortBy']) => void;
  setMaxPrice: (price: number) => void;
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
    sortBy: null,
    maxPrice: 5000
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
      sortBy: null,
      maxPrice: 5000
    }));
  };

  const setSortBy = (sort: FilterState['sortBy']) => {
    setFilterState(prev => ({
      ...prev,
      sortBy: sort
    }));
  };

  const setMaxPrice = (price: number) => {
    setFilterState(prev => ({
      ...prev,
      maxPrice: price
    }));
  };

  const getQueryString = () => {
    const queries = [];
    
    if (filterState.selectedTags.length > 0) {
      queries.push(filterState.selectedTags.map(tag => `tag:${tag}`).join(' AND '));
    }
    
    // Add max price filter
    if (filterState.maxPrice < 5000) {
      queries.push(`variants.price:<=${filterState.maxPrice}`);
    }
    
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
      setMaxPrice,
      getQueryString,
      getSortKey
    }}>
      {children}
    </FilterContext.Provider>
  );
};
