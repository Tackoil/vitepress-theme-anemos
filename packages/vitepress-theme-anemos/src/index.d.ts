export type {
  AnemosConfig,
  AnemosFrontmatter,
  AnemosLink,
  AnemosPost,
} from "./types/index.js";

import type { UserConfig, UserConfigFn } from "vitepress";
import type { AnemosConfig, AnemosPost } from "./types/index.js";

export declare function defineAnemosConfig(
  config: AnemosConfig
): AnemosConfig;

export declare function defineAnemosVitePressConfig<
  ThemeConfig = AnemosConfig,
>(config: UserConfig<ThemeConfig>): UserConfig<ThemeConfig>;

export declare function defineAnemosVitePressConfig<
  ThemeConfig = AnemosConfig,
>(config: UserConfigFn<ThemeConfig>): UserConfigFn<ThemeConfig>;

export declare function createAnemosPostLoader(
  pattern?: string | string[]
): {
  watch: string | string[];
  load: () => Promise<AnemosPost[]>;
};
