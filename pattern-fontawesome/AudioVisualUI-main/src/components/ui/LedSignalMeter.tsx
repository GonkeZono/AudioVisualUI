"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LedSignalMeterProps {
  level: number; // 0 to 100
  segments?: number;
  orientation?: "vertical" | "horizontal";
  className?: string;
  isMuted?: boolean;
}

export const LedSignalMeter: React.FC<LedSignalMeterProps> = ({
  level,
  segments = 12,
  orientation = "vertical",
  className,
  isMuted = false,
}) => {
  const activeCount = isMuted ? 0 : Math.round((level / 100) * segments);

  return (
    <div
      className={cn(
        "flex gap-[2px] bg-slate-950 p-[2px] rounded border border-slate-800",
        orientation === "vertical"
          ? "flex-col-reverse w-2.5 h-full"
          : "flex-row h-2.5 w-full",
        className
      )}
    >
      {Array.from({ length: segments }).map((_, index) => {
        const isActive = index < activeCount;
        const ratio = index / segments;

        // Color gradient: Green (0-70%) -> Amber (70-90%) -> Red Peak (90-100%)
        let segmentColor = "bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.7)]";
        let inactiveColor = "bg-emerald-950/40";

        if (ratio >= 0.9) {
          segmentColor = "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)]";
          inactiveColor = "bg-red-950/40";
        } else if (ratio >= 0.7) {
          segmentColor = "bg-amber-400 shadow-[0_0_4px_rgba(245,158,11,0.8)]";
          inactiveColor = "bg-amber-950/40";
        }

        return (
          <div
            key={index}
            className={cn(
              "rounded-[1px] transition-all duration-75",
              orientation === "vertical" ? "w-full h-full min-h-[2px]" : "h-full w-full min-w-[2px]",
              isActive ? segmentColor : inactiveColor
            )}
          />
        );
      })}
    </div>
  );
};
