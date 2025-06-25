
import React from 'react';
import { Heart } from 'lucide-react';

const WishlistIcon: React.FC = () => {
  return (
    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
      <Heart className="w-5 h-5 text-gray-700" />
    </button>
  );
};

export default WishlistIcon;
