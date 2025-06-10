import React, { ReactNode } from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

interface ExtendedThemeProviderProps extends ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children, ...props }: ExtendedThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}
