/**
 * UI全体で使用するアイコンライブラリを指定します。
 *
 * 設定できる値:
 * - "material"    一般的、見やすいシルエットのアイコン
 * - "fontawesome" 強調系、太く視認性の高いシルエットのアイコン
 * - "fluent"      モダン系、Microsoft Fluent 系のモダンなアイコン
 * - "lucide"      線画系、現在の UI で使用している細線アイコン
 */

export type IconTheme =
  | "lucide"      // 線画
  | "fluent"      // モダン
  | "material"    // 一般的
  | "fontawesome" // 強調

/**
 * 現在表示するアイコンパターンを指定します。
 *
 * 以下の値を書き換えて保存すると、
 * AppIcon を使用している画面のアイコンが一括で切り替わります。
 *
 * 現在の設定:
 * material
 */

export const ICON_THEME: IconTheme = "material";
