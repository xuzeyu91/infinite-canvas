import type { ThemeConfig } from "antd";
import { theme as antdTheme } from "antd";

const neutral = {
    light: {
        primary: "#1A1816",
        primaryHover: "#2D2A26",
        primaryText: "#ffffff",
        menuBg: "#FAF9F7",
        menuText: "#1A1816",
        selectActiveBg: "#F5F3EE",
        selectSelectedBg: "#E5E0DA",
        selectText: "#1A1816",
        tableSelectedBg: "rgba(26, 24, 22, 0.05)",
        tableSelectedHoverBg: "rgba(26, 24, 22, 0.08)",
    },
    dark: {
        primary: "#ffffff",
        primaryHover: "#e4e4e7",
        primaryText: "#000000",
        menuBg: "#121212",
        menuText: "#ffffff",
        selectActiveBg: "#1A1A1A",
        selectSelectedBg: "#27272a",
        selectText: "#ffffff",
        tableSelectedBg: "rgba(255, 255, 255, 0.08)",
        tableSelectedHoverBg: "rgba(255, 255, 255, 0.12)",
    },
};

export function getAntThemeConfig(dark: boolean): ThemeConfig {
    const color = dark ? neutral.dark : neutral.light;

    return {
        algorithm: dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        cssVar: { key: dark ? "infinite-canvas-dark" : "infinite-canvas-light" },
        token: {
            colorPrimary: color.primary,
            colorInfo: color.primary,
            colorLink: color.primary,
            colorLinkHover: color.primaryHover,
            colorLinkActive: color.primary,
            colorTextLightSolid: color.primaryText,
            colorBgContainer: dark ? "#0A0A0A" : "#FFFFFF",
            colorBgLayout: dark ? "#050505" : "#F7F5F0",
            colorBorder: dark ? "#27272a" : "#E5E0DA",
            colorText: dark ? "#ffffff" : "#1A1816",
            colorTextDescription: dark ? "#d4d4d8" : "#44413D",
            colorBgElevated: dark ? "#141414" : "#FFFFFF",
        },
        components: {
            Button: {
                primaryShadow: "none",
            },
            Menu: {
                itemActiveBg: color.menuBg,
                itemHoverBg: color.menuBg,
                itemSelectedBg: color.menuBg,
                itemSelectedColor: color.menuText,
                darkItemHoverBg: neutral.dark.menuBg,
                darkItemSelectedBg: neutral.dark.menuBg,
                darkItemSelectedColor: neutral.dark.menuText,
            },
            Select: {
                optionActiveBg: color.selectActiveBg,
                optionSelectedBg: color.selectSelectedBg,
                optionSelectedColor: color.selectText,
            },
            Table: {
                rowSelectedBg: color.tableSelectedBg,
                rowSelectedHoverBg: color.tableSelectedHoverBg,
            },
        },
    };
}
