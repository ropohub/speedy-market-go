import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  originalPrice?: number;
}

interface ProductYouCantMissProps {
  category: string;
}

const cantMissProducts = {
  women: [
    {
      id: 'cm-women-1',
      name: 'Limited Edition Gown',
      price: 299,
      originalPrice: 450,
      image: 'https://images.unsplash.com/photo-1566479179817-b20d0a61dbe1?w=400',
      brand: 'Elegance'
    },
    {
      id: 'cm-women-2',
      name: 'Designer Jumpsuit',
      price: 180,
      originalPrice: 250,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
      brand: 'ModernStyle'
    },
    {
      id: 'cm-women-3',
      name: 'Silk Saree',
      price: 220,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=400',
      brand: 'TraditionalWear'
    },
    {
      id: 'cm-women-4',
      name: 'Party Dress',
      price: 150,
      originalPrice: 200,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
      brand: 'PartyTime'
    },
    {
      id: 'cm-women-5',
      name: 'Evening Wear',
      price: 320,
      originalPrice: 420,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
      brand: 'NightOut'
    },
    {
      id: 'cm-women-6',
      name: 'Casual Chic',
      price: 95,
      image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400',
      brand: 'Everyday'
    }
  ],
  men: [
    {
      id: 'cm-men-1',
      name: 'Premium Suit',
      price: 350,
      originalPrice: 500,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      brand: 'SuitMaster'
    },
    {
      id: 'cm-men-2',
      name: 'Leather Jacket',
      price: 280,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      brand: 'LeatherCraft'
    },
    {
      id: 'cm-men-3',
      name: 'Designer Shirt',
      price: 95,
      originalPrice: 130,
      image: 'https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=400',
      brand: 'DesignerWear'
    },
    {
      id: 'cm-men-4',
      name: 'Casual Hoodie',
      price: 75,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
      brand: 'ComfortWear'
    }
  ],
  kids: [
    {
      id: 'cm-kids-1',
      name: 'Birthday Outfit',
      price: 85,
      originalPrice: 120,
      image: 'https://images.unsplash.com/photo-1514846326710-096e4105ffda?w=400',
      brand: 'CelebrationKids'
    },
    {
      id: 'cm-kids-2',
      name: 'Summer Collection',
      price: 55,
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400',
      brand: 'SummerKids'
    },
    {
      id: 'cm-kids-3',
      name: 'Winter Jacket',
      price: 90,
      originalPrice: 120,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400',
      brand: 'WarmKids'
    },
    {
      id: 'cm-kids-4',
      name: 'Sports Wear',
      price: 40,
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400',
      brand: 'ActiveKids'
    }
  ],
  accessories: [
    {
      id: 'cm-acc-1',
      name: 'Diamond Necklace',
      price: 500,
      originalPrice: 750,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
      brand: 'Jewelry Plus'
    },
    {
      id: 'cm-acc-2',
      name: 'Smart Watch',
      price: 299,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      brand: 'TechWear'
    },
    {
      id: 'cm-acc-3',
      name: 'Designer Scarf',
      price: 120,
      originalPrice: 160,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
      brand: 'ScarfStyle'
    },
    {
      id: 'cm-acc-4',
      name: 'Premium Wallet',
      price: 85,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      brand: 'WalletCo'
    }
  ]
};

const ProductYouCantMiss: React.FC<ProductYouCantMissProps> = ({ category }) => {
  const products = cantMissProducts[category as keyof typeof cantMissProducts] || cantMissProducts.women;

  return (
    <div 
      className="relative py-8 overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      
      {/* Content container */}
      <div className="relative z-10 px-4 max-w-md mx-auto">
        {/* Section heading - above the products */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white leading-tight drop-shadow-lg">
            Products You Can't Miss
          </h2>
        </div>
        
        {/* Horizontally scrollable products - below the heading */}
        <div className="overflow-hidden">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {products.map((product, index) => (
              <div key={product.id} className="flex-shrink-0 w-32">
                <ProductCard 
                  product={product} 
                  onAddToCart={() => console.log('Added to cart:', product)}
                  showHeartIcon={false}
                  itemNumber={index + 1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductYouCantMiss;
