
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FilterOption {
  id: string;
  label: string;
  tag: string;
  category: 'gender' | 'category' | 'style' | 'type';
}

interface FilterContextType {
  selectedFilters: FilterOption[];
  addFilter: (filter: FilterOption) => void;
  removeFilter: (filterId: string) => void;
  clearFilters: () => void;
  setFilters: (filters: FilterOption[]) => void;
  getSearchQuery: () => string;
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
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);

  const addFilter = (filter: FilterOption) => {
    setSelectedFilters(prev => {
      const exists = prev.find(f => f.id === filter.id);
      if (exists) return prev;
      return [...prev, filter];
    });
  };

  const removeFilter = (filterId: string) => {
    setSelectedFilters(prev => prev.filter(f => f.id !== filterId));
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const setFilters = (filters: FilterOption[]) => {
    setSelectedFilters(filters);
  };

  const getSearchQuery = () => {
    if (selectedFilters.length === 0) return '';
    return selectedFilters.map(filter => `tag:${filter.tag}`).join(' AND ');
  };

  return (
    <FilterContext.Provider
      value={{
        selectedFilters,
        addFilter,
        removeFilter,
        clearFilters,
        setFilters,
        getSearchQuery,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
