
import { Truck, Clock, Shield, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DeliveryPromise = () => {
  const features = [
    {
      icon: Clock,
      title: "Lightning Fast",
      description: "Get your essentials delivered in 10-30 minutes",
      color: "text-blue-600"
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "No delivery fees on orders above $25",
      color: "text-green-600"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Fresh products with 100% quality guarantee",
      color: "text-purple-600"
    },
    {
      icon: Store,
      title: "Local Partners",
      description: "Supporting local stores and businesses",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose QuickMart?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to bringing you the fastest, most reliable delivery experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform transition-transform">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 ${feature.color}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryPromise;
