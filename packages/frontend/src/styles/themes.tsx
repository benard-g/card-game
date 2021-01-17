import { DefaultTheme } from 'styled-components';

interface Colors {
  background: string;
}

const spacings = {
  abs4: '4px',
  abs8: '8px',
  abs12: '12px',
  abs16: '16px',
  abs24: '24px',
  abs32: '32px',
  abs48: '48px',
} as const;
type Spacings = typeof spacings;

// Override DefaultTheme types to provide nice typings in templates
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    spacings: Spacings;
  }
}

const themeClassic: DefaultTheme = {
  colors: {
    background: 'lightblue',
  },
  spacings,
};

export const themes = {
  classic: themeClassic,
};

export type ThemeKey = keyof typeof themes;
