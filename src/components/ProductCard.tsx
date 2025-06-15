
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onClick, 
  showHeartIcon = false,
  itemNumber
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCardClick = () => {
    if (onClick) {
      onClick(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking add to cart
    
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: window.location.pathname } });
      return;
    }
    
    onAddToCart(product);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col"
      onClick={handleCardClick}
    >
      <ProductCardImage 
        name={product.name}
        image={product.image}
        onAddToCart={handleAddToCart}
        showHeartIcon={showHeartIcon}
        itemNumber={itemNumber}
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
