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

export type DesignTokens = Record<DesignToken, string | number>;

// ============================== Theme ===============================
function themeByToken(token: DesignTokens) {
  const primaryColor = new TinyColor(token.primaryColor);

  return {
    ...token,

    // Calculation value
    primaryHoverColor: primaryColor.clone().lighten(10).toRgbString(),
    primaryActiveColor: primaryColor.clone().darken(10).toRgbString(),
  };
}

export const defaultTheme = themeByToken(defaultToken);

type ThemeVariable = keyof typeof defaultTheme;

export type ThemeVariables = Record<ThemeVariable, string | number>;

// ============================= Provider =============================
export const ThemeContext = React.createContext<ThemeVariables | undefined>(
  undefined,
);

export interface ThemeProviderProps {
  theme: Partial<DesignTokens>;
  children?: React.ReactNode;
}

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  const parentContext = React.useContext(ThemeContext);

  const mergedTheme = React.useMemo<ThemeVariables>(() => {
    const mergedToken: DesignTokens = {
      ...defaultToken,
      ...parentContext,
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
  })((props: any) => ({
    [`.${props.prefixCls}&`]: styleGenerator(props.__internal_theme__ as any),
  }));

  const Wrapper = React.forwardRef<Refs, Props>(
    (
      { prefixCls = defaultPrefixCls, ...props }: Props,
      ref: React.Ref<any>,
    ) => {
      // 获取主题
      const theme = React.useContext(ThemeContext);

      // 根据是否存在主题来选择组件
      const MergeComponent: any = theme ? StyledComponent : Component;

      // 组件注入样式
      const additionalProps: Record<string, any> = {
        ref,
        __internal_theme__: theme,
      };

      const node = (
        <MergeComponent prefixCls={prefixCls} {...props} {...additionalProps} />
      );

      // 全局样式
      const cacheGlobal = React.useMemo(
        () => (theme ? null : styleGenerator(defaultTheme)),
        [theme, styleGenerator, defaultTheme],
      );

      // 没有主题就动态注入，组件多了感觉会有收集问题
      if (!theme) {
        return (
          <>
            <StaticStyle prefixCls={prefixCls} styles={cacheGlobal} />
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
