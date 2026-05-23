"use client";

import { type ReactNode } from "react";
import { Settings2 } from "lucide-react";
import { Button, ConfigProvider, Popover } from "antd";

import { canvasThemes } from "@/lib/canvas-theme";
import { useThemeStore } from "@/stores/use-theme-store";
import type { AiConfig } from "@/stores/use-config-store";

const qualityOptions = [
    { value: "auto", label: "自动" },
    { value: "high", label: "高" },
    { value: "medium", label: "中" },
    { value: "low", label: "低" },
];
const aspectOptions = [
    { value: "1:1", label: "1:1", width: 1024, height: 1024, icon: "square" },
    { value: "3:2", label: "3:2", width: 1536, height: 1024, icon: "landscape" },
    { value: "2:3", label: "2:3", width: 1024, height: 1536, icon: "portrait" },
    { value: "4:3", label: "4:3", width: 1344, height: 1024, icon: "landscape" },
    { value: "3:4", label: "3:4", width: 1024, height: 1344, icon: "portrait" },
    { value: "9:16", label: "9:16", width: 1024, height: 1792, icon: "portrait" },
    { value: "1:1-2k", label: "1:1(2k)", size: "2048x2048", width: 2048, height: 2048, icon: "square" },
    { value: "16:9-2k", label: "16:9(2k)", size: "2048x1152", width: 2048, height: 1152, icon: "landscape" },
    { value: "9:16-2k", label: "9:16(2k)", size: "1152x2048", width: 1152, height: 2048, icon: "portrait" },
    { value: "16:9-4k", label: "16:9(4k)", size: "3840x2160", width: 3840, height: 2160, icon: "landscape" },
    { value: "9:16-4k", label: "9:16(4k)", size: "2160x3840", width: 2160, height: 3840, icon: "portrait" },
    { value: "auto", label: "auto", width: 0, height: 0, icon: "auto" },
];

type CanvasImageSettingsPopoverProps = {
    config: AiConfig;
    onConfigChange: (key: keyof AiConfig, value: string) => void;
    onMissingConfig?: () => void;
    onOpenChange?: (open: boolean) => void;
    buttonClassName?: string;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    placement?: "topLeft" | "top" | "topRight" | "bottomLeft" | "bottom" | "bottomRight";
};

