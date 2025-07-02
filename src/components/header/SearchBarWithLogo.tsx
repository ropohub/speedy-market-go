
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBarWithLogo: React.FC = () => {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ['dresses', 't-shirts', 'jeans'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSearchBarClick = () => {
    navigate('/search-page');
  };

  return (
    <div className="relative flex-1 max-w-xl">
      <img 
        src="/lovable-uploads/5b5065a5-f1ae-4a07-b255-830e99cd26fc.png" 
        alt="Dripzy Logo" 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 object-contain pointer-events-none z-10" 
      />
      <input 
        type="text" 
        onClick={handleSearchBarClick}
        placeholder={`Search "${words[currentWordIndex]}"`}
        className="w-full pl-10 pr-4 border-2 border-black text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-black px-[37px] py-[8px] my-0 mx-0 rounded-lg cursor-pointer"
        readOnly
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  );
};

export default SearchBarWithLogo;
