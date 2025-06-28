import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, TrendingUp, Clock } from 'lucide-react';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Updated typeahead suggestions
  const suggestions = [
    'Men\'s T-shirt',
    'Women\'s dresses',
    'Women\'s tops',
    'Innerwear'
  ];

  // Filter suggestions based on search query
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Updated trending searches with fashion-specific items
  const trendingSearches = [
    'mini dresses',
    'oversized tee',
    'bra',
    'crop tops',
    'skinny jeans',
    'sneakers',
    'handbags',
    'maxi dress',
    'polo shirt',
    'cargo pants',
    'tank tops',
    'floral dress'
  ];

  // Expanded popular categories (4x4 grid)
  const popularCategories = [
    { name: 'Women Dresses', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=80&h=80&fit=crop' },
    { name: 'Men T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop' },
    { name: 'Casual Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80&h=80&fit=crop' },
    { name: 'Handbags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop' },
    { name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=80&h=80&fit=crop' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=80&h=80&fit=crop' },
    { name: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=80&h=80&fit=crop' },
    { name: 'Ethnic Wear', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=80&h=80&fit=crop' },
    { name: 'Formal Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=80&h=80&fit=crop' },
    { name: 'Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop' },
    { name: 'Sunglasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80&h=80&fit=crop' },
    { name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80&h=80&fit=crop' },
    { name: 'Innerwear', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=80&h=80&fit=crop' },
    { name: 'Sports Wear', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop' },
    { name: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80&h=80&fit=crop' },
    { name: 'Winter Wear', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=80&h=80&fit=crop' }
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
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
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
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-3 py-2.5 text-left hover:bg-gray-50 flex items-center gap-2.5 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-900 text-sm">{suggestion}</span>
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
            {trendingSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(search)}
                className="px-2.5 py-1.5 bg-orange-50 text-orange-700 rounded-full text-xs hover:bg-orange-100 transition-colors border border-orange-200"
              >
                {search}
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
                onClick={() => handleSuggestionClick(category.name)}
                className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden mb-1.5 bg-white shadow-sm">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
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
