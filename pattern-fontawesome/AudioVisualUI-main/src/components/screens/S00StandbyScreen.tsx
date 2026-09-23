"use client";

import React from "react";
import AppIcon from "@/components/ui/AppIcon";
import { useAVControl } from "@/context/AVControlContext";

export const S00StandbyScreen: React.FC = () => {
  const { state, setScreen } = useAVControl();
  const { currentTime, currentDate } = state;

  return (
    <div
      onClick={() => setScreen("S01_PRESET")}
      className="h-full w-full bg-slate-900 flex flex-col justify-between items-center p-8 select-none cursor-pointer overflow-hidden relative"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Right: Status Pill */}
      <div className="w-full flex justify-end">
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 px-4 py-2 rounded-full shadow-md backdrop-blur-sm">
          <AppIcon
            type="Wifi"
            className="w-4 h-4 text-emerald-400"
          />

          <span className="text-xs font-semibold text-emerald-400 tracking-wide">
            System: Standby / Ready
          </span>
        </div>
      </div>

      {/* Center: System Title & Clock */}
      <div className="flex flex-col items-center justify-center text-center -mt-6">
        <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 shadow-inner">
          <AppIcon
            type="Building2"
            className="w-12 h-12 text-blue-500"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-50 tracking-tight mb-2">
          Multi-Purpose Event Hall AV System
        </h1>

        <p className="text-sm font-medium text-slate-400 mb-8">
          多目的ホール AV統合制御システム
        </p>

        {/* Large Digital Clock */}
        <div className="flex flex-col items-center bg-slate-800/50 border border-slate-700/60 px-10 py-5 rounded-2xl backdrop-blur-md shadow-2xl">
          <span className="font-mono text-7xl font-extrabold text-slate-50 tracking-wider drop-shadow-md">
            {currentTime}
          </span>

          <span className="text-sm font-semibold tracking-widest text-slate-400 mt-2">
            {currentDate}
          </span>
        </div>
      </div>

      {/* Center Bottom: Glowing Start Button */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setScreen("S01_PRESET");
          }}
          className="h-16 w-84 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-slate-50 font-bold text-lg shadow-[0_0_30px_rgba(59,130,246,0.5)] border border-blue-400/40 flex items-center justify-center gap-3 transition-all duration-200 active:scale-95 animate-pulse-subtle"
        >
          <AppIcon
            type="Power"
            className="w-6 h-6 text-white"
          />

          <span>Touch Screen to Start</span>
        </button>

        <span className="text-xs text-slate-500 mt-3">
          画面のどこをタッチしても起動画面へ進みます
        </span>
      </div>
    </div>
  );
};