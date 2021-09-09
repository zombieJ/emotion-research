import React from 'react';
import { css, cx, CSSInterpolation } from '@emotion/css';
import styled from '@emotion/styled';
import { TinyColor } from '@ctrl/tinycolor';
import StaticStyle from './StaticStyle';

// =========================== Design Token ===========================
const defaultToken = {
  primaryColor: 'blue',
  borderRadius: 4,
  fontSizeBase: 14,
};

type DesignToken = keyof typeof defaultToken;

type DesignTokens = Record<DesignToken, string | number>;

// ============================== Theme ===============================
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

// ============================= Provider =============================
export const ThemeContext = React.createContext<ThemeVariables | null>(null);

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

export function withTheme<
  Props extends { prefixCls?: string },
  Refs extends {},
>(
  Component: React.ComponentType<Props>,
  defaultPrefixCls: string,
  styleGenerator: GetComponentStyle,
) {
  const StyledComponent = styled(Component, {
    shouldForwardProp: (prop) => prop !== '__internal_theme__',
  })((props: any) => styleGenerator(props.__internal_theme__ as any));

  const Wrapper = React.forwardRef<Refs, Props>(
    (
      { prefixCls = defaultPrefixCls, ...props }: Props,
      ref: React.Ref<any>,
    ) => {
      const theme = React.useContext(ThemeContext);
      const MergeComponent: any = theme ? StyledComponent : Component;

      const additionalProps: Record<string, any> = {
        ref,
      };
      if (theme) {
        additionalProps.__internal_theme__ = theme;
      }

      const node = (
        <MergeComponent prefixCls={prefixCls} {...props} {...additionalProps} />
      );

      if (!theme) {
        return (
          <>
            <StaticStyle
              prefixCls={prefixCls}
              styles={styleGenerator(defaultTheme)}
            />
            {node}
          </>
        );
      }

      return node;
    },
  );
  Wrapper.displayName = 'ThemeWrapper';

  return Wrapper;
}
