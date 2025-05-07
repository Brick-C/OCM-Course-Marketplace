import React from "react";
import { cn } from "@/lib/utils";

/**
 * @typedef {"sm" | "md" | "lg"} LoaderSize
 */

/**
 * @param {{ className?: string, size?: LoaderSize }} props
 */
const Loader = ({ className, size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-5 h-5 border-2",
    lg: "w-8 h-8 border-3",
  };

  return (
    <div
      className={cn(
        "border-gray-400 border-t-gray-600 rounded-full animate-spin",
        sizeClasses[size],
        className
      )}
    />
  );
};

export default Loader;
