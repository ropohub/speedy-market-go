
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FilterState {
  selectedTags: string[];
}

interface FilterContextType {
  filterState: FilterState;
  addFilter: (tag: string) => void;
  removeFilter: (tag: string) => void;
  setFilters: (tags: string[]) => void;
  clearFilters: () => void;
  getQueryString: () => string;
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
    selectedTags: []
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
      selectedTags: []
    }));
  };

  const getQueryString = () => {
    if (filterState.selectedTags.length === 0) return '';
    return filterState.selectedTags.map(tag => `tag:${tag}`).join(' AND ');
  };

  return (
    <FilterContext.Provider value={{
      filterState,
      addFilter,
      removeFilter,
      setFilters,
      clearFilters,
      getQueryString
    }}>
      {children}
    </FilterContext.Provider>
  );
};
