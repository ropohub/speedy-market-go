
import React from 'react';
import { Zap, Eye, RotateCcw } from 'lucide-react';

const YellowBanner: React.FC = () => {
  return (
    <div className="bg-yellow-400 px-2 py-2 md:px-4 md:py-3">
      <div className="flex items-center justify-between gap-2">
        {/* Lightning-Fast Delivery */}
        <div className="flex items-center gap-1 flex-1 justify-start">
          <Zap className="w-4 h-4 text-black flex-shrink-0" strokeWidth={2.5} />
          <span className="text-black text-xs font-bold">30 minutes Delivery</span>
        </div>
        
        {/* Try Before You Buy */}
        <div className="flex items-center gap-1 flex-1 justify-center">
          <Eye className="w-4 h-4 text-black flex-shrink-0" strokeWidth={2.5} />
          <span className="text-black text-xs font-bold">Try Before You Buy</span>
        </div>
        
        {/* On the spot Returns */}
        <div className="flex items-center gap-1 flex-1 justify-end">
          <RotateCcw className="w-4 h-4 text-black flex-shrink-0" strokeWidth={2.5} />
          <span className="text-black text-xs font-bold">On the spot Returns</span>
        </div>
      </div>
    </div>
  );
};

export default YellowBanner;
