
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, TrendingUp, Clock } from 'lucide-react';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock typeahead suggestions
  const suggestions = [
    'dresses for women',
    'men t-shirts',
    'casual shoes',
    'jeans for men',
    'women tops',
    'sneakers',
    'formal shirts',
    'ethnic wear'
  ];

  // Filter suggestions based on search query
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Recent searches (mock data)
  const recentSearches = [
    'summer dresses',
    'running shoes',
    'formal wear',
    'casual tops'
  ];

  // Trending searches
  const trendingSearches = [
    'winter collection',
    'party wear',
    'office wear',
    'ethnic dresses',
    'sports shoes',
    'handbags'
  ];

  // Popular categories
  const popularCategories = [
    { name: 'Women Dresses', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100&h=100&fit=crop' },
    { name: 'Men T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop' },
    { name: 'Casual Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop' },
    { name: 'Handbags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop' },
    { name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=100&h=100&fit=crop' }
  ];

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  useEffect(() => {
    setShowSuggestions(searchQuery.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center p-4 border-b bg-white sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex-1 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              autoFocus
            />
          </div>

          {/* Typeahead Suggestions */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded-xl shadow-lg mt-1 max-h-60 overflow-y-auto z-20">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Recent Searches</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending Searches */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900">Trending Now</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(search)}
                className="px-3 py-2 bg-orange-50 text-orange-700 rounded-full text-sm hover:bg-orange-100 transition-colors border border-orange-200"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Categories */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Popular Categories</h2>
          <div className="grid grid-cols-3 gap-4">
            {popularCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(category.name)}
                className="flex flex-col items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-white shadow-sm">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended for you */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Recommended for You</h2>
          <div className="space-y-3">
            {[
              { title: 'Summer Collection 2024', subtitle: 'Light and breezy styles' },
              { title: 'Workwear Essentials', subtitle: 'Professional looks' },
              { title: 'Weekend Casuals', subtitle: 'Comfort meets style' },
              { title: 'Party Ready', subtitle: 'Stand out looks' }
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(item.title)}
                className="w-full p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl text-left hover:from-orange-100 hover:to-pink-100 transition-all border border-orange-100"
              >
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
