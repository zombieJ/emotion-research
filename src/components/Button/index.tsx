import React from 'react';
import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import { defaultTheme, ThemeContext, ThemeContextProps } from '../Theme';

export const templateStyle = (theme: ThemeContextProps) => ({
  background: theme.primaryColor,
  color: '#FFF',
});

export const defaultStyle = templateStyle(defaultTheme);

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  prefixCls?: string;
}

const Button = ({ prefixCls = 'ts-btn', className, ...props }: ButtonProps) => {
  const theme = React.useContext(ThemeContext);

  const Component = theme.primaryColor
    ? styled('button')(templateStyle(theme))
    : 'button';

  return <Component className={cx(prefixCls, className)} {...props} />;
};

export default Button;
