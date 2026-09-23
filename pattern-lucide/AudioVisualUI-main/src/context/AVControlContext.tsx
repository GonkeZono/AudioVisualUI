"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
  AVState,
  HallMode,
  ScreenId,
  VideoInputSource,
  VideoOutputDestination,
  VideoRoutingMap,
  AudioChannel,
  ActuatorState,
} from "@/types/av-types";
import { sliderToDb } from "@/lib/utils";

// Video Inputs definition
// Wall socket numbers (1-6) match the physical AV interface layout provided for the hall floor plan.
export const MAIN_HALL_INPUTS: VideoInputSource[] = [
  { id: "in_1", name: "HDMI 1: 演台PC", subName: "Stage PC (壁面②)", iconName: "Laptop", color: "#3B82F6" },
  { id: "in_2", name: "HDMI 2: 持込PC", subName: "Guest PC (壁面①)", iconName: "Laptop2", color: "#60A5FA" },
  { id: "in_3", name: "HDMI 3: 持込PC", subName: "Guest PC (壁面③)", iconName: "Laptop2", color: "#38BDF8" },
  { id: "in_4", name: "HDMI 4: 持込PC", subName: "Guest PC (壁面④)", iconName: "Laptop2", color: "#818CF8" },
  { id: "in_5", name: "HDMI 5: 持込PC", subName: "Guest PC (壁面⑤)", iconName: "Laptop2", color: "#A78BFA" },
  { id: "in_6", name: "HDMI 6: 持込PC", subName: "Guest PC (壁面⑥)", iconName: "Laptop2", color: "#C084FC" },
  { id: "in_7", name: "HDMI 7: ワイヤレス投影", subName: "Wireless Cast (壁面③)", iconName: "Cast", color: "#F472B6" },
  { id: "in_8", name: "HDMI 8: カメラ入力", subName: "Camera In (壁面①)", iconName: "Camera", color: "#FB7185" },
];

// Mid hall (partitioned) mode only exposes the wall sockets that remain inside the reduced hall area (壁面①③, no ④⑤⑥).
export const MID_HALL_INPUTS: VideoInputSource[] = [
  { id: "in_1", name: "HDMI 1: 演台PC", subName: "Stage PC (壁面②)", iconName: "Laptop", color: "#3B82F6" },
  { id: "in_2", name: "HDMI 2: 持込PC", subName: "Guest PC (壁面①)", iconName: "Laptop2", color: "#60A5FA" },
  { id: "in_3", name: "HDMI 3: 持込PC", subName: "Guest PC (壁面③)", iconName: "Laptop2", color: "#38BDF8" },
  { id: "in_7", name: "HDMI 7: ワイヤレス投影", subName: "Wireless Cast (壁面③)", iconName: "Cast", color: "#F472B6" },
  { id: "in_8", name: "HDMI 8: カメラ入力", subName: "Camera In (壁面①)", iconName: "Camera", color: "#FB7185" },
];

// Sentinel routing value meaning "no input routed / video signal off" (used by the main projector OFF control).
export const VIDEO_OFF_ID = "off";

// Video Outputs definition (5 Outputs for both)
export const VIDEO_OUTPUTS: VideoOutputDestination[] = [
  { id: "out_1", name: "メインプロジェクター", subName: "Main Projector (Center)", iconName: "Projector" },
  { id: "out_2", name: "可搬サブディスプレイ 1", subName: "Sub Display 1 (Left)", iconName: "Tv" },
  { id: "out_3", name: "可搬サブディスプレイ 2", subName: "Sub Display 2 (Right)", iconName: "Tv" },
  { id: "out_4", name: "プレビューモニター", subName: "Control Preview", iconName: "Monitor" },
  { id: "out_5", name: "Web会議カメラ入力", subName: "Teams / Zoom Feed", iconName: "Video" },
];

// Initial audio channels generator
function createAudioChannels(mode: HallMode): AudioChannel[] {
  const channels: AudioChannel[] = [];
  
  // 10 Wireless Mics
  for (let i = 1; i <= 10; i++) {
    channels.push({
      id: `wm_${i}`,
      name: `WM ${i}`,
      subName: `ワイヤレス ${i}`,
      type: "wireless",
      fader: 75,
      db: -3.8,
      isMuted: false,
      level: 45,
    });
  }
  
  // Wired Mics
  const wiredCount = mode === "main_hall" ? 4 : 2;
  for (let i = 1; i <= wiredCount; i++) {
    channels.push({
      id: `wired_${i}`,
      name: `有線 ${i}`,
      subName: `有線マイク ${i}`,
      type: "wired",
      fader: 70,
      db: -7.5,
      isMuted: false,
      level: 35,
    });
  }
  
  // PC Audio
  channels.push({
    id: "pc_audio",
    name: "PC音声",
    subName: "PC / Media Line",
    type: "pc",
    fader: 80,
    db: 0,
    isMuted: false,
    level: 60,
  });
  
  return channels;
}

