import React from 'react';
import { Global, ThemeContext, withEmotionCache } from '@emotion/react';
import { serialize, compile, middleware, rulesheet, stringify } from 'stylis';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import { serializeStyles } from '@emotion/serialize';
import { CSSInterpolation, injectGlobal } from '@emotion/css';

export interface StaticStyleProps {
  prefixCls: string;
  styles: CSSInterpolation;
}

const isBrowser = canUseDom();

// We do not care server side style. Just clean it
const dataPrefix = 'data-ant-global-prefix';
(() => {
  if (isBrowser) {
    const styles = document.querySelectorAll(`[${dataPrefix}]`);
    styles.forEach((style) => style.remove());
  }
})();

// Component
const StaticStyle = withEmotionCache(
  ({ prefixCls, styles }: StaticStyleProps, cache) => {
    // Get global style
    const mergedStyle = React.useMemo(
      () => ({
        [`.${prefixCls}`]: styles,
      }),
      [prefixCls, styles],
    );

    // Do injection
    if (isBrowser) {
      injectGlobal(mergedStyle);
      // }
      return null;
    }

    const serialized = serializeStyles([mergedStyle], cache.registered);
    const styleContent = cache.insert('', serialized, cache.sheet, false)!;

    return (
      <style
        {...{
          [dataPrefix]: prefixCls,
        }}
        dangerouslySetInnerHTML={{ __html: styleContent }}
        nonce={cache.sheet.nonce}
      />
    );
  },
);

export default StaticStyle;
