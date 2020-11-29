import React, { FC, ReactElement } from 'react';

import { useAppQuery } from '../services/graphql/generated';

import { Root } from './styles';

const App: FC = () => {
  const { data, loading, error } = useAppQuery();

  let pageContent: ReactElement | null = null;
  if (loading) {
    pageContent = <p>Loading...</p>;
  } else if (error) {
    pageContent = <p>An error occurred</p>;
  } else if (data) {
    const { hello } = data;
    pageContent = <p>{hello.message}</p>;
  }

  return <Root>{pageContent}</Root>;
};

export default App;
