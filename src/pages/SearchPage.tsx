import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, TrendingUp, Clock } from 'lucide-react';
import { useFilter } from '../contexts/FilterContext';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { setFilters, filterState } = useFilter();

  // Hardcoded categories with images (similar to Categories.tsx)
  const categoriesData = [
    { name: "Women's Wear", image: '/lovable-uploads/048b4d5d-3911-4fee-9d33-1b49a08709cd.png' },
    { name: "Men's Wear", image: '/lovable-uploads/051f17ef-b214-4367-baf2-6a8cdf323caf.png' },
    { name: 'Dresses', image: 'https://cdn.dripzyy.com/dresses.png' },
    { name: 'Tops', image: 'https://cdn.dripzyy.com/tops.png' },
    { name: 'Jeans', image: 'https://cdn.dripzyy.com/jeans.png' },
    { name: 'Trousers', image: 'https://cdn.dripzyy.com/trousers.png' },
    { name: 'T-Shirts', image: 'https://cdn.dripzyy.com/tshirts.png' },
    { name: 'Shirts', image: 'https://cdn.dripzyy.com/shirts.png' },
    { name: 'Co-ords', image: 'https://cdn.dripzyy.com/coords.png' },
    { name: 'Skirts & Shorts', image: 'https://cdn.dripzyy.com/skirts.png' },
    { name: 'Jumpsuits', image: 'https://cdn.dripzyy.com/jumpsuit.png' },
    { name: 'Western Avenue', image: 'https://cdn.dripzyy.com/western-avenue.png' },
    { name: 'Bras', image: 'https://cdn.dripzyy.com/bras.png' },
    { name: 'Briefs', image: 'https://cdn.dripzyy.com/briefs.png' },
    { name: 'Lounge Pants', image: 'https://cdn.dripzyy.com/loungepants.png' },
    { name: 'Shapewear', image: 'https://cdn.dripzyy.com/shapewear.png' },
    { name: 'Track Pants', image: 'https://cdn.dripzyy.com/track.png' },
    { name: 'Jackets', image: 'https://cdn.dripzyy.com/jackets.png' },
    { name: 'Sweatshirts', image: 'https://cdn.dripzyy.com/sweatshirt.png' },
    { name: 'Sweaters', image: 'https://cdn.dripzyy.com/sweater.png' },
  ];

  // Filter suggestions based on search query
  const filteredSuggestions = categoriesData.filter(suggestion =>
    suggestion.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Use hardcoded categories for trending and popular categories
  const trendingSearches = categoriesData.slice(0, 12);
  const popularCategories = categoriesData.slice(0, 16);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set filter on tag click (do not navigate)
  const handleTagClick = (tag: string) => {
    if (tag) {
      setFilters([tag]);
      navigate('/products'); // Navigate without URL parameters
    } else {
      navigate('/products');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleTagClick(suggestion);
  };

  useEffect(() => {
    setShowSuggestions(searchQuery.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center p-3 border-b bg-white sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors mr-2"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="flex-1 relative">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSuggestionClick(searchQuery)}
              placeholder="Search for products..."
              className="w-full pl-8 pr-3 py-2.5 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm"
              autoFocus
            />
          </div>

          {/* Typeahead Suggestions */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-20">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.name)}
                  className="w-full px-3 py-2.5 text-left hover:bg-gray-50 flex items-center gap-2.5 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <img src={suggestion.image} alt={suggestion.name} className="w-5 h-5 rounded-full object-cover" />
                  <span className="text-gray-900 text-sm">{suggestion.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="p-3 space-y-4">
        {/* Trending Searches */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
            <h2 className="text-base font-semibold text-gray-900">Trending Now</h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {trendingSearches.map((cat, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(cat.name)}
                className={`px-2.5 py-1.5 rounded-full text-xs border transition-colors flex items-center gap-2
                  ${filterState.selectedTags.includes(cat.name)
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'}`}
              >
                <img src={cat.image} alt={cat.name} className="w-5 h-5 rounded-full object-cover" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Categories - 4x4 Grid */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Popular Categories</h2>
          <div className="grid grid-cols-4 gap-2">
            {popularCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(category.name)}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors
                  ${filterState.selectedTags.includes(category.name)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden mb-1.5 bg-white shadow-sm">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-center leading-tight">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended for you - Expanded */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Recommended for You</h2>
          <div className="space-y-2">
            {[
              { title: 'Summer Collection 2024', subtitle: 'Light and breezy styles' },
              { title: 'Workwear Essentials', subtitle: 'Professional looks' },
              { title: 'Weekend Casuals', subtitle: 'Comfort meets style' },
              { title: 'Party Ready', subtitle: 'Stand out looks' },
              { title: 'Ethnic Fusion', subtitle: 'Traditional meets modern' },
              { title: 'Fitness Wear', subtitle: 'Active lifestyle essentials' },
              { title: 'Luxury Collection', subtitle: 'Premium fashion pieces' },
              { title: 'Budget Finds', subtitle: 'Great style, great prices' }
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(item.title)}
                className="w-full p-3 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg text-left hover:from-orange-100 hover:to-pink-100 transition-all border border-orange-100"
              >
                <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-600 mt-0.5">{item.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Shop by Brand */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Shop by Brand</h2>
          <div className="flex flex-wrap gap-1.5">
            {['H&M', 'Zara', 'Nike', 'Adidas', 'Puma', 'Levi\'s', 'Only', 'Vero Moda'].map((brand, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(brand)}
                className="px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs hover:bg-blue-100 transition-colors border border-blue-200"
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Shop by Price</h2>
          <div className="flex flex-wrap gap-1.5">
            {['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', '₹2000 - ₹5000', 'Above ₹5000'].map((price, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(price)}
                className="px-2.5 py-1.5 bg-green-50 text-green-700 rounded-full text-xs hover:bg-green-100 transition-colors border border-green-200"
              >
                {price}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
