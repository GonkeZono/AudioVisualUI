import { ICON_THEME } from "@/config/iconTheme";
import { IconTheme } from "@/config/iconTheme";


// ============================================================
// Fluent Icons
// ③ モダン案
// ============================================================
import {
  Apps24Filled,
  ArrowClockwise24Filled,
  ArrowDown24Filled,
  ArrowLeft24Filled,
  ArrowRight24Filled,
  ArrowUp24Filled,
  Building24Filled,
  Checkmark24Filled,
  CheckmarkCircle24Filled,
  Circle24Filled,
  Desktop24Filled,
  Dismiss24Filled,
  Grid24Filled,
  Hourglass24Filled,
  Pause24Filled,
  Power24Filled,
  Presenter24Filled,
  Share24Filled,
  Sparkle24Filled,
  Speaker224Filled,
  Video24Filled,
  Warning24Filled,
  Wifi124Filled,
} from "@fluentui/react-icons";

// ============================================================
// Lucide Icons
// ④ 線画案
// ============================================================
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Building2,
  Camera,
  Cast,
  Check,
  CheckCircle2,
  Circle,
  DoorOpen,
  Fan,
  Hourglass,
  Laptop,
  Layers,
  LayoutGrid,
  Mic2,
  Monitor,
  Pause,
  Power,
  PowerOff,
  Projector,
  RotateCw,
  Share2,
  Sliders,
  Sparkles,
  Tv,
  Video,
  Volume2,
  VolumeX,
  Wifi,
  X,
} from "lucide-react";

// ============================================================
// Material Icons
// ① 標準案
// ============================================================
import AlertIcon from "@mui/icons-material/ReportProblem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BusinessIcon from "@mui/icons-material/Business";
import CastIcon from "@mui/icons-material/Cast";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import CloseIcon from "@mui/icons-material/Close";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import GridViewIcon from "@mui/icons-material/GridView";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import LayersIcon from "@mui/icons-material/Layers";
import MicIcon from "@mui/icons-material/Mic";
import MonitorIcon from "@mui/icons-material/Monitor";
import PauseIcon from "@mui/icons-material/Pause";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import ShareIcon from "@mui/icons-material/Share";
import ToysIcon from "@mui/icons-material/Toys";
import TvIcon from "@mui/icons-material/Tv";
import VideocamIcon from "@mui/icons-material/Videocam";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import WarningIcon from "@mui/icons-material/Warning";
import WifiIcon from "@mui/icons-material/Wifi";

// ============================================================
// Font Awesome Icons
// ② 強調案
// ============================================================
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowRotateRight,
  FaArrowUp,
  FaBuilding,
  FaCheck,
  FaCircle,
  FaCircleCheck,
  FaCircleExclamation,
  FaDisplay,
  FaDoorOpen,
  FaFan,
  FaHourglassHalf,
  FaLaptop,
  FaLayerGroup,
  FaMicrophone,
  FaPause,
  FaPowerOff,
  FaShareNodes,
  FaSliders,
  FaTableCellsLarge,
  FaTriangleExclamation,
  FaVideo,
  FaVolumeHigh,
  FaVolumeXmark,
  FaWandMagicSparkles,
  FaWifi,
  FaXmark,
} from "react-icons/fa6";



type Props = {
  type: string;
  className?: string;
  theme?: IconTheme;
};

