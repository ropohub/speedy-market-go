
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
  isUpdating: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  deliveryFee,
  total,
  isUpdating
}) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">₹{deliveryFee}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-lg">₹{total}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handleCheckout}
        disabled={isUpdating}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50"
      >
        Proceed to Checkout
      </button>
      
      <button 
        onClick={() => navigate('/categories')}
        className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSummary;
