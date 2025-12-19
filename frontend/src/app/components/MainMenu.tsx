"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { LayoutContext } from "@/lib/contexts/LayoutContext";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MainMenu({ open, onClose }: Props) {
  const router = useRouter();
  const layoutContext = useContext(LayoutContext);
  if (!layoutContext) {
    throw new Error("LayoutContext must be used within a LayoutProvider");
  }
  const { isPC, setIsPostModalOpen } = layoutContext;

  const go = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 
          bg-base-100 shadow-lg p-4 z-50 
          flex flex-col gap-3
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <h2 className="text-xl font-bold mb-4">メインメニュー</h2>

        <button
          className="btn btn-outline btn-sm justify-start"
          onClick={() => go("/")}
        >
          ホーム
        </button>
        <button
          className="btn btn-outline btn-sm justify-start"
          onClick={() => {
            if (isPC) {
              setIsPostModalOpen(true);
              onClose(); // メニューを閉じる
            } else {
              go("/post");
            }
          }}
        >
          投稿する
        </button>
        <button
          className="btn btn-outline btn-sm justify-start"
          onClick={() => go("/user-settings")}
        >
          個人設定
        </button>
        <button
          className="btn btn-outline btn-sm justify-start"
          onClick={() => go("/usage")}
        >
          使い方
        </button>
      </aside>
    </>
  );
}
