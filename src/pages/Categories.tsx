import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { categories } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Categories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('women');
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products/${selectedCategory}/${categoryId}`);
  };

  // Vertical sidebar categories with reduced width
  const sidebarCategories = [{
    id: 'women',
    name: "Women's\nWear",
    icon: '👗',
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-600',
    borderColor: 'border-pink-200',
    image: '/lovable-uploads/048b4d5d-3911-4fee-9d33-1b49a08709cd.png'
  }, {
    id: 'men',
    name: "Men's\nWear",
    icon: '👔',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    image: '/lovable-uploads/051f17ef-b214-4367-baf2-6a8cdf323caf.png'
  }, {
    id: 'footwear',
    name: 'Footwear',
    icon: '👠',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-200'
  }, {
    id: 'accessories',
    name: 'Beauty &\nGrooming',
    icon: '💄',
    bgColor: 'bg-rose-100',
    textColor: 'text-rose-600',
    borderColor: 'border-rose-200'
  }, {
    id: 'kids',
    name: 'Kids\nWear',
    icon: '👶',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-600',
    borderColor: 'border-yellow-200'
  }, {
    id: 'home',
    name: 'Home &\nLiving',
    icon: '🏠',
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    borderColor: 'border-green-200'
  }];

  // Category-specific sections
  const categoryOptions = {
    women: {
      sections: [{
        title: 'Western Wear',
        items: [{
          id: 'dresses',
          name: 'Dresses',
          image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=150&h=150&fit=crop'
        }, {
          id: 'tops',
          name: 'Tops',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop'
        }, {
          id: 'jeans',
          name: 'Jeans',
          image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=150&h=150&fit=crop'
        }, {
          id: 'trousers',
          name: 'Trousers',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop'
        }, {
          id: 'tshirts',
          name: 'T-shirts',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop'
        }, {
          id: 'shirts',
          name: 'Shirts',
          image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=150&h=150&fit=crop'
        }, {
          id: 'co-ords',
          name: 'Co-ords',
          image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=150&h=150&fit=crop'
        }, {
          id: 'skirts-shorts',
          name: 'Skirts & Shorts',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop'
        }, {
          id: 'jumpsuits',
          name: 'Jumpsuits',
          image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=150&h=150&fit=crop'
        }]
      }, {
        title: 'Lingerie & Loungewear',
        items: [{
          id: 'bras',
          name: 'Bras',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop'
        }, {
          id: 'night-suits',
          name: 'Night suits',
          image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=150&h=150&fit=crop'
        }, {
          id: 'nightdress',
          name: 'Nightdress',
          image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=150&h=150&fit=crop'
        }, {
          id: 'briefs',
          name: 'Briefs',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop'
        }, {
          id: 'lounge-pants',
          name: 'Lounge Pants',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop'
        }, {
          id: 'shapewear',
          name: 'Shapewear',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop'
        }]
      }, {
        title: 'Sports Wear',
        items: [{
          id: 'sports-tshirts',
          name: 'Tshirts',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop'
        }, {
          id: 'trackpants',
          name: 'Trackpants',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop'
        }, {
          id: 'jackets',
          name: 'Jackets',
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=150&fit=crop'
        }, {
          id: 'shorts',
          name: 'Shorts',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop'
        }, {
          id: 'sweatshirts',
          name: 'Sweatshirts',
          image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=150&h=150&fit=crop'
        }, {
          id: 'tracksuits',
          name: 'Tracksuits',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop'
        }]
      }]
    },
    men: {
      sections: [{
        title: 'Formal Wear',
        items: [{
          id: 'formal-shirts',
          name: 'Formal Shirts',
          image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=150&h=150&fit=crop'
        }, {
          id: 'blazers',
          name: 'Blazers',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
        }, {
          id: 'formal-trousers',
          name: 'Formal Trousers',
          image: 'https://images.unsplash.com/photo-1506629905543-2ad2bb0b9348?w=150&h=150&fit=crop'
        }, {
          id: 'suits',
          name: 'Suits',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
        }]
      }, {
        title: 'Casual Wear',
        items: [{
          id: 'casual-shirts',
          name: 'Casual Shirts',
          image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=150&h=150&fit=crop'
        }, {
          id: 'polo-tshirts',
          name: 'Polo T-shirts',
          image: 'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=150&h=150&fit=crop'
        }, {
          id: 'graphic-tees',
          name: 'Graphic Tees',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop'
        }, {
          id: 'jeans',
          name: 'Jeans',
          image: 'https://images.unsplash.com/photo-1542272454315-7ad9f1ba8b80?w=150&h=150&fit=crop'
        }, {
          id: 'chinos',
          name: 'Chinos',
          image: 'https://images.unsplash.com/photo-1506629905543-2ad2bb0b9348?w=150&h=150&fit=crop'
        }, {
          id: 'shorts',
          name: 'Shorts',
          image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=150&h=150&fit=crop'
        }]
      }, {
        title: 'Sports & Active',
        items: [{
          id: 'sports-tshirts',
          name: 'Sports T-shirts',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop'
        }, {
          id: 'track-pants',
          name: 'Track Pants',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop'
        }, {
          id: 'hoodies',
          name: 'Hoodies',
          image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=150&h=150&fit=crop'
        }, {
          id: 'gym-shorts',
          name: 'Gym Shorts',
          image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=150&h=150&fit=crop'
        }]
      }]
    },
    footwear: {
      sections: [{
        title: 'Casual Footwear',
        items: [{
          id: 'sneakers',
          name: 'Sneakers',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop'
        }, {
          id: 'casual-shoes',
          name: 'Casual Shoes',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop'
        }, {
          id: 'sandals',
          name: 'Sandals',
          image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=150&h=150&fit=crop'
        }, {
          id: 'flip-flops',
          name: 'Flip Flops',
          image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=150&h=150&fit=crop'
        }]
      }, {
        title: 'Formal Footwear',
        items: [{
          id: 'formal-shoes',
          name: 'Formal Shoes',
          image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=150&h=150&fit=crop'
        }, {
          id: 'loafers',
          name: 'Loafers',
          image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=150&h=150&fit=crop'
        }, {
          id: 'boots',
          name: 'Boots',
          image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=150&h=150&fit=crop'
        }]
      }, {
        title: 'Sports Footwear',
        items: [{
          id: 'running-shoes',
          name: 'Running Shoes',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop'
        }, {
          id: 'sports-sneakers',
          name: 'Sports Sneakers',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop'
        }, {
          id: 'gym-shoes',
          name: 'Gym Shoes',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop'
        }]
      }]
    },
    accessories: {
      sections: [{
        title: 'Bags & Wallets',
        items: [{
          id: 'handbags',
          name: 'Handbags',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop'
        }, {
          id: 'backpacks',
          name: 'Backpacks',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop'
        }, {
          id: 'wallets',
          name: 'Wallets',
          image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=150&h=150&fit=crop'
        }, {
          id: 'clutches',
          name: 'Clutches',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop'
        }]
      }, {
        title: 'Jewelry & Watches',
        items: [{
          id: 'watches',
          name: 'Watches',
          image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=150&h=150&fit=crop'
        }, {
          id: 'necklaces',
          name: 'Necklaces',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=150&h=150&fit=crop'
        }, {
          id: 'earrings',
          name: 'Earrings',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=150&h=150&fit=crop'
        }, {
          id: 'bracelets',
          name: 'Bracelets',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=150&h=150&fit=crop'
        }]
      }, {
        title: 'Other Accessories',
        items: [{
          id: 'sunglasses',
          name: 'Sunglasses',
          image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=150&h=150&fit=crop'
        }, {
          id: 'belts',
          name: 'Belts',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop'
        }, {
          id: 'scarves',
          name: 'Scarves',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop'
        }]
      }]
    },
    kids: {
      sections: [{
        title: 'Boys Wear',
        items: [{
          id: 'boys-shirts',
          name: 'Shirts',
          image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=150&h=150&fit=crop'
        }, {
          id: 'boys-tshirts',
          name: 'T-shirts',
          image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=150&h=150&fit=crop'
        }, {
          id: 'boys-jeans',
          name: 'Jeans',
          image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=150&h=150&fit=crop'
        }, {
          id: 'boys-shorts',
          name: 'Shorts',
          image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=150&h=150&fit=crop'
        }]
      }, {
        title: 'Girls Wear',
        items: [{
          id: 'girls-dresses',
          name: 'Dresses',
          image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=150&h=150&fit=crop'
        }, {
          id: 'girls-tops',
          name: 'Tops',
          image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=150&h=150&fit=crop'
        }, {
          id: 'girls-skirts',
          name: 'Skirts',
          image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=150&h=150&fit=crop'
        }, {
          id: 'girls-jeans',
          name: 'Jeans',
          image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=150&h=150&fit=crop'
        }]
      }]
    },
    home: {
      sections: [{
        title: 'Home Decor',
        items: [{
          id: 'cushions',
          name: 'Cushions',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop'
        }, {
          id: 'curtains',
          name: 'Curtains',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop'
        }, {
          id: 'rugs',
          name: 'Rugs',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop'
        }, {
          id: 'wall-art',
          name: 'Wall Art',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop'
        }]
      }, {
        title: 'Bedding',
        items: [{
          id: 'bed-sheets',
          name: 'Bed Sheets',
          image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=150&h=150&fit=crop'
        }, {
          id: 'pillows',
          name: 'Pillows',
          image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=150&h=150&fit=crop'
        }, {
          id: 'comforters',
          name: 'Comforters',
          image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=150&h=150&fit=crop'
        }]
      }]
    }
  };

  const handleSidebarCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const getCategoryTitle = (categoryId: string) => {
    const categoryMap: {
      [key: string]: string;
    } = {
      'women': "Women's Fashion",
      'men': "Men's Fashion",
      'footwear': 'Footwear',
      'accessories': 'Beauty & Grooming',
      'kids': 'Kids Fashion',
      'home': 'Home & Living'
    };
    return categoryMap[categoryId] || 'Fashion';
  };

  const currentCategoryOptions = categoryOptions[selectedCategory as keyof typeof categoryOptions] || categoryOptions.women;

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
                    className={`mx-2 cursor-pointer transition-all ${
                      selectedCategory === category.id 
                        ? `${category.bgColor} ${category.borderColor} border-2 shadow-sm` 
                        : 'hover:bg-white/20 backdrop-blur-sm border-2 border-transparent'
                    } rounded-xl p-2`}
                  >
                    <div className="flex flex-col items-center">
                      {/* Use custom image for women and men, icon for others - reduced size */}
                      {category.image ? (
                        <div className="w-8 h-8 mb-1 rounded-full overflow-hidden">
                          <img 
                            src={category.image} 
                            alt={category.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ) : (
                        <div className="text-2xl mb-1">{category.icon}</div>
                      )}
                      <span 
                        className={`text-xs font-medium text-center leading-tight ${
                          selectedCategory === category.id ? category.textColor : 'text-gray-600'
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
                      <h2 className="font-bold text-gray-900 mb-1 text-base">{getCategoryTitle(selectedCategory)}</h2>
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
                {currentCategoryOptions.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="px-4 py-3">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">{section.title}</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {section.items.map(item => (
                        <div
                          key={item.id}
                          onClick={() => handleCategoryClick(item.id)}
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <div className="w-14 h-14 rounded-full overflow-hidden mb-2 bg-white/60 backdrop-blur-sm shadow-sm">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover" 
                            />
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
