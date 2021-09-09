import React from 'react';
import { TinyColor } from '@ctrl/tinycolor';

// =========================== Design Token ===========================
const defaultToken = {
  primaryColor: 'blue',
  borderRadius: 4,
  fontSizeBase: 14,
};

type DesignToken = keyof typeof defaultToken;

type DesignTokens = Record<DesignToken, string | number>;

// ============================= Provider =============================
function themeByToken(token: DesignTokens) {
  const primaryColor = new TinyColor(token.primaryColor);

  return {
    ...token,

    // Calculation value
    primaryHoverColor: primaryColor.clone().lighten(20).toRgbString(),
    primaryActiveColor: primaryColor.clone().darken(10).toRgbString(),
  };
}

export const defaultTheme = themeByToken(defaultToken);

type ThemeVariable = keyof typeof defaultTheme;

export type ThemeVariables = Record<ThemeVariable, string | number>;

export const ThemeContext = React.createContext<ThemeVariables | null>(null);

// ============================= Provider =============================
export interface ThemeProviderProps {
  theme: Partial<DesignTokens>;
  children?: React.ReactNode;
}

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  const mergedTheme = React.useMemo<ThemeVariables>(() => {
    const mergedToken: DesignTokens = {
      ...defaultToken,
      ...theme,
    };

    return themeByToken(mergedToken);
  }, [theme]);

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
