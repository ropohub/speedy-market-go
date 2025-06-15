
import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  selectedSize?: string;
  quantity: number;
  productVariantId: number;
  onUpdateQuantity: (productVariantId: number, quantity: number) => void;
  onRemoveItem: (productVariantId: number) => void;
  isUpdating: boolean;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  image,
  brand,
  selectedSize,
  quantity,
  productVariantId,
  onUpdateQuantity,
  onRemoveItem,
  isUpdating
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex gap-4">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500">{brand}</p>
              <p className="text-sm text-gray-500">Size: {selectedSize}</p>
            </div>
            <button
              onClick={() => onRemoveItem(productVariantId)}
              disabled={isUpdating}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdateQuantity(productVariantId, quantity - 1)}
                disabled={isUpdating || quantity <= 1}
                className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-medium">{quantity}</span>
              <button
                onClick={() => onUpdateQuantity(productVariantId, quantity + 1)}
                disabled={isUpdating}
                className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="font-semibold text-lg">₹{price * quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
