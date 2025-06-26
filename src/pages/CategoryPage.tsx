
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Layout from '../components/Layout';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
}

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  // Category-specific data
  const categoryData: Record<string, { title: string; items: CategoryItem[] }> = {
    women: {
      title: "Women's Fashion",
      items: [
        { id: 'dresses', name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop' },
        { id: 'tops', name: 'Tops & Tees', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop' },
        { id: 'jeans', name: 'Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=200&fit=crop' },
        { id: 'sarees', name: 'Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=200&fit=crop' },
        { id: 'kurti', name: 'Kurtis', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop' },
        { id: 'ethnic', name: 'Ethnic Wear', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d14?w=200&h=200&fit=crop' },
        { id: 'western', name: 'Western Wear', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop' },
        { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=200&h=200&fit=crop' },
        { id: 'bags', name: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
        { id: 'shoes', name: 'Footwear', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop' },
        { id: 'jewelry', name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop' },
        { id: 'lingerie', name: 'Innerwear', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop' }
      ]
    },
    men: {
      title: "Men's Fashion",
      items: [
        { id: 'shirts', name: 'Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&h=200&fit=crop' },
        { id: 'tshirts', name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop' },
        { id: 'jeans', name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop' },
        { id: 'formal', name: 'Formal Wear', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
        { id: 'casual', name: 'Casual Wear', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=200&fit=crop' },
        { id: 'ethnic', name: 'Ethnic Wear', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=200&h=200&fit=crop' },
        { id: 'shoes', name: 'Footwear', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=200&h=200&fit=crop' },
        { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
        { id: 'watches', name: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&h=200&fit=crop' },
        { id: 'grooming', name: 'Grooming', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=200&h=200&fit=crop' },
        { id: 'sports', name: 'Sportswear', image: 'https://images.unsplash.com/photo-1556821840-3a9fbc86ecd0?w=200&h=200&fit=crop' },
        { id: 'underwear', name: 'Innerwear', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop' }
      ]
    },
    beauty: {
      title: "Beauty & Care",
      items: [
        { id: 'makeup', name: 'Makeup', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop' },
        { id: 'skincare', name: 'Skincare', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=200&h=200&fit=crop' },
        { id: 'haircare', name: 'Hair Care', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop' },
        { id: 'fragrance', name: 'Fragrance', image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200&h=200&fit=crop' },
        { id: 'tools', name: 'Beauty Tools', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop' },
        { id: 'nails', name: 'Nail Care', image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=200&h=200&fit=crop' },
        { id: 'bath', name: 'Bath & Body', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=200&h=200&fit=crop' },
        { id: 'organic', name: 'Organic', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop' },
        { id: 'men-grooming', name: "Men's Grooming", image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop' },
        { id: 'wellness', name: 'Wellness', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop' },
        { id: 'ayurveda', name: 'Ayurveda', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop' },
        { id: 'luxury', name: 'Luxury Beauty', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop' }
      ]
    },
    accessories: {
      title: "Accessories",
      items: [
        { id: 'jewelry', name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop' },
        { id: 'bags', name: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
        { id: 'watches', name: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&h=200&fit=crop' },
        { id: 'sunglasses', name: 'Sunglasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop' },
        { id: 'belts', name: 'Belts', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
        { id: 'scarves', name: 'Scarves', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop' },
        { id: 'hats', name: 'Hats & Caps', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop' },
        { id: 'wallets', name: 'Wallets', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
        { id: 'tech', name: 'Tech Accessories', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop' },
        { id: 'hair', name: 'Hair Accessories', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop' },
        { id: 'travel', name: 'Travel Gear', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop' },
        { id: 'gift', name: 'Gift Items', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop' }
      ]
    },
    footwear: {
      title: "Footwear",
      items: [
        { id: 'sneakers', name: 'Sneakers', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop' },
        { id: 'heels', name: 'Heels', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop' },
        { id: 'flats', name: 'Flats', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop' },
        { id: 'boots', name: 'Boots', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=200&h=200&fit=crop' },
        { id: 'sandals', name: 'Sandals', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=200&h=200&fit=crop' },
        { id: 'formal', name: 'Formal Shoes', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=200&h=200&fit=crop' },
        { id: 'sports', name: 'Sports Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
        { id: 'casual', name: 'Casual Shoes', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop' },
        { id: 'ethnic', name: 'Ethnic Footwear', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop' },
        { id: 'flip-flops', name: 'Flip Flops', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=200&h=200&fit=crop' },
        { id: 'loafers', name: 'Loafers', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=200&h=200&fit=crop' },
        { id: 'slippers', name: 'Slippers', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop' }
      ]
    },
    home: {
      title: "Home & Living",
      items: [
        { id: 'decor', name: 'Home Decor', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop' },
        { id: 'bedding', name: 'Bedding', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop' },
        { id: 'kitchen', name: 'Kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop' },
        { id: 'storage', name: 'Storage', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop' },
        { id: 'lighting', name: 'Lighting', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop' },
        { id: 'furniture', name: 'Furniture', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop' },
        { id: 'bath', name: 'Bath', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop' },
        { id: 'garden', name: 'Garden', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop' },
        { id: 'cleaning', name: 'Cleaning', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop' },
        { id: 'wellness', name: 'Home Wellness', image: 'https://images.unsplash.com/photo-1602874801006-98cc0c840850?w=200&h=200&fit=crop' },
        { id: 'smart', name: 'Smart Home', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop' },
        { id: 'textiles', name: 'Textiles', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop' }
      ]
    },
    kids: {
      title: "Kids Fashion",
      items: [
        { id: 'boys', name: 'Boys Clothing', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=200&h=200&fit=crop' },
        { id: 'girls', name: 'Girls Clothing', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200&h=200&fit=crop' },
        { id: 'baby', name: 'Baby Wear', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop' },
        { id: 'shoes', name: 'Kids Footwear', image: 'https://images.unsplash.com/photo-1514590771200-23aba6c1d82a?w=200&h=200&fit=crop' },
        { id: 'accessories', name: 'Kids Accessories', image: 'https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=200&h=200&fit=crop' },
        { id: 'toys', name: 'Toys', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=200&h=200&fit=crop' },
        { id: 'school', name: 'School Supplies', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop' },
        { id: 'sports', name: 'Kids Sports', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
        { id: 'party', name: 'Party Wear', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200&h=200&fit=crop' },
        { id: 'winter', name: 'Winter Wear', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=200&h=200&fit=crop' },
        { id: 'ethnic', name: 'Ethnic Wear', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop' },
        { id: 'sleepwear', name: 'Sleepwear', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200&h=200&fit=crop' }
      ]
    }
  };

  const currentCategory = categoryData[categoryName || 'women'] || categoryData.women;

  return (
    <Layout>
      <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #FFF5F0 0%, #FFEDE0 50%, #FFE6D3 100%)'}}>
        {/* Header */}
        <div className="px-4 py-4 pt-6">
          <div className="flex items-center gap-3 mb-6">
            <button 
              onClick={handleBack}
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              {currentCategory.title}
            </h1>
          </div>
        </div>

        {/* Category Grid */}
        <div className="px-4 pb-8">
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-4 gap-3">
              {currentCategory.items.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => console.log('Navigate to:', item.id)}
                >
                  <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-lg bg-white p-2 group-hover:shadow-xl transition-shadow">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-700 mt-2 text-center font-medium leading-tight">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
