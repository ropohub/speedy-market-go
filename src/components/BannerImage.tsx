
import React from 'react';

interface BannerImageProps {
  image: string;
  alt: string;
}

const BannerImage: React.FC<BannerImageProps> = ({ image, alt }) => {
  return (
    <>
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </>
  );
};

export default BannerImage;
