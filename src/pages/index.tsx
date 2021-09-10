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

function randomColor() {
  return '#' + Math.random().toString(16).substr(2, 6);
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
      <ThemeProvider theme={{ primaryColor }}>
        <Button
          ref={btnRef}
          style={{ boxShadow: '0 0 3px rgba(0,0,0,0.3)' }}
          onClick={() => {
            setPrimaryColor(randomColor());
          }}
        >
          Click To Random Change
        </Button>
      </ThemeProvider>
    </div>
  );
}
