import { DefaultTheme } from 'styled-components';

// Override DefaultTheme types to provide nice typings in templates
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
    };
  }
}

const themeClassic: DefaultTheme = {
  colors: {
    background: 'lightblue',
  },
};

export const themes = {
  classic: themeClassic,
};

export type ThemeKey = keyof typeof themes;
