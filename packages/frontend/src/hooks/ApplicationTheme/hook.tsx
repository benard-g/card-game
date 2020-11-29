import React, { createContext, FC, useContext, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import { ThemeKey, themes } from '../../styles/themes';

//
// Theme context
//
type ThemeContext = [
  { name: ThemeKey; theme: DefaultTheme },
  (themeKey: ThemeKey) => void,
];

const themeContext = createContext<ThemeContext | undefined>(undefined);

//
// Theme provider
//
interface ProviderProps {
  defaultTheme: ThemeKey;
}

export const ApplicationThemeProvider: FC<ProviderProps> = (props) => {
  const { defaultTheme, children } = props;

  const [themeName, setThemeName] = useState<ThemeKey>(defaultTheme);
  const theme = themes[themeName];

  return (
    <themeContext.Provider value={[{ name: themeName, theme }, setThemeName]}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </themeContext.Provider>
  );
};

//
// Theme consumer
//
export function useApplicationTheme(): ThemeContext {
  const applicationTheme = useContext(themeContext);
  if (!applicationTheme) {
    throw new Error('Missing wrapping ApplicationThemeProvider');
  }

  return applicationTheme;
}
