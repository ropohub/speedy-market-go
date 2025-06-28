
import React, { useState, useEffect } from 'react';
import BannerImage from './BannerImage';
import BannerContent from './BannerContent';
import BannerDots from './BannerDots';

interface Banner {
  title: string;
  subtitle: string;
  image: string;
}

interface AutoSlidingBannerProps {
  banners: Banner[];
  autoSlideInterval?: number;
}

const AutoSlidingBanner: React.FC<AutoSlidingBannerProps> = ({ 
  banners, 
  autoSlideInterval = 4000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [banners.length, autoSlideInterval]);

  if (!banners.length) return null;

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative w-full h-full">
      <BannerImage 
        image={currentBanner.image} 
        alt="Banner" 
      />
      <BannerContent 
        title={currentBanner.title}
        subtitle={currentBanner.subtitle}
      />
      
      {/* Dots positioned at bottom */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <BannerDots 
          totalBanners={banners.length}
          currentIndex={currentIndex}
          onDotClick={setCurrentIndex}
        />
      </div>
    </div>
  );
};

export default AutoSlidingBanner;
