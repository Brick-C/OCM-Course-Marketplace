"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

/**
 * @typedef {"default" | "success"} Variant
 * @typedef {"default" | "sm"} Size
 */

/**
 * @param {{
 *   progress: number,
 *   variant?: Variant,
 *   size?: Size,
 *   showPercentage?: boolean,
 *   label?: string,
 *   className?: string
 * }} props
 */
const CourseProgress = ({
  progress,
  variant = "default",
  size = "default",
  showPercentage = true,
  label,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2 text-sm">
        {label && <span className="text-muted-foreground">{label}</span>}
        {showPercentage && (
          <span className="text-muted-foreground">{progress}%</span>
        )}
      </div>
      <Progress
        value={progress}
        className={cn(
          "h-2 transition-all",
          size === "sm" && "h-1",
          variant === "success" && "[&>div]:bg-emerald-600"
        )}
      />
    </div>
  );
};

export default CourseProgress;
