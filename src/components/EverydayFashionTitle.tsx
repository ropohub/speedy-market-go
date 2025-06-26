
import React from 'react';

const EverydayFashionTitle: React.FC = () => {
  return (
    <h2 className="text-xl font-bold leading-none mb-0" style={{
      background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 50%, #FFA07A 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: '0 2px 4px rgba(255, 107, 53, 0.3)'
    }}>
      <div>Everyday</div>
      <div style={{ marginTop: '-0.25rem' }}>Fashion</div>
    </h2>
  );
};

export default EverydayFashionTitle;
