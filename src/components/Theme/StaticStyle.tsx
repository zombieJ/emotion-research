import React from 'react';
import { Global } from '@emotion/react';
import { CSSInterpolation } from '@emotion/css';

export interface StaticStyleProps {
  prefixCls: string;
  styles: CSSInterpolation;
}

export default function StaticStyle({ prefixCls, styles }: StaticStyleProps) {
  React.useEffect(() => {}, []);

  return (
    <Global
      styles={{
        [`.${prefixCls}`]: styles,
      }}
    />
  );
}
