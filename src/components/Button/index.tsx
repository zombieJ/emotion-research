import React from 'react';
import { css, cx, CSSInterpolation } from '@emotion/css';
import styled from '@emotion/styled';
import { defaultTheme, ThemeContext, ThemeVariables } from '../Theme';

export const templateStyle = (theme: ThemeVariables): CSSInterpolation => ({
  background: theme.primaryColor,
  borderRadius: theme.borderRadius,
  border: 0,
  color: '#FFF',
  fontSize: theme.fontSizeBase,
  cursor: 'pointer',

  '&:hover': {
    background: theme.primaryHoverColor,
  },

  '&:active': {
    background: theme.primaryActiveColor,
  },
});

export const defaultStyle = templateStyle(defaultTheme);

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  prefixCls?: string;
}

const Button = ({ prefixCls = 'ts-btn', className, ...props }: ButtonProps) => {
  const theme = React.useContext(ThemeContext);

  const memoStyle = React.useMemo(() => theme && templateStyle(theme), [theme]);

  const Component = theme
    ? styled('button')(defaultStyle, memoStyle)
    : 'button';

  return <Component className={cx(prefixCls, className)} {...props} />;
};

export default Button;
