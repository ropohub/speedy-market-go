
import React from 'react';
import { MapPin, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationPermissionScreenProps {
  onRetry: () => void;
  isLoading: boolean;
}

const LocationPermissionScreen: React.FC<LocationPermissionScreenProps> = ({ onRetry, isLoading }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <MapPin className="w-20 h-20 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Location Permission Required
          </h1>
          <p className="text-gray-600 leading-relaxed">
            We need your location to show you the best delivery options and nearby stores. 
            Please enable location permission to continue using the app.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={onRetry}
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Getting Location...
              </>
            ) : (
              <>
                <MapPin className="w-5 h-5 mr-2" />
                Enable Location
              </>
            )}
          </Button>
          
          <div className="text-sm text-gray-500">
            <p className="mb-2">How to enable location:</p>
            <ul className="text-left space-y-1">
              <li>• Click "Enable Location" above</li>
              <li>• Select "Allow" when prompted</li>
              <li>• If blocked, check your browser settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionScreen;
