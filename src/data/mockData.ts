// Mock data for the application
export const categories = [
  {
    id: 'women',
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'men',
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'footwear',
    name: 'Footwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=100&h=100&fit=crop'
  }
];

export const banners = {
  women: [
    {
      title: "Ethnic Collection",
      subtitle: "UPTO 70% OFF - SHOP NOW",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=400&fit=crop"
    },
    {
      title: "Western Wear",
      subtitle: "New Arrivals - Trendy Styles",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=400&fit=crop"
    }
  ],
  men: [
    {
      title: "Formal Collection",
      subtitle: "Premium Shirts & Blazers",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
    },
    {
      title: "Casual Wear",
      subtitle: "Comfortable & Stylish",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop"
    }
  ],
  footwear: [
    {
      title: "Sneaker Collection",
      subtitle: "Latest Styles Available",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=400&fit=crop"
    },
    {
      title: "Formal Shoes",
      subtitle: "Office Ready Footwear",
      image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&h=400&fit=crop"
    }
  ],
  accessories: [
    {
      title: "Bags & Wallets",
      subtitle: "Premium Leather Collection",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=400&fit=crop"
    },
    {
      title: "Watches & Jewelry",
      subtitle: "Elegant Timepieces",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=400&fit=crop"
    }
  ]
};

// Hero images for ProductGrid sections by category
export const heroImages = {
  women: {
    quickPicks: {
      image: "/lovable-uploads/ecaaf61b-2105-4c36-8464-0d14580e5913.png",
      title: "SEASON'S STANDOUT"
    },
    trending: {
      image: "/lovable-uploads/ed93d5d3-7dfc-435d-b618-f1ec8b6380b5.png",
      title: "Products you can't miss"
    }
  },
  men: {
    quickPicks: {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      title: "MEN'S ESSENTIALS"
    },
    trending: {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
      title: "Trending men's styles"
    }
  },
  footwear: {
    quickPicks: {
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=400&fit=crop",
      title: "STEP IN STYLE"
    },
    trending: {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=400&fit=crop",
      title: "Latest footwear trends"
    }
  },
  accessories: {
    quickPicks: {
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=400&fit=crop",
      title: "ACCESSORY PICKS"
    },
    trending: {
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=400&fit=crop",
      title: "Must-have accessories"
    }
  }
};

// Featured Categories for each main category
export const featuredCategories = {
  women: [
    {
      id: 'deal-women',
      name: 'SNITCH DEAL OF THE DAY',
      subtitle: 'UP TO 40% OFF*',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=400&fit=crop',
      isDeal: true
    },
    {
      id: 'new-arrivals-women',
      name: 'NEW ARRIVALS',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop'
    },
    {
      id: 'dresses',
      name: 'DRESSES',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop'
    },
    {
      id: 'kurtis',
      name: 'KURTIS',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop'
    },
    {
      id: 'tops-women',
      name: 'TOPS',
      image: '/lovable-uploads/b99f6ddd-7e0e-4350-8ad7-cf9871803b27.png'
    },
    {
      id: 'jeans-women',
      name: 'JEANS',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop'
    },
    {
      id: 'skirts',
      name: 'SKIRTS',
      image: '/lovable-uploads/0cff6b78-99d4-48a8-a295-5bb972aa9d6d.png'
    },
    {
      id: 'ethnic-women',
      name: 'ETHNIC WEAR',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=400&fit=crop'
    },
    {
      id: 'plus-size-women',
      name: 'PLUS SIZE',
      image: '/lovable-uploads/eca9ad5a-9d61-4827-bf3c-e5457cc2030f.png'
    },
    {
      id: 'luxe-women',
      name: 'LUXE',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop'
    },
    {
      id: 'under-999-women',
      name: 'UNDER ₹999',
      subtitle: '₹999',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
      isPriceCategory: true
    }
  ],
  men: [
    {
      id: 'deal-men',
      name: 'SNITCH DEAL OF THE DAY',
      subtitle: 'UP TO 40% OFF*',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop',
      isDeal: true
    },
    {
      id: 'new-arrivals-men',
      name: 'NEW ARRIVALS',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'
    },
    {
      id: 'shirts-men',
      name: 'SHIRTS',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop'
    },
    {
      id: 'trousers',
      name: 'TROUSERS',
      image: 'https://images.unsplash.com/photo-1506629905543-2ad2bb0b9348?w=300&h=400&fit=crop'
    },
    {
      id: 'cargo-pants',
      name: 'CARGO PANTS',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop'
    },
    {
      id: 'polo-tshirts',
      name: 'POLO T-SHIRTS',
      image: 'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=300&h=400&fit=crop'
    },
    {
      id: 'graphic-tees',
      name: 'GRAPHIC TEES',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop'
    },
    {
      id: 'baggy-jeans',
      name: 'BAGGY JEANS',
      image: 'https://images.unsplash.com/photo-1542272454315-7ad9f1ba8b80?w=300&h=400&fit=crop'
    },
    {
      id: 'essentials-men',
      name: 'ESSENTIALS',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&h=400&fit=crop'
    },
    {
      id: 'plus-size-men',
      name: 'PLUS SIZE',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=400&fit=crop'
    },
    {
      id: 'luxe-men',
      name: 'LUXE',
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=300&h=400&fit=crop'
    },
    {
      id: 'under-999-men',
      name: 'UNDER ₹999',
      subtitle: '₹999',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop',
      isPriceCategory: true
    }
  ],
  kids: [
    {
      id: 'deal-kids',
      name: 'KIDS DEAL OF THE DAY',
      subtitle: 'UP TO 40% OFF*',
      image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=300&h=400&fit=crop',
      isDeal: true
    },
    {
      id: 'boys-collection',
      name: 'BOYS COLLECTION',
      image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=300&h=400&fit=crop'
    },
    {
      id: 'girls-collection',
      name: 'GIRLS COLLECTION',
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=300&h=400&fit=crop'
    },
    {
      id: 'baby-collection',
      name: 'BABY COLLECTION',
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=300&h=400&fit=crop'
    },
    {
      id: 'toys-games',
      name: 'TOYS & GAMES',
      image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=400&fit=crop'
    },
    {
      id: 'school-wear',
      name: 'SCHOOL WEAR',
      image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=300&h=400&fit=crop'
    }
  ],
  accessories: [
    {
      id: 'deal-accessories',
      name: 'ACCESSORIES DEAL',
      subtitle: 'UP TO 40% OFF*',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
      isDeal: true
    },
    {
      id: 'bags',
      name: 'BAGS',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop'
    },
    {
      id: 'watches',
      name: 'WATCHES',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=400&fit=crop'
    },
    {
      id: 'jewelry',
      name: 'JEWELRY',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=400&fit=crop'
    },
    {
      id: 'sunglasses',
      name: 'SUNGLASSES',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=300&fit=crop'
    },
    {
      id: 'wallets',
      name: 'WALLETS',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=400&fit=crop'
    }
  ]
};

