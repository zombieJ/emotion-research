import React from 'react';
import { Global, ThemeContext, withEmotionCache } from '@emotion/react';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import { serializeStyles } from '@emotion/serialize';
import { CSSInterpolation, injectGlobal } from '@emotion/css';

export interface StaticStyleProps {
  prefixCls: string;
  styles: CSSInterpolation;
}

const isBrowser = canUseDom();

const StaticStyle = ({ prefixCls, styles }: StaticStyleProps) => {
  const mergedStyle = {
    [`.${prefixCls}`]: styles,
  };

  // Client
  if (isBrowser) {
    injectGlobal(mergedStyle);

    return null;
  }

  // Server
  return <Global styles={mergedStyle} />;
};

export default StaticStyle;
