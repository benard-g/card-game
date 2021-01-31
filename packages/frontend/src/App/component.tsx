import React, { FC } from 'react';

import Loader from '../components/Loader';

import { useAppReady } from './hook';
import Routes from './Routes';
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