export default function AppIcon({
  type,
  className,
  theme,
}: Props) {
  /*
   * 画面から渡されたアイコン名を小文字へ統一します。
   *
   * 例：
   * "Tv"           -> "tv"
   * "Building2"    -> "building2"
   * "ArrowUp"      -> "arrowup"
   * "CheckCircle2" -> "checkcircle2"
   *
   * これにより、各画面でアイコン名の大文字・小文字が異なっても
   * 同じアイコンとして判定できます。
   */
  const iconType = type.toLowerCase();
  const activeTheme = theme ?? ICON_THEME;

  // ============================================================
  // ③ Fluent
  // モダン案
  // ============================================================
  if (activeTheme === "fluent") {
    switch (iconType) {
      case "laptop":
      case "laptop2":
        return <Desktop24Filled className={className} />;

      case "camera":
      case "video":
        return <Video24Filled className={className} />;

      case "cast":
        return <Presenter24Filled className={className} />;

      case "tv":
      case "monitor":
      case "monitorplay":
      case "projector":
        return <Desktop24Filled className={className} />;

      case "volume":
      case "volume2":
        return <Speaker224Filled className={className} />;

      case "volumex":
      case "mute":
        return <Speaker224Filled className={className} />;

      case "mic":
      case "mic2":
        return <Speaker224Filled className={className} />;

      case "power":
      case "poweroff":
        return <Power24Filled className={className} />;

      case "facility":
      case "layers":
      case "cable":
      case "disc":
        return <Apps24Filled className={className} />;

      case "sliders":
      case "settings":
        return <Apps24Filled className={className} />;

      case "arrowup":
      case "up":
        return <ArrowUp24Filled className={className} />;

      case "arrowdown":
      case "down":
        return <ArrowDown24Filled className={className} />;

      case "arrowleft":
      case "back":
        return <ArrowLeft24Filled className={className} />;

      case "arrowright":
      case "next":
        return <ArrowRight24Filled className={className} />;

      case "pause":
        return <Pause24Filled className={className} />;

      case "check":
        return <Checkmark24Filled className={className} />;

      case "checkcircle2":
      case "checkcircle":
      case "status":
        return <CheckmarkCircle24Filled className={className} />;

      case "sparkles":
      case "sparkle":
        return <Sparkle24Filled className={className} />;

      case "building":
      case "building2":
        return <Building24Filled className={className} />;

      case "wifi":
        return <Wifi124Filled className={className} />;

      case "dooropen":
      case "door":
        return <Building24Filled className={className} />;

      case "layoutgrid":
      case "grid":
        return <Grid24Filled className={className} />;

      case "rotatecw":
      case "refresh":
        return <ArrowClockwise24Filled className={className} />;

      case "circle":
        return <Circle24Filled className={className} />;

      case "alertcircle":
      case "alerttriangle":
      case "warning":
        return <Warning24Filled className={className} />;

      case "hourglass":
        return <Hourglass24Filled className={className} />;

      case "share2":
      case "share":
        return <Share24Filled className={className} />;

      case "x":
      case "close":
      case "dismiss":
        return <Dismiss24Filled className={className} />;

      case "fan":
        return <ArrowClockwise24Filled className={className} />;

      default:
        return <Desktop24Filled className={className} />;
    }
  }

  // ============================================================
  // ① Material
  // 標準案
  // ============================================================
  if (activeTheme === "material") {
    switch (iconType) {
      case "laptop":
      case "laptop2":
        return <DesktopWindowsIcon className={className} />;

      case "camera":
      case "video":
        return <VideocamIcon className={className} />;

      case "cast":
        return <CastIcon className={className} />;

      case "tv":
      case "projector":
        return <TvIcon className={className} />;

      case "monitor":
      case "monitorplay":
        return <MonitorIcon className={className} />;

      case "volume":
      case "volume2":
        return <VolumeUpIcon className={className} />;

      case "volumex":
      case "mute":
        return <VolumeOffIcon className={className} />;

      case "mic":
      case "mic2":
        return <MicIcon className={className} />;

      case "power":
      case "poweroff":
        return <PowerSettingsNewIcon className={className} />;

      case "facility":
      case "layers":
      case "cable":
      case "disc":
        return <LayersIcon className={className} />;

      case "sliders":
      case "settings":
        return <SettingsInputComponentIcon className={className} />;

      case "arrowup":
      case "up":
        return <ArrowUpwardIcon className={className} />;

      case "arrowdown":
      case "down":
        return <ArrowDownwardIcon className={className} />;

      case "arrowleft":
      case "back":
        return <ArrowBackIcon className={className} />;

      case "arrowright":
      case "next":
        return <ArrowForwardIcon className={className} />;

      case "pause":
        return <PauseIcon className={className} />;

      case "check":
        return <CheckIcon className={className} />;

      case "checkcircle2":
      case "checkcircle":
      case "status":
        return <CheckCircleIcon className={className} />;

      case "sparkles":
      case "sparkle":
        return <AutoAwesomeIcon className={className} />;

      case "building":
      case "building2":
        return <BusinessIcon className={className} />;

      case "wifi":
        return <WifiIcon className={className} />;

      case "dooropen":
      case "door":
        return <DoorFrontIcon className={className} />;

      case "layoutgrid":
      case "grid":
        return <GridViewIcon className={className} />;

      case "rotatecw":
      case "refresh":
        return <RefreshIcon className={className} />;

      case "circle":
        return <CircleIcon className={className} />;

      case "alertcircle":
        return <AlertIcon className={className} />;

      case "alerttriangle":
      case "warning":
        return <WarningIcon className={className} />;

      case "hourglass":
        return <HourglassEmptyIcon className={className} />;

      case "share2":
      case "share":
        return <ShareIcon className={className} />;

      case "x":
      case "close":
      case "dismiss":
        return <CloseIcon className={className} />;

      case "fan":
        return <ToysIcon className={className} />;

      default:
        return <DesktopWindowsIcon className={className} />;
    }
  }

  // ============================================================
  // ② Font Awesome
  // 強調案
  // ============================================================
  if (activeTheme === "fontawesome") {
    switch (iconType) {
      case "laptop":
      case "laptop2":
        return <FaLaptop className={className} />;

      case "camera":
      case "video":
        return <FaVideo className={className} />;

      case "cast":
      case "tv":
      case "monitor":
      case "monitorplay":
      case "projector":
        return <FaDisplay className={className} />;

      case "volume":
      case "volume2":
        return <FaVolumeHigh className={className} />;

      case "volumex":
      case "mute":
        return <FaVolumeXmark className={className} />;

      case "mic":
      case "mic2":
        return <FaMicrophone className={className} />;

      case "power":
      case "poweroff":
        return <FaPowerOff className={className} />;

      case "facility":
      case "layers":
      case "cable":
      case "disc":
        return <FaLayerGroup className={className} />;

      case "sliders":
      case "settings":
        return <FaSliders className={className} />;

      case "arrowup":
      case "up":
        return <FaArrowUp className={className} />;

      case "arrowdown":
      case "down":
        return <FaArrowDown className={className} />;

      case "arrowleft":
      case "back":
        return <FaArrowLeft className={className} />;

      case "arrowright":
      case "next":
        return <FaArrowRight className={className} />;

      case "pause":
        return <FaPause className={className} />;

      case "check":
        return <FaCheck className={className} />;

      case "checkcircle2":
      case "checkcircle":
      case "status":
        return <FaCircleCheck className={className} />;

      case "sparkles":
      case "sparkle":
        return <FaWandMagicSparkles className={className} />;

      case "building":
      case "building2":
        return <FaBuilding className={className} />;

      case "wifi":
        return <FaWifi className={className} />;

      case "dooropen":
      case "door":
        return <FaDoorOpen className={className} />;

      case "layoutgrid":
      case "grid":
        return <FaTableCellsLarge className={className} />;

      case "rotatecw":
      case "refresh":
        return <FaArrowRotateRight className={className} />;

      case "circle":
        return <FaCircle className={className} />;

      case "alertcircle":
        return <FaCircleExclamation className={className} />;

      case "alerttriangle":
      case "warning":
        return <FaTriangleExclamation className={className} />;

      case "hourglass":
        return <FaHourglassHalf className={className} />;

      case "share2":
      case "share":
        return <FaShareNodes className={className} />;

      case "x":
      case "close":
      case "dismiss":
        return <FaXmark className={className} />;

      case "fan":
        return <FaFan className={className} />;

      default:
        return <FaDisplay className={className} />;
    }
  }

  
}