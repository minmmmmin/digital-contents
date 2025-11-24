"use client";

import { useState, useRef, useEffect } from "react";

const tabs = [
    { label: "最近の投稿", value: "recent" },
    { label: "自分が投稿した猫", value: "mine" },
    { label: "かわいいした猫", value: "liked" },
];

export default function TabsBar() {
    const [current, setCurrent] = useState("recent");
    const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
    const indicatorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = tabRefs.current[current];
        const indicator = indicatorRef.current;

        if (el && indicator) {
            indicator.style.width = `${el.offsetWidth}px`;
            indicator.style.left = `${el.offsetLeft}px`;
        }
    }, [current]);

    return (
        <div className="w-full border-b bg-base-100">
            <div className="flex justify-center overflow-x-auto relative">

                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        ref={(el) => { tabRefs.current[tab.value] = el; }}
                        onClick={() => setCurrent(tab.value)}
                        className={`
                            flex-1
                            whitespace-nowrap
                            py-3 text-sm
                            md:py-4 md:text-base md:tracking-wide
                            transition-colors
                            cursor-pointer
                            ${current === tab.value
                                ? "font-bold text-black"
                                : "text-gray-500 hover:text-gray-700"}
                                `}
                    >
                        {tab.label}
                    </button>
                ))}

                <div
                    ref={indicatorRef}
                    className="absolute bottom-0 h-0.5 md:h-[3px] bg-black transition-all duration-300"
                />
            </div>
        </div>
    );
}
