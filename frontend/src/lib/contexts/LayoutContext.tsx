'use client'

import { createContext, Dispatch, SetStateAction } from 'react'
import type { User } from '@supabase/supabase-js'

type LayoutContextType = {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
  isPostModalOpen: boolean
  setIsPostModalOpen: (isOpen: boolean) => void
  isPC: boolean
  user: User | null
  isLoginPromptOpen: boolean
  setIsLoginPromptOpen: Dispatch<SetStateAction<boolean>>
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined)
