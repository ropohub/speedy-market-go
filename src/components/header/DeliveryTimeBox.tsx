
import React from 'react';

interface DeliveryTimeBoxProps {
  timeInMinutes: number;
}

const DeliveryTimeBox: React.FC<DeliveryTimeBoxProps> = ({ timeInMinutes }) => {
  return (
    <div className="bg-red-500 text-white px-2.5 py-1 rounded-full">
      <div className="text-xs font-semibold text-center">
        <div className="text-sm font-bold">{timeInMinutes}</div>
        <div className="text-xs">mins</div>
      </div>
    </div>
  );
};

export default DeliveryTimeBox;
