
import React from 'react';

const Shimmer: React.FC = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-300/30 dark:via-gray-600/30 to-transparent"></div>
);

const LoadingSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700 ${className}`}>
      <Shimmer />
    </div>
  );
};

export default LoadingSkeleton;