interface AVContextType {
  state: AVState;
  setScreen: (screen: ScreenId) => void;
  setHallMode: (mode: HallMode) => void;
  openShutdownModal: () => void;
  closeShutdownModal: () => void;
  confirmShutdown: () => void;
  
  // Video Matrix actions
  selectVideoInput: (inputId: string | null) => void;
  routeVideo: (outputId: string, inputId?: string) => void;
  
  // Audio Mixer actions
  setChannelFader: (id: string, val: number) => void;
  toggleChannelMute: (id: string) => void;
  setAllMicsFader: (val: number) => void;
  toggleAllMicsMute: () => void;
  setPCAudioFader: (val: number) => void;
  togglePCAudioMute: () => void;
  setMasterVolume: (val: number) => void;
  toggleMasterMute: () => void;
  setZoneVolume: (zone: "main" | "ceiling" | "web", val: number) => void;
  toggleZoneMute: (zone: "main" | "ceiling" | "web") => void;
  
  // Actuator actions
  setScreenAction: (action: "UP" | "STOP" | "DOWN") => void;
  setProjectorLiftAction: (action: "RAISED" | "STOP" | "LOWERED") => void;
  
  // Helper getters
  currentInputs: VideoInputSource[];
  isAllMicsMuted: boolean;
  allMicsFaderAvg: number;
}

const AVControlContext = createContext<AVContextType | null>(null);

