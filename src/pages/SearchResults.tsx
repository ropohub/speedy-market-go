
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    // Redirect to ProductListing page with search query
    if (searchQuery) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/products');
    }
  }, [searchQuery, navigate]);

  // Show a brief loading state while redirecting
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center p-4 border-b">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">Redirecting...</h1>
      </header>
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500">Redirecting to search results...</p>
      </div>
    </div>
  );
};

export default SearchResults;
