"use client";

import React from "react";
import { useAVControl } from "@/context/AVControlContext";
import { VerticalFader } from "@/components/ui/VerticalFader";
import { Mic, Speaker } from "lucide-react";

export const S04AudioMixerScreen: React.FC = () => {
  const {
    state,
    setChannelFader,
    toggleChannelMute,
    setZoneVolume,
    toggleZoneMute,
  } = useAVControl();

  const { channels, zoneSpeakers, hallMode } = state;
  const isMainHall = hallMode === "main_hall";

  // Row 1: wireless mics / Row 2: wired mics + PC audio
  const wirelessChannels = channels.filter((ch) => ch.type === "wireless");
  const otherChannels = channels.filter((ch) => ch.type !== "wireless");

  return (
    <div className="h-full w-full bg-slate-900 p-2 grid grid-cols-4 gap-2 select-none overflow-hidden min-h-0">
      {/* ========================================================
          Left Area: Input Channel Strips (15ch for Main, 13ch for Mid)
         ======================================================== */}
      <div className="col-span-3 bg-slate-800 border border-slate-700/80 rounded-2xl p-2 flex flex-col justify-between shadow-xl min-w-0 min-h-0 overflow-hidden">
        {/* Strip Area Header */}
        <div className="flex items-center justify-between px-2 pb-1 border-b border-slate-700/60 shrink-0">
          <div className="flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-blue-400" />
            <h3 className="text-[11px] font-bold text-slate-100">
              マイク音量 ({isMainHall ? "15 Channels" : "13 Channels"})
            </h3>
          </div>
          <div className="flex items-center gap-2.5 text-[9px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> ワイヤレス 10ch
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> 有線 {isMainHall ? "4ch" : "2ch"}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> PC音声 1ch
            </span>
          </div>
        </div>

        {/* Fader Strips Container (2 Rows, same unit size via shared grid columns) */}
        <div className="flex flex-col gap-1.5 flex-1 min-h-0 py-0.5 overflow-hidden">
          <div
            className="grid gap-1.5 flex-1 min-h-0"
            style={{ gridTemplateColumns: `repeat(${wirelessChannels.length}, minmax(0, 1fr))` }}
          >
            {wirelessChannels.map((ch) => (
              <VerticalFader
                key={ch.id}
                label={ch.name}
                subLabel={ch.subName}
                value={ch.fader}
                level={ch.level}
                isMuted={ch.isMuted}
                onChange={(val) => setChannelFader(ch.id, val)}
                onMuteToggle={() => toggleChannelMute(ch.id)}
                faderHeight="h-full"
                compact={true}
                showMeter={false}
                className="w-full h-full p-1"
              />
            ))}
          </div>
          <div
            className="grid gap-1.5 flex-1 min-h-0"
            style={{ gridTemplateColumns: `repeat(${wirelessChannels.length}, minmax(0, 1fr))` }}
          >
            {otherChannels.map((ch) => (
              <VerticalFader
                key={ch.id}
                label={ch.name}
                subLabel={ch.subName}
                value={ch.fader}
                level={ch.level}
                isMuted={ch.isMuted}
                onChange={(val) => setChannelFader(ch.id, val)}
                onMuteToggle={() => toggleChannelMute(ch.id)}
                faderHeight="h-full"
                compact={true}
                showMeter={false}
                className="w-full h-full p-1"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================
          Right Area: Output Zones (3 Mini Faders)
         ======================================================== */}
      <div className="col-span-1 bg-slate-800 border border-slate-700/80 rounded-2xl p-2 flex flex-col justify-between shadow-xl min-w-0 min-h-0 overflow-hidden">
        <div className="flex items-center gap-1.5 pb-1 border-b border-slate-700/60 shrink-0">
          <Speaker className="w-3.5 h-3.5 text-blue-400" />
          <h3 className="text-[11px] font-bold text-slate-100">
            スピーカー音量
          </h3>
        </div>

        {/* 3 Zone Faders */}
        <div className="flex items-stretch justify-around gap-1.5 flex-1 min-h-0 py-1 overflow-hidden">
          {/* Main Speakers */}
          <VerticalFader
            label="メイン"
            subLabel="Main SP"
            value={zoneSpeakers.main.volume}
            level={zoneSpeakers.main.level}
            isMuted={zoneSpeakers.main.muted}
            onChange={(val) => setZoneVolume("main", val)}
            onMuteToggle={() => toggleZoneMute("main")}
            faderHeight="h-full"
            compact={true}
            showMeter={false}
            className="flex-1 h-full p-1"
          />

          {/* Ceiling Speakers */}
          <VerticalFader
            label="天井"
            subLabel="Ceiling SP"
            value={zoneSpeakers.ceiling.volume}
            level={zoneSpeakers.ceiling.level}
            isMuted={zoneSpeakers.ceiling.muted}
            onChange={(val) => setZoneVolume("ceiling", val)}
            onMuteToggle={() => toggleZoneMute("ceiling")}
            faderHeight="h-full"
            compact={true}
            showMeter={false}
            className="flex-1 h-full p-1"
          />

          {/* Web Conference Feed */}
          <VerticalFader
            label="Web会議"
            subLabel="Web Feed"
            value={zoneSpeakers.web.volume}
            level={zoneSpeakers.web.level}
            isMuted={zoneSpeakers.web.muted}
            onChange={(val) => setZoneVolume("web", val)}
            onMuteToggle={() => toggleZoneMute("web")}
            faderHeight="h-full"
            compact={true}
            showMeter={false}
            className="flex-1 h-full p-1"
          />
        </div>

        {/* Bottom Note */}
        <div className="bg-slate-900/60 rounded-lg p-1 text-center border border-slate-700/40 shrink-0">
          <span className="text-[9px] text-slate-400">
            ※ マスター音量と連動
          </span>
        </div>
      </div>
    </div>
  );
};
