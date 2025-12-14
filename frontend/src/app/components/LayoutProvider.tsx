"use client";

import { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LayoutContext } from "@/lib/contexts/LayoutContext";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import Header from "./Header";
import MainMenu from "./MainMenu";
import PostForm from "./PostForm";

type Props = {
  children: ReactNode;
};

export default function LayoutProvider({ children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const { width } = useWindowSize();
  const isPC = width > 1024;
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const contextValue = {
    isMenuOpen,
    setIsMenuOpen,
    isPostModalOpen,
    setIsPostModalOpen,
    isPC,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      <Header onMenuClick={() => setIsMenuOpen(!isMenuOpen)} />
      <MainMenu
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <div
        className={`flex-1 flex min-h-0 transition-all duration-300 ${
          isMenuOpen && isPC && isHomePage ? "ml-64" : ""
        }`}
      >
        {children}
      </div>

      {/* 投稿フォームモーダル */}
      <dialog
        id="post_modal"
        className={`modal ${isPostModalOpen ? "modal-open" : ""}`}
      >
        <div className="modal-box w-11/12 max-w-4xl h-5/6 p-0">
          <PostForm onClose={() => setIsPostModalOpen(false)} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setIsPostModalOpen(false)}>close</button>
        </form>
      </dialog>
    </LayoutContext.Provider>
  );
}
