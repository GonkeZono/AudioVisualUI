"use client";

import React from "react";
import { useAVControl } from "@/context/AVControlContext";
import { CheckCircle2, RotateCw, Circle, AlertCircle, Hourglass } from "lucide-react";
import { cn } from "@/lib/utils";

export const S02WarmupScreen: React.FC = () => {
  const { state } = useAVControl();
  const { warmupProgress, warmupStep } = state;

  return (
    <div className="h-full w-full bg-slate-900 flex flex-col justify-center items-center p-6 select-none overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Center Card */}
      <div className="w-[580px] max-w-full bg-slate-800 border-2 border-slate-700 rounded-3xl p-7 shadow-2xl flex flex-col items-center">
        {/* Circular Progress Gauge */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-5">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              className="stroke-slate-950"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress Arc */}
            <circle
              cx="50"
              cy="50"
              r="40"
              className="stroke-blue-500 transition-all duration-150 ease-out"
              strokeWidth="8"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * warmupProgress) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center text & icon */}
          <div className="absolute flex flex-col items-center justify-center">
            <Hourglass className="w-6 h-6 text-amber-400 mb-0.5 animate-pulse" />
            <span className="font-mono text-2xl font-extrabold text-slate-50">
              {warmupProgress}%
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-100 mb-1">
          System Starting Up...
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          システム初期化および機器起動中
        </p>

        {/* Status Checklist */}
        <div className="w-full space-y-2.5 mb-6">
          {/* Step 1 */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-3">
              {warmupStep >= 2 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <RotateCw className="w-5 h-5 text-amber-400 animate-spin" />
              )}
              <span className="text-xs font-semibold text-slate-200">
                電動スクリーン: 既定位置へ下降完了
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              {warmupStep >= 2 ? "完了" : "下降中..."}
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-3">
              {warmupStep >= 3 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : warmupStep >= 2 ? (
                <RotateCw className="w-5 h-5 text-amber-400 animate-spin" />
              ) : (
                <Circle className="w-5 h-5 text-slate-600" />
              )}
              <span className="text-xs font-semibold text-slate-200">
                プロジェクター昇降機: 下降完了
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              {warmupStep >= 3 ? "完了" : warmupStep >= 2 ? "動作中..." : "待機中"}
            </span>
          </div>

          {/* Step 3 */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-3">
              {warmupStep >= 4 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : warmupStep >= 3 ? (
                <RotateCw className="w-5 h-5 text-amber-400 animate-spin" />
              ) : (
                <Circle className="w-5 h-5 text-slate-600" />
              )}
              <span className="text-xs font-semibold text-slate-200">
                プロジェクター ランプ: ウォームアップ中
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              {warmupStep >= 4 ? "点灯完了" : warmupStep >= 3 ? "昇温中..." : "待機中"}
            </span>
          </div>

          {/* Step 4 */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-3">
              {warmupProgress >= 100 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : warmupStep >= 4 ? (
                <RotateCw className="w-5 h-5 text-amber-400 animate-spin" />
              ) : (
                <Circle className="w-5 h-5 text-slate-600" />
              )}
              <span className="text-xs font-semibold text-slate-200">
                音声DSP &amp; マトリクスルーティング設定
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              {warmupProgress >= 100 ? "設定完了" : warmupStep >= 4 ? "適用中..." : "待機中"}
            </span>
          </div>
        </div>

        {/* Warning Alert */}
        <div className="w-full flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/40 px-4 py-2.5 rounded-xl text-amber-300">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-medium">
            初期化が完了して操作画面が開くまで、電源を切らずにお待ちください。
          </span>
        </div>
      </div>
    </div>
  );
};
