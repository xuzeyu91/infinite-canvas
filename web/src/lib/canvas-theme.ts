export type CanvasColorTheme = "light" | "dark";
export type CanvasBackgroundMode = "dots" | "lines" | "blank";

export const canvasThemes = {
    light: {
        canvas: {
            background: "#F7F5F0",
            dot: "rgba(26,24,22,.18)",
            line: "rgba(26,24,22,.08)",
            selectionStroke: "#1A1816",
            selectionFill: "rgba(26,24,22,.05)",
        },
        node: {
            label: "#44413D",
            fill: "#F5F3EE",
            panel: "#FFFFFF",
            stroke: "#E5E0DA",
            activeStroke: "#1A1816",
            placeholder: "#8A8680",
            text: "#1A1816",
            muted: "#6B6862",
            faint: "#EDE9E3",
            accent: "#B5936B",
        },
        toolbar: {
            panel: "rgba(255, 255, 255, 0.95)",
            border: "#E5E0DA",
            item: "#44413D",
            itemHover: "#E5E0DA",
            activeBg: "#E5E0DA",
            activeText: "#1A1816",
        },
    },
    dark: {
        canvas: {
            background: "#050505",
            dot: "rgba(255,255,255,.12)",
            line: "rgba(255,255,255,.06)",
            selectionStroke: "#ffffff",
            selectionFill: "rgba(255,255,255,.05)",
        },
        node: {
            label: "#d4d4d8",
            fill: "#121212",
            panel: "#0A0A0A",
            stroke: "#27272a",
            activeStroke: "#ffffff",
            placeholder: "#71717a",
            text: "#ffffff",
            muted: "#a1a1aa",
            faint: "#18181b",
            accent: "#818cf8",
        },
        toolbar: {
            panel: "rgba(10, 10, 10, 0.95)",
            border: "#27272a",
            item: "#d4d4d8",
            itemHover: "#27272a",
            activeBg: "#27272a",
            activeText: "#ffffff",
        },
    },
} as const;

export type CanvasTheme = (typeof canvasThemes)[CanvasColorTheme];
