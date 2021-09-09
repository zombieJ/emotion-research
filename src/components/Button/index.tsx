import React from 'react';
import { css, cx, CSSInterpolation } from '@emotion/css';
import styled from '@emotion/styled';
import { defaultTheme, ThemeContext, ThemeContextProps } from '../Theme';

export const templateStyle = (theme: ThemeContextProps): CSSInterpolation => ({
  background: theme.primaryColor,
  borderRadius: theme.borderRadius,
  border: 0,
  color: '#FFF',
  fontSize: theme.fontSizeBase,

  '&:hover': {
    background: theme.primaryHoverColor,
  },
});

export const defaultStyle = templateStyle(defaultTheme);

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  prefixCls?: string;
}

const Button = ({ prefixCls = 'ts-btn', className, ...props }: ButtonProps) => {
  const theme = React.useContext(ThemeContext);

  const Component = theme.primaryColor
    ? styled('button')(defaultStyle, templateStyle(theme))
    : 'button';

  return <Component className={cx(prefixCls, className)} {...props} />;
};

export default Button;
