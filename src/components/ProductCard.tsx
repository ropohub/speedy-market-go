
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { cartService } from '../api/cartClient';
import { toast } from "@/hooks/use-toast";
import ProductCardImage from './product-card/ProductCardImage';
import ProductCardInfo from './product-card/ProductCardInfo';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  originalPrice?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick?: (productId: string) => void;
  showHeartIcon?: boolean;
  itemNumber?: number;
  hideAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onClick, 
  showHeartIcon = false,
  itemNumber,
  hideAddToCart = false
}) => {
  const navigate = useNavigate();
  const firebaseUser = auth.currentUser;

  const handleCardClick = () => {
    if (onClick) {
      onClick(product.id);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (hideAddToCart) return;

    if (!firebaseUser) {
      navigate('/auth', { state: { from: window.location.pathname } });
      return;
    }

    try {
      console.log('Adding product to cart:', product.id);
      
      // Use the product ID as variant ID for now
      // In a real app, you'd need to get the actual variant ID
      const productVariantId = `gid://shopify/ProductVariant/${product.id}`;
      
      await cartService.mutateCart(productVariantId, 1);
      
      toast({
        title: "Added to Bag",
        description: `${product.name} added to your bag`,
      });

      // Call the original onAddToCart for any additional logic
      onAddToCart(product);
    } catch (error: any) {
      console.error('Failed to add to cart:', error);
      toast({
        title: "Add to Cart Failed",
        description: error.message || "Failed to add item to cart",
        variant: "destructive"
      });
    }
  };

  return (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col"
      onClick={handleCardClick}
    >
      <ProductCardImage 
        name={product.name}
        image={product.image}
        onAddToCart={handleAddToCart}
        showHeartIcon={showHeartIcon}
        itemNumber={itemNumber}
        hideAddToCart={hideAddToCart}
      />
      <ProductCardInfo 
        brand={product.brand}
        name={product.name}
        price={product.price}
        originalPrice={product.originalPrice}
      />
    </div>
  );
};

export default ProductCard;
