"use client";

import React from "react";
import { AVControlProvider } from "@/context/AVControlContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AVControlProvider>{children}</AVControlProvider>;
}
