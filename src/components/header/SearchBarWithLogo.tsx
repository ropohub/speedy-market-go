
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBarWithLogo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="relative flex-1 max-w-xl">
      <img 
        src="/lovable-uploads/5b5065a5-f1ae-4a07-b255-830e99cd26fc.png" 
        alt="Dripzy Logo" 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 object-contain" 
      />
      <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        onKeyDown={handleKeyDown} 
        placeholder='Search "Dresses"' 
        className="w-full pl-10 pr-4 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent px-[37px] py-[8px] my-0 mx-0 rounded-xl" 
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    </div>
  );
};

export default SearchBarWithLogo;
