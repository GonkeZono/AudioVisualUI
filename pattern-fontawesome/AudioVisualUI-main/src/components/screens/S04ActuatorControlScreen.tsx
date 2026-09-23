"use client";

import React from "react";
import { useAVControl } from "@/context/AVControlContext";
import AppIcon from "@/components/ui/AppIcon";
import { cn } from "@/lib/utils";

export const S04ActuatorControlScreen: React.FC = () => {
  const { state, setScreenAction, setProjectorLiftAction } = useAVControl();

  const { actuators } = state;

  return (
    <div className="h-full w-full bg-slate-900 p-3 grid grid-cols-3 gap-3 select-none overflow-hidden min-h-0">
      {/* ========================================================
          Card 1: 電動スクリーン (Motorized Screen)
         ======================================================== */}
      <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-3 flex flex-col justify-between shadow-xl min-h-0 min-w-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-700/60 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <AppIcon
                type="Tv"
                className="w-4 h-4 text-blue-400"
              />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-100">
                電動スクリーン
              </h3>

              <span className="text-[10px] text-slate-400">
                Motorized Projector Screen
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 rounded-lg shadow-sm">
            <AppIcon
              type="CheckCircle2"
              className={cn(
                "w-3.5 h-3.5",
                actuators.screenStatus === "DOWN"
                  ? "text-emerald-400"
                  : actuators.screenStatus === "UP"
                    ? "text-slate-400"
                    : "text-amber-400"
              )}
            />

            <span
              className={cn(
                "text-[10px] font-bold",
                actuators.screenStatus === "DOWN"
                  ? "text-emerald-400"
                  : actuators.screenStatus === "UP"
                    ? "text-slate-300"
                    : "text-amber-400"
              )}
            >
              {actuators.screenStatus === "DOWN"
                ? "下降完了 (DOWN)"
                : actuators.screenStatus === "UP"
                  ? "格納完了 (UP)"
                  : "動作停止 (STOP)"}
            </span>
          </div>
        </div>

        {/* Large Screen Visual Simulation Area */}
        <div className="flex-1 my-2.5 bg-slate-950/85 rounded-2xl p-4 border border-slate-800/80 flex flex-col items-center justify-between min-h-0 relative overflow-hidden shadow-inner">
          {/* Ceiling Cassette Case */}
          <div className="w-full flex items-center justify-center shrink-0 z-10">
            <div className="w-64 h-3 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-full border border-slate-500/60 shadow-md relative flex items-center justify-between px-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />

              <span className="text-[7px] font-mono text-slate-300 font-bold uppercase tracking-widest">
                Main Screen Box
              </span>

              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.9)]" />
            </div>
          </div>

          {/* Screen Body Simulation */}
          <div className="w-full flex-1 flex flex-col items-center justify-start min-h-0 relative my-1 overflow-hidden">
            {/* Hanging Wires */}
            <div className="w-56 flex justify-between shrink-0 h-2">
              <div className="w-[1px] h-full bg-slate-500/60" />
              <div className="w-[1px] h-full bg-slate-500/60" />
            </div>

            {/* Screen Fabric Sheet */}
            <div
              className={cn(
                "w-60 max-w-[90%] bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200 rounded-b-md shadow-2xl transition-all duration-500 flex flex-col items-center justify-between border border-slate-400 relative overflow-hidden",
                actuators.screenStatus === "DOWN"
                  ? "flex-1 opacity-100 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                  : actuators.screenStatus === "UP"
                    ? "h-2 opacity-20 border-slate-600"
                    : "h-24 opacity-80"
              )}
            >
              {/* Screen Top Masking Border */}
              <div className="w-full h-2 bg-slate-900 shrink-0" />

              {/* Center Content when DOWN */}
              {actuators.screenStatus === "DOWN" ? (
                <div className="flex flex-col items-center justify-center p-3 text-center">
                  <div className="flex items-center gap-1.5 bg-blue-600/10 border border-blue-500/30 px-3 py-1 rounded-full mb-1">
                    <AppIcon
                      type="Sparkles"
                      className="w-4 h-4"
                    />

                    <span className="text-blue-900 text-xs font-black tracking-wider uppercase">
                      16:9 200 INCH
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-slate-500">
                    High Gain Matte White Screen
                  </span>
                </div>
              ) : actuators.screenStatus === "UP" ? (
                <div className="text-[8px] text-slate-400 font-bold">
                  格納中
                </div>
              ) : (
                <div className="text-[10px] text-slate-700 font-bold">
                  昇降停止中 (中間位置)
                </div>
              )}

              {/* Screen Bottom Slat Weight Bar */}
              <div className="w-full h-2.5 bg-slate-800 rounded-b border-t border-slate-600 shrink-0" />
            </div>
          </div>

          {/* Status Bar */}
          <div className="w-full text-center shrink-0 pt-1">
            <span className="text-[11px] font-bold text-slate-400">
              {actuators.screenStatus === "DOWN"
                ? "大型200インチスクリーン展開中 (投射準備完了)"
                : actuators.screenStatus === "UP"
                  ? "天井内格納中 (待機状態)"
                  : "手動停止位置"}
            </span>
          </div>
        </div>

        {/* 3 Action Buttons */}
        <div className="grid grid-cols-3 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setScreenAction("UP")}
            className={cn(
              "h-12 sm:h-14 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md",
              actuators.screenStatus === "UP"
                ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.6)] ring-1 ring-blue-300"
                : "bg-slate-900 hover:bg-slate-700 text-slate-300 border border-slate-700"
            )}
          >
            <AppIcon
              type="ArrowUp"
              className="w-4 h-4"
            />

            <span>上昇 (格納)</span>
          </button>

          <button
            type="button"
            onClick={() => setScreenAction("STOP")}
            className="h-12 sm:h-14 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 bg-red-600/80 hover:bg-red-600 text-white transition-all active:scale-95 shadow-md"
          >
            <AppIcon
              type="Pause"
              className="w-4 h-4"
            />

            <span>停止</span>
          </button>

          <button
            type="button"
            onClick={() => setScreenAction("DOWN")}
            className={cn(
              "h-12 sm:h-14 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md",
              actuators.screenStatus === "DOWN"
                ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.6)] ring-1 ring-blue-300"
                : "bg-slate-900 hover:bg-slate-700 text-slate-300 border border-slate-700"
            )}
          >
            <AppIcon
              type="ArrowDown"
              className="w-4 h-4"
            />

            <span>下降 (展開)</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          Card 2: プロジェクター昇降機 (Ceiling Projector Lift)
         ======================================================== */}
      <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-3 flex flex-col justify-between shadow-xl min-h-0 min-w-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-700/60 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <AppIcon
                type="Video"
                className="w-4 h-4 text-blue-400"
              />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-100">
                プロジェクター昇降機
              </h3>

              <span className="text-[10px] text-slate-400">
                Ceiling Projector Lift
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 rounded-lg shadow-sm">
            <AppIcon
              type="CheckCircle2"
              className={cn(
                "w-3.5 h-3.5",
                actuators.projectorLiftStatus === "LOWERED"
                  ? "text-emerald-400"
                  : actuators.projectorLiftStatus === "RAISED"
                    ? "text-slate-400"
                    : "text-amber-400"
              )}
            />

            <span
              className={cn(
                "text-[10px] font-bold",
                actuators.projectorLiftStatus === "LOWERED"
                  ? "text-emerald-400"
                  : actuators.projectorLiftStatus === "RAISED"
                    ? "text-slate-300"
                    : "text-amber-400"
              )}
            >
              {actuators.projectorLiftStatus === "LOWERED"
                ? "下降完了 (LOWERED)"
                : actuators.projectorLiftStatus === "RAISED"
                  ? "格納完了 (RAISED)"
                  : "動作停止 (STOP)"}
            </span>
          </div>
        </div>

        {/* Large Lift Visual Simulation Area */}
        <div className="flex-1 my-2.5 bg-slate-950/85 rounded-2xl p-4 border border-slate-800/80 flex flex-col items-center justify-between min-h-0 relative overflow-hidden shadow-inner">
          {/* Ceiling Base Plate */}
          <div className="w-full flex items-center justify-center shrink-0 z-10">
            <div className="w-60 h-3 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-full border border-slate-500/60 shadow-md relative flex items-center justify-between px-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />

              <span className="text-[7px] font-mono text-slate-300 font-bold uppercase tracking-widest">
                Ceiling Mount Frame
              </span>

              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.9)]" />
            </div>
          </div>

          {/* Scissor Pantograph & Projector Body */}
          <div className="w-full flex-1 flex flex-col items-center justify-between min-h-0 relative my-2 overflow-hidden">
            {/* Scissor Arm graphic */}
            <div
              className={cn(
                "w-36 flex flex-col items-center justify-around transition-all duration-500 shrink-0",
                actuators.projectorLiftStatus === "LOWERED"
                  ? "h-20 opacity-100"
                  : actuators.projectorLiftStatus === "RAISED"
                    ? "h-2 opacity-20"
                    : "h-10 opacity-60"
              )}
            >
              <div className="w-full h-[1.5px] bg-slate-600 flex justify-between px-2">
                <div className="w-1.5 h-1.5 -mt-[2px] rounded-full bg-blue-400/80" />
                <div className="w-1.5 h-1.5 -mt-[2px] rounded-full bg-blue-400/80" />
              </div>

              <div className="w-28 h-[1.5px] bg-slate-600 flex justify-between px-2">
                <div className="w-1.5 h-1.5 -mt-[2px] rounded-full bg-blue-400/80" />
                <div className="w-1.5 h-1.5 -mt-[2px] rounded-full bg-blue-400/80" />
              </div>
            </div>

            {/* Projector Unit Card */}
            <div
              className={cn(
                "w-56 p-3 rounded-xl border-2 transition-all duration-500 shadow-2xl flex flex-col items-center justify-center gap-1.5 relative shrink-0",
                actuators.projectorLiftStatus === "LOWERED"
                  ? "bg-slate-900 border-blue-500/80 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                  : actuators.projectorLiftStatus === "RAISED"
                    ? "bg-slate-900/60 border-slate-700 opacity-60"
                    : "bg-slate-900 border-amber-500/60"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                  <AppIcon
                    type="Video"
                    className="w-5 h-5 text-blue-400"
                  />
                </div>

                <div className="text-left">
                  <span className="text-xs font-black text-slate-100 block leading-tight">
                    4K Laser Projector
                  </span>

                  <span className="text-[10px] font-mono text-emerald-400 font-bold block leading-tight">
                    10,000 lm (Active)
                  </span>
                </div>
              </div>

              {/* Lens Beam Emitter Graphic */}
              <div className="w-full bg-slate-950 rounded-lg p-1.5 border border-slate-800 flex items-center justify-between px-2 mt-0.5">
                <span className="text-[9px] font-bold text-slate-400">
                  Lens Status
                </span>

                <span className="text-[9px] font-bold text-blue-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  STANDBY READY
                </span>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="w-full text-center shrink-0 pt-1">
            <span className="text-[11px] font-bold text-slate-400">
              {actuators.projectorLiftStatus === "LOWERED"
                ? "投射位置まで下降完了 (Optical Axis Aligned)"
                : actuators.projectorLiftStatus === "RAISED"
                  ? "天井内に完全格納中"
                  : "昇降動作停止中"}
            </span>
          </div>
        </div>

        {/* 3 Action Buttons */}
        <div className="grid grid-cols-3 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setProjectorLiftAction("RAISED")}
            className={cn(
              "h-12 sm:h-14 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md",
              actuators.projectorLiftStatus === "RAISED"
                ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.6)] ring-1 ring-blue-300"
                : "bg-slate-900 hover:bg-slate-700 text-slate-300 border border-slate-700"
            )}
          >
            <AppIcon
              type="ArrowUp"
              className="w-4 h-4"
            />

            <span>格納 (天井へ)</span>
          </button>

          <button
            type="button"
            onClick={() => setProjectorLiftAction("STOP")}
            className="h-12 sm:h-14 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 bg-red-600/80 hover:bg-red-600 text-white transition-all active:scale-95 shadow-md"
          >
            <AppIcon
              type="Pause"
              className="w-4 h-4"
            />

            <span>停止</span>
          </button>

          <button
            type="button"
            onClick={() => setProjectorLiftAction("LOWERED")}
            className={cn(
              "h-12 sm:h-14 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md",
              actuators.projectorLiftStatus === "LOWERED"
                ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.6)] ring-1 ring-blue-300"
                : "bg-slate-900 hover:bg-slate-700 text-slate-300 border border-slate-700"
            )}
          >
            <AppIcon
              type="ArrowDown"
              className="w-4 h-4"
            />

            <span>下降 (投射位置)</span>
          </button>
        </div>
      </div>
    </div>
  );
};