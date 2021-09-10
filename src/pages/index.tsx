import React from 'react';
import { Global, css } from '@emotion/react';
import Button from '@/components/Button';
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
  const [primaryColor, setPrimaryColor] = React.useState('green');

  return (
    <div style={{ padding: 24 }}>
      <ThemeProvider theme={customizeToken}>
        <Button ref={btnRef}>Theme Style</Button>
      </ThemeProvider>

      <Button>Global Style</Button>
      <Button>Global Style</Button>

      <ThemeProvider theme={customizeToken2}>
        <Button ref={btnRef}>Theme Style</Button>
        <Button ref={btnRef}>Theme Style</Button>
        <Button ref={btnRef}>Theme Style</Button>
        <Button ref={btnRef}>Theme Style</Button>
        <Button ref={btnRef}>Theme Style</Button>
        <Button ref={btnRef}>Theme Style</Button>
        <Button ref={btnRef}>Theme Style</Button>
        <Button ref={btnRef}>Theme Style</Button>
        <Button ref={btnRef}>Theme Style</Button>
        <Button ref={btnRef}>Theme Style</Button>
        <Button ref={btnRef}>Theme Style</Button>
        <Button ref={btnRef}>Theme Style</Button>
      </ThemeProvider>

      <h2>
        Dynamic Test with 1000 button
        <a
          style={{ userSelect: 'none' }}
          onClick={() => {
            setPrimaryColor(randomColor());
          }}
        >
          (Random!)
        </a>
      </h2>

      {/* <ThemeProvider theme={customizeToken2}>
        <ThemeProvider theme={{ primaryColor }}>
          {new Array(100).fill(null).map((_, index) => (
            <Button
              key={index}
              ref={btnRef}
              style={{ boxShadow: '0 0 3px rgba(0,0,0,0.3)', margin: 4 }}
            >
              Dynamic Nest Theme
            </Button>
          ))}
        </ThemeProvider>
      </ThemeProvider> */}
    </div>
  );
}