export const AVControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>("S00_STANDBY");
  const [previousScreen, setPreviousScreen] = useState<ScreenId>("S03_DASHBOARD");
  const [hallMode, setHallModeState] = useState<HallMode>("main_hall");
  const [isShutdownModalOpen, setIsShutdownModalOpen] = useState(false);
  
  // Video Matrix
  const [selectedVideoInputId, setSelectedVideoInputId] = useState<string | null>("in_1");
  const [videoRouting, setVideoRouting] = useState<VideoRoutingMap>({
    out_1: "in_1", // Projector -> HDMI 1
    out_2: "in_2", // Sub 1 -> HDMI 2
    out_3: "in_3", // Sub 2 -> HDMI 3
    out_4: "in_1", // Preview -> HDMI 1
    out_5: "in_8", // Web Feed -> Camera In
  });
  
  // Audio Mixer
  const [masterVolume, setMasterVolumeState] = useState<number>(75);
  const [masterMuted, setMasterMuted] = useState<boolean>(false);
  const [channels, setChannels] = useState<AudioChannel[]>(() => createAudioChannels("main_hall"));
  const [zoneSpeakers, setZoneSpeakers] = useState({
    main: { volume: 80, muted: false, db: 0, level: 65 },
    ceiling: { volume: 70, muted: false, db: -7.5, level: 50 },
    web: { volume: 75, muted: false, db: -3.8, level: 55 },
  });
  
  // Actuators
  const [actuators, setActuators] = useState<ActuatorState>({
    screenStatus: "DOWN",
    projectorLiftStatus: "LOWERED",
  });
  
  // Warmup & Cooldown Progress
  const [warmupProgress, setWarmupProgress] = useState(0);
  const [warmupStep, setWarmupStep] = useState(1);
  const [cooldownSeconds, setCooldownSeconds] = useState(45);
  
  // Clock
  const [currentTime, setCurrentTime] = useState("14:30");
  const [currentDate, setCurrentDate] = useState("2026.10.15 THU");

  // Real-time Clock effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
      
      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const date = String(now.getDate()).padStart(2, "0");
      const day = days[now.getDay()];
      setCurrentDate(`${year}.${month}.${date} ${day}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // VU Meter Simulation (Realistic audio flutter)
  useEffect(() => {
    if (currentScreen === "S00_STANDBY" || currentScreen === "S06_COOLDOWN") return;
    
    const vuInterval = setInterval(() => {
      setChannels((prevChannels) =>
        prevChannels.map((ch) => {
          if (ch.isMuted || ch.fader === 0) {
            return { ...ch, level: 0 };
          }
          // Fluctuate around fader level
          const base = (ch.fader / 100) * 70;
          const flutter = (Math.random() - 0.5) * 25;
          const level = Math.min(100, Math.max(5, Math.round(base + flutter)));
          return { ...ch, level };
        })
      );
      
      setZoneSpeakers((prev) => ({
        main: {
          ...prev.main,
          level: prev.main.muted ? 0 : Math.min(100, Math.max(10, Math.round((prev.main.volume / 100) * 75 + (Math.random() - 0.5) * 20))),
        },
        ceiling: {
          ...prev.ceiling,
          level: prev.ceiling.muted ? 0 : Math.min(100, Math.max(10, Math.round((prev.ceiling.volume / 100) * 70 + (Math.random() - 0.5) * 20))),
        },
        web: {
          ...prev.web,
          level: prev.web.muted ? 0 : Math.min(100, Math.max(10, Math.round((prev.web.volume / 100) * 65 + (Math.random() - 0.5) * 15))),
        },
      }));
    }, 150);
    
    return () => clearInterval(vuInterval);
  }, [currentScreen]);

  // Warm-up timer simulation
  useEffect(() => {
    if (currentScreen !== "S02_WARMUP") return;
    
    setWarmupProgress(0);
    setWarmupStep(1);
    
    const interval = setInterval(() => {
      setWarmupProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentScreen("S03_DASHBOARD");
          }, 600);
          return 100;
        }
        if (next > 75) setWarmupStep(4);
        else if (next > 50) setWarmupStep(3);
        else if (next > 25) setWarmupStep(2);
        return next;
      });
    }, 80);
    
    return () => clearInterval(interval);
  }, [currentScreen]);

  // Cool-down timer simulation
  useEffect(() => {
    if (currentScreen !== "S06_COOLDOWN") return;
    
    setCooldownSeconds(45);
    const interval = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentScreen("S00_STANDBY");
          }, 800);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [currentScreen]);

  // Set Hall mode and re-init channels/routing
  const setHallMode = useCallback((mode: HallMode) => {
    setHallModeState(mode);
    setChannels(createAudioChannels(mode));
    if (mode === "mid_hall") {
      setVideoRouting({
        out_1: "in_1",
        out_2: "in_2",
        out_3: "in_3",
        out_4: "in_1",
        out_5: "in_8",
      });
    } else {
      setVideoRouting({
        out_1: "in_1",
        out_2: "in_2",
        out_3: "in_3",
        out_4: "in_1",
        out_5: "in_8",
      });
    }
  }, []);

  const setScreen = useCallback((screen: ScreenId) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  }, [currentScreen]);

  const openShutdownModal = useCallback(() => {
    setIsShutdownModalOpen(true);
  }, []);

  const closeShutdownModal = useCallback(() => {
    setIsShutdownModalOpen(false);
  }, []);

  const confirmShutdown = useCallback(() => {
    setIsShutdownModalOpen(false);
    setCurrentScreen("S06_COOLDOWN");
  }, []);

  // Video Matrix methods
  const selectVideoInput = useCallback((inputId: string | null) => {
    setSelectedVideoInputId(inputId);
  }, []);

  const routeVideo = useCallback((outputId: string, inputId?: string) => {
    const targetInput = inputId || selectedVideoInputId;
    if (!targetInput) return;
    setVideoRouting((prev) => ({
      ...prev,
      [outputId]: targetInput,
    }));
  }, [selectedVideoInputId]);

  // Audio Channel methods
  const setChannelFader = useCallback((id: string, val: number) => {
    const { db } = sliderToDb(val);
    setChannels((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, fader: val, db } : ch))
    );
  }, []);

  const toggleChannelMute = useCallback((id: string) => {
    setChannels((prev) =>
      prev.map((ch) => (ch.id === id ? { ...ch, isMuted: !ch.isMuted } : ch))
    );
  }, []);

  // All Mics batch actions
  const setAllMicsFader = useCallback((val: number) => {
    const { db } = sliderToDb(val);
    setChannels((prev) =>
      prev.map((ch) =>
        ch.type === "wireless" || ch.type === "wired"
          ? { ...ch, fader: val, db }
          : ch
      )
    );
  }, []);

  const isAllMicsMuted = useMemo(() => {
    const micChannels = channels.filter(
      (ch) => ch.type === "wireless" || ch.type === "wired"
    );
    return micChannels.length > 0 && micChannels.every((ch) => ch.isMuted);
  }, [channels]);

  const allMicsFaderAvg = useMemo(() => {
    const micChannels = channels.filter(
      (ch) => ch.type === "wireless" || ch.type === "wired"
    );
    if (!micChannels.length) return 70;
    const total = micChannels.reduce((sum, ch) => sum + ch.fader, 0);
    return Math.round(total / micChannels.length);
  }, [channels]);

  const toggleAllMicsMute = useCallback(() => {
    const targetMute = !isAllMicsMuted;
    setChannels((prev) =>
      prev.map((ch) =>
        ch.type === "wireless" || ch.type === "wired"
          ? { ...ch, isMuted: targetMute }
          : ch
      )
    );
  }, [isAllMicsMuted]);

  // PC Audio actions
  const setPCAudioFader = useCallback((val: number) => {
    const { db } = sliderToDb(val);
    setChannels((prev) =>
      prev.map((ch) => (ch.type === "pc" ? { ...ch, fader: val, db } : ch))
    );
  }, []);

  const togglePCAudioMute = useCallback(() => {
    setChannels((prev) =>
      prev.map((ch) => (ch.type === "pc" ? { ...ch, isMuted: !ch.isMuted } : ch))
    );
  }, []);

  // Master Audio
  const setMasterVolume = useCallback((val: number) => {
    setMasterVolumeState(val);
  }, []);

  const toggleMasterMute = useCallback(() => {
    setMasterMuted((prev) => !prev);
  }, []);

  // Zone Speakers
  const setZoneVolume = useCallback((zone: "main" | "ceiling" | "web", val: number) => {
    const { db } = sliderToDb(val);
    setZoneSpeakers((prev) => ({
      ...prev,
      [zone]: { ...prev[zone], volume: val, db },
    }));
  }, []);

  const toggleZoneMute = useCallback((zone: "main" | "ceiling" | "web") => {
    setZoneSpeakers((prev) => ({
      ...prev,
      [zone]: { ...prev[zone], muted: !prev[zone].muted },
    }));
  }, []);

  // Actuators
  const setScreenAction = useCallback((action: "UP" | "STOP" | "DOWN") => {
    setActuators((prev) => ({
      ...prev,
      screenStatus: action === "UP" ? "UP" : action === "DOWN" ? "DOWN" : "STOP",
    }));
  }, []);

  const setProjectorLiftAction = useCallback((action: "RAISED" | "STOP" | "LOWERED") => {
    setActuators((prev) => ({
      ...prev,
      projectorLiftStatus: action === "RAISED" ? "RAISED" : action === "LOWERED" ? "LOWERED" : "STOP",
    }));
  }, []);

  const currentInputs = useMemo(() => {
    return hallMode === "main_hall" ? MAIN_HALL_INPUTS : MID_HALL_INPUTS;
  }, [hallMode]);

  const { db: masterDb } = useMemo(() => sliderToDb(masterVolume), [masterVolume]);

  const state: AVState = {
    currentScreen,
    previousScreen,
    hallMode,
    isShutdownModalOpen,
    selectedVideoInputId,
    videoRouting,
    masterVolume,
    masterMuted,
    masterDb,
    channels,
    zoneSpeakers,
    actuators,
    warmupProgress,
    warmupStep,
    cooldownSeconds,
    currentTime,
    currentDate,
  };

  return (
    <AVControlContext.Provider
      value={{
        state,
        setScreen,
        setHallMode,
        openShutdownModal,
        closeShutdownModal,
        confirmShutdown,
        selectVideoInput,
        routeVideo,
        setChannelFader,
        toggleChannelMute,
        setAllMicsFader,
        toggleAllMicsMute,
        setPCAudioFader,
        togglePCAudioMute,
        setMasterVolume,
        toggleMasterMute,
        setZoneVolume,
        toggleZoneMute,
        setScreenAction,
        setProjectorLiftAction,
        currentInputs,
        isAllMicsMuted,
        allMicsFaderAvg,
      }}
    >
      {children}
    </AVControlContext.Provider>
  );
};

export const useAVControl = () => {
  const context = useContext(AVControlContext);
  if (!context) {
    throw new Error("useAVControl must be used within an AVControlProvider");
  }
  return context;
};
