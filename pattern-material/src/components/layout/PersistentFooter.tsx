"use client";

import React from "react";
import { useAVControl } from "@/context/AVControlContext";
import { cn } from "@/lib/utils";
import { Power, Volume2, VolumeX } from "lucide-react";

export const PersistentFooter: React.FC = () => {
  const { state, openShutdownModal, setMasterVolume, toggleMasterMute } = useAVControl();
  const { masterVolume, masterMuted, masterDb } = state;

  const dbText = masterMuted
    ? "MUTE"
    : masterDb === 0
    ? "0.0 dB"
    : masterDb > 0
    ? `+${masterDb.toFixed(1)} dB`
    : `${masterDb.toFixed(1)} dB`;

  return (
    <footer className="h-14 min-h-[56px] max-h-14 bg-slate-800 border-t border-slate-700 px-4 flex items-center justify-between select-none z-20 shadow-lg shrink-0">
      {/* Left: Shutdown Action */}
      <button
        type="button"
        onClick={openShutdownModal}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 border-red-500/80 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs transition-all duration-150 active:scale-95 shadow-sm"
      >
        <Power className="w-4 h-4 text-red-500" />
        <span>システム終了</span>
      </button>

      {/* Right: Master Volume Control */}
      <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700/80 px-3 py-1 rounded-xl">
        <div className="flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs font-bold text-slate-300">Master Volume</span>
        </div>

        {/* Horizontal Slider */}
        <div className="w-40 sm:w-52 flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={masterVolume}
            onChange={(e) => setMasterVolume(Number(e.target.value))}
            className={cn(
              "w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-950 border border-slate-700 accent-blue-500 focus:outline-none",
              masterMuted && "opacity-50"
            )}
          />
        </div>

        {/* dB Readout */}
        <div className="w-16 text-center font-mono font-bold text-[11px] bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 text-blue-400">
          <span className={masterMuted ? "text-red-500 font-bold" : ""}>
            {dbText}
          </span>
        </div>

        {/* Master MUTE Toggle */}
        <button
          type="button"
          onClick={toggleMasterMute}
          className={cn(
            "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-150 active:scale-95",
            masterMuted
              ? "bg-red-500 hover:bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.7)] ring-1 ring-red-400"
              : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
          )}
        >
          {masterMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 opacity-60" />}
          <span>{masterMuted ? "MUTED" : "MUTE"}</span>
        </button>
      </div>
    </footer>
  );
};
