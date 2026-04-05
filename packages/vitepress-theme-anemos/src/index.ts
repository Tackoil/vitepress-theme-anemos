import { defineConfigWithTheme, mergeConfig } from "vitepress";
import type { UserConfig, UserConfigFn } from "vitepress";
import { createAnemosPostLoader } from "./node/utils.js";
import type { AnemosConfig } from "./types/index.js";

export function defineAnemosConfig(config: AnemosConfig): AnemosConfig {
  return config;
}

const anemosVitePressConfig = defineConfigWithTheme<AnemosConfig>({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});

export function defineAnemosVitePressConfig<ThemeConfig = AnemosConfig>(
  config: UserConfig<ThemeConfig>
): UserConfig<ThemeConfig>;
export function defineAnemosVitePressConfig<ThemeConfig = AnemosConfig>(
  config: UserConfigFn<ThemeConfig>
): UserConfigFn<ThemeConfig>;
export function defineAnemosVitePressConfig<ThemeConfig = AnemosConfig>(
  config: UserConfig<ThemeConfig> | UserConfigFn<ThemeConfig>
): UserConfig<ThemeConfig> | UserConfigFn<ThemeConfig> {
  if (typeof config === "function") {
    return (async (env) =>
      defineConfigWithTheme<ThemeConfig>(
        mergeConfig(
          anemosVitePressConfig,
          await config(env)
        ) as UserConfig<ThemeConfig>
      )) satisfies UserConfigFn<ThemeConfig>;
  }

  return defineConfigWithTheme<ThemeConfig>(
    mergeConfig(anemosVitePressConfig, config) as UserConfig<ThemeConfig>
  );
}

export { createAnemosPostLoader };
