"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define styles with cva
const switchVariants = cva(
  "relative inline-flex items-center h-6 w-11 rounded-full transition-colors",
  {
    variants: {
      checked: {
        true: "bg-green-500",
        false: "bg-gray-300",
      },
    },
    defaultVariants: {
      checked: false,
    },
  }
);

const switchHandleVariants = cva(
  "inline-block w-5 h-5 transform rounded-full bg-white transition-transform",
  {
    variants: {
      checked: {
        true: "translate-x-5",
        false: "translate-x-0",
      },
    },
    defaultVariants: {
      checked: false,
    },
  }
);

interface SwitchProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof switchVariants> {
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onCheckedChange, className, ...props }, ref) => {
    const handleToggle = () => {
      if (onCheckedChange) {
        onCheckedChange(!checked);
      }
    };

    return (
      <button
        ref={ref}
        onClick={handleToggle}
        className={cn(switchVariants({ checked }), className)}
        {...props}
      >
        <span
          className={cn(switchHandleVariants({ checked }))}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
