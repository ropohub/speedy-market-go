
import React, { useState, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ['tshirt', 'dresses', 'bra'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-transparent px-[15px] mx-0 my-0 py-[5px]">
      <div className="flex items-center gap-3">
        {/* Search Bar - Full Width */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder={`Search '${words[currentWordIndex]}'`}
            className="w-full pl-10 pr-12 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
          />
          <Mic className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
