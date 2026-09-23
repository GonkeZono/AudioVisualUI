"use client";

import React from "react";
import { useAVControl } from "@/context/AVControlContext";
import { PersistentHeader } from "@/components/layout/PersistentHeader";
import { PersistentFooter } from "@/components/layout/PersistentFooter";
import { S00StandbyScreen } from "@/components/screens/S00StandbyScreen";
import { S01PresetSelectionScreen } from "@/components/screens/S01PresetSelectionScreen";
import { S02WarmupScreen } from "@/components/screens/S02WarmupScreen";
import { S03BasicDashboardScreen } from "@/components/screens/S03BasicDashboardScreen";
import { S04VideoMatrixScreen } from "@/components/screens/S04VideoMatrixScreen";
import { S04AudioMixerScreen } from "@/components/screens/S04AudioMixerScreen";
import { S04ActuatorControlScreen } from "@/components/screens/S04ActuatorControlScreen";
import { S05ShutdownModal } from "@/components/screens/S05ShutdownModal";
import { S06CooldownScreen } from "@/components/screens/S06CooldownScreen";

export default function Home() {
  const { state } = useAVControl();
  const { currentScreen } = state;

  // Standalone sequence screens (No header, No footer)
  if (currentScreen === "S00_STANDBY") {
    return (
      <main className="h-screen w-screen overflow-hidden">
        <S00StandbyScreen />
        <S05ShutdownModal />
      </main>
    );
  }

  if (currentScreen === "S01_PRESET") {
    return (
      <main className="h-screen w-screen overflow-hidden">
        <S01PresetSelectionScreen />
        <S05ShutdownModal />
      </main>
    );
  }

  if (currentScreen === "S02_WARMUP") {
    return (
      <main className="h-screen w-screen overflow-hidden">
        <S02WarmupScreen />
        <S05ShutdownModal />
      </main>
    );
  }

  if (currentScreen === "S06_COOLDOWN") {
    return (
      <main className="h-screen w-screen overflow-hidden">
        <S06CooldownScreen />
        <S05ShutdownModal />
      </main>
    );
  }

  // Operational screens with persistent Header and Footer
  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col justify-between bg-slate-900">
      {/* Persistent Header */}
      <PersistentHeader />

      {/* Main Operational Body */}
      <div className="flex-1 min-h-0 min-w-0 overflow-hidden relative">
        {currentScreen === "S03_DASHBOARD" && <S03BasicDashboardScreen />}
        {currentScreen === "S04A_VIDEO" && <S04VideoMatrixScreen />}
        {currentScreen === "S04B_AUDIO" && <S04AudioMixerScreen />}
        {currentScreen === "S04C_ACTUATOR" && <S04ActuatorControlScreen />}
      </div>

      {/* Persistent Footer */}
      <PersistentFooter />

      {/* Shutdown Modal overlay */}
      <S05ShutdownModal />
    </main>
  );
}
