'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export default function QuantitySelector({ 
  value, 
  onChange, 
  min = 1, 
  max = 99,
  size = 'md' 
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const buttonSize = size === 'sm' ? 'p-1' : 'p-2';
  const iconSize = size === 'sm' ? 14 : 18;

  return (
    <div className="flex items-center border border-gray-300 rounded-lg">
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className={`${buttonSize} hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
      >
        <Minus size={iconSize} />
      </button>
      <span className={`w-12 text-center font-semibold ${size === 'sm' ? 'text-sm' : ''}`}>
        {value}
      </span>
      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className={`${buttonSize} hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}
