
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const PromoPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup on every page load/refresh
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-sm sm:max-w-md p-0 bg-transparent border-0 shadow-none w-[90vw] sm:w-full">
        <DialogTitle className="sr-only">Dripzy Promo</DialogTitle>
        <DialogDescription className="sr-only">
          Try fashion at home for ₹0 - Special promotional offer
        </DialogDescription>
        <div className="relative">
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <img
            src="/lovable-uploads/23d4e45a-a048-46a7-ab7c-1d0ab7f2fa4f.png"
            alt="Dripzy Promo - Try fashion at home for ₹0"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoPopup;
