"use client";

import { Drawer } from "antd";
import Link from "next/link";

import { navigationTools, type NavigationToolSlug } from "@/constant/navigation-tools";
import { cn } from "@/lib/utils";

type MobileNavDrawerProps = {
    open: boolean;
    activeToolSlug?: NavigationToolSlug;
    onClose: () => void;
};

export function MobileNavDrawer({ open, activeToolSlug, onClose }: MobileNavDrawerProps) {
    return (
        <Drawer title="导航" placement="left" size={280} open={open} onClose={onClose} className="md:hidden">
            <div className="space-y-1">
                {navigationTools.map((tool) => {
                    const Icon = tool.icon;
                    const active = !tool.external && tool.slug === activeToolSlug;
                    const className = cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-base transition",
                        active ? "bg-stone-100 font-medium text-stone-950 dark:bg-stone-800 dark:text-stone-100" : "text-stone-600 hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100",
                    );
                    const content = (
                        <>
                            <Icon className="size-5" />
                            <span>{tool.label}</span>
                        </>
                    );
                    if (tool.external) {
                        return (
                            <a key={tool.slug} href={tool.href} target="_blank" rel="noreferrer noopener" onClick={onClose} className={className}>
                                {content}
                            </a>
                        );
                    }
                    return (
                        <Link key={tool.slug} href={tool.href} onClick={onClose} className={className}>
                            {content}
                        </Link>
                    );
                })}
            </div>
        </Drawer>
    );
}
