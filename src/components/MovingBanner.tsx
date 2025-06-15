
import React from 'react';

interface MovingBannerProps {
  text: string;
}

const MovingBanner: React.FC<MovingBannerProps> = ({ text }) => {
  return (
    <div className="bg-yellow-400 py-1 overflow-hidden whitespace-nowrap relative">
      <div className="animate-marquee inline-block min-w-full">
        <span className="text-black font-semibold text-sm px-4">
          {text} • {text} • {text} • {text} • {text} • {text} • {text} • {text} • {text} • {text}
        </span>
      </div>
    </div>
  );
};

export default MovingBanner;
