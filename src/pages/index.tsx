import React from 'react';
import { Global, css } from '@emotion/react';
import Button, { defaultStyle } from '@/components/Button';
import { ThemeProvider, DesignTokens } from '@/components/Theme';

const customizeToken: Partial<DesignTokens> = {
  primaryColor: 'red',
};

const customizeToken2: Partial<DesignTokens> = {
  primaryColor: 'green',
  fontSizeBase: 20,
};

function randomColor() {
  const rnd = () => (Math.random() * 150).toFixed(0);
  return `rgb(${rnd()},${rnd()},${rnd()})`;
}

export default function IndexPage() {
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [primaryColor, setPrimaryColor] = React.useState(randomColor());

  return (
    <div style={{ padding: 24 }}>
      <ThemeProvider theme={customizeToken}>
        <Button ref={btnRef}>Theme Style</Button>
      </ThemeProvider>

      <Button>Global Style</Button>
      <Button>Global Style</Button>

      <ThemeProvider theme={customizeToken2}>
        <Button ref={btnRef}>Theme Style</Button>
      </ThemeProvider>

      <ThemeProvider theme={customizeToken2}>
        <ThemeProvider theme={{ primaryColor }}>
          <Button
            ref={btnRef}
            style={{ boxShadow: '0 0 3px rgba(0,0,0,0.3)' }}
            onClick={() => {
              setPrimaryColor(randomColor());
            }}
          >
            Click To Random Change Nest Theme
          </Button>
        </ThemeProvider>
      </ThemeProvider>
    </div>
  );
}
