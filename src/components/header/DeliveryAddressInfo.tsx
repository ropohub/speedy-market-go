
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DeliveryAddressInfoProps {
  fullAddress: string;
  shortAddress: string;
}

const DeliveryAddressInfo: React.FC<DeliveryAddressInfoProps> = ({ 
  fullAddress, 
  shortAddress 
}) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex flex-col min-w-0">
        <div className="text-sm font-bold text-gray-900 truncate">
          Deliver to {shortAddress}
        </div>
        <div className="text-xs text-gray-600 truncate">
          {fullAddress}
        </div>
      </div>
      <ChevronDown className="w-4 h-4 text-gray-600 flex-shrink-0" />
    </div>
  );
};

export default DeliveryAddressInfo;
