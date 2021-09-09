import React from 'react';

export const defaultTheme = {
  primaryColor: 'blue',
};

export interface ThemeContextProps {
  primaryColor?: string;
}

export const ThemeContext = React.createContext<ThemeContextProps>({});
