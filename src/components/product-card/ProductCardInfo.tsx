
import React from 'react';

interface ProductInfoProps {
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
}

const ProductCardInfo: React.FC<ProductInfoProps> = ({ brand, name, price, originalPrice }) => {
  return (
    <div className="p-2 flex-1 flex flex-col justify-between min-h-[60px]">
      <div>
        <p className="text-xs text-gray-500 mb-1 truncate">{brand}</p>
        <h3 className="font-medium text-gray-900 text-xs mb-1 line-clamp-2 leading-tight h-8 overflow-hidden">{name}</h3>
      </div>
      <div className="flex items-center gap-1 mt-auto">
        <span className="font-bold text-gray-900 text-xs">₹{price}</span>
        {originalPrice && (
          <span className="text-xs text-gray-500 line-through">₹{originalPrice}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCardInfo;
