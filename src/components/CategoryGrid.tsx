
import { Card, CardContent } from "@/components/ui/card";

const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      name: "Fresh Produce",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      itemCount: "500+ items",
      bgColor: "from-green-400 to-green-600"
    },
    {
      id: 2,
      name: "Dairy & Eggs",
      image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da",
      itemCount: "200+ items",
      bgColor: "from-blue-400 to-blue-600"
    },
    {
      id: 3,
      name: "Meat & Seafood",
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba",
      itemCount: "150+ items",
      bgColor: "from-red-400 to-red-600"
    },
    {
      id: 4,
      name: "Bakery",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
      itemCount: "100+ items",
      bgColor: "from-orange-400 to-orange-600"
    },
    {
      id: 5,
      name: "Household",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      itemCount: "300+ items",
      bgColor: "from-purple-400 to-purple-600"
    },
    {
      id: 6,
      name: "Pet Supplies",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      itemCount: "80+ items",
      bgColor: "from-pink-400 to-pink-600"
    }
  ];

  return (
    <section id="categories" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need, organized just the way you like it
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105">
              <CardContent className="p-0 relative">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.bgColor} opacity-70 group-hover:opacity-60 transition-opacity`}></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/90">{category.itemCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
