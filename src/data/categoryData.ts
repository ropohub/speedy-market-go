
interface CategoryItem {
  id: string;
  name: string;
  image: string;
}

interface CategorySection {
  title: string;
  items: CategoryItem[];
}

interface CategoryData {
  title: string;
  sections: CategorySection[];
}

export const categoryData: Record<string, CategoryData> = {
  women: {
    title: "Women's Fashion",
    sections: [
      {
        title: "Clothing Essentials",
        items: [
          { id: 'dresses', name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop' },
          { id: 'tops', name: 'Tops & Tees', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop' },
          { id: 'jeans', name: 'Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=200&fit=crop' },
          { id: 'skirts', name: 'Skirts', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Ethnic Wear",
        items: [
          { id: 'sarees', name: 'Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=200&fit=crop' },
          { id: 'kurti', name: 'Kurtis', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop' },
          { id: 'lehenga', name: 'Lehengas', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d14?w=200&h=200&fit=crop' },
          { id: 'suits', name: 'Suits Sets', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Accessories",
        items: [
          { id: 'bags', name: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
          { id: 'shoes', name: 'Footwear', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop' },
          { id: 'jewelry', name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop' },
          { id: 'watches', name: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Beauty & Care",
        items: [
          { id: 'makeup', name: 'Makeup', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop' },
          { id: 'skincare', name: 'Skincare', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=200&h=200&fit=crop' },
          { id: 'haircare', name: 'Hair Care', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop' },
          { id: 'fragrance', name: 'Fragrance', image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Innerwear & Loungewear",
        items: [
          { id: 'lingerie', name: 'Lingerie', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop' },
          { id: 'nightwear', name: 'Nightwear', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop' },
          { id: 'activewear', name: 'Activewear', image: 'https://images.unsplash.com/photo-1506629905744-5d42b927beb4?w=200&h=200&fit=crop' },
          { id: 'loungewear', name: 'Loungewear', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop' }
        ]
      }
    ]
  },
  men: {
    title: "Men's Fashion",
    sections: [
      {
        title: "Clothing Essentials",
        items: [
          { id: 'shirts', name: 'Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&h=200&fit=crop' },
          { id: 'tshirts', name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop' },
          { id: 'jeans', name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop' },
          { id: 'chinos', name: 'Chinos', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Formal & Ethnic",
        items: [
          { id: 'suits', name: 'Suits', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
          { id: 'blazers', name: 'Blazers', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=200&h=200&fit=crop' },
          { id: 'kurtas', name: 'Kurtas', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=200&h=200&fit=crop' },
          { id: 'sherwanis', name: 'Sherwanis', image: 'https://images.unsplash.com/photo-1566479179817-cc6b13fcec4b?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Footwear & Accessories",
        items: [
          { id: 'shoes', name: 'Formal Shoes', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=200&h=200&fit=crop' },
          { id: 'sneakers', name: 'Sneakers', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop' },
          { id: 'watches', name: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&h=200&fit=crop' },
          { id: 'belts', name: 'Belts', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Grooming & Care",
        items: [
          { id: 'grooming', name: 'Grooming', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=200&h=200&fit=crop' },
          { id: 'fragrance', name: 'Fragrance', image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200&h=200&fit=crop' },
          { id: 'skincare', name: 'Skincare', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=200&h=200&fit=crop' },
          { id: 'beard-care', name: 'Beard Care', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Sports & Casual",
        items: [
          { id: 'sports', name: 'Sportswear', image: 'https://images.unsplash.com/photo-1556821840-3a9fbc86ecd0?w=200&h=200&fit=crop' },
          { id: 'shorts', name: 'Shorts', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=200&fit=crop' },
          { id: 'tracksuits', name: 'Tracksuits', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop' },
          { id: 'casual-shoes', name: 'Casual Shoes', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop' }
        ]
      }
    ]
  },
  beauty: {
    title: "Beauty & Care",
    sections: [
      {
        title: "Face & Makeup",
        items: [
          { id: 'foundation', name: 'Foundation', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop' },
          { id: 'lipstick', name: 'Lipstick', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop' },
          { id: 'eyeshadow', name: 'Eyeshadow', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop' },
          { id: 'mascara', name: 'Mascara', image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Skincare",
        items: [
          { id: 'cleanser', name: 'Cleanser', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=200&h=200&fit=crop' },
          { id: 'moisturizer', name: 'Moisturizer', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=200&h=200&fit=crop' },
          { id: 'serum', name: 'Serum', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop' },
          { id: 'sunscreen', name: 'Sunscreen', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Hair Care",
        items: [
          { id: 'shampoo', name: 'Shampoo', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop' },
          { id: 'conditioner', name: 'Conditioner', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop' },
          { id: 'hair-oil', name: 'Hair Oil', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop' },
          { id: 'hair-mask', name: 'Hair Mask', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Fragrance & Body",
        items: [
          { id: 'perfume', name: 'Perfume', image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200&h=200&fit=crop' },
          { id: 'body-lotion', name: 'Body Lotion', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=200&h=200&fit=crop' },
          { id: 'body-wash', name: 'Body Wash', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop' },
          { id: 'deodorant', name: 'Deodorant', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop' }
        ]
      }
    ]
  },
  accessories: {
    title: "Accessories",
    sections: [
      {
        title: "Jewelry",
        items: [
          { id: 'earrings', name: 'Earrings', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop' },
          { id: 'necklaces', name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop' },
          { id: 'bracelets', name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop' },
          { id: 'rings', name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Bags & Wallets",
        items: [
          { id: 'handbags', name: 'Handbags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
          { id: 'backpacks', name: 'Backpacks', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop' },
          { id: 'wallets', name: 'Wallets', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop' },
          { id: 'clutches', name: 'Clutches', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Watches & Tech",
        items: [
          { id: 'watches', name: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&h=200&fit=crop' },
          { id: 'smart-watches', name: 'Smart Watches', image: 'https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=200&h=200&fit=crop' },
          { id: 'phone-cases', name: 'Phone Cases', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop' },
          { id: 'headphones', name: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Fashion Accessories",
        items: [
          { id: 'sunglasses', name: 'Sunglasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop' },
          { id: 'belts', name: 'Belts', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
          { id: 'scarves', name: 'Scarves', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop' },
          { id: 'hats', name: 'Hats & Caps', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop' }
        ]
      }
    ]
  },
  footwear: {
    title: "Footwear",
    sections: [
      {
        title: "Women's Footwear",
        items: [
          { id: 'heels', name: 'Heels', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop' },
          { id: 'flats', name: 'Flats', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop' },
          { id: 'boots', name: 'Boots', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=200&h=200&fit=crop' },
          { id: 'sandals', name: 'Sandals', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Men's Footwear",
        items: [
          { id: 'formal-shoes', name: 'Formal Shoes', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=200&h=200&fit=crop' },
          { id: 'sneakers', name: 'Sneakers', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop' },
          { id: 'loafers', name: 'Loafers', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=200&h=200&fit=crop' },
          { id: 'sports-shoes', name: 'Sports Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Casual & Comfort",
        items: [
          { id: 'flip-flops', name: 'Flip Flops', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=200&h=200&fit=crop' },
          { id: 'slippers', name: 'Slippers', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop' },
          { id: 'canvas-shoes', name: 'Canvas Shoes', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop' },
          { id: 'crocs', name: 'Crocs', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Ethnic Footwear",
        items: [
          { id: 'mojaris', name: 'Mojaris', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop' },
          { id: 'kolhapuris', name: 'Kolhapuris', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=200&h=200&fit=crop' },
          { id: 'juttis', name: 'Juttis', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop' },
          { id: 'nagras', name: 'Nagras', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=200&h=200&fit=crop' }
        ]
      }
    ]
  },
  home: {
    title: "Home & Living",
    sections: [
      {
        title: "Home Decor",
        items: [
          { id: 'wall-art', name: 'Wall Art', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop' },
          { id: 'cushions', name: 'Cushions', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop' },
          { id: 'candles', name: 'Candles', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop' },
          { id: 'vases', name: 'Vases', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Bedding & Bath",
        items: [
          { id: 'bed-sheets', name: 'Bed Sheets', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop' },
          { id: 'pillows', name: 'Pillows', image: 'https://images.unsplash.com/photo-1631049035970-6c971522b9c5?w=200&h=200&fit=crop' },
          { id: 'towels', name: 'Towels', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop' },
          { id: 'bath-mats', name: 'Bath Mats', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Kitchen & Dining",
        items: [
          { id: 'dinnerware', name: 'Dinnerware', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop' },
          { id: 'cookware', name: 'Cookware', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop' },
          { id: 'storage', name: 'Storage', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop' },
          { id: 'appliances', name: 'Appliances', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Furniture",
        items: [
          { id: 'chairs', name: 'Chairs', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop' },
          { id: 'tables', name: 'Tables', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop' },
          { id: 'storage-units', name: 'Storage Units', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop' },
          { id: 'lighting', name: 'Lighting', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop' }
        ]
      }
    ]
  },
  kids: {
    title: "Kids Fashion",
    sections: [
      {
        title: "Boys Clothing",
        items: [
          { id: 'boys-tshirts', name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=200&h=200&fit=crop' },
          { id: 'boys-shirts', name: 'Shirts', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop' },
          { id: 'boys-jeans', name: 'Jeans', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=200&h=200&fit=crop' },
          { id: 'boys-shorts', name: 'Shorts', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Girls Clothing",
        items: [
          { id: 'girls-dresses', name: 'Dresses', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200&h=200&fit=crop' },
          { id: 'girls-tops', name: 'Tops', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop' },
          { id: 'girls-leggings', name: 'Leggings', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200&h=200&fit=crop' },
          { id: 'girls-skirts', name: 'Skirts', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Baby Essentials",
        items: [
          { id: 'baby-onesies', name: 'Onesies', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop' },
          { id: 'baby-rompers', name: 'Rompers', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200&h=200&fit=crop' },
          { id: 'baby-sleepwear', name: 'Sleepwear', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop' },
          { id: 'bibs', name: 'Bibs', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200&h=200&fit=crop' }
        ]
      },
      {
        title: "Kids Accessories",
        items: [
          { id: 'kids-shoes', name: 'Shoes', image: 'https://images.unsplash.com/photo-1514590771200-23aba6c1d82a?w=200&h=200&fit=crop' },
          { id: 'kids-bags', name: 'School Bags', image: 'https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=200&h=200&fit=crop' },
          { id: 'toys', name: 'Toys', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=200&h=200&fit=crop' },
          { id: 'hair-accessories', name: 'Hair Accessories', image: 'https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=200&h=200&fit=crop' }
        ]
      }
    ]
  }
};
