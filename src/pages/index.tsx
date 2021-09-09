import React from 'react';
import { Global, css } from '@emotion/react';
import Button, { defaultStyle } from '@/components/Button';
import { ThemeContext } from '@/components/Theme';

const defaultGlobalStyle = {
  '.ts-btn': defaultStyle,
};

export default function IndexPage() {
  const [injectGlobal, setInjectGlobal] = React.useState(true);

  return (
    <div style={{ padding: 24 }}>
      <div>
        <label>
          <input
            type="checkbox"
            checked={injectGlobal}
            onChange={() => setInjectGlobal(!injectGlobal)}
          />
          Inject Global
        </label>
      </div>

      {injectGlobal && <Global styles={css(defaultGlobalStyle)} />}
      <Button>Global Style</Button>

      <ThemeContext.Provider value={{ primaryColor: 'red' }}>
        <Button>Theme Style</Button>
      </ThemeContext.Provider>
    </div>
  );
}