"use client";

import React from "react";
import AppIcon from "@/components/ui/AppIcon";
import { useAVControl } from "@/context/AVControlContext";

export const S05ShutdownModal: React.FC = () => {
  const {
    state,
    closeShutdownModal,
    confirmShutdown,
  } = useAVControl();

  const { isShutdownModalOpen } = state;

  if (!isShutdownModalOpen) {
    return null;
  }

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeShutdownModal();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm select-none p-4 animate-in fade-in duration-150 touch-none"
    >
      {/* Modal Dialog Card */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[480px] max-w-[90vw] bg-slate-800 border-2 border-red-500 rounded-3xl p-6 shadow-[0_0_50px_rgba(239,68,68,0.5)] flex flex-col items-center text-center my-auto"
      >
        {/* Top Warning Icon */}
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-3 animate-pulse">
          <AppIcon
            type="AlertTriangle"
            className="w-9 h-9 text-red-500"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-extrabold text-slate-50 mb-2">
          システム終了の確認
        </h2>

        {/* Message */}
        <p className="text-xs text-slate-300 leading-relaxed mb-6">
          ホール内のAVシステムを終了しますか？
          <br />

          <span className="text-slate-400 text-[11px] mt-1 block">
            プロジェクターの消灯・昇降機の格納・音響アンプ電源OFFを実行します。
          </span>
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              closeShutdownModal();
            }}
            className="h-11 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-slate-200 font-bold text-xs border border-slate-600 flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <AppIcon
              type="X"
              className="w-4 h-4"
            />

            <span>キャンセル (Cancel)</span>
          </button>

          {/* Confirm Shutdown Button */}
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              confirmShutdown();
            }}
            className="h-11 py-2 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-extrabold text-xs shadow-[0_0_15px_rgba(239,68,68,0.6)] flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <AppIcon
              type="Power"
              className="w-4 h-4"
            />

            <span>シャットダウン実行</span>
          </button>
        </div>
      </div>
    </div>
  );
};