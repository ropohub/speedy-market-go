
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
          <Clock className="h-4 w-4 mr-2" />
          Delivery in 10-30 minutes
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-orange-600 bg-clip-text text-transparent leading-tight animate-fade-in">
          Groceries & Essentials
          <br />
          <span className="text-4xl md:text-6xl">Delivered Fast</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
          Get your daily essentials, fresh groceries, and household items delivered to your doorstep in minutes.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in">
          <div className="flex items-center bg-white rounded-full shadow-lg px-6 py-4 w-full sm:w-auto">
            <MapPin className="h-5 w-5 text-gray-500 mr-3" />
            <input 
              type="text" 
              placeholder="Enter your delivery address"
              className="bg-transparent outline-none flex-1 min-w-0 text-gray-700"
            />
          </div>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 px-8 py-4 text-lg font-semibold">
            Start Shopping
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="text-3xl font-bold text-blue-600 mb-2">10-30min</div>
            <div className="text-gray-600">Average Delivery</div>
          </div>
          <div className="text-center animate-fade-in">
            <div className="text-3xl font-bold text-orange-500 mb-2">5000+</div>
            <div className="text-gray-600">Products Available</div>
          </div>
          <div className="text-center animate-fade-in">
            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600">Service Available</div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-orange-200 to-transparent rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-200 to-transparent rounded-full opacity-20 animate-pulse"></div>
    </section>
  );
};

export default Hero;
