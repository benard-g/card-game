import React, { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import GraphqlApiProvider from '../graphql/GraphqlApiProvider';
import { ApiAuthProvider } from '../hooks/ApiAuthentication';
import { ApplicationThemeProvider } from '../hooks/ApplicationTheme';
import { I18nextProvider } from '../hooks/i18next';

import AppComponent from './component';

const App: FC = () => {
  return (
    <HelmetProvider>
      <GraphqlApiProvider>
        <ApplicationThemeProvider defaultTheme="classic">
          <I18nextProvider languages={['en', 'fr']} fallbackLanguage="en">
            <ApiAuthProvider>
              <AppComponent />
            </ApiAuthProvider>
          </I18nextProvider>
        </ApplicationThemeProvider>
      </GraphqlApiProvider>
    </HelmetProvider>
  );
};

export default App;
