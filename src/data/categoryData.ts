
export interface CategoryItem {
  id: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
}

export interface CategoryData {
  title: string;
  featuredCategories: CategoryItem[];
  topSellingProducts: Product[];
  dresses: Product[];
  newArrivals: Product[];
  bestSellers: Product[];
}

export const categoryData: Record<string, CategoryData> = {
  women: {
    title: "Women's Fashion",
    featuredCategories: [
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
    ],
    topSellingProducts: [
      { id: 'w-top-1', name: 'Floral Summer Dress', price: 89, originalPrice: 120, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', brand: 'FashionCo' },
      { id: 'w-top-2', name: 'Elegant Midi Skirt', price: 65, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d65?w=400', brand: 'StyleHouse' },
      { id: 'w-top-3', name: 'Cotton Blouse', price: 45, originalPrice: 60, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', brand: 'TrendyWear' },
      { id: 'w-top-4', name: 'Denim Jacket', price: 95, image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400', brand: 'DenimWorld' }
    ],
    dresses: [
      { id: 'w-dress-1', name: 'Maxi Floral Dress', price: 120, originalPrice: 150, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', brand: 'FloralCo' },
      { id: 'w-dress-2', name: 'Party Mini Dress', price: 85, image: 'https://images.unsplash.com/photo-1566479179817-2e488b4a6cda?w=400', brand: 'PartyWear' },
      { id: 'w-dress-3', name: 'Casual A-Line Dress', price: 65, originalPrice: 80, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400', brand: 'CasualStyle' },
      { id: 'w-dress-4', name: 'Evening Gown', price: 200, image: 'https://images.unsplash.com/photo-1583334297435-8c9f90db40d4?w=400', brand: 'EveningWear' }
    ],
    newArrivals: [
      { id: 'w-new-1', name: 'Trendy Crop Top', price: 35, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400', brand: 'TrendSet' },
      { id: 'w-new-2', name: 'High-Waist Jeans', price: 80, originalPrice: 100, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', brand: 'DenimTrend' },
      { id: 'w-new-3', name: 'Silk Scarf', price: 25, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400', brand: 'SilkLux' },
      { id: 'w-new-4', name: 'Statement Earrings', price: 40, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', brand: 'JewelryBox' }
    ],
    bestSellers: [
      { id: 'w-best-1', name: 'Classic White Shirt', price: 55, originalPrice: 70, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', brand: 'ClassicWear' },
      { id: 'w-best-2', name: 'Little Black Dress', price: 110, image: 'https://images.unsplash.com/photo-1566479179817-2e488b4a6cda?w=400', brand: 'TimelessStyle' },
      { id: 'w-best-3', name: 'Leather Handbag', price: 150, originalPrice: 200, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', brand: 'LuxeBags' },
      { id: 'w-best-4', name: 'Comfortable Sneakers', price: 90, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', brand: 'ComfortWalk' }
    ]
  },
  men: {
    title: "Men's Fashion",
    featuredCategories: [
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
    ],
    topSellingProducts: [
      { id: 'm-top-1', name: 'Classic White Shirt', price: 55, originalPrice: 75, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', brand: 'MenStyle' },
      { id: 'm-top-2', name: 'Casual Polo', price: 35, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400', brand: 'SportWear' },
      { id: 'm-top-3', name: 'Formal Blazer', price: 120, originalPrice: 150, image: 'https://images.unsplash.com/photo-1594938328870-28be94da55fe?w=400', brand: 'FormalCo' },
      { id: 'm-top-4', name: 'Casual Jeans', price: 80, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', brand: 'DenimBrand' }
    ],
    dresses: [
      { id: 'm-suit-1', name: 'Business Suit', price: 300, originalPrice: 400, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', brand: 'SuitMaster' },
      { id: 'm-suit-2', name: 'Wedding Tuxedo', price: 250, image: 'https://images.unsplash.com/photo-1594938328870-28be94da55fe?w=400', brand: 'FormalWear' },
      { id: 'm-suit-3', name: 'Casual Blazer', price: 120, originalPrice: 150, image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=400', brand: 'CasualFormal' },
      { id: 'm-suit-4', name: 'Party Shirt', price: 65, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400', brand: 'PartyStyle' }
    ],
    newArrivals: [
      { id: 'm-new-1', name: 'Graphic T-Shirt', price: 25, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', brand: 'GraphicTee' },
      { id: 'm-new-2', name: 'Denim Jacket', price: 95, originalPrice: 120, image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400', brand: 'DenimStyle' },
      { id: 'm-new-3', name: 'Leather Belt', price: 45, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', brand: 'LeatherCraft' },
      { id: 'm-new-4', name: 'Sports Watch', price: 180, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400', brand: 'TimeKeeper' }
    ],
    bestSellers: [
      { id: 'm-best-1', name: 'Cotton Chinos', price: 70, originalPrice: 90, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400', brand: 'CasualFit' },
      { id: 'm-best-2', name: 'Polo Shirt', price: 40, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400', brand: 'PoloStyle' },
      { id: 'm-best-3', name: 'Leather Shoes', price: 130, originalPrice: 160, image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400', brand: 'LeatherLux' },
      { id: 'm-best-4', name: 'Casual Hoodie', price: 55, image: 'https://images.unsplash.com/photo-1556821840-3a9fbc86ecd0?w=400', brand: 'ComfortWear' }
    ]
  }
};
