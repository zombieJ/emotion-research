import React from 'react';
import { Global, css } from '@emotion/react';
import Button, { defaultStyle } from '@/components/Button';
import { ThemeProvider } from '@/components/Theme';

const customizeToken = {
  primaryColor: 'red',
};

const customizeToken2 = {
  primaryColor: 'green',
};

export default function IndexPage() {
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div style={{ padding: 24 }}>
      <ThemeProvider theme={customizeToken}>
        <Button ref={btnRef}>Theme Style</Button>
      </ThemeProvider>

      <Button>Global Style</Button>
      <Button>Global Style</Button>
      <Button>Global Style</Button>
      <Button>Global Style</Button>
      <Button>Global Style</Button>
      <Button>Global Style</Button>
      <Button>Global Style</Button>
      <Button>Global Style</Button>

      <ThemeProvider theme={customizeToken2}>
        <Button ref={btnRef}>Theme Style</Button>
      </ThemeProvider>
    </div>
  );
}
