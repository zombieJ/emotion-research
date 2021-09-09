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

const Button = ({ prefixCls = 'ts-btn', className, ...props }: ButtonProps) => {
  return <button className={cx(prefixCls, className)} {...props} />;
};

const ThemeButton = withTheme(Button, templateStyle);

export default ThemeButton;