export const products = {
  women: [
    {
      id: 'w1',
      name: 'Floral Print Dress',
      price: 1299,
      originalPrice: 1999,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
      brand: 'H&M',
      category: 'women',
      subcategory: 'dresses'
    },
    {
      id: 'w2',
      name: 'High-Waist Skinny Jeans',
      price: 1999,
      originalPrice: 2999,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop',
      brand: 'Zara',
      category: 'women',
      subcategory: 'jeans'
    },
    {
      id: 'w3',
      name: 'Silk Ethnic Kurti',
      price: 2499,
      originalPrice: 3499,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      brand: 'Jockey',
      category: 'women',
      subcategory: 'ethnic'
    }
  ],
  men: [
    {
      id: 'm1',
      name: 'Cotton Formal Shirt',
      price: 1599,
      originalPrice: 2299,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop',
      brand: 'H&M',
      category: 'men',
      subcategory: 'shirts'
    },
    {
      id: 'm2',
      name: 'Slim Fit Chinos',
      price: 1899,
      originalPrice: 2599,
      image: 'https://images.unsplash.com/photo-1506629905543-2ad2bb0b9348?w=300&h=400&fit=crop',
      brand: 'Zara',
      category: 'men',
      subcategory: 'trousers'
    },
    {
      id: 'm3',
      name: 'Graphic Print T-Shirt',
      price: 899,
      originalPrice: 1299,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      brand: 'Jockey',
      category: 'men',
      subcategory: 'tshirts'
    }
  ],
  footwear: [
    {
      id: 'f1',
      name: 'White Sneakers',
      price: 2999,
      originalPrice: 3999,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop',
      brand: 'H&M',
      category: 'footwear',
      subcategory: 'sneakers'
    },
    {
      id: 'f2',
      name: 'Leather Boots',
      price: 4999,
      originalPrice: 6999,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=400&fit=crop',
      brand: 'Zara',
      category: 'footwear',
      subcategory: 'boots'
    }
  ],
  accessories: [
    {
      id: 'a1',
      name: 'Leather Handbag',
      price: 3999,
      originalPrice: 5999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
      brand: 'H&M',
      category: 'accessories',
      subcategory: 'bags'
    },
    {
      id: 'a2',
      name: 'Classic Watch',
      price: 7999,
      originalPrice: 9999,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=400&fit=crop',
      brand: 'Zara',
      category: 'accessories',
      subcategory: 'watches'
    }
  ]
};

export const quickPicks = [
  {
    id: 'q1',
    name: 'Basic White Tee',
    price: 599,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
    brand: 'H&M'
  },
  {
    id: 'q2',
    name: 'Blue Denim Jacket',
    price: 1999,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop',
    brand: 'Zara'
  },
  {
    id: 'q3',
    name: 'Black Casual Shoes',
    price: 2499,
    originalPrice: 3499,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
    brand: 'Jockey'
  },
  {
    id: 'q4',
    name: 'Cotton Polo Shirt',
    price: 1299,
    originalPrice: 1799,
    image: 'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=300&h=400&fit=crop',
    brand: 'H&M'
  }
];

export const trendingProducts = [
  {
    id: 't1',
    name: 'Oversized Hoodie',
    price: 1799,
    originalPrice: 2599,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop',
    brand: 'Zara'
  },
  {
    id: 't2',
    name: 'High-Waist Jeans',
    price: 2199,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop',
    brand: 'H&M'
  },
  {
    id: 't3',
    name: 'Sneaker Collection',
    price: 3499,
    originalPrice: 4999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop',
    brand: 'Jockey'
  },
  {
    id: 't4',
    name: 'Floral Summer Dress',
    price: 1599,
    originalPrice: 2299,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
    brand: 'Zara'
  }
];

export const justInProducts = [
  {
    id: 'j1',
    name: 'Minimalist Watch',
    price: 4999,
    originalPrice: 6999,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=400&fit=crop',
    brand: 'H&M'
  },
  {
    id: 'j2',
    name: 'Designer Handbag',
    price: 5999,
    originalPrice: 7999,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
    brand: 'Zara'
  },
  {
    id: 'j3',
    name: 'Premium Sunglasses',
    price: 2999,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=400&fit=crop',
    brand: 'Jockey'
  },
  {
    id: 'j4',
    name: 'Leather Wallet',
    price: 1499,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=400&fit=crop',
    brand: 'H&M'
  }
];
