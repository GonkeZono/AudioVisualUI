import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "AudioVisual System Controller",
  description: "Professional AV Touchscreen Controller for Multi-Purpose Event Halls",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="dark h-full w-full overflow-hidden">
      <body className="h-full w-full overflow-hidden bg-slate-900 text-slate-50 antialiased select-none">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
