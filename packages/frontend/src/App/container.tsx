import React, { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { ApiAuthProvider } from '../hooks/ApiAuthentication';
import { ApplicationThemeProvider } from '../hooks/ApplicationTheme';
import { I18nextProvider } from '../hooks/i18next';
import GraphqlClient from '../services/graphql/GraphqlClient';

import AppComponent from './component';

const App: FC = () => {
  return (
    <HelmetProvider>
      <GraphqlClient>
        <ApplicationThemeProvider defaultTheme="classic">
          <I18nextProvider languages={['en', 'fr']} fallbackLanguage="en">
            <ApiAuthProvider>
              <AppComponent />
            </ApiAuthProvider>
          </I18nextProvider>
        </ApplicationThemeProvider>
      </GraphqlClient>
    </HelmetProvider>
  );
};

export default App;
