import React from 'react';
import { css, cx, CSSInterpolation } from '@emotion/css';
import styled from '@emotion/styled';
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

// ============================ With Theme ============================
export type GetComponentStyle = (theme: ThemeVariables) => CSSInterpolation;

export function withTheme<P extends {}>(
  Component: React.ComponentType<P>,
  styleGenerator: GetComponentStyle,
) {
  const StyledComponent = styled(Component, {
    shouldForwardProp: (prop) => prop !== '__internal_theme__',
  })((props: any) => styleGenerator(props.__internal_theme__ as any));

  const Wrapper = React.forwardRef((props: P, ref: React.Ref<any>) => {
    const theme = React.useContext(ThemeContext);
    const MergeComponent = theme ? StyledComponent : Component;

    const additionalProps: Record<string, any> = {
      ref,
    };
    if (theme) {
      additionalProps.__internal_theme__ = theme;
    }

    return <MergeComponent {...props} {...additionalProps} />;
  });

  return Wrapper;
}
