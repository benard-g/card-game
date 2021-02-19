import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { FC } from 'react';

import { config } from '../../config';

const apolloClient = new ApolloClient({
  uri: `${config.API_URI}/api/graphql`,
  cache: new InMemoryCache(),
  credentials: 'include',
  connectToDevTools: config.NODE_ENV === 'development',
});

const GraphqlClient: FC = (props) => {
  const { children } = props;

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default GraphqlClient;
