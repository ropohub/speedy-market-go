
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

interface TopSellingProductsProps {
  category: string;
}

const topSellingProducts = {
  women: [
    {
      id: 'ts-women-1',
      name: 'Floral Summer Dress',
      price: 89,
      originalPrice: 120,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
      brand: 'FashionCo'
    },
    {
      id: 'ts-women-2',
      name: 'Elegant Midi Skirt',
      price: 65,
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d65?w=400',
      brand: 'StyleHouse'
    },
    {
      id: 'ts-women-3',
      name: 'Cotton Blouse',
      price: 45,
      originalPrice: 60,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
      brand: 'TrendyWear'
    },
    {
      id: 'ts-women-4',
      name: 'Denim Jacket',
      price: 95,
      image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400',
      brand: 'DenimWorld'
    }
  ],
  men: [
    {
      id: 'ts-men-1',
      name: 'Classic White Shirt',
      price: 55,
      originalPrice: 75,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
      brand: 'MenStyle'
    },
    {
      id: 'ts-men-2',
      name: 'Casual Polo',
      price: 35,
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400',
      brand: 'SportWear'
    },
    {
      id: 'ts-men-3',
      name: 'Formal Blazer',
      price: 120,
      originalPrice: 150,
      image: 'https://images.unsplash.com/photo-1594938328870-28be94da55fe?w=400',
      brand: 'FormalCo'
    },
    {
      id: 'ts-men-4',
      name: 'Casual Jeans',
      price: 80,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      brand: 'DenimBrand'
    }
  ],
  kids: [
    {
      id: 'ts-kids-1',
      name: 'Cute T-Shirt',
      price: 25,
      originalPrice: 35,
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400',
      brand: 'KidsWear'
    },
    {
      id: 'ts-kids-2',
      name: 'Playful Dress',
      price: 40,
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400',
      brand: 'LittleOnes'
    },
    {
      id: 'ts-kids-3',
      name: 'Comfy Shorts',
      price: 20,
      image: 'https://images.unsplash.com/photo-1519457431-44ccd64ee39b?w=400',
      brand: 'PlayTime'
    },
    {
      id: 'ts-kids-4',
      name: 'School Uniform',
      price: 50,
      originalPrice: 65,
      image: 'https://images.unsplash.com/photo-1523469029811-c7c4db96d3a5?w=400',
      brand: 'SchoolStyle'
    }
  ],
  accessories: [
    {
      id: 'ts-acc-1',
      name: 'Designer Handbag',
      price: 150,
      originalPrice: 200,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      brand: 'LuxeBags'
    },
    {
      id: 'ts-acc-2',
      name: 'Stylish Watch',
      price: 200,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400',
      brand: 'TimeStyle'
    },
    {
      id: 'ts-acc-3',
      name: 'Sunglasses',
      price: 85,
      originalPrice: 110,
      image: 'https://images.unsplash.com/photo-1556306535-38febf6782e7?w=400',
      brand: 'SunWear'
    },
    {
      id: 'ts-acc-4',
      name: 'Fashion Belt',
      price: 45,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      brand: 'BeltCo'
    }
  ]
};

const TopSellingProducts: React.FC<TopSellingProductsProps> = ({ category }) => {
  const products = topSellingProducts[category as keyof typeof topSellingProducts] || topSellingProducts.women;

  return (
    <div className="bg-white py-6">
      <div className="px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Selling Products</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={() => console.log('Added to cart:', product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSellingProducts;
