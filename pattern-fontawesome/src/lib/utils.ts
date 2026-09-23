import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert 0-100 linear slider value to dB string
 * 0 -> -inf dB
 * 50 -> -12 dB
 * 80 -> 0 dB
 * 100 -> +10 dB
 */
export function sliderToDb(val: number): { db: number; dbString: string } {
  if (val <= 0) return { db: -99, dbString: "-∞ dB" };
  if (val === 80) return { db: 0, dbString: "0.0 dB" };

  let db: number;
  if (val < 80) {
    // 0..80 maps from -60dB to 0dB
    db = Math.round((-60 + (val / 80) * 60) * 10) / 10;
  } else {
    // 80..100 maps from 0dB to +10dB
    db = Math.round(((val - 80) / 20 * 10) * 10) / 10;
  }

  const sign = db > 0 ? "+" : "";
  return { db, dbString: `${sign}${db.toFixed(1)} dB` };
}
