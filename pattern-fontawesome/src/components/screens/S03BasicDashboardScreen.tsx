"use client";

import React from "react";
import { useAVControl, VIDEO_OFF_ID } from "@/context/AVControlContext";
import { VerticalFader } from "@/components/ui/VerticalFader";
import {
  Tv,
  Volume2,
  Layers,
  Check,
  Laptop,
  Laptop2,
  Camera,
  Cable,
  MonitorPlay,
  Video,
  Cast,
  Disc,
  PowerOff,
  ArrowUp,
  ArrowDown,
  Pause,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Icon mapping helper
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Laptop":
      return Laptop;
    case "Laptop2":
      return Laptop2;
    case "Camera":
      return Camera;
    case "Cable":
      return Cable;
    case "MonitorPlay":
      return MonitorPlay;
    case "Video":
      return Video;
    case "Cast":
      return Cast;
    case "Disc":
      return Disc;
    default:
      return Tv;
  }
};

export const S03BasicDashboardScreen: React.FC = () => {
  const {
    state,
    currentInputs,
    routeVideo,
    setAllMicsFader,
    toggleAllMicsMute,
    setPCAudioFader,
    togglePCAudioMute,
    setScreenAction,
    isAllMicsMuted,
    allMicsFaderAvg,
  } = useAVControl();

  const { videoRouting, channels, actuators, hallMode } = state;
  const isMainHall = hallMode === "main_hall";

  // Active video input for Main Projector (out_1)
  const currentProjectorInput = videoRouting.out_1 || "in_1";
  const isProjectorOff = currentProjectorInput === VIDEO_OFF_ID;

  // PC Audio Channel
  const pcChannel = channels.find((ch) => ch.type === "pc") || {
    fader: 80,
    isMuted: false,
    level: 50,
  };

  return (
    <div className="h-full w-full bg-slate-900 p-3 flex gap-3 overflow-hidden select-none">
      {/* ========================================================
          Column 1: Video Source Quick Select (メインプロジェクター)
          大ホール: 8入力 (2列×4行), 中ホール: 5入力 (2列)
         ======================================================== */}
      <div className="flex-1 bg-slate-800 border border-slate-700/80 rounded-2xl p-3 flex flex-col justify-between shadow-xl min-h-0 min-w-0 overflow-hidden">
        {/* Column Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-700/60 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <Tv className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                メインプロジェクター映像
              </h3>
              <span className="text-[10px] text-slate-400">
                {isMainHall ? "8 Inputs (Main Hall)" : "5 Inputs (Mid Hall)"}
              </span>
            </div>
          </div>

          <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded-md">
            ダイレクト切替
          </span>
        </div>

        {/* Dynamic Inputs Grid */}
        <div className="grid grid-cols-2 gap-2 my-2 flex-1 min-h-0 items-stretch">
          {currentInputs.map((input) => {
            const Icon = getIconComponent(input.iconName);
            const isActive = currentProjectorInput === input.id;

            return (
              <button
                key={input.id}
                type="button"
                onClick={() => routeVideo("out_1", input.id)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-xl border-2 transition-all duration-150 active:scale-[0.98] text-left min-h-0 shadow-sm",
                  isActive
                    ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_12px_rgba(59,130,246,0.6)] ring-1 ring-blue-300"
                    : "bg-slate-900/90 border-slate-700/80 hover:bg-slate-900 hover:border-slate-600 text-slate-300"
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-800 text-blue-400 border border-slate-700/60"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-black block truncate leading-tight">
                      {input.name.split(":")[0]}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-medium block truncate leading-tight mt-0.5",
                        isActive ? "text-blue-100" : "text-slate-400"
                      )}
                    >
                      {input.name.split(":")[1] || input.subName}
                    </span>
                  </div>
                </div>

                {isActive && (
                  <div className="flex items-center gap-1 bg-white/25 px-1.5 py-0.5 rounded-md text-[9px] font-black shrink-0 ml-1">
                    <Check className="w-3 h-3" />
                    <span>ON</span>
                  </div>
                )}
              </button>
            );
          })}

          {/* Video OFF (no signal) */}
          <button
            type="button"
            onClick={() => routeVideo("out_1", VIDEO_OFF_ID)}
            className={cn(
              "flex items-center justify-between px-3 py-2 rounded-xl border-2 transition-all duration-150 active:scale-[0.98] text-left min-h-0 shadow-sm",
              isProjectorOff
                ? "bg-red-600 border-red-400 text-white shadow-[0_0_12px_rgba(239,68,68,0.6)] ring-1 ring-red-300"
                : "bg-slate-900/90 border-slate-700/80 hover:bg-slate-900 hover:border-slate-600 text-slate-300"
            )}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                  isProjectorOff
                    ? "bg-white/20 text-white"
                    : "bg-slate-800 text-red-400 border border-slate-700/60"
                )}
              >
                <PowerOff className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-black block truncate leading-tight">
                  映像OFF
                </span>
                <span
                  className={cn(
                    "text-[10px] font-medium block truncate leading-tight mt-0.5",
                    isProjectorOff ? "text-red-100" : "text-slate-400"
                  )}
                >
                  No Signal
                </span>
              </div>
            </div>

            {isProjectorOff && (
              <div className="flex items-center gap-1 bg-white/25 px-1.5 py-0.5 rounded-md text-[9px] font-black shrink-0 ml-1">
                <Check className="w-3 h-3" />
                <span>ON</span>
              </div>
            )}
          </button>
        </div>

        {/* Bottom Info */}
        <div className="bg-slate-900/60 rounded-xl p-1.5 text-center border border-slate-700/40 shrink-0">
          <span className="text-[10px] text-slate-400">
            ※ 全出力先への個別ルーティングは「詳細設定」より行えます
          </span>
        </div>
      </div>

      {/* ========================================================
          Column 2: Audio Quick Levels (簡易音量調整)
         ======================================================== */}
      <div className="flex-1 bg-slate-800 border border-slate-700/80 rounded-2xl p-3 flex flex-col justify-between shadow-xl min-h-0 min-w-0 overflow-hidden">
        {/* Column Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-700/60 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <Volume2 className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">簡易音量調整</h3>
              <span className="text-[10px] text-slate-400">Audio Quick Levels</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded-md">
            2ch Master
          </span>
        </div>

        {/* 2 Large Vertical Faders Side-by-Side */}
        <div className="flex items-stretch justify-center gap-3 sm:gap-4 my-2 flex-1 min-h-0 w-full">
          {/* All Mics Fader */}
          <VerticalFader
            label="全マイク一括"
            subLabel="All Mic Master"
            value={allMicsFaderAvg}
            level={isAllMicsMuted ? 0 : 55}
            isMuted={isAllMicsMuted}
            onChange={setAllMicsFader}
            onMuteToggle={toggleAllMicsMute}
            size="large"
            showMeter={false}
            className="flex-1 h-full"
          />

          {/* PC Audio Fader */}
          <VerticalFader
            label="PC音声"
            subLabel="PC / Media Line"
            value={pcChannel.fader}
            level={pcChannel.level}
            isMuted={pcChannel.isMuted}
            onChange={setPCAudioFader}
            onMuteToggle={togglePCAudioMute}
            size="large"
            showMeter={false}
            className="flex-1 h-full"
          />
        </div>

        {/* Bottom Info */}
        <div className="bg-slate-900/60 rounded-xl p-1.5 text-center border border-slate-700/40 shrink-0">
          <span className="text-[10px] text-slate-400">
            ※ ワイヤレス10本・有線各chの個別調整は「詳細設定」にて可能
          </span>
        </div>
      </div>

      {/* ========================================================
          Column 3: Facilities Quick Actions (設備ワンタッチ)
         ======================================================== */}
      <div className="flex-1 bg-slate-800 border border-slate-700/80 rounded-2xl p-3 flex flex-col justify-between shadow-xl min-h-0 min-w-0 overflow-hidden">
        {/* Column Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-700/60 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <Layers className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">設備ワンタッチ</h3>
              <span className="text-[10px] text-slate-400">Facilities Quick Actions</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded-md">
            Direct Preset
          </span>
        </div>

        {/* 2 Facility Action Cards Expanded (暗幕カーテン削除後も上段の高さを維持するためgridで2段を保持) */}
        <div className="flex-1 grid grid-rows-2 gap-2.5 my-2 min-h-0">
          {/* Screen Card */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3 flex flex-col justify-between shadow-inner min-h-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-slate-100">
                  電動スクリーン
                </span>
              </div>
              <span
                className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1",
                  actuators.screenStatus === "DOWN"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : actuators.screenStatus === "UP"
                    ? "bg-slate-800 text-slate-400 border border-slate-700"
                    : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                )}
              >
                <CheckCircle2 className="w-3 h-3" />
                {actuators.screenStatus === "DOWN"
                  ? "下降完了 (DOWN)"
                  : actuators.screenStatus === "UP"
                  ? "格納完了 (UP)"
                  : "停止中 (STOP)"}
              </span>
            </div>

            {/* Screen Position Mini Indicator */}
            <div className="my-1.5 bg-slate-950/80 rounded-xl p-2 border border-slate-800/80 flex items-center justify-between px-3">
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden relative">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    actuators.screenStatus === "DOWN"
                      ? "w-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                      : actuators.screenStatus === "UP"
                      ? "w-0"
                      : "w-1/2 bg-amber-500"
                  )}
                />
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400 ml-3 shrink-0">
                {actuators.screenStatus === "DOWN"
                  ? "100%"
                  : actuators.screenStatus === "UP"
                  ? "0%"
                  : "50%"}
              </span>
            </div>

            {/* 3 Action Buttons (Large) */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setScreenAction("UP")}
                className={cn(
                  "h-12 sm:h-14 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md",
                  actuators.screenStatus === "UP"
                    ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.6)] ring-1 ring-blue-300"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                )}
              >
                <ArrowUp className="w-4 h-4" />
                <span>上昇</span>
              </button>

              <button
                type="button"
                onClick={() => setScreenAction("STOP")}
                className="h-12 sm:h-14 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 bg-red-600/80 hover:bg-red-600 text-white transition-all active:scale-95 shadow-md"
              >
                <Pause className="w-4 h-4" />
                <span>停止</span>
              </button>

              <button
                type="button"
                onClick={() => setScreenAction("DOWN")}
                className={cn(
                  "h-12 sm:h-14 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md",
                  actuators.screenStatus === "DOWN"
                    ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.6)] ring-1 ring-blue-300"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                )}
              >
                <ArrowDown className="w-4 h-4" />
                <span>下降</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="bg-slate-900/60 rounded-xl p-1.5 text-center border border-slate-700/40 shrink-0">
          <span className="text-[10px] text-slate-400">
            ※ プロジェクター昇降機の微調整は「詳細設定」へ
          </span>
        </div>
      </div>
    </div>
  );
};
