import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { categories } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useFilter } from '../contexts/FilterContext';

const categoriesData = [
  {
    id: 'women',
    name: "Women's Wear",
    image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/women.png?v=1751656164',
    subcategories: [
      {
        title: 'Western Wear',
        items: [
          { id: 'dresses', name: 'Dresses', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/dresses.png?v=1751656140' },
          { id: 'tops', name: 'Tops', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/tops.png?v=1751656150' },
          { id: 'jeans', name: 'Jeans', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/jeans.png?v=1751656161' },
          { id: 'trousers', name: 'Trousers', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/trousers.png?v=1751656140' },
          { id: 'tshirts', name: 'T-Shirts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/tshirts.png?v=1751656140' },
          { id: 'shirts', name: 'Shirts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/shirts.png?v=1751656150' },
          { id: 'co-ords', name: 'Co-ords', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/coords.png?v=1751656156' },
          { id: 'skirts-shorts', name: 'Skirts & Shorts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/skirts.png?v=1751656151' },
          { id: 'jumpsuits', name: 'Jumpsuits', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/jumpsuit.png?v=1751656164' },
          { id: 'western-avenue', name: 'Western Avenue', image: 'https://cdn.dripzyy.com/western-avenue.png' },
        ]
      },
      {
        title: 'Lingerie & Loungewear',
        items: [
          { id: 'bras', name: 'Bras', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/bras.png?v=1751656151' },
          { id: 'briefs', name: 'Briefs', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/briefs.png?v=1751656150' },
          { id: 'lounge-pants', name: 'Lounge Pants', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/loungepants.png?v=1751656142' },
          { id: 'shapewear', name: 'Shapewear', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/shapewear.png?v=1751656139' },
        ]
      },
      {
        title: 'Sports Wear',
        items: [
          { id: 'tshirts-sports', name: 'T-Shirts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/sports_tshirts.png?v=1751656161' },
          { id: 'track-pants', name: 'Track Pants', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/sports_trackpants.png?v=1751656147' },
          { id: 'shorts-sports', name: 'Shorts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/sports_shorts.png?v=1751656149' },
          { id: 'sweatshirts', name: 'Sweatshirts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/sweatshirt.png?v=1751656156' },
        ]
      },
      {
        title: 'Gen-Z Fashion',
        items: [
          { id: 'printed-dresses', name: 'Printed Dresses', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/printeddress.png?v=1751656165' },
          { id: 'flared-dresses', name: 'Flared Dresses', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/flareddress.png?v=1751656142' },
          { id: 'bodycon-dresses', name: 'Bodycon Dresses', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/bodycon.png?v=1751656140' },
          { id: 'maxi-dresses', name: 'Maxi Dresses', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/maxidress.png?v=1751656144' },
          { id: 'crop-tops', name: 'Crop Tops', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/crop.png?v=1751656143' },
          { id: 'floral-tops', name: 'Floral Tops', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/tops.png?v=1751656150' },
          { id: 'tank-tops', name: 'Tank Tops', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/tank.png?v=1751656155' },
          { id: 'printed-tees', name: 'Printed Tees', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/printedshirt.png?v=1751656164' },
          { id: 'oversized-tees', name: 'Oversized Tees', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/oversizedtshirt.png?v=1751656155' },
          { id: 'crop-tees', name: 'Crop Tees', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/crop.png?v=1751656143' },
          { id: 'oversized-shirts', name: 'Oversized Shirts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/oversizedshirt.png?v=1751656161' },
          { id: 'printed-shirts', name: 'Printed Shirts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/printed_shirt.png?v=1751656164' },
          { id: 'jeans-genz', name: 'Jeans', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/jeans.png?v=1751656161' },
          { id: 'mini-skirts', name: 'Mini Skirts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/miniskirt.png?v=1751656146' },
          { id: 'slit-skirts', name: 'Slit Skirts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/slit.png?v=1751656162' },
          { id: 'relaxed-fit-shorts', name: 'Relaxed Fit Shorts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/relaxedfit.png?v=1751656161' },
          { id: 'cargos', name: 'Cargos', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/cargos.png?v=1751656165' },
        ]
      }
    ]
  },
  {
    id: 'men',
    name: "Men's Wear",
    image: '/lovable-uploads/051f17ef-b214-4367-baf2-6a8cdf323caf.png',
    subcategories: [
      {
        title: 'Casual Wear',
        items: [
          { id: 'shirts', name: 'Shirts', image: 'https://cdn.dripzyy.com/shirts.png' },
          { id: 'tshirts', name: 'T-Shirts', image: 'https://cdn.dripzyy.com/tshirts.png' },
          { id: 'jeans', name: 'Jeans', image: 'https://cdn.dripzyy.com/jeans.png' },
          { id: 'trousers', name: 'Trousers', image: 'https://cdn.dripzyy.com/trousers.png' },
          { id: 'shorts', name: 'Shorts', image: 'https://cdn.dripzyy.com/casualshorts.png' },
          { id: 'track-pants', name: 'Track Pants', image: 'https://cdn.dripzyy.com/track.png' },
          { id: 'jackets', name: 'Jackets', image: 'https://cdn.dripzyy.com/jackets.png' },
          { id: 'sweatshirts', name: 'Sweatshirts', image: 'https://cdn.dripzyy.com/sweatshirt.png' },
          { id: 'sweaters', name: 'Sweaters', image: 'https://cdn.dripzyy.com/sweater.png' },
        ]
      },
      {
        title: 'Sports Wear',
        items: [
          { id: 'tshirts-sports', name: 'T-Shirts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/tshirts.png?v=1751656140' },
          { id: 'track-pants-sports', name: 'Track Pants', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/sports_trackpants.png?v=1751656147' },
          { id: 'shorts-sports', name: 'Shorts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/skirts.png?v=1751656151' },
          { id: 'sweatshirts-sports', name: 'Sweatshirts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/sweatshirt.png?v=1751656156' },
        ]
      },
      {
        title: 'Gen-Z Fashion',
        items: [
          { id: 'oversized-tees', name: 'Oversized Tees', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/oversizedtshirt.png?v=1751656155' },
          { id: 'polo-tshirts', name: 'Polo T-Shirts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/polotshirt.png?v=1751656140' },
          { id: 'oversized-shirts', name: 'Oversized Shirts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/oversizedshirt.png?v=1751656161' },
          { id: 'half-sleeve-shirts', name: 'Half Sleeve Shirts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/halfsleeves.png?v=1751656140' },
          { id: 'printed-shirts', name: 'Printed Shirts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/printed_shirt.png?v=1751656164' },
          { id: 'stripes-checks', name: 'Stripes & Checks', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/stripes.png?v=1751656164' },
          { id: 'jeans-genz', name: 'Jeans', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/jeans.png?v=1751656161' },
          { id: 'cargos', name: 'Cargos', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/cargos.png?v=1751656165' },
          { id: 'casual-trousers', name: 'Casual Trousers', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/trousers.png?v=1751656140' },
          { id: 'casual-shorts', name: 'Casual Shorts', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/skirts.png?v=1751656151' },
          { id: 'track-pants-genz', name: 'Track Pants', image: 'https://cdn.shopify.com/s/files/1/0804/5327/1586/files/track.webp?v=1751656055' },
        ]
      }
    ]
  }
];

const Categories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('women');
  const navigate = useNavigate();
  const { setFilters } = useFilter();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSidebarCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSubcategoryClick = (subcategory: string, sectionTitle: string, parentCategory: string) => {
    setFilters([parentCategory, sectionTitle, subcategory]);
    navigate('/products');
  };

  const sidebarCategories = categoriesData.map(cat => ({
    id: cat.id,
    name: cat.name,
    image: cat.image
  }));

  const currentCategory = categoriesData.find(cat => cat.id === selectedCategory) || categoriesData[0];

  return (
    <Layout>
      {/* Unified gradient background throughout the entire page */}
      <div className="min-h-screen" style={{
        background: 'linear-gradient(135deg, #FFEFE4 0%, #FFD8B1 30%, #FDE8E8 50%, #FFB3D1 70%, #F3E8FF 100%)'
      }}>
        {/* Header */}
        <Header />

        {/* Main content - small padding top for space below header */}
        <div className="pt-20">
          <div className="flex gap-0">
            {/* Vertical Sidebar - reduced width from w-28 to w-20 */}
            <div className="w-20 min-h-screen">
              <div className="py-2 space-y-4">
                {sidebarCategories.map(category => (
                  <div
                    key={category.id}
                    onClick={() => handleSidebarCategoryChange(category.id)}
                    className={`mx-2 cursor-pointer transition-all ${selectedCategory === category.id
                      ? 'bg-pink-100 border-pink-200 border-2 shadow-sm'
                      : 'hover:bg-white/20 backdrop-blur-sm border-2 border-transparent'
                      } rounded-xl p-2`}
                  >
                    <div className="flex flex-col items-center">
                      {/* Use custom image for women and men, icon for others - reduced size */}
                      {category.image && (
                        <div className="w-8 h-8 mb-1 rounded-full overflow-hidden">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <span
                        className={`text-xs font-medium text-center leading-tight ${selectedCategory === category.id ? 'text-pink-600' : 'text-gray-600'
                          }`}
                        style={{ whiteSpace: 'pre-line' }}
                      >
                        {category.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-x-hidden">
              {/* Fashion Header with Banner */}
              <div className="px-[8px] py-0 my-0 mx-[2px]">
                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 relative overflow-hidden shadow-sm border border-white/30 py-[12px] px-[24px] mx-0 my-[8px]">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-bold text-gray-900 mb-1 text-base">{currentCategory.name}</h2>
                    </div>
                    <div className="flex items-center">
                      <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=120&h=80&fit=crop"
                        alt="Fashion Banner"
                        className="w-20 h-12 rounded-lg object-cover mr-2 shadow-sm"
                      />
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Container */}
              <div className="bg-white/30 backdrop-blur-sm rounded-t-3xl mx-2 mt-1 shadow-sm border border-white/20">
                {/* Category Sections */}
                {currentCategory.subcategories.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="px-4 py-3">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">{section.title}</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {section.items.map(item => (
                        <div
                          key={item.id}
                          onClick={() => handleSubcategoryClick(item.name, section.title, currentCategory.name)}
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <div className="w-14 h-14 rounded-full overflow-hidden mb-2 bg-white/60 backdrop-blur-sm shadow-sm flex items-center justify-center">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-2xl text-gray-400">🛍️</span>
                            )}
                          </div>
                          <span className="text-xs font-medium text-gray-700 text-center max-w-16 leading-tight">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
