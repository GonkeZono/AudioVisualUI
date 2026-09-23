"use client";

import React from "react";
import AppIcon from "@/components/ui/AppIcon";
import { useAVControl } from "@/context/AVControlContext";
import { cn } from "@/lib/utils";

export const PersistentHeader: React.FC = () => {
  const { state, setScreen } = useAVControl();
  const { currentScreen, hallMode } = state;

  const isMainHall = hallMode === "main_hall";
  const isDashboard = currentScreen === "S03_DASHBOARD";

  // 現在のホールモードと表示画面に応じてタイトルを切り替えます。
  let modeTitle = isMainHall
    ? "大ホール利用中 (Main Hall Active)"
    : "中ホール利用中 (Mid Hall Active)";

  if (currentScreen === "S04A_VIDEO") {
    modeTitle = isMainHall
      ? "大ホール利用中 (8x5 Video Matrix)"
      : "中ホール利用中 (5x5 Video Matrix)";
  } else if (currentScreen === "S04B_AUDIO") {
    modeTitle = isMainHall
      ? "大ホール利用中 (15ch Mixer)"
      : "中ホール利用中 (13ch Mixer)";
  } else if (currentScreen === "S04C_ACTUATOR") {
    modeTitle = isMainHall
      ? "大ホール利用中 (Actuator Control)"
      : "中ホール利用中 (Actuator Control)";
  }

  return (
    <header className="h-12 min-h-[48px] max-h-12 bg-slate-900 border-b border-slate-700/80 px-4 flex items-center justify-between select-none z-20 shrink-0">
      {/* 左側：ホールモード表示 */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg shadow-sm">
          {isMainHall ? (
            <AppIcon
              type="DoorOpen"
              className="w-4 h-4 text-blue-500"
            />
          ) : (
            <AppIcon
              type="LayoutGrid"
              className="w-4 h-4 text-blue-500"
            />
          )}

          <span className="text-xs font-bold text-slate-100 tracking-wide">
            {modeTitle}
          </span>
        </div>
      </div>

      {/* 中央：オンライン状態または詳細画面切替タブ */}
      <div className="flex items-center justify-center">
        {isDashboard ? (
          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-3 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>

            <span className="text-[11px] font-semibold text-emerald-400 tracking-wider">
              All Online
            </span>
          </div>
        ) : (
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-700/80 shadow-inner">
            {/* 映像マトリクス */}
            <button
              type="button"
              onClick={() => setScreen("S04A_VIDEO")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all duration-150",
                currentScreen === "S04A_VIDEO"
                  ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              )}
            >
              <AppIcon
                type="Tv"
                className="w-3.5 h-3.5"
              />

              <span>映像マトリクス</span>
            </button>

            {/* 音響・マイク */}
            <button
              type="button"
              onClick={() => setScreen("S04B_AUDIO")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all duration-150",
                currentScreen === "S04B_AUDIO"
                  ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              )}
            >
              <AppIcon
                type="Mic2"
                className="w-3.5 h-3.5"
              />

              <span>音響・マイク</span>
            </button>

            {/* 設備制御 */}
            <button
              type="button"
              onClick={() => setScreen("S04C_ACTUATOR")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all duration-150",
                currentScreen === "S04C_ACTUATOR"
                  ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              )}
            >
              <AppIcon
                type="Layers"
                className="w-3.5 h-3.5"
              />

              <span>設備制御</span>
            </button>
          </div>
        )}
      </div>

      {/* 右側：詳細設定または基本操作への移動 */}
      <div className="flex items-center">
        {isDashboard ? (
          <button
            type="button"
            onClick={() => setScreen("S04A_VIDEO")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-500/80 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-bold transition-all duration-150 shadow-sm active:scale-95"
          >
            <AppIcon
              type="Sliders"
              className="w-3.5 h-3.5"
            />

            <span>詳細設定 (Advanced) &gt;</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setScreen("S03_DASHBOARD")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all duration-150 shadow-sm active:scale-95"
          >
            <AppIcon
              type="ArrowLeft"
              className="w-3.5 h-3.5 text-slate-400"
            />

            <span>&lt; 基本操作に戻る</span>
          </button>
        )}
      </div>
    </header>
  );
};