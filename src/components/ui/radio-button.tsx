import React, { useState } from 'react';

interface RadioGroupProps {
  defaultValue: string;
  onValueChange: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

interface RadioGroupItemProps {
  value: string;
  id: string;
  checked?: boolean;
  onChange?: (value: string) => void; // Update the type of onChange
}

const RadioGroup: React.FC<RadioGroupProps> = ({ defaultValue, onValueChange, className, children }) => {
  return (
    <div className={className} role="radiogroup">
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<RadioGroupItemProps>, {
          onChange: (value: string) => onValueChange(value), // Pass the onValueChange function
        })
      )}
    </div>
  );
};

const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ value, id, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={id}
        name="role" // This ensures all items are linked as a group
        value={value}
        checked={checked}
        onChange={() => {
          if (onChange) onChange(value); // Call the onChange function with the value
        }}
        className="radio-input"
      />
      <label htmlFor={id} className="radio-label">
        {id.charAt(0).toUpperCase() + id.slice(1)}
      </label>
    </div>
  );
};

export { RadioGroup, RadioGroupItem };
