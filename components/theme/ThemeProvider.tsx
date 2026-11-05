"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

const NonceContext = React.createContext<string | undefined>(undefined);

export function useNonce(): string | undefined {
  return React.useContext(NonceContext);
}

export function ThemeProvider({ children, nonce, ...props }: ThemeProviderProps) {
  return (
    <NonceContext.Provider value={nonce}>
      <NextThemesProvider nonce={nonce} {...props}>
        {children}
      </NextThemesProvider>
    </NonceContext.Provider>
  );
}


