import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import CategorySelector from '../components/CategorySelector';
import YellowBanner from '../components/YellowBanner';
import AutoSlidingBanner from '../components/AutoSlidingBanner';
import MovingBanner from '../components/MovingBanner';
import FeaturedCategories from '../components/FeaturedCategories';
import EthnicCollection from '../components/EthnicCollection';
import TopSellingProducts from '../components/TopSellingProducts';
import ProductYouCantMiss from '../components/ProductYouCantMiss';
import { MapPin, ChevronDown, User, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categories, banners, featuredCategories, heroImages } from '../data/mockData';

interface LegacyProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  originalPrice?: number;
}

interface CartItem extends LegacyProduct {
  selectedSize?: string;
  quantity: number;
}

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('women');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const [userLocation, setUserLocation] = useState('Fetching location...');

  useEffect(() => {
    const handleScroll = () => {
      // Get the delivery bar height (approximately 72px based on the padding and content)
      const deliveryBarHeight = 72;
      setIsSearchSticky(window.scrollY >= deliveryBarHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserLocation = () => {
      if (!navigator.geolocation) {
        setUserLocation('Location not supported');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Check if Google Maps API key is available
            const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
            
            if (!apiKey) {
              console.warn('Google Maps API key not found, using coordinates');
              setUserLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
              return;
            }

            // Use Google Maps Geocoding API to get address
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            
            if (!response.ok) {
              throw new Error('Failed to fetch address');
            }
            
            const data = await response.json();
            
            if (data.status === 'OK' && data.results && data.results.length > 0) {
              // Get the most specific address (usually the first result)
              const address = data.results[0].formatted_address;
              // Truncate if too long for display
              const truncatedAddress = address.length > 40 ? address.substring(0, 40) + '...' : address;
              setUserLocation(truncatedAddress);
            } else {
              console.warn('Geocoding failed:', data.status, data.error_message);
              setUserLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            }
          } catch (error) {
            console.error('Geocoding error:', error);
            setUserLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setUserLocation('Location access denied');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    };

    fetchUserLocation();
  }, []);

  const handleAddToCart = (product: LegacyProduct) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => item.id === product.id ? {
        ...item,
        quantity: item.quantity + 1
      } : item));
    } else {
      const newCartItem: CartItem = {
        ...product,
        selectedSize: 'M',
        quantity: 1
      };
      setCartItems([...cartItems, newCartItem]);
    }
    console.log('Added to cart:', product);
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map(item => item.id === id ? {
      ...item,
      quantity
    } : item));
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const currentBanners = banners[selectedCategory as keyof typeof banners];
  const currentFeaturedCategories = featuredCategories[selectedCategory as keyof typeof featuredCategories];
  const currentHeroImages = heroImages[selectedCategory as keyof typeof heroImages];

  return (
    <Layout cartItems={cartItems} onUpdateCartQuantity={handleUpdateCartQuantity} onRemoveCartItem={handleRemoveCartItem}>
      <div className="bg-white min-h-screen">
        {/* Hero Section - Background image with overlay content */}
        <div className="relative" style={{
          height: '55vh',
          backgroundImage: 'url(/lovable-uploads/3d5567e9-bee1-49b1-846c-a831ff5e4325.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          {/* Top Bar Content Over Background */}
          <div className="absolute top-0 left-0 right-0 z-10 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-black" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 py-0">
                    <span className="text-zinc-950 text-lg font-bold">Home</span>
                    <ChevronDown className="w-4 h-4 text-black" />
                  </div>
                  <span className="opacity-90 text-zinc-950 font-semibold text-xs">{userLocation}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/cart')}
                  className="relative"
                >
                  <ShoppingCart className="w-5 h-5 text-black" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                </button>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">B</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar - Moved up slightly */}
          <div className={`absolute top-16 left-0 right-0 z-10 ${isSearchSticky ? 'invisible' : 'visible'}`}>
            <SearchBar />
          </div>
        </div>

        {/* Sticky Search Bar */}
        <div className={`fixed top-0 left-0 right-0 z-50 bg-black shadow-md transition-transform duration-300 ${isSearchSticky ? 'translate-y-0' : '-translate-y-full'}`}>
          <SearchBar />
        </div>

        {/* Scrollable Content - No gap, attached to background */}
        <div className="bg-gray-50">
          {/* Yellow Banner */}
          <YellowBanner />
          
          <CategorySelector categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          
          <div className="pt-3">
            <AutoSlidingBanner banners={currentBanners} />
          </div>
          
          <div className="my-4">
            <MovingBanner text="FLAT 10% OFF ON YOUR FIRST ORDER" />
          </div>
          
          <div className="bg-white">
            <FeaturedCategories categories={currentFeaturedCategories} />
            
            <EthnicCollection />
            
            <TopSellingProducts category={selectedCategory} />
            
            <ProductYouCantMiss category={selectedCategory} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
