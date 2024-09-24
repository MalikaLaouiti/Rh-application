import React from 'react';

interface Separator {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const Separator: React.FC<Separator> = ({
  orientation = 'horizontal',
  className = '',
}) => {
  return (
    <div
      className={`${
        orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px'
      } bg-gray-200 ${className}`}
    />
  );
};
export {Separator};