export function CanvasImageSettingsPopover({ config, onConfigChange, onOpenChange, buttonClassName, getPopupContainer, placement = "topLeft" }: CanvasImageSettingsPopoverProps) {
    const theme = canvasThemes[useThemeStore((state) => state.theme)];
    const quality = config.quality || "auto";
    const count = Math.max(1, Math.min(15, Math.floor(Math.abs(Number(config.count)) || 1)));
    const activeSize = config.size || "auto";
    const selectedAspect = aspectOptions.find((item) => (item.size || item.value) === activeSize || item.value === activeSize);
    const dimensions = readSizeDimensions(activeSize, selectedAspect || aspectOptions[0]);
    const selectAspect = (value: string) => {
        const option = aspectOptions.find((item) => item.value === value);
        onConfigChange("size", option?.size || option?.value || "auto");
    };
    const updateDimension = (key: "width" | "height", value: number | null) => {
        const next = Math.max(1, Math.floor(value || dimensions[key] || 1024));
        onConfigChange("size", `${key === "width" ? next : dimensions.width}x${key === "height" ? next : dimensions.height}`);
    };

    return (
        <Popover
            trigger="click"
            placement={placement}
            arrow={false}
            overlayClassName="canvas-image-settings-popover"
            color={theme.toolbar.panel}
            getPopupContainer={getPopupContainer || ((triggerNode) => triggerNode.parentElement || document.body)}
            onOpenChange={onOpenChange}
            content={
                <CanvasImageSettingsTheme theme={theme}>
                    <div className="w-[360px] space-y-5 rounded-3xl px-1 py-0.5" style={{ color: theme.node.text }} onMouseDown={(event) => event.stopPropagation()}>
                        <div className="text-xl font-semibold">图像设置</div>
                        <div className="space-y-3">
                            <SettingTitle color={theme.node.muted}>质量</SettingTitle>
                            <div className="grid grid-cols-4 gap-3">
                                {qualityOptions.map((item) => (
                                    <OptionPill key={item.value} selected={quality === item.value} theme={theme} onClick={() => onConfigChange("quality", item.value)}>
                                        {item.label}
                                    </OptionPill>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <SettingTitle color={theme.node.muted}>尺寸</SettingTitle>
                            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                                <DimensionInput prefix="W" value={dimensions.width} disabled={activeSize === "auto"} theme={theme} onChange={(value) => updateDimension("width", value)} />
                                <span className="text-lg opacity-45">↔</span>
                                <DimensionInput prefix="H" value={dimensions.height} disabled={activeSize === "auto"} theme={theme} onChange={(value) => updateDimension("height", value)} />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <SettingTitle color={theme.node.muted}>宽高比</SettingTitle>
                            <div className="grid grid-cols-4 gap-3">
                                {aspectOptions.map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        className="flex h-[86px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border bg-transparent text-sm transition hover:opacity-80"
                                        style={{ borderColor: selectedAspect?.value === item.value ? theme.node.text : theme.node.stroke, background: "transparent", color: theme.node.text }}
                                        onMouseDown={(event) => event.stopPropagation()}
                                        onClick={() => selectAspect(item.value)}
                                    >
                                        <AspectIcon type={item.icon} width={item.width} height={item.height} color={theme.node.text} />
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <SettingTitle color={theme.node.muted}>生成张数</SettingTitle>
                            <div className="grid grid-cols-4 gap-3">
                                {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                                    <OptionPill key={value} selected={count === value} theme={theme} onClick={() => onConfigChange("count", String(value))}>
                                        {value} 张
                                    </OptionPill>
                                ))}
                                <CountInput value={count} theme={theme} onChange={(value) => onConfigChange("count", String(value || 1))} />
                            </div>
                        </div>
                    </div>
                </CanvasImageSettingsTheme>
            }
        >
            <Button size="small" type="text" className={buttonClassName || "!h-8 !max-w-[180px] !justify-start !rounded-full !px-2.5"} style={{ background: theme.node.fill, color: theme.node.text }} icon={<Settings2 className="size-3.5" />}>
                <span className="truncate">
                    {qualityLabel(quality)} · {selectedAspect?.label || activeSize} · {count} 张
                </span>
            </Button>
        </Popover>
    );
}

export function CanvasImageSettingsTheme({ theme, children }: { theme: (typeof canvasThemes)[keyof typeof canvasThemes]; children: ReactNode }) {
    return (
        <ConfigProvider
            theme={{
                token: { colorBgContainer: theme.toolbar.panel, colorBgElevated: theme.toolbar.panel, colorBorder: theme.node.stroke, colorPrimary: theme.node.activeStroke, colorText: theme.node.text, colorTextLightSolid: theme.node.panel },
                components: { Button: { defaultBg: theme.toolbar.panel, defaultBorderColor: theme.node.stroke, defaultColor: theme.node.text } },
            }}
        >
            {children}
        </ConfigProvider>
    );
}

function OptionPill({ selected, theme, onClick, children }: { selected: boolean; theme: (typeof canvasThemes)[keyof typeof canvasThemes]; onClick: () => void; children: ReactNode }) {
    return (
        <button
            type="button"
            className="h-10 cursor-pointer rounded-full border px-2 text-sm transition hover:opacity-80"
            style={{ background: "transparent", borderColor: selected ? theme.node.text : theme.node.stroke, color: theme.node.text }}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

function DimensionInput({ prefix, value, disabled, theme, onChange }: { prefix: string; value: number; disabled: boolean; theme: (typeof canvasThemes)[keyof typeof canvasThemes]; onChange: (value: number | null) => void }) {
    return (
        <label className="flex h-10 overflow-hidden rounded-xl text-sm" style={{ background: theme.node.fill, color: theme.node.text, opacity: disabled ? 0.55 : 1 }}>
            <span className="grid w-10 place-items-center" style={{ color: theme.node.muted }}>
                {prefix}
            </span>
            <input
                type="number"
                min={1}
                disabled={disabled}
                className="min-w-0 flex-1 bg-transparent px-2 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={value || ""}
                onChange={(event) => onChange(Number(event.target.value) || null)}
                onMouseDown={(event) => event.stopPropagation()}
            />
        </label>
    );
}

function CountInput({ value, theme, onChange }: { value: number; theme: (typeof canvasThemes)[keyof typeof canvasThemes]; onChange: (value: number | null) => void }) {
    return (
        <label className="col-span-2 flex h-10 overflow-hidden rounded-full border text-sm" style={{ borderColor: theme.node.stroke, color: theme.node.text }}>
            <input
                type="number"
                min={1}
                max={15}
                className="min-w-0 flex-1 bg-transparent px-3 text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                style={{ color: theme.node.text, WebkitTextFillColor: theme.node.text }}
                value={value || ""}
                onChange={(event) => onChange(Number(event.target.value) || null)}
                onMouseDown={(event) => event.stopPropagation()}
            />
        </label>
    );
}

function AspectIcon({ type, width, height, color }: { type: string; width: number; height: number; color: string }) {
    if (type === "auto") return null;
    const ratio = width / Math.max(1, height);
    const boxWidth = ratio >= 1 ? 28 : Math.max(12, 28 * ratio);
    const boxHeight = ratio >= 1 ? Math.max(12, 28 / ratio) : 28;
    return (
        <span className="grid h-8 w-10 place-items-center">
            <span className="border-2" style={{ width: boxWidth, height: boxHeight, borderColor: color }} />
        </span>
    );
}

function SettingTitle({ children, color }: { children: string; color: string }) {
    return (
        <div className="text-xs font-medium" style={{ color }}>
            {children}
        </div>
    );
}

function qualityLabel(value: string) {
    return ({ auto: "自动", high: "高", medium: "中", low: "低" } as Record<string, string>)[value] || value;
}

function readSizeDimensions(size: string, fallback: { width: number; height: number }) {
    const match = size?.match(/^(\d+)x(\d+)$/);
    return {
        width: match ? Number(match[1]) : fallback.width,
        height: match ? Number(match[2]) : fallback.height,
    };
}
