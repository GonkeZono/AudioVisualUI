"use client";

import React from "react";
import AppIcon from "@/components/ui/AppIcon";
import { useAVControl } from "@/context/AVControlContext";
import { HallMode } from "@/types/av-types";

export const S01PresetSelectionScreen: React.FC = () => {
  const { setScreen, setHallMode } = useAVControl();

  const handleSelectMode = (mode: HallMode) => {
    setHallMode(mode);
    setScreen("S02_WARMUP");
  };

  return (
    <div className="h-full w-full bg-slate-900 flex flex-col justify-between p-6 select-none overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setScreen("S00_STANDBY")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-sm font-semibold transition-all duration-150 active:scale-95"
        >
          <AppIcon
            type="ArrowLeft"
            className="w-4 h-4 text-slate-400"
          />

          <span>スタンバイに戻る</span>
        </button>

        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>Select Operation Preset</span>

          <span className="text-sm font-normal text-slate-400">
            / 運用プリセット選択
          </span>
        </h2>

        {/* Spacer */}
        <div className="w-24" />
      </div>

      {/* Main Body: 2 Large Side-by-Side Cards */}
      <div className="grid grid-cols-2 gap-6 my-auto max-w-5xl mx-auto w-full">
        {/* Left Card: Main Hall */}
        <div
          onClick={() => handleSelectMode("main_hall")}
          className="group relative bg-slate-800/90 hover:bg-slate-800 border-2 border-slate-700 hover:border-blue-500 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] active:scale-[0.99]"
        >
          <div>
            {/* Icon & Title */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <AppIcon
                  type="DoorOpen"
                  className="w-9 h-9 text-blue-500"
                />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Full Hall Setup
                </span>

                <h3 className="text-2xl font-extrabold text-slate-50">
                  大ホール利用
                </h3>

                <span className="text-xs text-slate-400">
                  Main Hall Mode
                </span>
              </div>
            </div>

            {/* Spec Tags */}
            <div className="space-y-2.5 my-4">
              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-200">
                <AppIcon
                  type="Check"
                  className="w-4 h-4 text-emerald-400 shrink-0"
                />

                <span>映像: HDMI 8系統 (全入力利用可能)</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-200">
                <AppIcon
                  type="Check"
                  className="w-4 h-4 text-emerald-400 shrink-0"
                />

                <span>音声: WM 10本 + 有線 4本 + PC (計15ch)</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-200">
                <AppIcon
                  type="Check"
                  className="w-4 h-4 text-emerald-400 shrink-0"
                />

                <span>全設備連動 (スクリーン / 昇降機)</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            className="w-full h-12 mt-2 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all duration-150"
          >
            <AppIcon
              type="Sparkles"
              className="w-4 h-4"
            />

            <span>大ホールで起動する (Start Main Hall)</span>
          </button>
        </div>

        {/* Right Card: Mid Hall */}
        <div
          onClick={() => handleSelectMode("mid_hall")}
          className="group relative bg-slate-800/90 hover:bg-slate-800 border-2 border-slate-700 hover:border-blue-500 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] active:scale-[0.99]"
        >
          <div>
            {/* Icon & Title */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <AppIcon
                  type="LayoutGrid"
                  className="w-9 h-9 text-blue-500"
                />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Partitioned Hall Setup
                </span>

                <h3 className="text-2xl font-extrabold text-slate-50">
                  中ホール利用
                </h3>

                <span className="text-xs text-slate-400">
                  Mid Hall Mode
                </span>
              </div>
            </div>

            {/* Spec Tags */}
            <div className="space-y-2.5 my-4">
              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-200">
                <AppIcon
                  type="Check"
                  className="w-4 h-4 text-emerald-400 shrink-0"
                />

                <span>映像: HDMI 5系統 (ステージ＆演台)</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-200">
                <AppIcon
                  type="Check"
                  className="w-4 h-4 text-emerald-400 shrink-0"
                />

                <span>音声: WM 10本 + 有線 2本 + PC (計13ch)</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-200">
                <AppIcon
                  type="Check"
                  className="w-4 h-4 text-emerald-400 shrink-0"
                />

                <span>分割エリア音響・個別設備連動</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            className="w-full h-12 mt-2 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all duration-150"
          >
            <AppIcon
              type="Sparkles"
              className="w-4 h-4"
            />

            <span>中ホールで起動する (Start Mid Hall)</span>
          </button>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center">
        <p className="text-xs text-slate-400">
          ※ モードを選択すると、音声ルーティング、映像スイッチャー、電動スクリーン・昇降機が自動で連動起動します。
        </p>
      </div>
    </div>
  );
};