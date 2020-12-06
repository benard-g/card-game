import React, { FC } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { config } from '../../config';

const apolloClient = new ApolloClient({
  uri: `${config.API_URI}/api/graphql`,
  cache: new InMemoryCache(),
});

const GraphqlClient: FC = (props) => {
  const { children } = props;

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default GraphqlClient;
