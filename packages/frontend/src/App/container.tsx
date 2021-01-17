import React, { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { ApiAuthProvider } from '../hooks/ApiAuthentication';
import { ApplicationThemeProvider } from '../hooks/ApplicationTheme';
import GraphqlClient from '../services/graphql/GraphqlClient';

import AppComponent from './component';

const App: FC = () => {
  return (
    <HelmetProvider>
      <GraphqlClient>
        <ApplicationThemeProvider defaultTheme="classic">
          <ApiAuthProvider>
            <AppComponent />
          </ApiAuthProvider>
        </ApplicationThemeProvider>
      </GraphqlClient>
    </HelmetProvider>
  );
};

export default App;
