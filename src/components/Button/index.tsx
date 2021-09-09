import React from 'react';
import { css, cx, CSSInterpolation } from '@emotion/css';
import {
  defaultTheme,
  ThemeContext,
  ThemeVariables,
  withTheme,
} from '../Theme';

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

const Button = React.forwardRef(
  (
    { prefixCls = 'ts-btn', className, ...props }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    return <button ref={ref} className={cx(prefixCls, className)} {...props} />;
  },
);
Button.displayName = 'Button';

const ThemeButton = withTheme(Button, 'rc-btn', templateStyle);

export default ThemeButton;
