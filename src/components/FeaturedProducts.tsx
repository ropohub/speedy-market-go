
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Organic Bananas",
      price: 2.99,
      originalPrice: 3.49,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
      rating: 4.8,
      reviews: 124,
      tag: "Bestseller"
    },
    {
      id: 2,
      name: "Fresh Milk - 1L",
      price: 4.29,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
      rating: 4.9,
      reviews: 89,
      tag: "Fresh"
    },
    {
      id: 3,
      name: "Artisan Bread",
      price: 5.99,
      originalPrice: 7.99,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
      rating: 4.7,
      reviews: 56,
      tag: "Hot Deal"
    },
    {
      id: 4,
      name: "Premium Coffee",
      price: 12.99,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e",
      rating: 4.9,
      reviews: 203,
      tag: "Premium"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600">
            Handpicked favorites that our customers love
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group cursor-pointer border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">
                    {product.tag}
                  </Badge>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
