"use client";

import React from "react";
import { Projector, Tv, Monitor, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { VIDEO_OFF_ID } from "@/context/AVControlContext";
import { VideoOutputDestination, VideoRoutingMap, HallMode } from "@/types/av-types";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Projector":
      return Projector;
    case "Tv":
      return Tv;
    case "Monitor":
      return Monitor;
    default:
      return Video;
  }
};

// Output destination positions on the hall floor plan (percent coordinates), based on the previously shared floor plan.
const OUTPUT_POSITIONS: Record<string, { x: number; y: number }> = {
  out_1: { x: 16, y: 50 }, // メインプロジェクター (プロジェクタースクリーン / 左壁中央)
  out_3: { x: 68, y: 6 }, // 可搬サブディスプレイ2 (可搬ディスプレイ右 / 上壁中央)
  out_2: { x: 76, y: 96 }, // 可搬サブディスプレイ1 (可搬ディスプレイ左 / 下壁中央)
  out_4: { x: 22, y: 91 }, // プレビューモニター (左下)
  out_5: { x: 20, y: 13 }, // Web会議カメラ入力 (左上)
};

// Partition wall position when the hall is split into 中ホール + 会議室 (right side rooms are outside this AV system).
const PARTITION_X = 82;

interface VideoFloorPlanProps {
  hallMode: HallMode;
  outputs: VideoOutputDestination[];
  videoRouting: VideoRoutingMap;
  selectedVideoInputId: string | null;
}

export const VideoFloorPlan: React.FC<VideoFloorPlanProps> = ({
  hallMode,
  outputs,
  videoRouting,
  selectedVideoInputId,
}) => {
  const isMainHall = hallMode === "main_hall";
  const seatColumns = isMainHall ? 7 : 3;

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="relative w-full flex-1 min-h-0 rounded-lg border border-slate-700 bg-slate-950/60 overflow-hidden">
        {/* Seating area (decorative context only) */}
        <div
          className="absolute grid gap-[3px] opacity-30"
          style={{
            left: "30%",
            top: "18%",
            width: isMainHall ? "48%" : "24%",
            height: "68%",
            gridTemplateColumns: `repeat(${seatColumns}, minmax(0,1fr))`,
            gridTemplateRows: "repeat(5, minmax(0,1fr))",
          }}
        >
          {Array.from({ length: seatColumns * 5 }).map((_, i) => (
            <div key={i} className="bg-slate-600 rounded-[2px]" />
          ))}
        </div>

        {/* Partition wall for split (中ホール＋会議室) mode */}
        {!isMainHall && (
          <>
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-slate-500"
              style={{ left: `${PARTITION_X}%` }}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center justify-center bg-slate-800/50"
              style={{ left: `${PARTITION_X}%` }}
            >
              <span className="text-[9px] text-slate-500 font-semibold [writing-mode:vertical-rl] leading-tight">
                会議室（対象外）
              </span>
            </div>
          </>
        )}

        {/* Output markers (installation position reference only); glows when routed to the currently selected input */}
        {outputs.map((output) => {
          const pos = OUTPUT_POSITIONS[output.id];
          if (!pos) return null;
          const Icon = getIconComponent(output.iconName);
          const isActiveSelection = !!selectedVideoInputId && videoRouting[output.id] === selectedVideoInputId;
          const isOffActive = isActiveSelection && videoRouting[output.id] === VIDEO_OFF_ID;
          return (
            <div
              key={output.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 z-10"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-md border flex items-center justify-center shadow transition-all duration-150",
                  isOffActive
                    ? "bg-red-500/30 border-red-400 text-red-300 shadow-[0_0_10px_rgba(248,113,113,0.8)] ring-2 ring-red-400/60"
                    : isActiveSelection
                      ? "bg-emerald-500/30 border-emerald-400 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.8)] ring-2 ring-emerald-400/60"
                      : "bg-blue-500/20 border-blue-400/70 text-blue-300"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span
                className={cn(
                  "text-[8px] font-bold px-1 rounded whitespace-nowrap leading-tight",
                  isOffActive
                    ? "text-red-300 bg-slate-900"
                    : isActiveSelection
                      ? "text-emerald-300 bg-slate-900"
                      : "text-slate-200 bg-slate-900/90"
                )}
              >
                {output.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-3 pt-1 shrink-0">
        <span className="flex items-center gap-1 text-[9px] text-slate-400">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-500/20 border border-blue-400/70 inline-block" />
          映像出力の設置位置
        </span>
        <span className="flex items-center gap-1 text-[9px] text-slate-400">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/30 border border-emerald-400 inline-block" />
          選択中の入力に接続中
        </span>
        <span className="flex items-center gap-1 text-[9px] text-slate-400">
          <span className="w-2.5 h-2.5 rounded-sm bg-red-500/30 border border-red-400 inline-block" />
          OFF（映像なし）
        </span>
      </div>
    </div>
  );
};

