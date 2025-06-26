
import React from 'react';

const IntroducingBanner: React.FC = () => {
  return (
    <div className="bg-orange-100 px-4 py-4" style={{ backgroundColor: '#FFF4E6' }}>
      <div className="flex items-center justify-between">
        {/* Left side - Introducing DRIPZY */}
        <div className="flex items-center gap-4">
          <div className="text-black">
            <div className="text-lg font-bold">INTRODUCING</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">
                <span className="bg-black text-white px-2 py-1 rounded">D</span> DRIPZY
              </div>
            </div>
          </div>
          
          {/* Vertical divider */}
          <div className="w-px h-12 bg-gray-400"></div>
          
          {/* Delivery info */}
          <div className="text-black">
            <div className="text-sm">Delivery Starting From</div>
            <div className="text-2xl font-bold">30 MINUTES</div>
          </div>
        </div>
        
        {/* Right side - Pay for only what you love */}
        <div className="text-black text-lg font-medium">
          Pay for only what you love
        </div>
      </div>
    </div>
  );
};

export default IntroducingBanner;
