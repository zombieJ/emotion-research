import React from 'react';
import { Global } from '@emotion/react';
import { CSSInterpolation, injectGlobal } from '@emotion/css';

export interface StaticStyleProps {
  prefixCls: string;
  styles: CSSInterpolation;
}

const prefixElements: Record<string, {}[]> = {};

export default function StaticStyle({ prefixCls, styles }: StaticStyleProps) {
  injectGlobal({
    [`.${prefixCls}`]: styles,
  });

  return null;
  // const [, forceUpdate] = React.useState({});

  // React.useLayoutEffect(() => {
  //   const obj = {};
  //   prefixElements[prefixCls] = prefixElements[prefixCls] || [];
  //   prefixElements[prefixCls].push(obj);

  //   return () => {
  //     prefixElements[prefixCls] = prefixElements[prefixCls].filter(
  //       (o) => o !== obj,
  //     );
  //   };
  // }, []);

  // return (
  //   <Global
  //     styles={{
  //       [`.${prefixCls}`]: styles,
  //     }}
  //   />
  // );
}
