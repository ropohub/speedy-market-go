
import { ShoppingCart, Package, Truck, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import DeliveryPromise from "@/components/DeliveryPromise";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-2 rounded-xl">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              QuickMart
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#categories" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Categories
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              How it Works
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
            </Button>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <DeliveryPromise />
        <CategoryGrid />
        <FeaturedProducts />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
