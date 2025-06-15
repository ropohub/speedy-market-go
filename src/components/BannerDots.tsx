
import React from 'react';

interface BannerDotsProps {
  totalBanners: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

const BannerDots: React.FC<BannerDotsProps> = ({ 
  totalBanners, 
  currentIndex, 
  onDotClick 
}) => {
  if (totalBanners <= 1) return null;

  return (
    <div className="flex justify-center gap-1 mb-4">
      {Array.from({ length: totalBanners }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`h-1 rounded-full transition-all ${
            index === currentIndex 
              ? 'bg-orange-400 w-6' 
              : 'bg-gray-400 w-1'
          }`}
        />
      ))}
    </div>
  );
};

export default BannerDots;
