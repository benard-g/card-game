import React, { FC, useEffect } from 'react';

import { useApiAuth } from '../hooks/ApiAuthentication/hook';
import { useAppLazyQuery } from '../services/graphql/generated';

import { Root } from './styles';

const LoadingPage: FC = () => (
  <Root>
    <p>Loading...</p>
  </Root>
);

const ErrorPage: FC = () => (
  <Root>
    <p>An error occurred during authentication</p>
  </Root>
);

const App: FC = () => {
  const {
    isAuthenticated,
    loading: apiAuthLoading,
    error: apiAuthError,
  } = useApiAuth();
  const [
    executeAppQuery,
    { loading: appQueryLoading, data, error: appQueryError },
  ] = useAppLazyQuery();

  const loading = apiAuthLoading || appQueryLoading;
  const error = apiAuthError || appQueryError;

  useEffect(() => {
    if (isAuthenticated && !data && !appQueryLoading) {
      executeAppQuery();
    }
  }, [isAuthenticated, data, appQueryLoading, executeAppQuery]);

  if (loading) {
    return <LoadingPage />;
  } else if (error || !data) {
    return <ErrorPage />;
  }

  const { viewer } = data;

  return (
    <Root>
      <p>Hello there !</p>
      <p>Your id is: {viewer.id}</p>
    </Root>
  );
};

export default App;
