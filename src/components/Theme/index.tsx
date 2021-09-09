import React from 'react';

export const defaultTheme = {
  primaryColor: 'blue',
  borderRadius: 4,
  fontSizeBase: 14,
  primaryHoverColor: '#3333FF',
};

type ThemeKeys = keyof typeof defaultTheme;

export type ThemeContextProps = Partial<Record<ThemeKeys, string | number>>;

export const ThemeContext = React.createContext<ThemeContextProps>({});
