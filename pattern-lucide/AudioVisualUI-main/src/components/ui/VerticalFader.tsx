"use client";

import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { LedSignalMeter } from "./LedSignalMeter";
import { MicOff, VolumeX } from "lucide-react";

interface VerticalFaderProps {
  label: string;
  subLabel?: string;
  value: number; // 0 to 100
  level: number; // 0 to 100 for VU meter
  isMuted: boolean;
  onChange: (val: number) => void;
  onMuteToggle: () => void;
  className?: string;
  faderHeight?: string;
  compact?: boolean;
  size?: "compact" | "normal" | "large";
  showMeter?: boolean;
}

export const VerticalFader: React.FC<VerticalFaderProps> = ({
  label,
  subLabel,
  value,
  level,
  isMuted,
  onChange,
  onMuteToggle,
  className,
  faderHeight = "h-48",
  compact = false,
  size,
  showMeter = true,
}) => {
  const effectiveSize = size || (compact ? "compact" : "normal");
  const isCompact = effectiveSize === "compact";
  const isLarge = effectiveSize === "large";

  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const calculateValueFromPointer = useCallback(
    (clientY: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const height = rect.height;
      const offsetY = rect.bottom - clientY;
      const clamped = Math.max(0, Math.min(height, offsetY));
      const percentage = Math.round((clamped / height) * 100);
      onChange(percentage);
    },
    [onChange]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    calculateValueFromPointer(e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      calculateValueFromPointer(e.clientY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center bg-slate-900/90 border border-slate-700/80 rounded-xl select-none touch-none",
        isLarge
          ? "w-full max-w-[240px] p-3 sm:p-4 rounded-2xl shadow-2xl"
          : isCompact
          ? "w-20 px-1 py-1.5"
          : "w-28 p-2.5",
        className
      )}
    >
      {/* Label Area */}
      <div className={cn("w-full text-center shrink-0", isLarge ? "mb-2" : "mb-1.5")}>
        <span
          className={cn(
            "font-black block truncate",
            isLarge
              ? "text-base sm:text-lg text-slate-100 tracking-wide"
              : isCompact
              ? "text-xs text-slate-100"
              : "text-sm text-slate-100"
          )}
          title={label}
        >
          {label}
        </span>
        {subLabel && !isCompact && (
          <span
            className={cn(
              "block truncate text-slate-400 font-semibold",
              isLarge ? "text-xs mt-0.5" : "text-[10px]"
            )}
          >
            {subLabel}
          </span>
        )}
      </div>

      {/* Level Badge (0-100%) */}
      <div
        className={cn(
          "font-mono text-center font-bold rounded bg-slate-950/90 border border-slate-800 text-blue-400 shrink-0 shadow-inner",
          isLarge ? "text-sm py-1.5 px-3 mb-3 w-full rounded-lg" : isCompact ? "text-[10px] py-0.5 mb-2 w-full" : "text-xs py-1 mb-2 w-full"
        )}
      >
        {isMuted ? (
          <span className="text-red-500 font-black">MUTE</span>
        ) : (
          `${Math.round(value)}%`
        )}
      </div>

      {/* Fader Track & VU Meter Container */}
      <div
        className={cn(
          "relative flex items-center justify-center w-full min-h-0",
          isLarge ? "flex-1 gap-3 py-1" : "gap-2",
          !isLarge && faderHeight
        )}
      >
        {/* Percentage Scale (Only in non-compact mode) */}
        {!isCompact && (
          <div
            className={cn(
              "flex flex-col justify-between h-full font-mono select-none text-slate-500",
              isLarge ? "text-[11px] font-bold pr-1.5" : "text-[9px] pr-1"
            )}
          >
            <span className="text-red-400/80">100</span>
            <span>80</span>
            <span>60</span>
            <span>40</span>
            <span>20</span>
            <span className="text-amber-400/80">0</span>
          </div>
        )}

        {/* Fader Slot */}
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={cn(
            "relative h-full bg-slate-950 rounded-full border border-slate-700/80 cursor-pointer flex items-center justify-center shadow-inner",
            isLarge ? "w-11" : "w-8"
          )}
        >
          {/* Fader Center Groove */}
          <div
            className={cn(
              "h-[92%] bg-slate-800 rounded-full shadow-inner",
              isLarge ? "w-2.5" : "w-1.5"
            )}
          />

          {/* Active Level Glow Fill */}
          <div
            style={{ height: `${value}%` }}
            className={cn(
              "absolute bottom-1.5 bg-blue-500 rounded-full transition-all duration-75 shadow-[0_0_10px_rgba(59,130,246,0.8)]",
              isLarge ? "w-2.5" : "w-1.5"
            )}
          />

          {/* Fader Thumb / Knob */}
          <div
            style={{
              bottom: `calc(${value}% - ${isLarge ? "18px" : "14px"})`,
            }}
            className={cn(
              "absolute rounded-xl border flex flex-col items-center justify-center transition-all duration-75 shadow-xl select-none cursor-grab active:cursor-grabbing",
              isLarge ? "w-14 h-9 border-2" : "w-10 h-7 border",
              isMuted
                ? "bg-gradient-to-b from-slate-600 to-slate-700 border-slate-500"
                : "bg-gradient-to-b from-blue-400 via-blue-600 to-blue-700 border-blue-200 shadow-[0_0_16px_rgba(59,130,246,0.85)]"
            )}
          >
            {/* Knob metallic grip lines */}
            <div className={cn("bg-white/90 rounded-full shadow-sm", isLarge ? "w-8 h-1 mb-0.5" : "w-6 h-1")} />
            {isLarge && <div className="w-8 h-0.5 bg-white/40 rounded-full shadow-sm" />}
          </div>
        </div>

        {/* LED Signal Meter */}
        {showMeter && (
          <LedSignalMeter
            level={level}
            isMuted={isMuted}
            segments={isLarge ? 22 : isCompact ? 12 : 16}
            className={cn(isLarge && "w-3.5")}
          />
        )}
      </div>

      {/* Mute Button */}
      <button
        type="button"
        onClick={onMuteToggle}
        className={cn(
          "w-full flex items-center justify-center gap-1.5 rounded-xl font-black transition-all duration-150 active:scale-95 shrink-0",
          isLarge
            ? "mt-3 h-11 text-sm shadow-md"
            : isCompact
            ? "mt-2.5 h-7 text-xs"
            : "mt-2.5 h-8 text-xs",
          isMuted
            ? "bg-red-500 hover:bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.8)] ring-2 ring-red-400"
            : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
        )}
      >
        {isMuted ? (
          <MicOff className={cn(isLarge ? "w-4 h-4 text-white" : "w-3.5 h-3.5")} />
        ) : (
          <VolumeX className={cn(isLarge ? "w-4 h-4 opacity-70" : "w-3.5 h-3.5 opacity-60")} />
        )}
        <span>{isMuted ? "MUTED" : "MUTE"}</span>
      </button>
    </div>
  );
};
