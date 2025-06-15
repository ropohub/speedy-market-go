
import React from 'react';

interface BannerContentProps {
  title: string;
  subtitle: string;
}

const BannerContent: React.FC<BannerContentProps> = ({ title, subtitle }) => {
  return (
    <div className="absolute bottom-12 left-0 p-6 text-white">
      <p className="text-orange-400 text-sm font-medium mb-1">SHOP ABOVE ₹500 TO UNLOCK A FREE PASS!</p>
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      <p className="text-sm opacity-90">{subtitle}</p>
    </div>
  );
};

export default BannerContent;
