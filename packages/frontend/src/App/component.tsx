import React, { FC } from 'react';

import Loader from '../components/Loader';

import { useAppReady } from './hooks';
import Routes from './routes';
import { Root } from './styles';

const App: FC = () => {
  const { loading, error } = useAppReady();

  if (loading) {
    return (
      <Root>
        <Loader />
      </Root>
    );
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (
      <Root>
        <p>An error occurred while loading the app.</p>
      </Root>
    );
  }

  return (
    <Root>
      <Routes />
    </Root>
  );
};

export default App;
