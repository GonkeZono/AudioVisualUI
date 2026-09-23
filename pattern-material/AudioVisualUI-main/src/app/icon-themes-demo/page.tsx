"use client";

import AppIcon from "@/components/ui/AppIcon";
import type { IconTheme } from "@/config/iconTheme";

const themes: { key: IconTheme; label: string; caption: string }[] = [
  { key: "material", label: "標準", caption: "一般的で安定したシルエット" },
  { key: "fontawesome", label: "強調", caption: "太く、視認性の高い強調スタイル" },
  { key: "fluent", label: "モダン", caption: "Microsoft Fluent 系の滑らかなデザイン" },
  { key: "lucide", label: "線画", caption: "細い線で軽やかな見え方" },
];

const iconTypes = [
  "Laptop",
  "Tv",
  "Monitor",
  "Projector",
  "Power",
  "Volume2",
  "Mic2",
  "Sparkles",
  "Check",
  "Wifi",
  "DoorOpen",
  "LayoutGrid",
];

export default function IconThemesDemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
            ICON SYSTEM REVIEW
          </p>
          <h1 className="text-3xl font-black">アイコンテーマ比較モック</h1>
          <p className="mt-2 text-sm text-slate-400">
            4種類のスタイルを比較して、どの方向性が最適かを検討するためのページです。
          </p>
        </header>

        <div className="grid gap-6 xl:grid-cols-2">
          {themes.map((theme) => (
            <section
              key={theme.key}
              className="rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between border-b border-slate-700 pb-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    Theme
                  </p>
                  <h2 className="text-2xl font-extrabold text-white">{theme.label}</h2>
                </div>
                <div className="rounded-full border border-slate-600 bg-slate-800 px-2 py-1 text-[10px] font-bold text-slate-300">
                  {theme.key}
                </div>
              </div>

              <p className="mb-5 text-sm text-slate-300">{theme.caption}</p>

              <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
                {iconTypes.map((iconType) => (
                  <div
                    key={`${theme.key}-${iconType}`}
                    className="flex min-h-[104px] flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-center"
                  >
                    <AppIcon theme={theme.key} type={iconType} className="h-9 w-9 text-blue-400" />
                    <span className="mt-2 text-[10px] font-semibold text-slate-300">{iconType}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
