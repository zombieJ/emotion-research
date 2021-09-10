import React from 'react';
import { css, cx, CSSInterpolation } from '@emotion/css';
import {
  defaultTheme,
  ThemeContext,
  ThemeVariables,
  withTheme,
} from '../Theme';

export const templateStyle = (
  theme: ThemeVariables,
  prefixCls: string,
): CSSInterpolation => ({
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

  [`.${prefixCls}-content`]: {
    boxShadow: '0 0 3px red',
  },
});

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  prefixCls?: string;
}

const Button = React.forwardRef(
  (
    { prefixCls = 'ts-btn', className, children, ...props }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <button ref={ref} className={cx(prefixCls, className)} {...props}>
        <span className={`${prefixCls}-content`}>{children}</span>
      </button>
    );
  },
);
Button.displayName = 'Button';

export default withTheme(Button, 'rc-btn', templateStyle);
