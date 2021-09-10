import React from 'react';
import { Global, css } from '@emotion/react';
import Button, { defaultStyle } from '@/components/Button';
import { ThemeProvider } from '@/components/Theme';

const defaultGlobalStyle = {
  '.ts-btn': defaultStyle,
};

const customizeToken = {
  primaryColor: 'red',
};

export default function IndexPage() {
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div style={{ padding: 24 }}>
      <Button>Global Style</Button>
      <Button>Global Style</Button>
      <Button>Global Style</Button>
      <Button>Global Style</Button>
      <Button>Global Style</Button>
      <Button>Global Style</Button>
      <Button>Global Style</Button>
      <Button>Global Style</Button>

      <ThemeProvider theme={customizeToken}>
        <Button ref={btnRef}>Theme Style</Button>
      </ThemeProvider>
    </div>
  );
}
