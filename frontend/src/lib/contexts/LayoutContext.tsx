"use client";

import { createContext, useState, ReactNode } from "react";

type LayoutContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isPostModalOpen: boolean;
  setIsPostModalOpen: (isOpen: boolean) => void;
  isPC: boolean;
};

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined
);
