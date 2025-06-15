
import React from 'react';
import { Plus, Heart } from 'lucide-react';

interface ProductImageProps {
  name: string;
  image: string;
  onAddToCart: (e: React.MouseEvent) => void;
  showHeartIcon?: boolean;
  itemNumber?: number;
}

const ProductCardImage: React.FC<ProductImageProps> = ({
  name,
  image,
  onAddToCart,
  showHeartIcon = false,
  itemNumber,
}) => {
  return (
    <div className="relative overflow-hidden rounded-t-lg">
      <img
        src={image}
        alt={name}
        className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
          showHeartIcon ? 'h-24 md:h-32' : 'h-32 md:h-48'
        }`}
      />
      
      {showHeartIcon && (
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 shadow-sm hover:bg-opacity-100 transition-all"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
      )}
      
      {itemNumber && (
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {itemNumber}
        </div>
      )}
      
      <button
        onClick={onAddToCart}
        className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-50"
        aria-label="Add to cart"
      >
        <Plus className="w-4 h-4 text-orange-500" />
      </button>
    </div>
  );
}

export default ProductCardImage;
