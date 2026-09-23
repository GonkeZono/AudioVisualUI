"use client";

import React from "react";
import { useAVControl } from "@/context/AVControlContext";
import { Fan, RotateCw, CheckCircle2, Circle, AlertTriangle } from "lucide-react";

export const S06CooldownScreen: React.FC = () => {
  const { state } = useAVControl();
  const { cooldownSeconds } = state;

  // Derive steps based on remaining seconds (starts from 45 down to 0)
  const isScreenLiftFinished = cooldownSeconds <= 20;
  const isLampCoolingFinished = cooldownSeconds <= 5;
  const isPowerOffFinished = cooldownSeconds === 0;

  return (
    <div className="h-full w-full bg-slate-900 flex flex-col justify-center items-center p-6 select-none overflow-hidden relative">
      {/* Background Amber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Center Card */}
      <div className="w-[560px] max-w-full bg-slate-800 border-2 border-slate-700 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
        {/* Spinning Cooling Fan Icon */}
        <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
          <Fan className="w-12 h-12 text-amber-400 animate-spin-slow" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-50 mb-1 text-center">
          システム終了処理中
        </h2>
        <span className="text-xs text-slate-400 mb-4">
          Cooling Down &amp; Device Storage...
        </span>

        {/* Countdown Badge */}
        <div className="bg-slate-950 border border-amber-500/50 px-6 py-2 rounded-2xl mb-6 shadow-inner">
          <span className="font-mono text-xl font-extrabold text-amber-400">
            残り時間: {cooldownSeconds} 秒
          </span>
        </div>

        {/* Status Step List */}
        <div className="w-full space-y-2.5 mb-6">
          {/* Step 1: Lamp Cooling */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-3">
              {isLampCoolingFinished ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <RotateCw className="w-5 h-5 text-amber-400 animate-spin" />
              )}
              <span className="text-xs font-semibold text-slate-200">
                プロジェクター ランプ冷却中...
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              {isLampCoolingFinished ? "冷却完了" : "ファン作動中"}
            </span>
          </div>

          {/* Step 2: Screen & Lift Retracting */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-3">
              {isScreenLiftFinished ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <RotateCw className="w-5 h-5 text-amber-400 animate-spin" />
              )}
              <span className="text-xs font-semibold text-slate-200">
                スクリーン・プロジェクター昇降機 格納中...
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              {isScreenLiftFinished ? "格納完了" : "上昇格納中..."}
            </span>
          </div>

          {/* Step 3: Audio & Matrix Power Off */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-3">
              {isPowerOffFinished ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : isLampCoolingFinished ? (
                <RotateCw className="w-5 h-5 text-amber-400 animate-spin" />
              ) : (
                <Circle className="w-5 h-5 text-slate-600" />
              )}
              <span className="text-xs font-semibold text-slate-200">
                音響アンプ・マトリクススイッチャー 電源OFF
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              {isPowerOffFinished ? "電源OFF" : isLampCoolingFinished ? "遮断中..." : "待機中"}
            </span>
          </div>
        </div>

        {/* Warning Box */}
        <div className="w-full flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/40 px-4 py-2.5 rounded-xl text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-medium">
            処理が完了してスタンバイ画面に戻るまで、主電源を切らないでください。
          </span>
        </div>
      </div>
    </div>
  );
};
