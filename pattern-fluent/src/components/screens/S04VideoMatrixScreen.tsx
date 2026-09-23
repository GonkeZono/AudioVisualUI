"use client";

import React from "react";
import { useAVControl, VIDEO_OFF_ID } from "@/context/AVControlContext";
import { VIDEO_OUTPUTS } from "@/context/AVControlContext";
import {
  Laptop,
  Laptop2,
  Camera,
  Cable,
  MonitorPlay,
  Video,
  Cast,
  Disc,
  Tv,
  Projector,
  Monitor,
  Check,
  ArrowRight,
  Sparkles,
  Share2,
  PowerOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoFloorPlan } from "@/components/ui/VideoFloorPlan";

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
    case "Projector":
      return Projector;
    case "Tv":
      return Tv;
    case "Monitor":
      return Monitor;
    default:
      return Tv;
  }
};

export const S04VideoMatrixScreen: React.FC = () => {
  const { state, currentInputs, selectVideoInput, routeVideo } = useAVControl();
  const { selectedVideoInputId, videoRouting, hallMode } = state;

  const isOffSelected = selectedVideoInputId === VIDEO_OFF_ID;
  const selectedInput = isOffSelected
    ? undefined
    : currentInputs.find((i) => i.id === selectedVideoInputId) || currentInputs[0];
  const isMainHall = hallMode === "main_hall";

  // Route selected input (or OFF) to all outputs
  const handleRouteToAll = () => {
    if (!selectedVideoInputId) return;
    VIDEO_OUTPUTS.forEach((out) => {
      routeVideo(out.id, selectedVideoInputId);
    });
  };

  return (
    <div className="h-full w-full bg-slate-900 p-2.5 flex gap-2.5 select-none overflow-hidden min-h-0">
      {/* ========================================================
          Left Column: Step 1 (Input Select) + Step 2 (Output Assign)
         ======================================================== */}
      <div className="w-[47%] shrink-0 flex flex-col justify-between min-h-0">
        {/* Step 1: Input Sources Selection */}
        <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-2 shadow-lg flex flex-col justify-between shrink-0">
          <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white font-black text-xs">
                1
              </span>
              <h3 className="text-xs font-bold text-slate-100">
                入力ソースを選択
              </h3>
            </div>

            <button
              type="button"
              onClick={handleRouteToAll}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-[10px] font-bold transition-all active:scale-95 border border-slate-600 shadow-sm"
            >
              <Share2 className="w-3 h-3 text-blue-400" />
              <span>全出力へ一括</span>
            </button>
          </div>
          <span className="text-[10px] text-blue-400 font-medium mb-1 block truncate">
            選択中: <strong className="text-white font-bold">{isOffSelected ? "映像OFF" : selectedInput?.name}</strong>
          </span>

          {/* Input Buttons Grid */}
          <div className="grid grid-cols-3 gap-1.5">
            {currentInputs.map((input) => {
              const Icon = getIconComponent(input.iconName);
              const isSelected = selectedVideoInputId === input.id;

              return (
                <button
                  key={input.id}
                  type="button"
                  onClick={() => selectVideoInput(input.id)}
                  className={cn(
                    "h-12 rounded-xl border-2 p-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-150 active:scale-95 text-center relative min-h-0",
                    isSelected
                      ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_10px_rgba(59,130,246,0.7)] ring-1 ring-blue-300"
                      : "bg-slate-900/90 border-slate-700/80 hover:bg-slate-900 hover:border-slate-600 text-slate-300"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5 shrink-0",
                      isSelected ? "text-white" : "text-blue-400"
                    )}
                  />
                  <span className="text-[10px] font-bold block truncate w-full leading-tight">
                    {input.name.split(":")[0]}
                  </span>
                  <span
                    className={cn(
                      "text-[8px] block truncate w-full leading-tight",
                      isSelected ? "text-blue-100" : "text-slate-400"
                    )}
                  >
                    {input.name.split(":")[1] || input.subName}
                  </span>

                  {isSelected && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </button>
              );
            })}

            {/* Video OFF (no signal) */}
            <button
              type="button"
              onClick={() => selectVideoInput(VIDEO_OFF_ID)}
              className={cn(
                "h-12 rounded-xl border-2 p-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-150 active:scale-95 text-center relative min-h-0",
                isOffSelected
                  ? "bg-red-600 border-red-400 text-white shadow-[0_0_10px_rgba(239,68,68,0.7)] ring-1 ring-red-300"
                  : "bg-slate-900/90 border-slate-700/80 hover:bg-slate-900 hover:border-slate-600 text-slate-300"
              )}
            >
              <PowerOff
                className={cn(
                  "w-3.5 h-3.5 shrink-0",
                  isOffSelected ? "text-white" : "text-red-400"
                )}
              />
              <span className="text-[10px] font-bold block truncate w-full leading-tight">
                映像OFF
              </span>
              <span
                className={cn(
                  "text-[8px] block truncate w-full leading-tight",
                  isOffSelected ? "text-red-100" : "text-slate-400"
                )}
              >
                No Signal
              </span>

              {isOffSelected && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow">
                  <Check className="w-2.5 h-2.5" />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Guide Indicator */}
        <div className="flex items-center justify-center gap-1.5 py-0.5 my-0.5 shrink-0">
          <span className="text-[10px] font-semibold text-slate-400 text-center">
            選択した入力を割り当てる出力先をタップしてください
          </span>
          <ArrowRight className="w-3 h-3 text-blue-400 animate-pulse shrink-0" />
        </div>

        {/* Step 2: Output Destinations */}
        <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-2 shadow-lg flex-1 flex flex-col justify-between min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-1 shrink-0">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white font-black text-xs">
                2
              </span>
              <h3 className="text-xs font-bold text-slate-100">
                出力先を選択して紐付け
              </h3>
            </div>
          </div>

          {/* 5 Destination Cards */}
          <div className="grid grid-cols-2 gap-1.5 flex-1 min-h-0 py-0.5 items-stretch">
            {VIDEO_OUTPUTS.map((output) => {
              const Icon = getIconComponent(output.iconName);
              const assignedInputId = videoRouting[output.id] || "in_1";
              const isOff = assignedInputId === VIDEO_OFF_ID;
              const assignedInput = isOff
                ? undefined
                : currentInputs.find((i) => i.id === assignedInputId) || currentInputs[0];
              const AssignedIcon = isOff ? PowerOff : assignedInput ? getIconComponent(assignedInput.iconName) : Tv;
              const isMatchingSelected = !!selectedVideoInputId && selectedVideoInputId === assignedInputId;

              return (
                <div
                  key={output.id}
                  className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-1.5 flex flex-col justify-between shadow-inner min-h-0 overflow-hidden"
                >
                  {/* Destination Header */}
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-5 h-5 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                        <Icon className="w-3 h-3 text-blue-400" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] font-bold text-slate-100 block truncate leading-tight">
                          {output.name}
                        </span>
                        <span className="text-[8px] text-slate-400 block truncate leading-tight">
                          {output.subName}
                        </span>
                      </div>
                    </div>

                    {/* Current Assigned Input Card */}
                    <div className="mt-1 bg-slate-950/80 border border-slate-800 rounded-md p-1 flex items-center gap-1.5">
                      <AssignedIcon className={cn("w-3 h-3 shrink-0", isOff ? "text-red-400" : "text-emerald-400")} />
                      <div className="overflow-hidden">
                        <span className="text-[8px] text-slate-400 block leading-tight">
                          現在の接続:
                        </span>
                        <span className={cn("text-[10px] font-bold block truncate leading-tight", isOff ? "text-red-400" : "text-emerald-400")}>
                          {isOff ? "OFF（映像なし）" : assignedInput?.name || "未接続"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Assignment Action Button */}
                  <button
                    type="button"
                    onClick={() => routeVideo(output.id)}
                    className={cn(
                      "w-full h-7 mt-1 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all duration-150 active:scale-95 shrink-0",
                      isMatchingSelected
                        ? "bg-slate-800 text-slate-300 border border-slate-700 cursor-default"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-md hover:shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                    )}
                  >
                    {isMatchingSelected ? (
                      isOff ? (
                        <>
                          <PowerOff className="w-3 h-3 text-red-400" />
                          <span>映像OFF</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>接続中</span>
                        </>
                      )
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        <span>割り当て</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================
          Right Column: Step 3 - Floor Plan (input/output positions)
         ======================================================== */}
      <div className="flex-1 min-w-0 bg-slate-800 border border-slate-700/80 rounded-2xl p-2.5 shadow-lg flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-1.5 shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white font-black text-xs">
              3
            </span>
            <h3 className="text-xs font-bold text-slate-100">
              平面図（入出力の設置位置）
            </h3>
          </div>
          <span className="text-[10px] text-slate-400">
            {isMainHall ? "大ホール利用（合同）" : "中ホール＋会議室（分割）"}
          </span>
        </div>

        <VideoFloorPlan
          hallMode={hallMode}
          outputs={VIDEO_OUTPUTS}
          videoRouting={videoRouting}
          selectedVideoInputId={selectedVideoInputId}
        />
      </div>
    </div>
  );
};
