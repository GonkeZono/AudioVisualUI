export type HallMode = "main_hall" | "mid_hall";

export type ScreenId =
  | "S00_STANDBY"
  | "S01_PRESET"
  | "S02_WARMUP"
  | "S03_DASHBOARD"
  | "S04A_VIDEO"
  | "S04B_AUDIO"
  | "S04C_ACTUATOR"
  | "S06_COOLDOWN";

export interface VideoInputSource {
  id: string;
  name: string;
  subName?: string;
  iconName: string;
  color?: string;
}

export interface VideoOutputDestination {
  id: string;
  name: string;
  subName?: string;
  iconName: string;
}

export type VideoRoutingMap = Record<string, string>; // outputId -> inputId

export interface AudioChannel {
  id: string;
  name: string;
  subName?: string;
  type: "wireless" | "wired" | "pc" | "zone";
  fader: number; // 0 to 100
  db: number; // -inf to +10 dB
  isMuted: boolean;
  level: number; // 0 to 100 (for real-time VU meter)
}

export type DeviceMovementStatus = "UP" | "STOP" | "DOWN" | "LOWERED" | "RAISED" | "MOVING_UP" | "MOVING_DOWN";

export interface ActuatorState {
  screenStatus: "UP" | "STOP" | "DOWN" | "MOVING_UP" | "MOVING_DOWN";
  projectorLiftStatus: "LOWERED" | "STOP" | "RAISED" | "MOVING_LOWER" | "MOVING_RAISE";
}

export interface AVState {
  currentScreen: ScreenId;
  previousScreen: ScreenId;
  hallMode: HallMode;
  isShutdownModalOpen: boolean;
  
  // Video Matrix
  selectedVideoInputId: string | null;
  videoRouting: VideoRoutingMap;
  
  // Audio Mixer
  masterVolume: number; // 0 to 100
  masterMuted: boolean;
  masterDb: number;
  channels: AudioChannel[];
  zoneSpeakers: {
    main: { volume: number; muted: boolean; db: number; level: number };
    ceiling: { volume: number; muted: boolean; db: number; level: number };
    web: { volume: number; muted: boolean; db: number; level: number };
  };
  
  // Actuators
  actuators: ActuatorState;
  
  // Warmup & Cooldown progress
  warmupProgress: number;
  warmupStep: number;
  cooldownSeconds: number;
  
  // System time
  currentTime: string;
  currentDate: string;
}
